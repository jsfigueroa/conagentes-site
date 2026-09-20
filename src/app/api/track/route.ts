/**
 * First-party event ingest (CON-292).
 *
 * This lives on the marketing site's OWN origin on purpose: a request to
 * `conagentes.com/api/track` is indistinguishable from the site itself, so
 * nothing filters it. The alternative — a vendor endpoint — loses a large,
 * *self-selected* slice of exactly the technical, high-intent visitors we are
 * trying to convert, and the resulting report is confidently wrong rather than
 * merely incomplete.
 *
 * Three things this route will not do:
 *
 *   1. **It never stores an IP address.** Country comes from Vercel's edge
 *      header and the address itself is used only for the in-memory burst
 *      limiter, then discarded. Under Ley 1581 an IP tied to behaviour is
 *      personal data we would then have to justify holding; we do not need it.
 *   2. **It never trusts the client's channel attribution.** The browser sends
 *      the raw URL and referrer it saw; the channel group is re-derived here
 *      from the same pure function, so a crafted payload cannot file paid
 *      traffic under organic.
 *   3. **It never echoes anything back.** The response is a bare 204. There is
 *      no read path, so the endpoint cannot be turned into a way to enumerate
 *      the table it writes to.
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isEventName } from "@/lib/analytics/events";
import { deriveChannelGroup, type AttributionSnapshot, type ChannelGroup } from "@/lib/analytics/attribution";
import { hasOptOutCookie, isMeasurableHost } from "@/lib/analytics/internal";

export const runtime = "nodejs";

/** One browser cannot post more than this many batches per window. */
const RATE_LIMIT = 60;
const RATE_WINDOW_MS = 60_000;
const MAX_EVENTS_PER_BATCH = 40;
const MAX_PROP_KEYS = 20;
const MAX_STRING_LEN = 300;
const MAX_BODY_BYTES = 32 * 1024;

/**
 * Per-instance burst limiter. Serverless means this resets whenever a new
 * instance spins up, so it is a guard against an accidental render loop —
 * the class of bug that actually happens — not against a determined attacker.
 * The real protections are the whitelist and the hard caps below, which bound
 * what a flood can even write.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
    }
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

let _db: SupabaseClient | null = null;
function getDb(): SupabaseClient | null {
  // Lazy: a module-scope client throws during `next build` when the env is
  // absent, which is how Preview deploys break while Production looks fine.
  if (_db) return _db;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  _db = createClient(url, key, { auth: { persistSession: false } });
  return _db;
}

const BOT_UA = /bot|crawl|spider|slurp|headless|lighthouse|pingdom|curl|wget|python-requests|axios|monitor/i;

function deviceFrom(ua: string): "mobile" | "tablet" | "desktop" {
  if (/ipad|tablet|playbook|silk/i.test(ua)) return "tablet";
  if (/mobi|android|iphone|ipod/i.test(ua)) return "mobile";
  return "desktop";
}

/** Vercel's geo headers are percent-encoded; a bad escape must not throw. */
function decodeHeader(value: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value).trim().slice(0, 120) || null;
  } catch {
    return value.trim().slice(0, 120) || null;
  }
}

function str(value: unknown, max = MAX_STRING_LEN): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function cleanProps(raw: unknown): Record<string, string | number | boolean> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Record<string, string | number | boolean> = {};
  let n = 0;
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (n >= MAX_PROP_KEYS) break;
    if (v === null || v === undefined) continue;
    const key = k.slice(0, 48);
    if (typeof v === "number" && Number.isFinite(v)) out[key] = v;
    else if (typeof v === "boolean") out[key] = v;
    else if (typeof v === "string") out[key] = v.slice(0, MAX_STRING_LEN);
    else continue;
    n += 1;
  }
  return out;
}

/** Normalize one client-sent snapshot, re-deriving the channel ourselves. */
function normalizeTouch(raw: unknown, selfHost: string | null): (AttributionSnapshot & { channelGroup: ChannelGroup }) | null {
  if (!raw || typeof raw !== "object") return null;
  const t = raw as Record<string, unknown>;
  const source = str(t.source);
  const medium = str(t.medium);
  const referrerHost = str(t.referrerHost, 200);
  const clickIdKind = str(t.clickIdKind, 32);
  return {
    source,
    medium,
    campaign: str(t.campaign),
    content: str(t.content),
    term: str(t.term),
    referrer: str(t.referrer, 500),
    referrerHost,
    landingPath: str(t.landingPath, 300),
    clickId: str(t.clickId, 200),
    clickIdKind,
    // Re-derived, never taken from the payload.
    channelGroup: deriveChannelGroup({ medium, source, referrerHost, clickIdKind, selfHost }),
    at: str(t.at, 40) ?? new Date().toISOString(),
  };
}

