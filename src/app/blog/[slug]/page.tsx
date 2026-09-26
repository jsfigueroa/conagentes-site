import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  getPostBySlug,
  getRelatedPosts,
  getAllPublishedSlugs,
} from "@/lib/blog/queries";
import {
  generateArticleJsonLd,
  generateFaqJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/blog/structured-data";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { postPathForCategory, verticalForCategory } from "@/lib/blog/verticals";
import { postMetaTitle } from "@/lib/blog/meta";
import { PostView } from "@/components/blog/post-view";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const slugs = await getAllPublishedSlugs("general");
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

  return {
    title: postMetaTitle(post),
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: postMetaTitle(post),
      description: post.meta_description || post.excerpt,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      authors: [post.author_name],
      images: post.cover_image_url ? [post.cover_image_url] : [],
      locale: "es_CO",
      siteName: "conagentes",
    },
    alternates: {
      canonical:
        post.canonical_url ||
        `${siteUrl}${postPathForCategory(post.category, post.slug)}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // One article, one URL: a hotel post lives at /hoteles/blog/<slug>, so a hit
  // here (old link, mistyped path, stale index) is redirected instead of served
  // as a duplicate.
  if (verticalForCategory(post.category) === "hotel") {
    permanentRedirect(postPathForCategory(post.category, post.slug));
  }

  const related = await getRelatedPosts(slug, post.category, post.tags);

  const articleLd = generateArticleJsonLd(post);
  const faqLd = generateFaqJsonLd(post);
  const breadcrumbLd = generateBreadcrumbJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqLd) }}
        />
      )}

      <PostView post={post} related={related} />
    </>
  );
}
