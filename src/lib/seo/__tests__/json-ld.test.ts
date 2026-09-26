import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { generateArticleJsonLd, generateFaqJsonLd } from "@/lib/blog/structured-data";
import type { BlogPost } from "@/lib/blog/types";

/**
 * JSON.stringify does not escape `<`. Inside <script type="application/ld+json">
 * a post title such as `</script><script>…` closes the element early and the
 * rest is parsed as HTML — a script on our domain, from nothing more than a
 * title sent to /api/publish (CON-323 / ES-1). The home page always escaped;
 * the blog pages did not.
 */

const { serializeJsonLd } = await import("../json-ld");

const BREAKOUT = '</script><script>alert("xss")</script>';

const post = {
  slug: "una-guia",
  title: BREAKOUT,
  excerpt: "Resumen <b>",
  category: "reservas-directas",
  tags: [],
  faq: [{ question: BREAKOUT, answer: "<!-- respuesta -->" }],
  author_name: "Equipo conagentes",
  author_bio: null,
  author_avatar_url: null,
  structured_data: null,
  meta_description: null,
  cover_image_url: null,
  published_at: "2026-09-26T00:00:00Z",
  updated_at: "2026-09-26T00:00:00Z",
  word_count: null,
} as unknown as BlogPost;

describe("serializeJsonLd", () => {
  it("never emits a raw `<`, so no string can close the script element", () => {
    for (const node of [generateArticleJsonLd(post), generateFaqJsonLd(post)]) {
      const out = serializeJsonLd(node);
      expect(out).not.toContain("<");
      expect(out.toLowerCase()).not.toContain("</script");
    }
  });

  it("is still the same data to a JSON-LD parser", () => {
    const node = generateArticleJsonLd(post);
    expect(JSON.parse(serializeJsonLd(node))).toEqual(JSON.parse(JSON.stringify(node)));
    expect(JSON.parse(serializeJsonLd(node)).headline).toBe(BREAKOUT);
  });
});

describe("every inline JSON-LD script in the site", () => {
  const SRC = resolve(process.cwd(), "src");

  function tsxFiles(dir: string): string[] {
    return readdirSync(dir).flatMap((name) => {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) return name === "__tests__" ? [] : tsxFiles(full);
      return full.endsWith(".tsx") ? [full] : [];
    });
  }

  it("escapes `<` (serializeJsonLd, or an explicit \\u003c replace)", () => {
    const raw: string[] = [];
    for (const file of tsxFiles(SRC)) {
      const text = readFileSync(file, "utf8");
      for (const m of text.matchAll(/__html:\s*JSON\.stringify\(/g)) {
        const rest = text.slice(m.index! + m[0].length);
        const close = rest.indexOf(")");
        const escaped = rest.slice(close + 1).startsWith('.replace(/</g, "\\\\u003c")');
        if (!escaped) raw.push(relative(SRC, file));
      }
    }
    expect(raw).toEqual([]);
  });
});
