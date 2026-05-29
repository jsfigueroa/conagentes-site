import { supabase } from "@/lib/supabase/client";
import type { BlogPost, BlogPostCard, CategoryCount } from "./types";

const CARD_FIELDS =
  "slug, title, excerpt, cover_image_url, cover_image_alt, category, published_at, reading_time_minutes, author_name";

export async function getAllPosts(
  page = 1,
  limit = 12
): Promise<{ posts: BlogPostCard[]; total: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from("blog_posts")
    .select(CARD_FIELDS, { count: "exact" })
    .eq("status", "published")
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

export async function getCategories(): Promise<CategoryCount[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("category")
    .eq("status", "published")
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
  limit = 3
): Promise<BlogPostCard[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(CARD_FIELDS)
    .eq("status", "published")
    .eq("category", category)
    .neq("slug", slug)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as BlogPostCard[];
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => row.slug);
}
