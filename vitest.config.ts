import { defineConfig } from "vitest/config";

/**
 * Test setup for the marketing site (CON-292).
 *
 * The site had no tests and no CI at all. That was survivable while it was
 * static copy; it stopped being survivable the moment it started carrying
 * measurement logic, because a misclassified referrer or a silently broken
 * ingest route produces a dashboard that is confidently wrong rather than
 * visibly empty — and nobody goes looking for a bug in a number that renders.
 *
 * `resolve.tsconfigPaths` is Vite's native replacement for the old
 * `vite-tsconfig-paths` plugin; it makes `@/` resolve here exactly as it does
 * in Next, so tests import the real modules rather than a copy of them.
 */
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    include: ["src/**/__tests__/**/*.test.ts"],
    environment: "node",
  },
});
