"use client";

import type { ReactNode } from "react";
import { Check, ReceiptText } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import { GlowCard } from "@/components/marketing/animation/glow-card";
import { formatCOP } from "@/components/marketing/story/story-script";

interface SpotlightProps {
  eyebrow: string;
  badge?: string;
  title: string;
  highlight: string;
  body: string;
  bullets: string[];
  visual: ReactNode;
  reverse?: boolean;
}

function Spotlight({
  eyebrow,
  badge,
  title,
  highlight,
  body,
  bullets,
  visual,
  reverse,
}: SpotlightProps) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Text */}
      <ScrollReveal
        direction={reverse ? "left" : "right"}
        className={reverse ? "lg:order-2" : ""}
      >
        <p className="mb-4 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-neon">
          {eyebrow}
          {badge && (
            <span className="rounded-full border border-white/[0.12] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium normal-case tracking-wide text-[oklch(0.62_0.005_95)]">
              {badge}
            </span>
          )}
        </p>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
          {title}{" "}
          <span className="bg-gradient-to-r from-[oklch(0.86_0.27_148)] to-[oklch(0.72_0.25_148)] bg-clip-text text-transparent">
            {highlight}
          </span>
        </h3>
        <p className="mt-5 text-lg leading-relaxed text-[oklch(0.62_0.005_95)]">
          {body}
        </p>
        <ul className="mt-6 space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[oklch(0.86_0.27_148/0.15)]">
                <Check className="h-3 w-3 text-[oklch(0.86_0.27_148)]" />
              </span>
              <span className="text-sm text-[oklch(0.78_0.005_95)]">{b}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>

      {/* Visual */}
      <ScrollReveal
        direction={reverse ? "right" : "left"}
        className={reverse ? "lg:order-1" : ""}
      >
        <div className="flex justify-center">{visual}</div>
      </ScrollReveal>
    </div>
  );
}

/* ── Self-learning loop visual ── */
function LearningVisual() {
  const steps = [
    {
      tag: "Cliente pregunta",
      text: "¿Hacen envíos hasta Leticia?",
      tone: "customer" as const,
    },
    {
      tag: "El agente le pregunta a tu equipo",
      text: "Sí, llega en 2 días con flete adicional.",
      tone: "team" as const,
    },
    {
      tag: "Aprendido para siempre",
      text: "El agente ya responde esto solo. ✓",
      tone: "learned" as const,
    },
  ];
  return (
    <GlowCard className="w-[300px] sm:w-[340px] rounded-2xl border border-white/[0.08] bg-[oklch(0.10_0.01_95)] p-5">
      <div className="space-y-3">
        {steps.map((s, i) => (
          <div key={s.tag} className="relative">
            {i < steps.length - 1 && (
              <div className="absolute left-4 top-9 h-[calc(100%-4px)] w-px bg-gradient-to-b from-[oklch(0.86_0.27_148/0.4)] to-transparent" />
            )}
            <div className="flex gap-3">
              <span
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
                  s.tone === "learned"
                    ? "bg-[oklch(0.86_0.27_148)] text-[oklch(0.20_0.01_95)]"
                    : "bg-white/[0.06] text-[oklch(0.86_0.27_148)]"
                }`}
              >
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-[10px] font-medium uppercase tracking-wider text-[oklch(0.50_0.005_95)]">
                  {s.tag}
                </p>
                <div
                  className={`mt-1 rounded-xl px-3 py-2 text-[12px] leading-relaxed ${
                    s.tone === "customer"
                      ? "bg-[oklch(0.86_0.27_148/0.12)] text-[oklch(0.90_0.005_95)]"
                      : s.tone === "learned"
                        ? "bg-[oklch(0.86_0.27_148/0.10)] text-[oklch(0.86_0.27_148)] font-semibold"
                        : "bg-[oklch(0.18_0.01_95)] text-[oklch(0.84_0.005_95)]"
                  }`}
                >
                  {s.text}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlowCard>
  );
}

/* ── DIAN e-invoice visual ── */
function InvoiceVisual() {
  return (
    <GlowCard className="w-[300px] sm:w-[340px] rounded-2xl border border-white/[0.08] bg-[oklch(0.10_0.01_95)] p-5">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <ReceiptText className="h-4 w-4 text-[oklch(0.86_0.27_148)]" />
          <span className="text-[13px] font-bold text-white">
            Factura electrónica
          </span>
        </div>
        <span className="rounded-full bg-[oklch(0.72_0.25_148/0.15)] px-2.5 py-1 text-[9px] font-bold text-[oklch(0.80_0.18_148)]">
          DIAN ✓
        </span>
      </div>
      <div className="mt-3 space-y-1.5 text-[11px]">
        <div className="flex justify-between text-[oklch(0.70_0.005_95)]">
          <span>FE-2042 · Surti Express</span>
          <span>NIT 900.xxx</span>
        </div>
        <div className="flex justify-between text-[oklch(0.55_0.005_95)]">
          <span>CUFE</span>
          <span className="font-mono">a1b2c3…f9</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/[0.08] pt-3">
        <span className="text-[12px] text-[oklch(0.70_0.005_95)]">Total</span>
        <span className="text-[15px] font-bold text-[oklch(0.86_0.27_148)]">
          {formatCOP(401000)}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-[oklch(0.86_0.27_148/0.10)] py-2">
        <span className="text-[11px] font-semibold text-[oklch(0.86_0.27_148)]">
          Emitida y enviada automáticamente
        </span>
      </div>
    </GlowCard>
  );
}

export function SpotlightsSection() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.08_0.01_95)] py-24 md:py-32">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-[oklch(0.86_0.27_148/0.05)] blur-[120px]" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-24 px-6 md:gap-32">
        <Spotlight
          eyebrow="Aprende solo"
          title="El agente que"
          highlight="se vuelve más inteligente"
          body="Cuando hay algo que no sabe, no inventa: le pregunta a tu equipo por WhatsApp, le responde al cliente con esa información y la guarda para siempre. Cada semana atiende mejor, sin que tú lo entrenes."
          bullets={[
            "Nunca responde “no sé” dos veces",
            "Aprende de las respuestas de tu equipo",
            "Dejas de responder lo mismo una y otra vez",
          ]}
          visual={<LearningVisual />}
        />
        <Spotlight
          reverse
          eyebrow="Cumple sin esfuerzo"
          badge="Próximamente"
          title="Factura electrónica"
          highlight="DIAN, automática"
          body="Cuando el cliente paga, se genera la factura electrónica válida ante la DIAN a nombre de tu empresa — emitida y enviada sola. Sin digitar, sin software contable extra, sin multas."
          bullets={[
            "Válida ante la DIAN, a nombre de tu negocio",
            "Se emite sola después del pago",
            "Cero trabajo manual, cero riesgo de sanción",
          ]}
          visual={<InvoiceVisual />}
        />
      </div>
    </section>
  );
}
