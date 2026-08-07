"use client";

import { Bot, BarChart3, Layers } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/marketing/animation/stagger";

const pillars = [
  {
    icon: Bot,
    title: "Agentes IA",
    description:
      "Tu agente entiende contexto, responde preguntas, califica leads y agenda citas — en lenguaje natural por WhatsApp.",
    color: "oklch(0.74 0.185 50)",
  },
  {
    icon: BarChart3,
    title: "CRM inteligente",
    description:
      "Pipeline visual, bandeja de conversaciones unificada, analítica en tiempo real y gestión de equipo — en una sola plataforma.",
    color: "oklch(0.74 0.185 50)",
  },
  {
    icon: Layers,
    title: "Módulos por industria",
    description:
      "Reservaciones para hoteles, matrículas para educación y más. Cada módulo se adapta a las necesidades de tu sector.",
    color: "oklch(0.74 0.185 50)",
  },
];

export function SolutionSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Transformation text */}
          <ScrollReveal direction="left">
            <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-4">
              La solución
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              De caos manual a{" "}
              <span className="text-neon">piloto automático</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Imagina que cada mensaje recibe respuesta en menos de 30 segundos,
              las reservas se confirman solas, y tu equipo se enfoca en lo que
              realmente importa: la experiencia del cliente.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              <strong className="text-foreground">conagentes</strong> es el
              puente. Conectamos tu WhatsApp con un CRM inteligente y agentes de
              IA que trabajan por ti — 24 horas, 7 días a la semana.
            </p>
          </ScrollReveal>

          {/* Right: Three pillars */}
          <StaggerContainer staggerDelay={0.15} className="space-y-6">
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div className="flex gap-5 p-6 rounded-2xl border border-border bg-card hover:border-neon/20 transition-colors">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                    style={{ backgroundColor: `${pillar.color}15` }}
                  >
                    <pillar.icon
                      className="w-6 h-6"
                      style={{ color: pillar.color }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
