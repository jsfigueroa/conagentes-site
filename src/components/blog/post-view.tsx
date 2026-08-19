import Image from "next/image";
import Link from "next/link";
import type { BlogPost, BlogPostCard } from "@/lib/blog/types";
import { getPostAnswer } from "@/lib/blog/answer";
import {
  blogBasePath,
  postPathForCategory,
  verticalForCategory,
} from "@/lib/blog/verticals";
import {
  PostHeader,
  PostAnswer,
  KeyTakeaways,
  PostBody,
  PostFaq,
  PostStatistics,
  AuthorBox,
} from "./post-content";
import { TableOfContents } from "./table-of-contents";
import { ShareButtons } from "./share-buttons";
import { RelatedPosts } from "./related-posts";

/**
 * The article page body, shared by both hubs (/blog and /hoteles/blog) so the
 * reading experience and the GEO blocks can never drift apart. The route only
 * owns metadata, JSON-LD and the redirect guard.
 *
 * Order is deliberate: the quotable answer and the cited statistics come before
 * the prose, because that is what answer engines lift and what a hotelier
 * scanning on a phone needs first.
 */
export function PostView({
  post,
  related,
  /** Optional breadcrumb link back to the hub (visible, not just JSON-LD). */
  hubLabel,
}: {
  post: BlogPost;
  related: BlogPostCard[];
  hubLabel?: string;
}) {
  const vertical = verticalForCategory(post.category);
  const path = postPathForCategory(post.category, post.slug);

  return (
    <article className="mx-auto max-w-7xl px-6 py-12">
      {hubLabel && (
        <Link
          href={blogBasePath(vertical)}
          className="mb-6 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← {hubLabel}
        </Link>
      )}

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
        {/* min-w-0 so a wide table inside .prose-table scrolls itself instead of
            stretching this flex child and making the whole page scroll. */}
        <div className="min-w-0 flex-1 max-w-3xl">
          <PostHeader post={post} />

          <PostAnswer answer={getPostAnswer(post)} />

          {post.key_takeaways.length > 0 && (
            <KeyTakeaways items={post.key_takeaways} />
          )}

          <PostStatistics stats={post.statistics} />

          <PostBody html={post.content} />

          <PostFaq faq={post.faq} />

          <AuthorBox post={post} />

          <div className="mt-10 pt-6 border-t border-border">
            <ShareButtons path={path} title={post.title} />
          </div>
        </div>

        <aside className="hidden xl:block w-56 shrink-0">
          <TableOfContents />
        </aside>
      </div>

      <RelatedPosts posts={related} />
    </article>
  );
}
