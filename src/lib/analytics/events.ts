/**
 * The event taxonomy (CON-292).
 *
 * This file is the CONTRACT. `/api/track` rejects any name that is not in
 * `EVENT_NAMES`, and the HQ dashboard reads these exact strings out of
 * `site_events`. A typo in a component therefore fails loudly at ingest instead
 * of quietly creating a second event that nobody ever charts — which is how
 * analytics installations rot.
 *
 * Rules for adding one:
 *   1. Name it `noun_verb`, past tense where something completed.
 *   2. It must answer a question somebody has actually asked. An event nobody
 *      will chart is cost without information.
 *   3. Put variable detail in `props`, never in the name. `voice_milestone`
 *      with `{seconds: 120}` beats `voice_120s` — otherwise every new threshold
 *      needs a server change.
 */

export const EVENT_NAMES = [
  // ---- Session & page ----------------------------------------------------
  "page_view",
  /** Fired once per tab, before any id exists when consent is still pending. */
  "session_start",
  /** props: { depth: 25 | 50 | 75 | 100 } */
  "scroll_depth",
  /** props: { section: string } — the five-act story on `/` is the core asset. */
  "section_view",
  /** props: { seconds } — engaged time, paused when the tab is hidden. */
  "engaged_time",
  /**
   * Core Web Vitals from the field. props: { metric, value, rating }
   *
   * Captured first-party instead of buying Vercel Speed Insights, for one
   * reason a separate tool cannot offer: these land in the same table as the
   * conversions, so "do slow sessions book fewer demos" becomes a query
   * instead of a hunch. It is also a ranking input, which matters when the
   * whole acquisition strategy is organic and GEO.
   */
  "web_vital",

  // ---- Calls to action ---------------------------------------------------
  /**
   * The CTA entered the viewport. Without impressions you cannot tell a copy
   * problem (seen a lot, clicked rarely) from a layout problem (never seen).
   * props: { cta, source, variant }
   */
  "cta_view",
  /** props: { cta, source, variant } */
  "cta_click",

  // ---- Door A: the voice rep (Valentina) ---------------------------------
  "voice_open",
  "voice_start_click",
  "voice_mic_granted",
  /** The step everybody forgets. It can eat half the funnel invisibly. */
  "voice_mic_denied",
  "voice_connected",
  /** props: { seconds: 30 | 60 | 120 | 300 } */
  "voice_milestone",
  /** props: { seconds, reason: "user" | "agent" | "error" } */
  "voice_ended",
  /** props: { stage, message } */
  "voice_error",
  /** The visitor's mic never made a sound — a silent, total call failure. */
  "voice_mic_dead",

  // ---- Door B: the demo form ---------------------------------------------
  "form_open",
  /** props: { field } — where they start tells you what the form is asking wrong. */
  "form_field_start",
  "form_submit",
  "form_success",
  /** props: { message } */
  "form_error",

  // ---- The leak calculator (CON-271) -------------------------------------
  "calc_start",
  /** props: { rooms, adr, missed, monthlyLoss } — high-intent, already built. */
  "calc_complete",

  // ---- Everything else ---------------------------------------------------
  /** props: { href, kind: "whatsapp" | "email" | "tel" | "external" } */
  "outbound_click",
  /** props: { href, label } */
  "nav_click",
  /** props: { question } — the questions people open ARE the content briefs. */
  "faq_open",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

const EVENT_NAME_SET: ReadonlySet<string> = new Set(EVENT_NAMES);

export function isEventName(value: unknown): value is EventName {
  return typeof value === "string" && EVENT_NAME_SET.has(value);
}

/** Seconds at which a live call is worth marking. */
export const VOICE_MILESTONES = [30, 60, 120, 300] as const;

/** Scroll thresholds, in percent of document height. */
export const SCROLL_DEPTHS = [25, 50, 75, 100] as const;

export type EventProps = Record<string, string | number | boolean | null>;
