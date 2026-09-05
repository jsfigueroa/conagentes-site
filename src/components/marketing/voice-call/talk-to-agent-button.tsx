"use client";

import { Phone } from "lucide-react";
import { useVoiceCall } from "./voice-call-context";

/**
 * «Hablar con un agente de IA» (CON-260).
 *
 * Two variants so the same action can sit next to the primary CTA without
 * competing with it: `outline` (the default) is the quiet partner beside
 * «Pedir demo», `brand` carries the gradient when it IS the primary action on
 * its section.
 *
 * The label says "de IA" on purpose. Telling the visitor they are about to talk
 * to a machine costs a fraction of the clicks and buys the only thing that makes
 * the call persuasive: the moment, thirty seconds in, when they realise how well
 * it is going.
 */
export function TalkToAgentButton({
  source = "hoteles",
  variant = "outline",
  className = "",
  label = "Hablar con un agente de IA",
}: {
  source?: string;
  /** `on-dark` for the hero's dark canvas, where `border-border` disappears. */
  variant?: "outline" | "brand" | "on-dark";
  className?: string;
  label?: string;
}) {
  const { open } = useVoiceCall();

  const base =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--orange)]";
  const skin =
    variant === "brand"
      ? "btn-brand"
      : variant === "on-dark"
        ? "border border-white/[0.14] text-white hover:bg-white/[0.05]"
        : "border border-border bg-card text-foreground hover:bg-muted";

  return (
    <button type="button" onClick={() => open(source)} className={`${base} ${skin} ${className}`}>
      <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
      {label}
    </button>
  );
}
