import type { Metadata } from "next";
import { getPostsByCategory, getCategories } from "@/lib/blog/queries";
import { getCategoryLabel } from "@/components/blog/category-badge";
import { PostCard } from "@/components/blog/post-card";
import { CategoryBadge } from "@/components/blog/category-badge";
import { generateBreadcrumbList } from "@/lib/blog/structured-data";
import Link from "next/link";

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

export async function generateStaticParams() {
  try {
    const categories = await getCategories();
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
  const base = `/blog/categoria/${category}`;

  return {
    title: page > 1 ? `${label} — Blog (página ${page})` : `${label} — Blog`,
    description: `Artículos sobre ${label.toLowerCase()} para PYMEs en Latinoamérica. Estrategias prácticas de IA y automatización.`,
    alternates: {
      // Self-canonical (incl. page param) so each page is its own canonical;
      // page 1 is the clean category URL.
      canonical: page > 1 ? `${base}?page=${page}` : base,
    },
    // Keep deep listing pages out of the index to avoid thin/duplicate pages,
    // but let crawlers follow through to the articles.
    robots: page > 1 ? { index: false, follow: true } : undefined,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category } = await params;
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10));
  const limit = 12;

  const [{ posts, total }, categories] = await Promise.all([
    getPostsByCategory(category, page, limit),
    getCategories(),
  ]);

  const totalPages = Math.ceil(total / limit);
  const label = getCategoryLabel(category);

  const breadcrumbLd = generateBreadcrumbList([
    { name: "Inicio", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: label },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <header className="mb-12">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block"
        >
          ← Volver al blog
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-3">
          {label}
        </h1>
        <p className="text-lg text-muted-foreground">
          {total} {total === 1 ? "artículo" : "artículos"} en esta categoría
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          <Link
            href="/blog"
            className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Todos
          </Link>
          {categories.map((cat) => (
            <CategoryBadge
              key={cat.category}
              category={cat.category}
              size="sm"
              className={
                cat.category === category
                  ? "bg-neon text-ink"
                  : undefined
              }
            />
          ))}
        </div>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No hay artículos en esta categoría aún.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav className="flex justify-center gap-2 mt-12">
          {page > 1 && (
            <Link
              href={`/blog/categoria/${category}?page=${page - 1}`}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-muted transition-colors"
            >
              ← Anterior
            </Link>
          )}
          <span className="px-4 py-2 text-sm text-muted-foreground">
            Página {page} de {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/blog/categoria/${category}?page=${page + 1}`}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-muted transition-colors"
            >
              Siguiente →
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
