import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategories } from "@/lib/blog/queries";
import { PostCard } from "@/components/blog/post-card";
import { CategoryBadge } from "@/components/blog/category-badge";
import { generateBreadcrumbList } from "@/lib/blog/structured-data";
import {
  HOTEL_CATEGORIES,
  HOTEL_CATEGORY_DESCRIPTIONS,
  categoryPath,
  getCategoryLabel,
  postPathForCategory,
} from "@/lib/blog/verticals";

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

const LEDE =
  "Venta directa, revenue management, tecnología hotelera e inteligencia artificial aplicada, para hoteles independientes de Colombia y Latinoamérica. Cada artículo cita su fuente y dice qué funciona hoy y qué no.";

// The «En corto» answer for the hub itself — a self-contained paragraph an
// answer engine can quote when someone asks what this blog is. Rendered as real
// DOM text below and emitted as the Blog's `abstract` + `speakable`.
const ANSWER =
  "El blog hotelero de conagentes publica guías prácticas sobre cómo un hotel independiente de Colombia y Latinoamérica vende más noches directas, sube el valor de cada estadía, elige tecnología (PMS, channel manager, agentes de IA) y cumple con la normativa colombiana: factura electrónica DIAN y registro de huéspedes TRA. Se publica lunes, miércoles y viernes, en español, con fuente citada en cada dato.";

export const metadata: Metadata = {
  title: "Blog hotelero — IA, venta directa y tecnología para hoteles",
  description:
    "Guías prácticas para hoteles independientes de Colombia y Latinoamérica: reservas directas, revenue management, upsell, PMS, agentes de IA y cumplimiento DIAN y TRA. Con fuentes citadas.",
  keywords: [
    "blog hotelero Colombia",
    "tecnología hotelera Latinoamérica",
    "IA para hoteles",
    "reservas directas hotel",
    "revenue management hotel independiente",
    "cumplimiento hotelero DIAN TRA",
  ],
  alternates: {
    canonical: "/hoteles/blog",
    types: {
      "application/rss+xml": `${SITE_URL}/hoteles/blog/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: `${SITE_URL}/hoteles/blog`,
    siteName: "conagentes",
    title: "Blog hotelero de conagentes",
    description: LEDE,
    images: [
      {
        url: `${SITE_URL}/og?slug=hoteles`,
        width: 1200,
        height: 630,
        alt: "Blog hotelero de conagentes",
      },
    ],
  },
};

export default async function HotelBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const limit = 12;

  const [{ posts, total }, categories] = await Promise.all([
    getAllPosts(page, limit, "hotel"),
    getCategories("hotel"),
  ]);

  const totalPages = Math.ceil(total / limit);

  const breadcrumbLd = generateBreadcrumbList([
    { name: "Inicio", url: SITE_URL },
    { name: "Hoteles", url: `${SITE_URL}/hoteles` },
    { name: "Blog hotelero" },
  ]);

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/hoteles/blog`,
    name: "Blog hotelero de conagentes",
    description: LEDE,
    abstract: ANSWER,
    inLanguage: "es-CO",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".post-answer"],
    },
    publisher: {
      "@type": "Organization",
      name: "conagentes",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    about: HOTEL_CATEGORIES.map((c) => ({
      "@type": "Thing",
      name: getCategoryLabel(c),
      description: HOTEL_CATEGORY_DESCRIPTIONS[c],
    })),
  };

  // Mirror the visible list of articles as an ItemList: a rendering crawler
  // reads the cards, but a plain fetch of the JSON-LD gets the same set.
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}${postPathForCategory(p.category, p.slug)}`,
      name: p.title,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />
      {posts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
        />
      )}

      <header className="mb-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Blog hotelero
        </p>
        <h1 className="mb-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
          Tecnología, IA y venta directa para hoteles
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {LEDE}
        </p>

        <section className="post-answer mt-8 max-w-3xl rounded-[var(--r-lg)] border border-border bg-card p-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            En corto
          </h2>
          <p className="text-base leading-relaxed text-foreground">{ANSWER}</p>
        </section>

        {categories.length > 0 && (
          <nav
            aria-label="Categorías del blog hotelero"
            className="mt-8 flex flex-wrap gap-2"
          >
            <Link
              href="/hoteles/blog"
              className="inline-block rounded-full bg-foreground px-2.5 py-0.5 text-xs font-medium text-background"
            >
              Todos
            </Link>
            {categories.map((cat) => (
              <CategoryBadge
                key={cat.category}
                category={cat.category}
                size="sm"
              />
            ))}
          </nav>
        )}
      </header>

      {posts.length === 0 ? (
        <div className="max-w-2xl rounded-[var(--r-lg)] border border-border bg-card p-8">
          <p className="text-lg font-semibold text-foreground">
            Las primeras guías salen esta semana.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Publicamos lunes, miércoles y viernes. Mientras tanto, la guía
            completa ya está lista:
          </p>
          <Link
            href="/hoteles/automatizar-hotel-con-ia"
            className="mt-5 inline-block rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Cómo automatizar un hotel con IA →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Paginación"
          className="mt-12 flex justify-center gap-2"
        >
          {page > 1 && (
            <Link
              href={
                page - 1 === 1 ? "/hoteles/blog" : `/hoteles/blog?page=${page - 1}`
              }
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              ← Anterior
            </Link>
          )}
          <span className="px-4 py-2 text-sm text-muted-foreground">
            Página {page} de {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/hoteles/blog?page=${page + 1}`}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Siguiente →
            </Link>
          )}
        </nav>
      )}

      {/* The taxonomy as real text — gives crawlers (and readers) the full map
          of what this blog covers without creating empty category pages. */}
      <section className="mt-16 border-t border-border pt-10">
        <h2 className="mb-6 text-xl font-bold text-foreground">
          Qué cubre este blog
        </h2>
        <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {HOTEL_CATEGORIES.map((cat) => {
            const count =
              categories.find((c) => c.category === cat)?.count ?? 0;
            const label = getCategoryLabel(cat);
            return (
              <div key={cat}>
                <dt className="font-semibold text-foreground">
                  {count > 0 ? (
                    <Link
                      href={categoryPath("hotel", cat)}
                      className="hover:text-neon-deep transition-colors"
                    >
                      {label}
                    </Link>
                  ) : (
                    label
                  )}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {HOTEL_CATEGORY_DESCRIPTIONS[cat]}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>

      <section className="mt-16 rounded-[var(--r-lg)] border border-border bg-card p-8">
        <h2 className="text-xl font-bold text-foreground">
          ¿Quiere ver esto funcionando en su hotel?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          El agente atiende por WhatsApp, cotiza con la disponibilidad real de su
          PMS, cobra en el chat y emite la factura electrónica. Escríbanos y se
          lo mostramos con los datos de su propio hotel.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/hoteles"
            className="rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_oklch(0.74_0.185_50/0.3)] transition-all hover:brightness-110"
          >
            Ver conagentes para hoteles
          </Link>
          <Link
            href="/hoteles/precios"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Precios para hoteles
          </Link>
        </div>
      </section>
    </div>
  );
}
