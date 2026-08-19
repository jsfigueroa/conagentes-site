import { getPostBySlug } from "@/lib/blog/queries";
import { getPostAnswer } from "@/lib/blog/answer";
import { getCategoryLabel, verticalForCategory } from "@/lib/blog/verticals";

/**
 * The plain-markdown version of an article: /hoteles/blog/<slug>/md
 *
 * Answer engines and agent browsers pay per token and parse markdown far more
 * reliably than a React page full of navigation chrome. This endpoint hands them
 * the article with nothing else in it — the quotable answer first, then the
 * cited sources, then the body — and it is announced three ways: as
 * `<link rel="alternate" type="text/markdown">` on the article, in llms.txt and
 * in llms-full.txt.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    return new Response("Not found\n", { status: 404 });
  }

  if (!post || verticalForCategory(post.category) !== "hotel") {
    return new Response("Not found\n", { status: 404 });
  }

  const url = `${SITE_URL}/hoteles/blog/${post.slug}`;
  const answer = getPostAnswer(post);
  const published = post.published_at?.slice(0, 10) ?? "";
  const modified = post.updated_at?.slice(0, 10) ?? "";

  const parts: string[] = [
    `# ${post.title}`,
    "",
    `> ${post.subtitle || post.excerpt}`,
    "",
    `- Fuente canónica: ${url}`,
    `- Autor: ${post.author_name} (conagentes)`,
    `- Categoría: ${getCategoryLabel(post.category)}`,
    `- Publicado: ${published}${modified && modified !== published ? ` · Actualizado: ${modified}` : ""}`,
    `- Idioma: es-CO`,
  ];

  if (post.tags?.length) {
    parts.push(`- Entidades y temas: ${post.tags.join(", ")}`);
  }
  parts.push("");

  if (answer) {
    parts.push("## En corto (respuesta citable)", "", answer, "");
  }

  if (post.key_takeaways?.length) {
    parts.push(
      "## Puntos clave",
      "",
      ...post.key_takeaways.map((k) => `- ${k}`),
      ""
    );
  }

  if (post.statistics?.length) {
    parts.push("## Datos citados y sus fuentes", "");
    for (const s of post.statistics) {
      parts.push(
        `- ${s.stat} — Fuente: ${s.source}${s.source_url ? ` (${s.source_url})` : ""}`
      );
    }
    parts.push("");
  }

  parts.push("## Artículo", "", post.content_markdown, "");

  if (post.faq?.length) {
    parts.push("## Preguntas frecuentes", "");
    for (const f of post.faq) {
      parts.push(`### ${f.question}`, "", f.answer, "");
    }
  }

  parts.push(
    "---",
    "",
    `Publicado por conagentes (${SITE_URL}) — agentes de IA que venden y atienden por WhatsApp, Instagram y las bandejas de las OTAs para hoteles de Colombia y Latinoamérica, con PMS incluido, factura electrónica DIAN y registro de huéspedes TRA.`,
    `Blog hotelero completo: ${SITE_URL}/hoteles/blog · Mapa para LLM: ${SITE_URL}/llms.txt`,
    ""
  );

  return new Response(parts.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "all",
    },
  });
}
