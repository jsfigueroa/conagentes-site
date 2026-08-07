"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/marketing/animation/stagger";
import { useDemoForm } from "@/components/marketing/demo-form/demo-form-context";

// Pricing is quote-only + pay-at-activation (matches /precios, /hoteles/precios
// and the two-plan hotel model). We communicate the MODEL, not public tiers.
const pillars = [
  {
    title: "A la medida",
    body: "El plan depende de su volumen, sus canales y lo que quiere lograr. No cobramos por «usuarios» ni por funciones sueltas.",
  },
  {
    title: "Sin sorpresas",
    body: "Precio claro desde el inicio. Usted sabe exactamente qué paga y por qué — sin letra menuda ni costos ocultos.",
  },
  {
    title: "Paga al salir en vivo",
    body: "Configure, entrene y pruebe su agente con su catálogo y sus precios. El cobro se activa solo cuando decide ponerlo a trabajar.",
  },
];

export function PricingSection() {
  const { open } = useDemoForm();

  return (
    <section id="pricing" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-4">
            Precios
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Un plan a la medida de su negocio
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Armamos su plan según su operación y sus objetivos. Sin contratos
            forzados, sin sorpresas — y paga cuando su agente sale en vivo.
          </p>
        </ScrollReveal>

        <StaggerContainer
          staggerDelay={0.15}
          className="grid md:grid-cols-3 gap-6"
        >
          {pillars.map((p) => (
            <StaggerItem key={p.title}>
              <div className="h-full rounded-2xl border border-border bg-card p-8">
                <span className="flex size-9 items-center justify-center rounded-full bg-neon">
                  <Check className="w-5 h-5 text-ink" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-12 flex flex-col items-center gap-4">
          <button
            onClick={() => open("pricing")}
            className="cursor-pointer rounded-full bg-neon px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_0_20px_oklch(0.74_0.185_50/0.3)] transition-all hover:brightness-110"
          >
            Quiero una demo
          </button>
          <Link
            href="/precios"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Cómo cobramos, en detalle
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
