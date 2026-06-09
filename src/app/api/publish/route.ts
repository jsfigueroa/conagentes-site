import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { submitToIndexNow } from "@/lib/seo/indexnow";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const secret = request.headers.get("authorization")?.replace("Bearer ", "");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const required = ["slug", "title", "excerpt", "content", "content_markdown", "category"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  const post = {
    slug: body.slug,
    title: body.title,
    subtitle: body.subtitle || null,
    excerpt: body.excerpt,
    content: body.content,
    content_markdown: body.content_markdown,
    cover_image_url: body.cover_image_url || null,
    cover_image_alt: body.cover_image_alt || null,
    category: body.category,
    tags: body.tags || [],
    meta_title: body.meta_title || null,
    meta_description: body.meta_description || null,
    canonical_url: body.canonical_url || null,
    key_takeaways: body.key_takeaways || [],
    statistics: body.statistics || [],
    faq: body.faq || [],
    structured_data: body.structured_data || null,
    status: "published",
    published_at: body.published_at || new Date().toISOString(),
    reading_time_minutes: body.reading_time_minutes || null,
    word_count: body.word_count || null,
    author_name: body.author_name || "Equipo conagentes",
    author_bio: body.author_bio || null,
    author_avatar_url: body.author_avatar_url || null,
  };

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(post)
    .select("slug, title")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Supabase insert failed", details: error.message },
      { status: 500 }
    );
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");

  // Notify IndexNow (Bing/Yandex → ChatGPT Search/Copilot) so the new post is
  // discovered in minutes. Non-blocking and self-guarded — never fails publish.
  await submitToIndexNow([
    `${SITE_URL}/blog/${post.slug}`,
    `${SITE_URL}/blog`,
  ]);

  return NextResponse.json({
    success: true,
    slug: data.slug,
    title: data.title,
    url: `${SITE_URL}/blog/${data.slug}`,
  });
}
