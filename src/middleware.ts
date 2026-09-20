import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server";

/**
 * AI-crawler visibility (CON-292).
 *
 * The rest of the measurement stack counts PEOPLE who arrive from an assistant.
 * That is the lagging half of the GEO story. This counts the assistants
 * themselves fetching the pages — which happens weeks earlier and is the only
 * evidence that the llms.txt, the JSON-LD and the pillar pages are being read at
 * all. Without it, the honest answer to "is the GEO work landing?" before the
 * first referral arrives is "no idea".
 *
 * Crawlers do not run JavaScript, so nothing client-side can ever see them.
 * This has to be server-side, and middleware is the only place every request
 * passes through.
 *
 * NO CONSENT IS INVOLVED and none is needed: a crawler is not a person, no
 * identifier is minted, and — as everywhere else in this stack — no IP address
 * is stored. What is recorded is which bot asked for which path.
 *
 * COST. Every non-bot request pays exactly one regex test against the
 * User-Agent and nothing else; the work happens only on a match, and even then
 * it rides on `event.waitUntil` so the response is never held up by it.
 */

/**
 * The crawlers worth distinguishing. Retrieval bots (the ones that fetch a page
 * because a user just asked something) are far more interesting than training
 * bots, so they are named separately rather than lumped into one "AI" bucket.
 */
const AI_CRAWLERS: Array<{ pattern: RegExp; bot: string; kind: "retrieval" | "training" | "search" }> = [
  { pattern: /ChatGPT-User/i, bot: "ChatGPT-User", kind: "retrieval" },
  { pattern: /OAI-SearchBot/i, bot: "OAI-SearchBot", kind: "search" },
  { pattern: /GPTBot/i, bot: "GPTBot", kind: "training" },
  { pattern: /Claude-User/i, bot: "Claude-User", kind: "retrieval" },
  { pattern: /Claude-SearchBot/i, bot: "Claude-SearchBot", kind: "search" },
  { pattern: /ClaudeBot|anthropic-ai/i, bot: "ClaudeBot", kind: "training" },
  { pattern: /PerplexityBot/i, bot: "PerplexityBot", kind: "search" },
  { pattern: /Perplexity-User/i, bot: "Perplexity-User", kind: "retrieval" },
  { pattern: /Google-Extended/i, bot: "Google-Extended", kind: "training" },
  { pattern: /Google-CloudVertexBot/i, bot: "Google-CloudVertexBot", kind: "training" },
  { pattern: /Applebot-Extended/i, bot: "Applebot-Extended", kind: "training" },
  { pattern: /Bytespider/i, bot: "Bytespider", kind: "training" },
  { pattern: /Amazonbot/i, bot: "Amazonbot", kind: "training" },
  { pattern: /meta-externalagent|FacebookBot/i, bot: "Meta", kind: "training" },
  { pattern: /CCBot/i, bot: "CCBot", kind: "training" },
  { pattern: /cohere-ai/i, bot: "cohere-ai", kind: "training" },
  { pattern: /MistralAI-User/i, bot: "MistralAI-User", kind: "retrieval" },
  { pattern: /DuckAssistBot/i, bot: "DuckAssistBot", kind: "search" },
  { pattern: /YouBot/i, bot: "YouBot", kind: "search" },
  // Classic search engines, kept because the same question ("is anyone
  // crawling the pillar pages") is worth answering for them too.
  { pattern: /Googlebot/i, bot: "Googlebot", kind: "search" },
  { pattern: /bingbot/i, bot: "bingbot", kind: "search" },
];

/** One cheap pre-filter so a human request does twenty fewer regex tests. */
const ANY_BOT = /bot|crawler|spider|GPT|Claude|Perplexity|anthropic|cohere|Bytespider|MistralAI/i;

function identify(ua: string): { bot: string; kind: string } | null {
  if (!ANY_BOT.test(ua)) return null;
  for (const c of AI_CRAWLERS) {
    if (c.pattern.test(ua)) return { bot: c.bot, kind: c.kind };
  }
  return null;
}

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const ua = request.headers.get("user-agent") ?? "";
  const hit = identify(ua);
  if (!hit) return NextResponse.next();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.next();

  // A plain PostgREST POST rather than the Supabase client: middleware runs on
  // the edge runtime and this is one fetch, so pulling the SDK in here would
  // cost every request in the bundle to save nothing.
  //
  // `waitUntil` lets the response go out immediately while this finishes. The
  // catch is not optional — an unhandled rejection here would turn a logging
  // failure into a failed page load for a crawler, which is the exact opposite
  // of what we want from a tool built to help them read us.
  event.waitUntil(
    fetch(`${url}/rest/v1/site_events`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        visitor_id: null,
        session_id: null,
        anonymous: true,
        name: "crawler_hit",
        path: request.nextUrl.pathname.slice(0, 300),
        props: { bot: hit.bot, kind: hit.kind },
        country: request.headers.get("x-vercel-ip-country"),
        device: "bot",
      }),
    }).catch(() => {}),
  );

  return NextResponse.next();
}

export const config = {
  /**
   * Content routes only. API routes, the Next asset pipeline and static files
   * are excluded — a crawler fetching a webpack chunk is noise, and `/api` has
   * no bearing on whether our pages are being read.
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml|webmanifest)$).*)"],
};
