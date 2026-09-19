"use client";

import { useReportWebVitals } from "next/web-vitals";
import { track } from "@/lib/analytics/client";

/**
 * Core Web Vitals, measured on real visitors (CON-292).
 *
 * `next/web-vitals` ships with the framework, so this costs one component and
 * no dependency — where Vercel Speed Insights would be a paid product telling
 * us the same numbers in a place they cannot be joined to anything.
 *
 * The thresholds are Google's published "good" boundaries. We store the rating
 * alongside the raw value so a dashboard can show a share-of-good without
 * hard-coding the numbers in SQL, and so a future threshold change does not
 * silently reinterpret old rows.
 */
const GOOD: Record<string, number> = {
  LCP: 2500, // ms — largest contentful paint
  INP: 200, // ms — interaction to next paint
  CLS: 0.1, // unitless — cumulative layout shift
  FCP: 1800, // ms
  TTFB: 800, // ms
};

const NEEDS_WORK: Record<string, number> = {
  LCP: 4000,
  INP: 500,
  CLS: 0.25,
  FCP: 3000,
  TTFB: 1800,
};

export function WebVitals() {
  useReportWebVitals((metric) => {
    const name = metric.name;
    const good = GOOD[name];
    const poor = NEEDS_WORK[name];
    const rating = good === undefined ? "unknown" : metric.value <= good ? "good" : metric.value <= poor ? "needs_improvement" : "poor";

    track("web_vital", {
      metric: name,
      // CLS is a small decimal; rounding it to an integer would record every
      // sample as 0 and quietly report a perfect score forever.
      value: name === "CLS" ? Number(metric.value.toFixed(4)) : Math.round(metric.value),
      rating,
    });
  });

  return null;
}
