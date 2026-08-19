import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase/client";
import { allPageUrls } from "@/content/pages";
import {
  categoryPath,
  postPathForCategory,
  verticalForCategory,
} from "@/lib/blog/verticals";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: string; updated_at: string; category: string }[] = [];

  try {
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, category")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });
    posts = data ?? [];
  } catch {
    // Supabase unavailable — return static pages only
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/hoteles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/hoteles/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terminos`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const marketingPages: MetadataRoute.Sitemap = allPageUrls().map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path.split("/").length > 2 ? 0.6 : 0.8,
  }));

  // Each post is listed under its own hub's path — the same URL its canonical,
  // its JSON-LD and its cards point at. (lib/blog/verticals.ts)
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}${postPathForCategory(post.category, post.slug)}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "weekly" as const,
    priority: verticalForCategory(post.category) === "hotel" ? 0.8 : 0.6,
  }));

  const categories = [...new Set(posts.map((p) => p.category))];
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}${categoryPath(verticalForCategory(cat), cat)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...marketingPages, ...categoryPages, ...postPages];
}
