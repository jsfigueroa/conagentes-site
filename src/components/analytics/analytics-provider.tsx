"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { startAnalytics, track, trackOnce, getConsent, __analyticsInternals } from "@/lib/analytics/client";
import { SCROLL_DEPTHS } from "@/lib/analytics/events";

/**
 * Mounts the measurement layer once for the whole marketing site (CON-292).
 *
 * Everything here is passive: page views, how far down people got, how long
 * they were actually looking, and which sections of the scroll story they
 * reached. The deliberate CTA/funnel events live at their own call sites,
 * because an event fired far from the thing it describes is an event that
 * silently stops being true when someone moves a button.
 *
 * `useSearchParams` is avoided on purpose — reading it here would opt every
 * marketing page into dynamic rendering and cost us the static generation the
 * whole GEO strategy depends on. Query parameters are read straight off
 * `location` inside the analytics client instead.
 */
export function AnalyticsProvider() {
  const pathname = usePathname();
  const anonPinged = useRef<Set<string>>(new Set());

  useEffect(() => {
    startAnalytics();
  }, []);

  // --- page view + the pre-consent count ------------------------------------
  useEffect(() => {
    if (!pathname) return;

    if (getConsent() === "granted") {
      // `trackOnce`, not a ref guard: StrictMode mounts this effect twice in
      // development and would otherwise double-count every page view.
      trackOnce("page_view", "page_view", { referrer_host: safeReferrerHost() });
    } else if (getConsent() === "pending" && !anonPinged.current.has(pathname)) {
      // One identifier-less count per page while the banner is up, so the
      // traffic denominator is true even for visitors who never choose.
      anonPinged.current.add(pathname);
      __analyticsInternals.anonymousPing();
    }
  }, [pathname]);

  // --- scroll depth ---------------------------------------------------------
  useEffect(() => {
    if (!pathname) return;

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // A page shorter than the viewport is 100% read the moment it loads;
      // recording that as a depth milestone would flatter every short page.
      if (scrollable < 200) return;
      const pct = ((window.scrollY || doc.scrollTop) / scrollable) * 100;
      for (const d of SCROLL_DEPTHS) {
        if (pct >= d) trackOnce(`scroll_depth:${d}`, "scroll_depth", { depth: d });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // --- engaged time ---------------------------------------------------------
  // Wall-clock "time on page" counts the tab someone left open over lunch.
  // This only accrues while the page is visible, so it measures attention.
  useEffect(() => {
    if (!pathname) return;
    let accrued = 0;
    let since = document.visibilityState === "visible" ? Date.now() : null;

    const settle = () => {
      if (since !== null) {
        accrued += Date.now() - since;
        since = null;
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") since = Date.now();
      else settle();
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      settle();
      const seconds = Math.round(accrued / 1000);
      // Under three seconds is a bounce or a mis-click, not a read.
      if (seconds >= 3) track("engaged_time", { seconds });
    };
  }, [pathname]);

  // --- sections of the scroll story ----------------------------------------
  // The five-act story on `/` is the site's core asset, so knowing which act
  // people stop at is worth more than any aggregate scroll number. Any element
  // with `data-track-section="name"` is counted once per page view.
  useEffect(() => {
    if (!pathname || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name = (entry.target as HTMLElement).dataset.trackSection;
          if (!name) continue;
          trackOnce(`section:${name}`, "section_view", { section: name });
          observer.unobserve(entry.target);
        }
      },
      // Half of it on screen: enough to say it was reached, not so much that a
      // tall section on a short viewport can never qualify.
      { threshold: 0.5 }
    );

    // Sections mount with the page's animations, so a single pass at mount
    // misses most of them.
    const attach = () => {
      document.querySelectorAll<HTMLElement>("[data-track-section]").forEach((el) => observer.observe(el));
    };
    attach();
    const retry = setTimeout(attach, 1200);

    return () => {
      clearTimeout(retry);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

function safeReferrerHost(): string | null {
  try {
    return document.referrer ? new URL(document.referrer).hostname : null;
  } catch {
    return null;
  }
}
