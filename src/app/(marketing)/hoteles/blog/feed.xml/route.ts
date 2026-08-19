import { getAllPostsForIndexing } from "@/lib/blog/queries";
import { postPathForCategory, verticalForCategory } from "@/lib/blog/verticals";

// Hotel-only RSS. The site-wide /feed.xml still carries everything; this one
// exists so hoteliers, aggregators and newsletter tools can follow just the
// hospitality hub.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const dynamic = "force-dynamic";

export async function GET() {
  let posts: Awaited<ReturnType<typeof getAllPostsForIndexing>> = [];
  try {
    posts = (await getAllPostsForIndexing())
      .filter((p) => verticalForCategory(p.category) === "hotel")
      .slice(0, 20);
  } catch {
    // Supabase unavailable — serve an empty but valid feed.
  }

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${postPathForCategory(post.category, post.slug)}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.published_at ?? post.updated_at).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <author>${escapeXml(post.author_name)}</author>
      <guid isPermaLink="true">${url}</guid>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>conagentes — Blog hotelero</title>
    <link>${SITE_URL}/hoteles/blog</link>
    <description>Venta directa, revenue management, tecnología hotelera e IA aplicada para hoteles de Colombia y Latinoamérica.</description>
    <language>es-CO</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/hoteles/blog/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=60",
    },
  });
}
