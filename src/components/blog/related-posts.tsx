import type { BlogPostCard } from "@/lib/blog/types";
import { PostCard } from "./post-card";

export function RelatedPosts({ posts }: { posts: BlogPostCard[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Artículos relacionados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
