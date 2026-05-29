import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { BlogPostCard } from "@/lib/blog/types";
import { CategoryBadge } from "./category-badge";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostCard({ post }: { post: BlogPostCard }) {
  return (
    <article className="group flex flex-col bg-card rounded-[var(--r-lg)] border border-border overflow-hidden hover:shadow-md transition-shadow">
      {post.cover_image_url && (
        <Link href={`/blog/${post.slug}`} className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.cover_image_url}
            alt={post.cover_image_alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-3">
          <CategoryBadge category={post.category} size="sm" />
          {post.reading_time_minutes && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={12} />
              {post.reading_time_minutes} min
            </span>
          )}
        </div>

        <Link href={`/blog/${post.slug}`} className="group/title">
          <h2 className="text-lg font-bold text-foreground leading-tight mb-2 group-hover/title:text-neon-deep transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
          <span>{post.author_name}</span>
          <time dateTime={post.published_at ?? undefined}>
            {formatDate(post.published_at)}
          </time>
        </div>
      </div>
    </article>
  );
}
