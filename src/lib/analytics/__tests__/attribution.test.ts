import { describe, it, expect } from "vitest";
import { buildSnapshot, deriveChannelGroup, isNewTouch } from "../attribution";

/**
 * Tests for channel classification (CON-292).
 *
 * This is the load-bearing piece of the whole measurement story. If a visitor
 * arriving from ChatGPT is filed under «Referidos», the GEO investment — the
 * llms.txt, the JSON-LD, the pillar pages, the entire reason the blog exists —
 * becomes invisible, and it becomes invisible QUIETLY: the dashboard still
 * renders, the totals still add up, and the one channel we are deliberately
 * building for simply never appears as a line.
 *
 * Every case below is written to fail in BOTH directions: each asserts the
 * right group AND, where the distinction matters, that it is not the plausible
 * wrong one.
 */

const SELF = "conagentes.com";

describe("deriveChannelGroup", () => {
  it("files assistants as their own channel, not as referrals", () => {
    for (const host of ["chatgpt.com", "perplexity.ai", "claude.ai", "gemini.google.com"]) {
      const group = deriveChannelGroup({
        medium: null,
        source: null,
        referrerHost: host,
        clickIdKind: null,
        selfHost: SELF,
      });
      expect(group, `${host} should be an assistant`).toBe("ai_assistant");
      expect(group, `${host} must not fall through to referral`).not.toBe("referral");
    }
  });

  it("does not mistake Google search for the Gemini assistant", () => {
    // Both are google hosts. Getting this backwards would move organic search
    // into the AI bucket and make the GEO number look like a triumph.
    expect(
      deriveChannelGroup({
        medium: null,
        source: null,
        referrerHost: "google.com",
        clickIdKind: null,
        selfHost: SELF,
      })
    ).toBe("organic_search");
    expect(
      deriveChannelGroup({
        medium: null,
        source: null,
        referrerHost: "gemini.google.com",
        clickIdKind: null,
        selfHost: SELF,
      })
    ).toBe("ai_assistant");
  });

  it("trusts a click id over a hand-typed medium", () => {
    // `utm_medium` is typed by whoever built the link and is wrong often enough
    // that paid spend would otherwise land in the organic column.
    expect(
      deriveChannelGroup({
        medium: "organic",
        source: "google",
        referrerHost: "google.com",
        clickIdKind: "google",
        selfHost: SELF,
      })
    ).toBe("paid_search");
  });

  it("calls our own pages internal, not referral", () => {
    expect(
      deriveChannelGroup({
        medium: null,
        source: null,
        referrerHost: SELF,
        clickIdKind: null,
        selfHost: SELF,
      })
    ).toBe("internal");
  });

  it("treats a bare visit with no referrer as direct", () => {
    expect(
      deriveChannelGroup({
        medium: null,
        source: null,
        referrerHost: null,
        clickIdKind: null,
        selfHost: SELF,
      })
    ).toBe("direct");
  });

  it("recognises social hosts", () => {
    expect(
      deriveChannelGroup({
        medium: null,
        source: null,
        referrerHost: "instagram.com",
        clickIdKind: null,
        selfHost: SELF,
      })
    ).toBe("social");
  });
});

describe("buildSnapshot", () => {
  it("reads UTMs and the landing path off the URL", () => {
    const snap = buildSnapshot({
      url: "https://conagentes.com/hoteles/pms?utm_source=cotelco&utm_medium=email&utm_campaign=lanzamiento",
      referrer: null,
    });
    expect(snap.source).toBe("cotelco");
    expect(snap.medium).toBe("email");
    expect(snap.campaign).toBe("lanzamiento");
    expect(snap.landingPath).toBe("/hoteles/pms");
    expect(snap.channelGroup).toBe("email");
  });

  it("captures a click id and its platform", () => {
    const snap = buildSnapshot({
      url: "https://conagentes.com/?fbclid=ABC123",
      referrer: null,
    });
    expect(snap.clickId).toBe("ABC123");
    expect(snap.clickIdKind).toBe("meta");
    expect(snap.channelGroup).toBe("paid_social");
  });

  it("falls back to the referrer host as the source when no UTM is present", () => {
    const snap = buildSnapshot({
      url: "https://conagentes.com/blog/algo",
      referrer: "https://www.perplexity.ai/search/xyz",
    });
    expect(snap.referrerHost).toBe("perplexity.ai"); // www stripped
    expect(snap.source).toBe("perplexity.ai");
    expect(snap.channelGroup).toBe("ai_assistant");
  });

  it("survives a malformed referrer without throwing", () => {
    const snap = buildSnapshot({ url: "https://conagentes.com/", referrer: "not a url" });
    expect(snap.referrerHost).toBeNull();
    expect(snap.channelGroup).toBe("direct");
  });
});

describe("isNewTouch", () => {
  const base = buildSnapshot({ url: "https://conagentes.com/", referrer: null });

  it("refuses to let internal navigation overwrite last touch", () => {
    // This is the classic way a last-touch report turns into nonsense: every
    // visitor ends up attributed to the site itself the moment they click
    // anything.
    const internal = { ...base, channelGroup: "internal" as const };
    expect(isNewTouch(internal)).toBe(false);
  });

  it("accepts a visit carrying campaign information", () => {
    const campaign = buildSnapshot({
      url: "https://conagentes.com/?utm_source=cotelco&utm_medium=email",
      referrer: null,
    });
    expect(isNewTouch(campaign)).toBe(true);
  });

  it("does not treat a plain direct visit as a new touch", () => {
    expect(isNewTouch(base)).toBe(false);
  });
});
