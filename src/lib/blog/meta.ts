import type { BlogPost } from "./types";

/**
 * The <title> for a post, without the brand.
 *
 * The root layout applies the `%s | conagentes` template, so a `meta_title`
 * that already ends in "| conagentes" (every post generated before 2026-08 did)
 * renders the brand twice. Strip it here instead of rewriting rows.
 */
export function postMetaTitle(post: BlogPost): string {
  const raw = post.meta_title || post.title;
  return raw.replace(/\s*[|·—-]\s*conagentes\s*$/i, "").trim() || post.title;
}
