/**
 * The first-party analytics client (CON-292).
 *
 * WHY WE SEND TO OUR OWN ORIGIN INSTEAD OF A VENDOR SCRIPT
 *
 * Third-party analytics endpoints are blocked for a large minority of
 * visitors. The problem is not that the number comes out smaller — it is that
 * it comes out *biased*: the people running blockers are disproportionately
 * the technical, high-intent ones, so the segment most likely to book a demo
 * is the segment most likely to be missing from the report. `/api/track` is a
 * route on this same domain, so it is indistinguishable from the site itself
 * and nothing filters it.
 *
 * The second reason is the one that actually pays. These events land in the
 * SAME Postgres as `leads`, `calls` and `appointments`, so HQ can join a blog
 * post read in September to a pilot signed in November. No vendor API can do
 * that, because the back half of the funnel is ours and never leaves.
 *
 * PostHog and GA4 still have a place (session replay, ad-hoc funnels, Search
 * Console) and are wired as SECONDARY sinks in `third-party.ts` — they are not
 * on the critical path, and the site is fully measured without them.
 */

import { buildSnapshot, isNewTouch, type AttributionSnapshot } from "./attribution";
import type { EventName, EventProps } from "./events";
import { isMeasurableHost, OPTOUT_COOKIE, optOutIntent } from "./internal";

const VISITOR_COOKIE = "cga_vid";
const CONSENT_COOKIE = "cga_consent";
const FIRST_TOUCH_KEY = "cga_first_touch";
const LAST_TOUCH_KEY = "cga_last_touch";
const SESSION_KEY = "cga_session";

/** 400 days is the ceiling browsers will honour for a JS-set cookie. */
const VISITOR_TTL_DAYS = 400;
const CONSENT_TTL_DAYS = 180;
/** A visit is "the same session" until this much idle time passes. */
const SESSION_IDLE_MS = 30 * 60 * 1000;

const FLUSH_INTERVAL_MS = 5000;
const FLUSH_AT_COUNT = 12;
/** Hard cap so a runaway loop in a component cannot hammer the endpoint. */
const MAX_QUEUE = 120;

export type ConsentState = "granted" | "essential" | "pending";

interface QueuedEvent {
  name: EventName;
  props: EventProps;
  path: string;
  ts: string;
}

