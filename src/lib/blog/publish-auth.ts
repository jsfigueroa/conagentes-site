import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Who may write to the blog: `/api/publish` (insert a post with the service
 * role) and `/api/revalidate` (purge its caches). Both expect
 * `Authorization: Bearer <REVALIDATION_SECRET>`, sent only by the publish
 * workflow (.github/workflows/publish-post.yml).
 *
 * Fails CLOSED. The routes used to check
 * `header !== process.env.REVALIDATION_SECRET`, which is `undefined !==
 * undefined` — authorized — on any deploy where the variable is not scoped
 * (Preview deploys are the documented case), so a request with no header at
 * all got through (CON-323).
 *
 * Constant-time: both sides are hashed to the same length first, so the
 * compare leaks neither the key's content nor its length through timing.
 *
 * The caller passes `process.env.REVALIDATION_SECRET` explicitly. There is no
 * default parameter on purpose: with one, `expected = undefined` silently fell
 * back to the environment, so a test of the "not configured" case passed only
 * because the test process happened to have no key.
 */
export function isPublishAuthorized(
  authorization: string | null | undefined,
  expected: string | undefined
): boolean {
  if (!expected) return false;

  const match = /^Bearer (.+)$/.exec(authorization ?? "");
  if (!match) return false;

  const given = createHash("sha256").update(match[1]).digest();
  const wanted = createHash("sha256").update(expected).digest();
  return timingSafeEqual(given, wanted);
}
