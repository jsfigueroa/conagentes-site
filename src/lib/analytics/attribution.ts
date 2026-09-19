/**
 * Where a visitor came from, and how we keep knowing it (CON-292).
 *
 * The point of this module is NOT a prettier referrer report. It is the join
 * key. A hotel that books a pilot in November opened a blog post in September;
 * the conversion happens weeks later, inside our CRM, long after any session
 * has ended. So the attribution snapshot has to be durable on the client and
 * has to ride along on every conversion payload, or the question "which page
 * produced this client" is permanently unanswerable.
 *
 * Two snapshots are kept, deliberately:
 *
 *   FIRST touch  — pinned the first time we ever see this browser, never
 *                  overwritten. It credits the thing that created awareness
 *                  (usually organic search or an AI assistant).
 *   LAST touch   — recomputed whenever a visit arrives with new campaign
 *                  information. It credits the thing that closed.
 *
 * Both travel on every event, so the dashboard can answer either question
 * without a join and without us having to decide the attribution model now.
 */

export type ChannelGroup =
  | "direct"
  | "organic_search"
  | "ai_assistant"
  | "social"
  | "paid_search"
  | "paid_social"
  | "email"
  | "referral"
  | "internal";

export interface AttributionSnapshot {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
  referrer: string | null;
  referrerHost: string | null;
  landingPath: string | null;
  clickId: string | null;
  clickIdKind: string | null;
  channelGroup: ChannelGroup;
  /** ISO timestamp of when this snapshot was taken. */
  at: string;
}

/**
 * Assistants that send real people to the site.
 *
 * This group exists as a first-class channel because the entire GEO investment
 * (llms.txt, the JSON-LD, the pillar pages) is otherwise invisible: default
 * analytics tools file every one of these under "referral" next to a forum
 * link, so the one channel we are deliberately building for is the one nobody
 * can see. Hosts are matched on the registrable suffix, so subdomains count.
 */
const AI_ASSISTANT_HOSTS = [
  "chatgpt.com",
  "openai.com",
  "perplexity.ai",
  "claude.ai",
  "anthropic.com",
  "gemini.google.com",
  "bard.google.com",
  "copilot.microsoft.com",
  "you.com",
  "phind.com",
  "poe.com",
  "mistral.ai",
  "deepseek.com",
  "grok.com",
  "x.ai",
];

const SEARCH_HOSTS = [
  "google.",
  "bing.com",
  "duckduckgo.com",
  "yahoo.",
  "ecosia.org",
  "brave.com",
  "yandex.",
  "baidu.com",
  "startpage.com",
  "qwant.com",
];

const SOCIAL_HOSTS = [
  "facebook.com",
  "instagram.com",
  "linkedin.com",
  "lnkd.in",
  "t.co",
  "twitter.com",
  "x.com",
  "tiktok.com",
  "youtube.com",
  "youtu.be",
  "reddit.com",
  "pinterest.",
  "whatsapp.com",
  "wa.me",
  "telegram.org",
  "t.me",
  "threads.net",
];

/**
 * Ad-platform click identifiers. Their presence is the only *reliable* signal
 * that a visit was paid — `utm_medium` is hand-typed and gets it wrong often
 * enough that spend would land in the organic column.
 */
const CLICK_ID_PARAMS: Array<{ param: string; kind: string; group: ChannelGroup }> = [
  { param: "gclid", kind: "google", group: "paid_search" },
  { param: "gbraid", kind: "google", group: "paid_search" },
  { param: "wbraid", kind: "google", group: "paid_search" },
  { param: "msclkid", kind: "microsoft", group: "paid_search" },
  { param: "fbclid", kind: "meta", group: "paid_social" },
  { param: "ttclid", kind: "tiktok", group: "paid_social" },
  { param: "li_fat_id", kind: "linkedin", group: "paid_social" },
  { param: "twclid", kind: "x", group: "paid_social" },
];

function hostMatches(host: string, needles: string[]): boolean {
  return needles.some((n) => (n.endsWith(".") ? host.includes(n) : host === n || host.endsWith(`.${n}`)));
}

