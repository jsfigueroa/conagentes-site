/**
 * Serialize a JSON-LD node for `<script type="application/ld+json">`.
 *
 * JSON.stringify does not escape `<`, so any string in the node that contains
 * `</script>` closes the element early and the rest is parsed as HTML. On the
 * blog those strings are post titles, FAQ questions and excerpts — i.e.
 * whatever reaches /api/publish (CON-323). `<` is the same character to
 * every JSON parser, so the structured data is unchanged for crawlers.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
