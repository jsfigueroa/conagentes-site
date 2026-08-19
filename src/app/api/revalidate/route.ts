import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("authorization")?.replace("Bearer ", "");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { slug, paths } = body as { slug?: string; paths?: string[] };

  // Both hubs + the generated indexes; cheap, and callers rarely know which
  // hub a slug belongs to.
  revalidatePath("/blog");
  revalidatePath("/hoteles/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
  revalidatePath("/feed.xml");
  revalidatePath("/hoteles/blog/feed.xml");

  if (slug) {
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/hoteles/blog/${slug}`);
  }

  if (paths) {
    for (const p of paths) {
      revalidatePath(p);
    }
  }

  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
