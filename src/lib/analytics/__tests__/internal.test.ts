import { describe, it, expect } from "vitest";
import { hasOptOutCookie, isMeasurableHost, optOutIntent, OPTOUT_COOKIE } from "../internal";

/**
 * These assertions guard a number, not a feature.
 *
 * The bug this module exists to prevent produced no error, no warning and no
 * visible symptom: it produced a dashboard reading "2 visitors, 1 pressed the
 * button" where both were us. So every case below is pinned in BOTH directions
 * — a test that only proves `localhost` is rejected still passes on the day
 * somebody rejects production too and the table silently stops filling.
 */

describe("isMeasurableHost", () => {
  it.each(["conagentes.com", "www.conagentes.com", "WWW.CONAGENTES.COM", "conagentes.com:443"])(
    "counts %s",
    (host) => {
      expect(isMeasurableHost(host)).toBe(true);
    }
  );

  it.each([
    "localhost",
    "localhost:3000",
    "127.0.0.1:3103",
    "192.168.1.142:3100",
    "conagentes-site-git-con-294.vercel.app",
    "conagentes-site.vercel.app",
  ])("does not count %s", (host) => {
    expect(isMeasurableHost(host)).toBe(false);
  });

  it("does not count a missing host", () => {
    expect(isMeasurableHost(null)).toBe(false);
    expect(isMeasurableHost(undefined)).toBe(false);
    expect(isMeasurableHost("")).toBe(false);
  });

  it("is an allowlist, so a lookalike domain is not counted", () => {
    // The failure direction that costs money is "unknown host treated as a
    // customer", so this must never become a denylist of dev-looking names.
    expect(isMeasurableHost("conagentes.com.evil.test")).toBe(false);
    expect(isMeasurableHost("notconagentes.com")).toBe(false);
    expect(isMeasurableHost("staging.conagentes.com")).toBe(false);
  });
});

describe("hasOptOutCookie", () => {
  it("finds the marker on its own and among others", () => {
    expect(hasOptOutCookie(`${OPTOUT_COOKIE}=1`)).toBe(true);
    expect(hasOptOutCookie(`cga_vid=abc; ${OPTOUT_COOKIE}=1; cga_consent=granted`)).toBe(true);
  });

  it("is false when absent, empty or turned off", () => {
    expect(hasOptOutCookie(null)).toBe(false);
    expect(hasOptOutCookie("")).toBe(false);
    expect(hasOptOutCookie("cga_vid=abc; cga_consent=granted")).toBe(false);
  });

  it("does not match a different cookie whose name merely contains ours", () => {
    // `cga_internal_other=1` must not exclude a real visitor for ever.
    expect(hasOptOutCookie(`${OPTOUT_COOKIE}_other=1`)).toBe(false);
  });
});

describe("optOutIntent", () => {
  it("turns on, turns off, and stays silent when not mentioned", () => {
    expect(optOutIntent("?nocount=1")).toBe("on");
    expect(optOutIntent("?nocount")).toBe("on");
    expect(optOutIntent("?utm_source=x&nocount=1")).toBe("on");
    // The off switch is the half that is easy to forget and impossible to work
    // around later: without it, the browser most in need of seeing the site as
    // a customer does is excluded from its own funnel for good.
    expect(optOutIntent("?nocount=0")).toBe("off");
    expect(optOutIntent("?nocount=false")).toBe("off");
    expect(optOutIntent("")).toBeNull();
    expect(optOutIntent("?utm_source=x")).toBeNull();
  });
});
