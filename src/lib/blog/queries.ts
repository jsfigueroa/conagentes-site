import { supabase } from "@/lib/supabase/client";
import type { BlogPost, BlogPostCard, CategoryCount } from "./types";
import {
  type BlogVertical,
  categoriesFor,
  verticalForCategory,
} from "./verticals";

const CARD_FIELDS =
  "slug, title, excerpt, cover_image_url, cover_image_alt, category, published_at, reading_time_minutes, author_name";

// Every listing query is scoped to one hub by its category set (see
// lib/blog/verticals.ts). Without this, a hotel post would surface in the
// pymes archive at /blog AND at /hoteles/blog — two URLs for one article,
// which is exactly the duplicate-content signal we do not want.
function categoryFilter(vertical: BlogVertical): string[] {
  return [...categoriesFor(vertical)];
}

export async function getAllPosts(
  page = 1,
  limit = 12,
  vertical: BlogVertical = "general"
): Promise<{ posts: BlogPostCard[]; total: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from("blog_posts")
    .select(CARD_FIELDS, { count: "exact" })
    .eq("status", "published")
    .in("category", categoryFilter(vertical))
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return { posts: (data ?? []) as BlogPostCard[], total: count ?? 0 };
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .single();

  if (error && error.code === "PGRST116") return null;
  if (error) throw error;
  return data as BlogPost;
}

export async function getPostsByCategory(
  category: string,
  page = 1,
  limit = 12
): Promise<{ posts: BlogPostCard[]; total: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from("blog_posts")
    .select(CARD_FIELDS, { count: "exact" })
    .eq("status", "published")
    .eq("category", category)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return { posts: (data ?? []) as BlogPostCard[], total: count ?? 0 };
}

export async function getCategories(
  vertical: BlogVertical = "general"
): Promise<CategoryCount[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("category")
    .eq("status", "published")
    .in("category", categoryFilter(vertical))
    .lte("published_at", new Date().toISOString());

  if (error) throw error;

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    counts.set(row.category, (counts.get(row.category) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getRelatedPosts(
  slug: string,
  category: string,
  tags: string[] = [],
  limit = 3
): Promise<BlogPostCard[]> {
  // Pull a candidate pool that's either in the same category OR shares tags,
  // then rank by topical relevance (shared tags weigh most, same category next,
  // recency breaks ties). Stronger topic clustering than category-only — better
  // internal-linking signal for both Google and LLM crawlers. (CON-025, B3.1)
  // The pool never crosses hubs: a hotel article only recommends hotel articles.
  const tagFilter =
    tags.length > 0 ? `,tags.ov.{${tags.map((t) => `"${t}"`).join(",")}}` : "";

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`${CARD_FIELDS}, tags`)
    .eq("status", "published")
    .neq("slug", slug)
    .in("category", categoryFilter(verticalForCategory(category)))
    .lte("published_at", new Date().toISOString())
    .or(`category.eq.${category}${tagFilter}`)
    .order("published_at", { ascending: false })
    .limit(24);

  if (error) throw error;

  const tagSet = new Set(tags);
  const scored = (data ?? []).map((p) => {
    const postTags: string[] = (p as { tags?: string[] }).tags ?? [];
    const sharedTags = postTags.filter((t) => tagSet.has(t)).length;
    const score = sharedTags * 2 + (p.category === category ? 1 : 0);
    return { post: p, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (b.post.published_at ?? "").localeCompare(a.post.published_at ?? "");
  });

  return scored.slice(0, limit).map(({ post }) => {
    const { tags: _tags, ...card } = post as BlogPostCard & { tags?: string[] };
    void _tags;
    return card as BlogPostCard;
  });
}

export async function getAllPublishedSlugs(
  vertical: BlogVertical = "general"
): Promise<string[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published")
    .in("category", categoryFilter(vertical))
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => row.slug);
}

/**
 * Every published post with just enough to build URLs and freshness metadata.
 * Used by the sitemap, the feeds and llms.txt, which all need posts from BOTH
 * hubs in one pass.
 */
export async function getAllPostsForIndexing(): Promise<
  {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    published_at: string | null;
    updated_at: string;
    author_name: string;
  }[]
> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "slug, title, excerpt, category, published_at, updated_at, author_name"
    )
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
