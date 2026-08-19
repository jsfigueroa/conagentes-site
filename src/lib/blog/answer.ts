import type { BlogPost } from "./types";

/**
 * The «En corto» answer — a self-contained 40–70 word reply to the question the
 * article is about, quotable on its own with no surrounding context.
 *
 * It lives inside the existing `structured_data` jsonb column (as
 * `{ "answer": "…" }`) rather than in a column of its own, so the answer block
 * shipped without a schema migration. It is rendered as real DOM text at the
 * top of the article AND emitted as schema.org `abstract` + `speakable`, which
 * is what answer engines lift when they cite a source. Same contract the hotel
 * marketing pages follow (`content/pages.types.ts`).
 */
export function getPostAnswer(post: BlogPost): string | null {
  const sd = post.structured_data;
  if (!sd || typeof sd !== "object") return null;
  const answer = (sd as Record<string, unknown>).answer;
  return typeof answer === "string" && answer.trim().length > 0
    ? answer.trim()
    : null;
}
