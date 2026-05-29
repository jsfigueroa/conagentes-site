import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug, getRelatedPosts, getAllPublishedSlugs } from "@/lib/blog/queries";
import {
  generateArticleJsonLd,
  generateFaqJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/blog/structured-data";
import {
  PostHeader,
  KeyTakeaways,
  PostBody,
  PostFaq,
} from "@/components/blog/post-content";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareButtons } from "@/components/blog/share-buttons";
import { RelatedPosts } from "@/components/blog/related-posts";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const slugs = await getAllPublishedSlugs();
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
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.meta_title || post.title,
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
        post.canonical_url || `${siteUrl}/blog/${post.slug}`,
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

  const related = await getRelatedPosts(slug, post.category);

  const articleLd = generateArticleJsonLd(post);
  const faqLd = generateFaqJsonLd(post);
  const breadcrumbLd = generateBreadcrumbJsonLd(post);

  return (
    <>
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

      <article className="mx-auto max-w-7xl px-6 py-12">
        {post.cover_image_url && (
          <div className="relative aspect-[21/9] rounded-[var(--r-xl)] overflow-hidden mb-10">
            <Image
              src={post.cover_image_url}
              alt={post.cover_image_alt || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        )}

        <div className="flex gap-12">
          <div className="flex-1 max-w-3xl">
            <PostHeader post={post} />

            {post.key_takeaways.length > 0 && (
              <KeyTakeaways items={post.key_takeaways} />
            )}

            <PostBody html={post.content} />

            <PostFaq faq={post.faq} />

            <div className="mt-10 pt-6 border-t border-border">
              <ShareButtons slug={post.slug} title={post.title} />
            </div>
          </div>

          <aside className="hidden xl:block w-56 shrink-0">
            <TableOfContents />
          </aside>
        </div>

        <RelatedPosts posts={related} />
      </article>
    </>
  );
}