function normalizeHost(raw: string | null): string | null {
  if (!raw) return null;
  try {
    return new URL(raw).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Decide the channel from everything we know, cheapest and most reliable
 * signal first. Order matters: an explicit `utm_medium=cpc` outranks a referrer
 * because a paid click can arrive with any referrer at all, and a click id
 * outranks both because it cannot be typed by hand.
 */
export function deriveChannelGroup(input: {
  medium: string | null;
  source: string | null;
  referrerHost: string | null;
  clickIdKind: string | null;
  selfHost: string | null;
}): ChannelGroup {
  const { medium, source, referrerHost, clickIdKind, selfHost } = input;

  if (clickIdKind) {
    const hit = CLICK_ID_PARAMS.find((c) => c.kind === clickIdKind);
    if (hit) return hit.group;
  }

  const m = (medium ?? "").toLowerCase();
  if (m === "email" || m === "newsletter") return "email";
  if (m === "cpc" || m === "ppc" || m === "paid" || m === "paid_search") return "paid_search";
  if (m === "paid_social" || m === "paidsocial") return "paid_social";
  if (m === "social") return "social";
  if (m === "organic") return "organic_search";
  if (m === "referral") return "referral";

  if (!referrerHost) {
    // No referrer and no campaign: typed, bookmarked, or stripped by the
    // source. Genuinely unknowable — do not invent a channel for it.
    return source ? "referral" : "direct";
  }
  if (selfHost && (referrerHost === selfHost || referrerHost.endsWith(`.${selfHost}`))) return "internal";
  if (hostMatches(referrerHost, AI_ASSISTANT_HOSTS)) return "ai_assistant";
  if (hostMatches(referrerHost, SEARCH_HOSTS)) return "organic_search";
  if (hostMatches(referrerHost, SOCIAL_HOSTS)) return "social";
  return "referral";
}

/** Human-readable labels for the dashboard, es-CO. */
export const CHANNEL_GROUP_LABELS: Record<ChannelGroup, string> = {
  direct: "Directo",
  organic_search: "Búsqueda orgánica",
  ai_assistant: "Asistentes de IA",
  social: "Redes sociales",
  paid_search: "Búsqueda pagada",
  paid_social: "Redes pagadas",
  email: "Correo",
  referral: "Referidos",
  internal: "Interno",
};

/**
 * Build a snapshot from a URL + referrer. Pure, so the ingest route can
 * re-derive the channel rather than trusting whatever the browser posted.
 */
export function buildSnapshot(params: {
  url: string;
  referrer: string | null;
  selfHost?: string | null;
}): AttributionSnapshot {
  const { referrer } = params;
  let parsed: URL | null = null;
  try {
    parsed = new URL(params.url);
  } catch {
    parsed = null;
  }
  const q = parsed?.searchParams;
  const selfHost = params.selfHost ?? parsed?.hostname.replace(/^www\./, "").toLowerCase() ?? null;

  const clickHit = CLICK_ID_PARAMS.find((c) => q?.get(c.param));
  const clickId = clickHit ? q?.get(clickHit.param) ?? null : null;
  const clickIdKind = clickHit?.kind ?? null;

  const referrerHost = normalizeHost(referrer);
  const source = q?.get("utm_source") ?? null;
  const medium = q?.get("utm_medium") ?? null;

  return {
    source: source ?? (referrerHost && referrerHost !== selfHost ? referrerHost : null),
    medium,
    campaign: q?.get("utm_campaign") ?? null,
    content: q?.get("utm_content") ?? null,
    term: q?.get("utm_term") ?? null,
    referrer: referrer || null,
    referrerHost,
    landingPath: parsed?.pathname ?? null,
    clickId,
    clickIdKind,
    channelGroup: deriveChannelGroup({ medium, source, referrerHost, clickIdKind, selfHost }),
    at: new Date().toISOString(),
  };
}

/**
 * Does this visit carry NEW campaign information worth overwriting last-touch
 * with? An internal click from one of our own pages must never reset it —
 * otherwise every visitor ends up attributed to "internal" the moment they
 * navigate, which is the classic way a last-touch report turns into nonsense.
 */
export function isNewTouch(snap: AttributionSnapshot): boolean {
  if (snap.channelGroup === "internal") return false;
  if (snap.clickId) return true;
  if (snap.source || snap.medium || snap.campaign) return true;
  return snap.channelGroup !== "direct";
}
