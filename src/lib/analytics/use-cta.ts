"use client";

import { useCallback, useEffect, useRef } from "react";
import { track } from "./client";

/**
 * Impression + click tracking for one call to action (CON-292).
 *
 * The impression half is the part people skip, and it is the half that makes
 * the click number mean anything. A CTA clicked by 0.4% of visitors is either
 * badly worded or never seen, and those two have opposite fixes — rewrite the
 * copy, or move the button. Clicks alone cannot tell them apart; clicks over
 * impressions can, immediately.
 *
 * Usage:
 *   const cta = useCta("hablar_con_agente", { source, variant });
 *   <button ref={cta.ref} onClick={() => { cta.clicked(); open(); }}>
 */
export function useCta(cta: string, meta: Record<string, string | number | boolean> = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const seen = useRef(false);
  // Kept in a ref so a parent re-render with a new object literal does not
  // re-run the observer effect and re-arm an impression we already counted.
  const metaRef = useRef(meta);
  metaRef.current = meta;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || seen.current) continue;
          seen.current = true;
          track("cta_view", { cta, ...metaRef.current });
          observer.disconnect();
        }
      },
      // A button is small; requiring half of it on screen is the difference
      // between "scrolled past in the corner" and "actually in front of them".
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [cta]);

  const clicked = useCallback(
    (extra: Record<string, string | number | boolean> = {}) => {
      track("cta_click", { cta, ...metaRef.current, ...extra });
    },
    [cta]
  );

  return { ref, clicked };
}