export async function POST(req: NextRequest) {
  // A 204 on every path, success or not: an analytics endpoint that reports
  // its own failures to the page teaches a probe what it rejects, and gives a
  // visitor's console errors it can do nothing about.
  const ok = () => new NextResponse(null, { status: 204 });

  try {
    const ua = req.headers.get("user-agent") ?? "";
    if (BOT_UA.test(ua)) return ok();

    // Only the real domains are measurable (CON-294). A dev server and a
    // preview deploy both read the same `.env.local`, which holds the LIVE
    // service key, so without this line every local page load writes straight
    // into production analytics — which is exactly what happened on
    // 2026-09-20, when 65% of every row in the table turned out to be an agent
    // verifying a popup against `localhost:3103`. Dropped outright rather than
    // kept as internal: a dev loop can emit thousands of rows and not one of
    // them describes anything.
    if (!isMeasurableHost(req.headers.get("host"))) return ok();

    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return ok();

    const ip =
      req.headers.get("x-vercel-forwarded-for")?.split(",").pop()?.trim() ||
      req.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ||
      "unknown";
    if (rateLimited(ip)) return ok();

    const body = JSON.parse(raw) as Record<string, unknown>;
    const events = Array.isArray(body.events) ? body.events.slice(0, MAX_EVENTS_PER_BATCH) : [];
    if (events.length === 0) return ok();

    const db = getDb();
    if (!db) {
      console.error("[track] Supabase env missing — events dropped");
      return ok();
    }

    const selfHost = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://conagentes.com")
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "");

    const anonymous = body.anonymous === true;
    const first = normalizeTouch(body.first_touch, selfHost);
    const last = normalizeTouch(body.last_touch, selfHost);
    // An anonymous ping has no identity by construction; anything it claims to
    // carry is discarded rather than trusted.
    const visitorId = anonymous ? null : str(body.visitor_id, 64);
    const sessionId = anonymous ? null : str(body.session_id, 64);

    const country = req.headers.get("x-vercel-ip-country");
    // City and region come from the same Vercel edge lookup as the country and
    // cost nothing extra (CON-294). They are IP-derived and approximate —
    // useful for "is anyone in Cartagena reading the hotel pages", never for
    // identifying anybody. The header is percent-encoded, so «Bogotá» arrives
    // as `Bogot%C3%A1` and lands in the table mojibaked if you skip the decode.
    const city = decodeHeader(req.headers.get("x-vercel-ip-city"));
    const region = decodeHeader(req.headers.get("x-vercel-ip-country-region"));
    const device = deviceFrom(ua);
    const screen = str(body.screen, 20);

    // Our own browsers, marked rather than dropped: an opt-out you cannot see
    // working is an opt-out nobody trusts, and the volume is trivial. It is
    // read from the request's OWN cookie header — the payload never gets to
    // assert its own exclusion.
    const internal = hasOptOutCookie(req.headers.get("cookie"));

    const rows = events
      .map((e) => {
        if (!e || typeof e !== "object") return null;
        const ev = e as Record<string, unknown>;
        if (!isEventName(ev.name)) return null; // the whitelist: typos die here
        return {
          visitor_id: visitorId,
          session_id: sessionId,
          anonymous,
          name: ev.name,
          path: str(ev.path, 300) ?? "/",
          props: cleanProps(ev.props),
          occurred_at: str(ev.ts, 40) ?? new Date().toISOString(),

          first_source: first?.source ?? null,
          first_medium: first?.medium ?? null,
          first_campaign: first?.campaign ?? null,
          first_channel_group: first?.channelGroup ?? null,
          first_landing_path: first?.landingPath ?? null,
          first_referrer_host: first?.referrerHost ?? null,
          first_at: first?.at ?? null,

          last_source: last?.source ?? null,
          last_medium: last?.medium ?? null,
          last_campaign: last?.campaign ?? null,
          last_content: last?.content ?? null,
          last_term: last?.term ?? null,
          last_channel_group: last?.channelGroup ?? null,
          last_referrer_host: last?.referrerHost ?? null,
          last_click_id: last?.clickId ?? null,
          last_click_id_kind: last?.clickIdKind ?? null,

          device,
          country,
          city,
          region,
          internal,
          screen,
        };
      })
      // `filter(Boolean)` does not narrow away the nulls for TypeScript, and
      // the rows are inserted as a batch, so the predicate has to be explicit.
      .filter((row): row is NonNullable<typeof row> => row !== null);

    if (rows.length === 0) return ok();

    const { error } = await db.from("site_events").insert(rows);
    if (error) console.error("[track] insert failed:", error.message);

    return ok();
  } catch {
    return ok();
  }
}
