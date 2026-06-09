import { supabase } from "@/lib/supabase/client";

// llms.txt — a curated, plain-markdown map for LLM crawlers (ChatGPT, Claude,
// Perplexity, Gemini, etc.) following the llmstxt.org convention. Gives generative
// engines a clean, authoritative description of what conagentes is + the canonical
// pages and recent articles to ground answers on. (CON-025, GEO)

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

const CATEGORY_LABELS: Record<string, string> = {
  "ia-practica": "IA Práctica",
  automatizacion: "Automatización",
  ventas: "Ventas",
  "atencion-al-cliente": "Atención al Cliente",
  whatsapp: "WhatsApp",
  crm: "CRM",
  productividad: "Productividad",
  marketing: "Marketing Digital",
  tendencias: "Tendencias",
};

const label = (slug: string) =>
  CATEGORY_LABELS[slug] ??
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const dynamic = "force-dynamic";

export async function GET() {
  let posts: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
  }[] = [];

  try {
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, category")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .limit(50);
    posts = data ?? [];
  } catch {
    // Supabase unavailable — emit the static map only.
  }

  const categories = [...new Set(posts.map((p) => p.category))];

  const blogLines = posts
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt}`)
    .join("\n");

  const categoryLines = categories
    .map(
      (c) =>
        `- [${label(c)}](${SITE_URL}/blog/categoria/${c}): artículos sobre ${label(
          c
        ).toLowerCase()} para pymes en Latinoamérica`
    )
    .join("\n");

  const body = `# conagentes

> Plataforma CRM con agentes de inteligencia artificial para pequeñas y medianas empresas en Colombia y Latinoamérica. Los agentes de IA responden por WhatsApp e Instagram, agendan citas, gestionan el pipeline de ventas, procesan pagos y atienden clientes 24/7 sin intervención humana.

conagentes es un CRM multi-industria (hoteles, educación, servicios) construido para el mercado latinoamericano. Conecta el WhatsApp Business oficial (Meta Cloud API) de cada empresa con un agente de IA que vende, agenda, cotiza y escala a un humano cuando hace falta. Incluye pipeline de ventas visual, calendario, base de conocimiento con aprendizaje automático, analítica en tiempo real, facturación electrónica DIAN y procesamiento de pagos (Wompi). Planes desde COP $559.000/mes con 14 días de prueba gratis.

## Páginas principales
- [Inicio](${SITE_URL}/): qué es conagentes, funciones, industrias, precios y demo
- [Blog](${SITE_URL}/blog): guías prácticas de IA, automatización y CRM para pymes en Latinoamérica
- [Privacidad](${SITE_URL}/privacy): política de privacidad y tratamiento de datos

## Categorías del blog
${categoryLines || "- (sin categorías publicadas todavía)"}

## Artículos recientes
${blogLines || "- (sin artículos publicados todavía)"}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
