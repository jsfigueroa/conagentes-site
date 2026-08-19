import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getPostsByCategory, getCategories } from "@/lib/blog/queries";
import { PostCard } from "@/components/blog/post-card";
import { CategoryBadge } from "@/components/blog/category-badge";
import { generateBreadcrumbList } from "@/lib/blog/structured-data";
import {
  HOTEL_CATEGORY_DESCRIPTIONS,
  categoryPath,
  getCategoryLabel,
  isKnownCategory,
  postPathForCategory,
  verticalForCategory,
} from "@/lib/blog/verticals";

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

export async function generateStaticParams() {
  try {
    const categories = await getCategories("hotel");
    return categories.map((c) => ({ category: c.category }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const page = Math.max(1, parseInt((await searchParams).page ?? "1", 10));
  const label = getCategoryLabel(category);
  const base = categoryPath("hotel", category);

  return {
    title:
      page > 1
        ? `${label} — Blog hotelero (página ${page})`
        : `${label} — Blog hotelero`,
    description:
      HOTEL_CATEGORY_DESCRIPTIONS[category] ??
      `Artículos sobre ${label.toLowerCase()} para hoteles de Colombia y Latinoamérica.`,
    alternates: { canonical: page > 1 ? `${base}?page=${page}` : base },
    robots: page > 1 ? { index: false, follow: true } : undefined,
  };
}

export default async function HotelCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category } = await params;

  if (!isKnownCategory(category)) notFound();
  // A pymes-archive category reached through the hotel hub belongs to /blog.
  if (verticalForCategory(category) !== "hotel") {
    permanentRedirect(categoryPath("general", category));
  }

  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10));
  const limit = 12;

  const [{ posts, total }, categories] = await Promise.all([
    getPostsByCategory(category, page, limit),
    getCategories("hotel"),
  ]);

  const totalPages = Math.ceil(total / limit);
  const label = getCategoryLabel(category);
  const description = HOTEL_CATEGORY_DESCRIPTIONS[category];

  const breadcrumbLd = generateBreadcrumbList([
    { name: "Inicio", url: SITE_URL },
    { name: "Hoteles", url: `${SITE_URL}/hoteles` },
    { name: "Blog hotelero", url: `${SITE_URL}/hoteles/blog` },
    { name: label },
  ]);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${label} — Blog hotelero de conagentes`,
    description,
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
      {posts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
        />
      )}

      <header className="mb-12">
        <Link
          href="/hoteles/blog"
          className="mb-4 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Blog hotelero
        </Link>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-foreground">
          {label}
        </h1>
        {description && (
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        <p className="mt-3 text-sm text-muted-foreground">
          {total} {total === 1 ? "artículo" : "artículos"} en esta categoría
        </p>

        <nav
          aria-label="Categorías del blog hotelero"
          className="mt-6 flex flex-wrap gap-2"
        >
          <Link
            href="/hoteles/blog"
            className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Todos
          </Link>
          {categories.map((cat) => (
            <CategoryBadge
              key={cat.category}
              category={cat.category}
              size="sm"
              className={cat.category === category ? "bg-neon text-ink" : undefined}
            />
          ))}
        </nav>
      </header>

      {posts.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          <p className="text-lg">Todavía no hay artículos en esta categoría.</p>
          <Link
            href="/hoteles/blog"
            className="mt-4 inline-block text-sm font-medium text-foreground underline"
          >
            Ver todo el blog hotelero
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
        <nav aria-label="Paginación" className="mt-12 flex justify-center gap-2">
          {page > 1 && (
            <Link
              href={
                page - 1 === 1
                  ? categoryPath("hotel", category)
                  : `${categoryPath("hotel", category)}?page=${page - 1}`
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
              href={`${categoryPath("hotel", category)}?page=${page + 1}`}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Siguiente →
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
