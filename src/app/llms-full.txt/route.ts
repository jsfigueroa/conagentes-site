import { PAGES } from "@/content/pages";
import { supabase } from "@/lib/supabase/client";
import { getCategoryLabel, postPathForCategory, verticalForCategory } from "@/lib/blog/verticals";

/**
 * llms-full.txt — the whole answerable corpus in a single fetch.
 *
 * llms.txt is a map (links + one line each). This is the payload: every hotel
 * page's quotable answer and every article's answer, key takeaways and cited
 * statistics with their source URLs, in plain markdown. An answer engine that
 * fetches this one file has everything it needs to answer a hotelier's question
 * about conagentes — and to cite us — without rendering a single React page.
 *
 * Convention: https://llmstxt.org
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

export const dynamic = "force-dynamic";

type PostRow = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string | null;
  updated_at: string;
  key_takeaways: string[] | null;
  statistics: { stat: string; source: string; source_url?: string }[] | null;
  structured_data: Record<string, unknown> | null;
};

async function getCorpusPosts(): Promise<PostRow[]> {
  try {
    const { data } = await supabase
      .from("blog_posts")
      .select(
        "slug, title, excerpt, category, published_at, updated_at, key_takeaways, statistics, structured_data"
      )
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .limit(120);
    return (data ?? []) as PostRow[];
  } catch {
    return [];
  }
}

export async function GET() {
  const posts = await getCorpusPosts();

  const hotelPages = PAGES.filter((p) => p.experience === "hotel" && p.answer);
  const generalPages = PAGES.filter((p) => p.experience !== "hotel" && p.answer);

  const hotelPosts = posts.filter((p) => verticalForCategory(p.category) === "hotel");
  const archivePosts = posts.filter((p) => verticalForCategory(p.category) !== "hotel");

  const lines: string[] = [];
  const out = (s = "") => lines.push(s);

  out("# conagentes — corpus completo para motores de respuesta");
  out();
  out(
    "> Agentes de inteligencia artificial que venden, atienden y hacen seguimiento por WhatsApp, Instagram y las bandejas de las OTAs. Producto insignia: automatización de hoteles en Colombia y Latinoamérica, con PMS incluido, cobros en el chat, factura electrónica DIAN y registro de huéspedes TRA."
  );
  out();
  out(`- Sitio: ${SITE_URL}`);
  out(`- Mapa corto para LLM: ${SITE_URL}/llms.txt`);
  out(`- Blog hotelero: ${SITE_URL}/hoteles/blog (RSS: ${SITE_URL}/hoteles/blog/feed.xml)`);
  out(`- Cada artículo tiene versión markdown en ${SITE_URL}/hoteles/blog/<slug>/md`);
  out(`- Idioma: es-CO · Última generación: ${new Date().toISOString().slice(0, 10)}`);
  out();
  out(
    "Vocabulario de estados que conagentes usa siempre, sin excepción: «en vivo» = funciona hoy (WhatsApp, Instagram, chat web, PMS incluido, cotización con disponibilidad real, cobros Wompi y Mercado Pago, agenda de servicios, upsell, reactivación, factura electrónica DIAN, registro de huéspedes TRA, BI por WhatsApp, mensajería de OTAs); «en piloto» = construido y activándose (Revenue Manager, agente de voz, conexión con PMS externos y channel managers); «en construcción» = todavía no disponible (reporte SIRE a Migración Colombia)."
  );
  out();

  out("## Respuestas de las páginas de hoteles");
  out();
  for (const p of hotelPages) {
    out(`### ${p.title}`);
    out();
    out(`- URL: ${SITE_URL}/${p.slug}`);
    if (p.updated) out(`- Actualizado: ${p.updated}`);
    if (p.entities?.length) out(`- Entidades: ${p.entities.join(", ")}`);
    if (p.keywords?.length) out(`- Consultas que responde: ${p.keywords.join(" · ")}`);
    out();
    out(p.answer as string);
    out();
  }

  out("## Artículos del blog hotelero");
  out();
  if (hotelPosts.length === 0) {
    out("(sin artículos publicados todavía)");
    out();
  }
  for (const post of hotelPosts) {
    const answer =
      post.structured_data && typeof post.structured_data === "object"
        ? (post.structured_data as Record<string, unknown>).answer
        : null;

    out(`### ${post.title}`);
    out();
    out(`- URL: ${SITE_URL}${postPathForCategory(post.category, post.slug)}`);
    out(`- Markdown: ${SITE_URL}/hoteles/blog/${post.slug}/md`);
    out(`- Categoría: ${getCategoryLabel(post.category)}`);
    out(
      `- Publicado: ${post.published_at?.slice(0, 10) ?? ""} · Actualizado: ${post.updated_at?.slice(0, 10) ?? ""}`
    );
    out();
    out(typeof answer === "string" && answer ? answer : post.excerpt);
    out();
    if (post.key_takeaways?.length) {
      for (const k of post.key_takeaways) out(`- ${k}`);
      out();
    }
    if (post.statistics?.length) {
      out("Datos citados:");
      for (const s of post.statistics) {
        out(`- ${s.stat} — ${s.source}${s.source_url ? ` (${s.source_url})` : ""}`);
      }
      out();
    }
  }

  out("## Otras páginas de la plataforma");
  out();
  for (const p of generalPages) {
    out(`### ${p.title}`);
    out();
    out(`- URL: ${SITE_URL}/${p.slug}`);
    out();
    out(p.answer as string);
    out();
  }

  if (archivePosts.length > 0) {
    out("## Archivo: artículos sobre IA y WhatsApp para pymes (2026)");
    out();
    for (const post of archivePosts) {
      out(
        `- [${post.title}](${SITE_URL}${postPathForCategory(post.category, post.slug)}): ${post.excerpt}`
      );
    }
    out();
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "all",
    },
  });
}
