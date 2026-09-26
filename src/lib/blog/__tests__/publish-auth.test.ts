import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

/**
 * Only the publish workflow may write to the blog. The routes used to check
 * `header !== process.env.REVALIDATION_SECRET`, which is `undefined !==
 * undefined` — i.e. AUTHORIZED — on any deploy where the variable is not
 * scoped (Preview deploys are the documented case): a request with no
 * Authorization header at all got through to the service-role insert.
 * CON-323 / ES-1. Every case is pinned both ways: the right key still works.
 */

const insert = vi.fn();
const revalidatePath = vi.fn();

vi.mock("next/cache", () => ({ revalidatePath: (p: string) => revalidatePath(p) }));
vi.mock("@/lib/seo/indexnow", () => ({ submitToIndexNow: vi.fn(async () => undefined) }));
vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    from: () => ({
      insert: (row: unknown) => {
        insert(row);
        return {
          select: () => ({
            single: async () => ({
              data: { slug: "una-guia", title: "Una guía" },
              error: null,
            }),
          }),
        };
      },
    }),
  }),
}));

const { isPublishAuthorized } = await import("../publish-auth");
const { POST: publish } = await import("@/app/api/publish/route");
const { POST: revalidate } = await import("@/app/api/revalidate/route");

const KEY = "k3y-for-tests-only";

const POST_BODY = {
  slug: "una-guia",
  title: "Una guía",
  excerpt: "Resumen",
  content: "<p>Hola</p>",
  content_markdown: "Hola",
  category: "reservas-directas",
};

function req(path: string, body: unknown, authorization?: string) {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (authorization !== undefined) headers.authorization = authorization;
  return new NextRequest(`https://www.conagentes.com${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

describe("isPublishAuthorized", () => {
  it("accepts the configured key as a Bearer token", () => {
    expect(isPublishAuthorized(`Bearer ${KEY}`, KEY)).toBe(true);
  });

  it("fails closed when the key is not configured", () => {
    // The environment DOES hold a key here, so a helper that quietly fell back
    // to process.env (it used to, through a default parameter) would accept
    // it. The routes pass the variable explicitly; an absent one must refuse.
    const original = process.env.REVALIDATION_SECRET;
    process.env.REVALIDATION_SECRET = KEY;
    try {
      expect(isPublishAuthorized(null, undefined)).toBe(false);
      expect(isPublishAuthorized(undefined, undefined)).toBe(false);
      expect(isPublishAuthorized(`Bearer ${KEY}`, undefined)).toBe(false);
      expect(isPublishAuthorized("Bearer ", "")).toBe(false);
      expect(isPublishAuthorized("Bearer undefined", undefined)).toBe(false);
    } finally {
      if (original === undefined) delete process.env.REVALIDATION_SECRET;
      else process.env.REVALIDATION_SECRET = original;
    }
  });

  it("rejects a missing, malformed or wrong key", () => {
    expect(isPublishAuthorized(null, KEY)).toBe(false);
    expect(isPublishAuthorized("", KEY)).toBe(false);
    expect(isPublishAuthorized(KEY, KEY)).toBe(false); // no scheme
    expect(isPublishAuthorized(`Basic ${KEY}`, KEY)).toBe(false);
    expect(isPublishAuthorized(`Bearer ${KEY}x`, KEY)).toBe(false);
    expect(isPublishAuthorized(`Bearer ${KEY.slice(0, -1)}`, KEY)).toBe(false);
  });
});

describe("POST /api/publish", () => {
  const original = process.env.REVALIDATION_SECRET;

  beforeEach(() => {
    insert.mockClear();
    revalidatePath.mockClear();
  });

  afterEach(() => {
    if (original === undefined) delete process.env.REVALIDATION_SECRET;
    else process.env.REVALIDATION_SECRET = original;
  });

  it("refuses a request with no key when the deploy has no key configured", async () => {
    delete process.env.REVALIDATION_SECRET;
    const res = await publish(req("/api/publish", POST_BODY));
    expect(res.status).toBe(401);
    expect(insert).not.toHaveBeenCalled();
  });

  it("refuses a wrong key", async () => {
    process.env.REVALIDATION_SECRET = KEY;
    const res = await publish(req("/api/publish", POST_BODY, "Bearer not-the-key"));
    expect(res.status).toBe(401);
    expect(insert).not.toHaveBeenCalled();
  });

  it("publishes with the right key", async () => {
    process.env.REVALIDATION_SECRET = KEY;
    const res = await publish(req("/api/publish", POST_BODY, `Bearer ${KEY}`));
    expect(res.status).toBe(200);
    expect(insert).toHaveBeenCalledTimes(1);
  });
});

describe("POST /api/revalidate", () => {
  const original = process.env.REVALIDATION_SECRET;

  beforeEach(() => revalidatePath.mockClear());

  afterEach(() => {
    if (original === undefined) delete process.env.REVALIDATION_SECRET;
    else process.env.REVALIDATION_SECRET = original;
  });

  it("refuses a request with no key when the deploy has no key configured", async () => {
    delete process.env.REVALIDATION_SECRET;
    const res = await revalidate(req("/api/revalidate", { slug: "una-guia" }));
    expect(res.status).toBe(401);
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("revalidates with the right key", async () => {
    process.env.REVALIDATION_SECRET = KEY;
    const res = await revalidate(req("/api/revalidate", { slug: "una-guia" }, `Bearer ${KEY}`));
    expect(res.status).toBe(200);
    expect(revalidatePath).toHaveBeenCalled();
  });
});