// --- cookie helpers ---------------------------------------------------------

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  // `SameSite=Lax` keeps the cookie on the normal inbound click from a search
  // result or an assistant, which is exactly the traffic we need to attribute.
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${
    location.protocol === "https:" ? "; Secure" : ""
  }`;
}

function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

function safeLocal(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function safeSession(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function uuid(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

// --- consent ----------------------------------------------------------------

export function getConsent(): ConsentState {
  const raw = readCookie(CONSENT_COOKIE);
  if (raw === "granted" || raw === "essential") return raw;
  return "pending";
}

/**
 * Record the visitor's choice.
 *
 * `essential` is a real refusal, not a softer yes: every identifier we hold is
 * deleted on the spot and the queue is dropped unsent. Anything less would make
 * the banner a lie, and we sell compliance for a living.
 */
export function setConsent(state: "granted" | "essential"): void {
  writeCookie(CONSENT_COOKIE, state, CONSENT_TTL_DAYS);
  if (state === "essential") {
    queue.length = 0;
    deleteCookie(VISITOR_COOKIE);
    safeLocal()?.removeItem(FIRST_TOUCH_KEY);
    safeLocal()?.removeItem(LAST_TOUCH_KEY);
    safeSession()?.removeItem(SESSION_KEY);
    return;
  }
  // Consent just arrived: mint the identity the queued events were waiting for
  // and send everything that happened while the banner was up. Those early
  // events are the most valuable ones in the session — they are the landing.
  getVisitorId();
  ensureTouches();
  flush();
}

// --- identity ---------------------------------------------------------------

/** Null until consent — an id we cannot persist is an id we must not mint. */
export function getVisitorId(): string | null {
  if (getConsent() !== "granted") return null;
  let id = readCookie(VISITOR_COOKIE) ?? safeLocal()?.getItem(VISITOR_COOKIE) ?? null;
  if (!id) id = uuid();
  // Re-written on every read so the 400-day clock restarts on each visit, and
  // mirrored to localStorage because Safari caps script-set cookies at 7 days.
  writeCookie(VISITOR_COOKIE, id, VISITOR_TTL_DAYS);
  try {
    safeLocal()?.setItem(VISITOR_COOKIE, id);
  } catch {
    /* private mode */
  }
  return id;
}

function getSessionId(): string | null {
  if (getConsent() !== "granted") return null;
  const store = safeSession();
  const now = Date.now();
  try {
    const raw = store?.getItem(SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { id: string; last: number };
      if (now - parsed.last < SESSION_IDLE_MS) {
        store?.setItem(SESSION_KEY, JSON.stringify({ id: parsed.id, last: now }));
        return parsed.id;
      }
    }
    const id = uuid();
    store?.setItem(SESSION_KEY, JSON.stringify({ id, last: now }));
    return id;
  } catch {
    return null;
  }
}

// --- attribution ------------------------------------------------------------

function readTouch(key: string): AttributionSnapshot | null {
  try {
    const raw = safeLocal()?.getItem(key);
    return raw ? (JSON.parse(raw) as AttributionSnapshot) : null;
  } catch {
    return null;
  }
}

function writeTouch(key: string, snap: AttributionSnapshot): void {
  try {
    safeLocal()?.setItem(key, JSON.stringify(snap));
  } catch {
    /* private mode — attribution degrades to this session only */
  }
}

/**
 * Pin first touch if we have never seen this browser, and refresh last touch
 * only when this visit actually carries new campaign information.
 */
function ensureTouches(): { first: AttributionSnapshot | null; last: AttributionSnapshot | null } {
  if (getConsent() !== "granted") return { first: null, last: null };
  const snap = buildSnapshot({ url: location.href, referrer: document.referrer || null });

  let first = readTouch(FIRST_TOUCH_KEY);
  if (!first) {
    first = snap;
    writeTouch(FIRST_TOUCH_KEY, snap);
  }

  let last = readTouch(LAST_TOUCH_KEY);
  if (!last || isNewTouch(snap)) {
    last = snap;
    writeTouch(LAST_TOUCH_KEY, snap);
  }

  return { first, last };
}

/**
 * The payload a conversion surface must forward to the server so a lead can be
 * traced back to the page that produced it. Exported because the demo form and
 * the voice-call dispatch both attach it to THEIR requests — attribution has to
 * travel with the conversion, not merely sit in an events table beside it.
 */
export function getAttributionPayload(): Record<string, unknown> | null {
  if (getConsent() !== "granted") return null;
  const { first, last } = ensureTouches();
  const visitorId = getVisitorId();
  if (!visitorId) return null;
  return {
    visitor_id: visitorId,
    session_id: getSessionId(),
    first_touch: first,
    last_touch: last,
    landing_path: first?.landingPath ?? null,
    path: location.pathname,
  };
}

// --- the queue --------------------------------------------------------------

const queue: QueuedEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let started = false;

function endpoint(): string {
  return "/api/track";
}

function flush(useBeacon = false): void {
  if (queue.length === 0) return;
  if (getConsent() !== "granted") return; // still pending, or refused

  const batch = queue.splice(0, queue.length);
  const { first, last } = ensureTouches();
  const body = JSON.stringify({
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    first_touch: first,
    last_touch: last,
    screen: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : null,
    events: batch,
  });

  // `sendBeacon` is the only thing that reliably survives the page going away,
  // which is exactly when the most interesting event (they left) fires.
  if (useBeacon && typeof navigator.sendBeacon === "function") {
    const ok = navigator.sendBeacon(endpoint(), new Blob([body], { type: "application/json" }));
    if (ok) return;
    // Beacon refused (payload too large / disabled) — fall through to fetch.
  }

  void fetch(endpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // A dropped analytics batch must never surface to a visitor, and must
    // never be retried into a loop. It is gone; that is the correct outcome.
  });
}

function scheduleFlush(): void {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flush();
  }, FLUSH_INTERVAL_MS);
}

/**
 * Record one event.
 *
 * Safe to call from anywhere, at any time, including before consent and during
 * SSR — it silently does the right thing rather than making every call site
 * guard itself. Events raised while the banner is up are QUEUED, not dropped,
 * because the landing and the first CTA impression happen in those seconds and
 * losing them would bias every funnel we build on top.
 */
export function track(name: EventName, props: EventProps = {}): void {
  if (typeof window === "undefined") return;
  // Belt to the ingest route's braces (CON-294). The server is the layer that
  // cannot be bypassed, but stopping here means a dev loop never even makes the
  // request — and the queue cannot quietly fill with events that would be
  // thrown away on arrival anyway.
  if (!isMeasurableHost(location.hostname)) return;
  const consent = getConsent();
  if (consent === "essential") return;

  if (queue.length >= MAX_QUEUE) return;
  queue.push({ name, props, path: location.pathname, ts: new Date().toISOString() });

  if (consent !== "granted") return; // held until they choose
  if (queue.length >= FLUSH_AT_COUNT) flush();
  else scheduleFlush();
}

/**
 * Events whose meaning is "once per page view" — a scroll milestone, a section
 * reached, a CTA seen.
 *
 * The dedupe lives HERE, at module scope, rather than in the effect that
 * raises them. An effect-local `Set` dedupes only within its own instance, and
 * React mounts effects twice under StrictMode, remounts them on a fast refresh,
 * and can mount the same component in two places — so the guard that looks
 * correct in the component silently emits doubles. Observed while verifying
 * this: one scroll past 25% produced two `scroll_depth` events.
 *
 * Distinct-visitor funnels are immune to that, but event counts and the bill
 * are not, and a metric that is right only because the chart happens to
 * de-duplicate it is a metric waiting to be read wrong.
 */
const firedOnce = new Set<string>();
let firedOnPath: string | null = null;

export function trackOnce(key: string, name: EventName, props: EventProps = {}): void {
  if (typeof window === "undefined") return;
  const path = location.pathname;
  if (firedOnPath !== path) {
    firedOnce.clear();
    firedOnPath = path;
  }
  if (firedOnce.has(key)) return;
  firedOnce.add(key);
  track(name, props);
}

/**
 * A single cookieless, identifier-less page count, sent once per page BEFORE
 * any consent decision.
 *
 * This is deliberate and it is the honest version of the trade-off: a banner
 * that gates everything means the traffic number itself — the one figure that
 * must be right when we start buying attention — depends on how many people
 * click a button. This ping carries no id, writes no storage and cannot be
 * tied to a person, so it is not personal data under Ley 1581; it exists only
 * so the denominator is true.
 */
function anonymousPing(): void {
  if (!isMeasurableHost(location.hostname)) return;
  const snap = buildSnapshot({ url: location.href, referrer: document.referrer || null });
  const body = JSON.stringify({
    anonymous: true,
    events: [{ name: "page_view", props: { anonymous: true }, path: location.pathname, ts: new Date().toISOString() }],
    last_touch: snap,
  });
  void fetch(endpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

/**
 * Honour `?nocount=1` (CON-294) — our own browsers, marked once and for good.
 *
 * The cookie is what the SERVER reads; this only writes it. `?nocount=0` turns
 * it back off, which matters more than it looks: without an off switch, the one
 * browser that most needs to see the site exactly as a customer does would be
 * excluded from its own funnel with no way back short of clearing site data.
 */
function syncOptOut(): void {
  const intent = optOutIntent(location.search);
  if (intent === "on") writeCookie(OPTOUT_COOKIE, "1", VISITOR_TTL_DAYS);
  else if (intent === "off") deleteCookie(OPTOUT_COOKIE);
}

/** Wire the lifecycle listeners. Idempotent; called once by the provider. */
export function startAnalytics(): void {
  if (started || typeof window === "undefined") return;
  started = true;

  syncOptOut();

  if (getConsent() === "granted") {
    ensureTouches();
    getVisitorId();
  }

  // `pagehide` fires on bfcache navigation and on mobile tab-switching where
  // `beforeunload` does not, so it is the one that actually catches the exit.
  window.addEventListener("pagehide", () => flush(true));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush(true);
  });
}

export const __analyticsInternals = { anonymousPing, flush };
