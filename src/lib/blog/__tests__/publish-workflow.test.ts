import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

/**
 * The publish workflow is the only thing that holds the blog's write key, and
 * this repo is PUBLIC. It once carried `secrets.PUBLISH_SECRET || '<literal>'`
 * "so publishing never breaks in the middle of a rotation" — which made the
 * literal the live key for four months, readable by anyone, and printed
 * unmasked in every run log (a fallback literal is not a secret, so Actions
 * never masks it). CON-323 / ES-1.
 *
 * A missing secret must stop the run loudly, never quietly fall back.
 */

const WORKFLOWS_DIR = resolve(process.cwd(), ".github/workflows");
const PUBLISH = readFileSync(resolve(WORKFLOWS_DIR, "publish-post.yml"), "utf8");

describe("publish-post workflow", () => {
  it("reads the publish key only from the repository secret", () => {
    const envLines = PUBLISH.split("\n").filter((l) => /^\s*PUBLISH_SECRET:/.test(l));
    expect(envLines.length).toBeGreaterThan(0);
    for (const line of envLines) {
      expect(line.trim()).toBe("PUBLISH_SECRET: ${{ secrets.PUBLISH_SECRET }}");
    }
  });

  it("stops with an error before any POST when the secret is missing", () => {
    const guard = PUBLISH.indexOf('if [ -z "$PUBLISH_SECRET" ]');
    const firstPost = PUBLISH.indexOf("curl ");
    expect(guard).toBeGreaterThan(-1);
    expect(firstPost).toBeGreaterThan(-1);
    expect(guard).toBeLessThan(firstPost);

    const lines = PUBLISH.slice(guard).split(/\r?\n/);
    const guardBlock = lines.slice(0, lines.findIndex((l) => l.trim() === "fi")).join("\n");
    expect(guardBlock).toMatch(/::error::/);
    expect(guardBlock).toMatch(/exit 1/);
  });
});

describe("every workflow", () => {
  const files = readdirSync(WORKFLOWS_DIR).filter((f) => /\.ya?ml$/.test(f));

  it.each(files)("%s never gives a secret a literal default", (file) => {
    const text = readFileSync(resolve(WORKFLOWS_DIR, file), "utf8");
    // `secrets.X || 'something'` / `secrets.X || "something"` — the pattern
    // that published the key. A secret is either set or the run fails.
    expect(text).not.toMatch(/secrets\.[A-Za-z0-9_]+\s*\|\|/);
  });
});
