import sanitizeHtml from "sanitize-html";

/**
 * The article body is HTML that arrives through /api/publish and is rendered
 * with dangerouslySetInnerHTML on www.conagentes.com. Nothing between the
 * publish key and a reader's browser used to look at it, and that key sat in
 * this public repo for four months (CON-323): a script, or a fake «inicie
 * sesión» form aimed at hotel owners, would have rendered on our own domain.
 *
 * So the body is sanitized at render against an ALLOWLIST — anything not
 * listed is dropped, which is the only direction that stays safe as browsers
 * add features. The list is what the blog really publishes (every tag in the
 * live posts and in `_pending_posts` history: h2 h3 p strong em ul ol li
 * blockquote cite footer a table thead tbody tr th td) plus their close
 * formatting relatives, so a generator that reaches for <code> or <caption>
 * does not silently lose it. Deliberately absent: scripts, styles, event
 * handlers, class/id/style attributes, images and embeds, forms.
 *
 * Disallowed wrappers are unwrapped, not deleted, so their text still reads;
 * script/style contents are dropped entirely. Link targets must be relative,
 * an in-page #anchor, http(s), mailto or tel — never javascript:, data: or a
 * protocol-relative //host.
 */
const POST_HTML_POLICY: sanitizeHtml.IOptions = {
  allowedTags: [
    "h2", "h3", "h4",
    "p", "br", "hr",
    "strong", "b", "em", "i", "u", "s", "mark", "small", "sub", "sup", "abbr",
    "code", "pre", "kbd",
    "ul", "ol", "li", "dl", "dt", "dd",
    "blockquote", "q", "cite", "footer", "figure", "figcaption",
    "a",
    "table", "caption", "thead", "tbody", "tfoot", "tr", "th", "td",
  ],
  allowedAttributes: {
    a: ["href", "title"],
    abbr: ["title"],
    ol: ["start"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesAppliedToAttributes: ["href"],
  allowProtocolRelative: false,
  // The page title is the article's only <h1> (docs/blog-hotel-playbook.md
  // §5); a stray one in the body becomes a section heading, not a second title.
  transformTags: { h1: "h2" },
};

export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, POST_HTML_POLICY);
}
