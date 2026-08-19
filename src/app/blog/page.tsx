import type { Metadata } from "next";
import { getAllPosts, getCategories } from "@/lib/blog/queries";
import { PostCard } from "@/components/blog/post-card";
import { CategoryBadge } from "@/components/blog/category-badge";
import { generateBreadcrumbList } from "@/lib/blog/structured-data";
import Link from "next/link";

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const page = Math.max(1, parseInt((await searchParams).page ?? "1", 10));

  return {
    title: page > 1 ? `Blog (página ${page})` : "Blog",
    description:
      "Artículos prácticos sobre IA, automatización y CRM para PYMEs en Latinoamérica. Aprende a usar la tecnología para crecer tu negocio.",
    alternates: {
      // Self-canonical per page; page 1 is the clean /blog URL.
      canonical: page > 1 ? `/blog?page=${page}` : "/blog",
    },
    // Deep listing pages: keep out of the index, follow through to articles.
    robots: page > 1 ? { index: false, follow: true } : undefined,
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const limit = 12;

  const [{ posts, total }, categories] = await Promise.all([
    getAllPosts(page, limit, "general"),
    getCategories("general"),
  ]);

  const totalPages = Math.ceil(total / limit);

  const breadcrumbLd = generateBreadcrumbList([
    { name: "Inicio", url: SITE_URL },
    { name: "Blog" },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-3">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Ideas prácticas sobre inteligencia artificial, automatización y
          herramientas digitales para hacer crecer tu negocio.
        </p>

        {/* The hotel hub is where we publish now — send readers and crawlers
            there from the archive's most-visited page. */}
        <Link
          href="/hoteles/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-[var(--r-lg)] border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
        >
          <span aria-hidden="true">🏨</span>
          <span>
            <strong className="font-semibold">¿Tiene un hotel?</strong> El
            contenido nuevo se publica en el blog hotelero
            <span aria-hidden="true"> →</span>
          </span>
        </Link>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            <Link
              href="/blog"
              className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-foreground text-background"
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
          </div>
        )}
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">Aún no hay artículos publicados.</p>
          <p className="text-sm mt-2">Vuelve pronto — publicamos contenido nuevo cada día.</p>
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
              href={`/blog?page=${page - 1}`}
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
              href={`/blog?page=${page + 1}`}
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
