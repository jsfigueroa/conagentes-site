"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent, type ConsentState } from "@/lib/analytics/client";

/**
 * Consent for measurement (CON-292), Ley 1581 de 2012 + Decreto 1377 de 2013.
 *
 * Colombian law wants prior, informed and express authorization before we hold
 * data that can be associated with a determinable person. A durable visitor
 * identifier tied to browsing behaviour is comfortably inside that definition,
 * so it does not exist until someone presses «Aceptar».
 *
 * We sell compliance to hoteliers. A dark-pattern banner on our own site — the
 * refuse button greyed out, or an "accept" that keeps the cookie either way —
 * would be the cheapest possible way to lose that argument in a sales call.
 * So: two buttons of equal weight, a real refusal that deletes what exists,
 * and a link to the policy before the choice rather than after.
 *
 * It is a bar, not a modal. Blocking the page to ask permission to count
 * page views would cost more conversions than the measurement is worth.
 */
export function ConsentBanner() {
  const [state, setState] = useState<ConsentState | null>(null);

  useEffect(() => {
    // Read after mount: the cookie is not available during SSR, and rendering
    // the bar server-side would flash it at everyone who already decided.
    setState(getConsent());
  }, []);

  if (state !== "pending") return null;

  const choose = (choice: "granted" | "essential") => {
    setConsent(choice);
    setState(choice);
  };

  return (
    <div
      role="region"
      aria-label="Preferencias de privacidad"
      // The floating call button sits in the bottom-left corner on phones and
      // was landing on top of «Solo lo esencial» — an obstructed hit target on
      // the one control that has to be genuinely reachable for the refusal to
      // mean anything. The extra bottom space on small screens clears it.
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+5.5rem))] pt-3 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-300 sm:pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-card/95 p-5 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:gap-6">
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-muted-foreground">
          Usamos cookies propias para entender cómo se usa el sitio y mejorarlo. No compartimos
          su navegación con terceros ni guardamos su dirección IP.{" "}
          <Link
            href="/privacidad"
            className="font-medium text-foreground underline underline-offset-4 hover:text-[var(--orange)]"
          >
            Política de privacidad
          </Link>
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="min-h-11 cursor-pointer rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--orange)]"
          >
            Solo lo esencial
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="btn-brand min-h-11 cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--orange)]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
