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
import { postPathForCategory, verticalForCategory } from "@/lib/blog/verticals";
import { postMetaTitle } from "@/lib/blog/meta";
import { PostView } from "@/components/blog/post-view";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

export async function generateStaticParams() {
  try {
    const slugs = await getAllPublishedSlugs("hotel");
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

  return {
    title: postMetaTitle(post),
    description: post.meta_description || post.excerpt,
    keywords: post.tags?.length ? post.tags : undefined,
    openGraph: {
      title: postMetaTitle(post),
      description: post.meta_description || post.excerpt,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: [post.author_name],
      images: post.cover_image_url
        ? [post.cover_image_url]
        : [`${SITE_URL}/og?slug=hoteles`],
      locale: "es_CO",
      siteName: "conagentes",
    },
    alternates: {
      canonical:
        post.canonical_url ||
        `${SITE_URL}${postPathForCategory(post.category, post.slug)}`,
      // Announce the markdown twin so agent browsers can grab the cheap version.
      types: {
        "text/markdown": `${SITE_URL}/hoteles/blog/${post.slug}/md`,
      },
    },
  };
}

export default async function HotelBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // A pymes-archive post reached through this hub is redirected to its own URL
  // instead of being served twice.
  if (verticalForCategory(post.category) !== "hotel") {
    permanentRedirect(postPathForCategory(post.category, post.slug));
  }

  const related = await getRelatedPosts(slug, post.category, post.tags);

  const articleLd = generateArticleJsonLd(post);
  const faqLd = generateFaqJsonLd(post);
  const breadcrumbLd = generateBreadcrumbJsonLd(post);

  return (
    <div className="pt-24 md:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <PostView post={post} related={related} hubLabel="Blog hotelero" />
    </div>
  );
}
