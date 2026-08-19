import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { submitToIndexNow } from "@/lib/seo/indexnow";
import {
  GENERAL_CATEGORIES,
  HOTEL_CATEGORIES,
  blogBasePath,
  categoryPath,
  isKnownCategory,
  postPath,
  verticalForCategory,
} from "@/lib/blog/verticals";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

// Lazily create the client inside the handler so `next build` never
// instantiates it at import time (which throws when Supabase env vars are
// absent, e.g. on Preview deploys without the vars scoped in).
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

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

  // The category decides which hub the post lands in (see lib/blog/verticals.ts),
  // so an unknown category is rejected instead of silently publishing an article
  // no listing page links to.
  if (!isKnownCategory(body.category)) {
    return NextResponse.json(
      {
        error: `Unknown category: ${body.category}`,
        hint: "Add it to lib/blog/verticals.ts or use one of the allowed values.",
        allowed: {
          hotel: HOTEL_CATEGORIES,
          general: GENERAL_CATEGORIES,
        },
      },
      { status: 400 }
    );
  }

  const vertical = verticalForCategory(body.category);

  // If the generator declares a vertical, it must agree with the category —
  // catches "vertical: hotel" plus a pymes category (or vice versa).
  if (body.vertical && body.vertical !== vertical) {
    return NextResponse.json(
      {
        error: `Vertical mismatch: category "${body.category}" belongs to "${vertical}", not "${body.vertical}"`,
      },
      { status: 400 }
    );
  }

  // The «En corto» answer travels as a top-level `answer` for readability in the
  // generated JSON, and is stored inside structured_data (no schema change).
  const structuredData: Record<string, unknown> | null =
    body.structured_data && typeof body.structured_data === "object"
      ? { ...body.structured_data }
      : null;

  const answer =
    typeof body.answer === "string" && body.answer.trim()
      ? body.answer.trim()
      : typeof structuredData?.answer === "string"
        ? (structuredData.answer as string)
        : null;

  const finalStructuredData =
    answer || structuredData ? { ...(structuredData ?? {}), ...(answer ? { answer } : {}) } : null;

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
    structured_data: finalStructuredData,
    status: "published",
    published_at: body.published_at || new Date().toISOString(),
    reading_time_minutes: body.reading_time_minutes || null,
    word_count: body.word_count || null,
    author_name: body.author_name || "Equipo conagentes",
    author_bio: body.author_bio || null,
    author_avatar_url: body.author_avatar_url || null,
  };

  const { data, error } = await getSupabase()
    .from("blog_posts")
    .insert(post)
    .select("slug, title")
    .single();

  if (error) {
    // 23505 = unique_violation on slug: the post is already published. Answer
    // 409 with "duplicate" in the message so the publishing workflow can drop
    // the pending file instead of retrying it forever.
    const isDuplicate = error.code === "23505";
    return NextResponse.json(
      {
        error: isDuplicate
          ? "duplicate slug — already published"
          : "Supabase insert failed",
        details: error.message,
      },
      { status: isDuplicate ? 409 : 500 }
    );
  }

  const hub = blogBasePath(vertical);
  const path = postPath(vertical, post.slug);

  revalidatePath(hub);
  revalidatePath(path);
  revalidatePath(categoryPath(vertical, post.category));
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
  revalidatePath("/feed.xml");
  if (vertical === "hotel") {
    revalidatePath("/hoteles/blog/feed.xml");
    revalidatePath("/hoteles/recursos");
  }

  // Notify IndexNow (Bing/Yandex → ChatGPT Search/Copilot) so the new post is
  // discovered in minutes. Non-blocking and self-guarded — never fails publish.
  await submitToIndexNow([`${SITE_URL}${path}`, `${SITE_URL}${hub}`]);

  return NextResponse.json({
    success: true,
    slug: data.slug,
    title: data.title,
    vertical,
    url: `${SITE_URL}${path}`,
  });
}
