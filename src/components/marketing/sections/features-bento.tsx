"use client";

import {
  MessageSquare,
  Kanban,
  CalendarDays,
  Inbox,
  BarChart3,
  Users,
} from "lucide-react";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import { GlowCard } from "@/components/marketing/animation/glow-card";
import { TiltCard } from "@/components/marketing/animation/tilt-card";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/marketing/animation/stagger";

const features = [
  {
    icon: MessageSquare,
    title: "Agente IA 24/7",
    description:
      "Responde preguntas, califica leads y agenda citas en WhatsApp — en lenguaje natural, sin intervención humana.",
    span: "md:col-span-2 md:row-span-2",
    highlight: true,
  },
  {
    icon: Kanban,
    title: "Pipeline visual",
    description:
      "Arrastra cada lead por etapas. Ve exactamente cuántas ventas vas a cerrar esta semana.",
    span: "",
    highlight: false,
  },
  {
    icon: CalendarDays,
    title: "Calendario inteligente",
    description:
      "Agenda citas desde WhatsApp. Recordatorios automáticos y confirmaciones sin levantar un dedo.",
    span: "",
    highlight: false,
  },
  {
    icon: Inbox,
    title: "Bandeja unificada",
    description:
      "Todas las conversaciones de WhatsApp en un solo lugar. Asigna, etiqueta y responde desde el dashboard.",
    span: "",
    highlight: false,
  },
  {
    icon: BarChart3,
    title: "Analítica en tiempo real",
    description:
      "Tasa de conversión, volumen de mensajes, rendimiento del equipo — todo en dashboards que se actualizan al instante.",
    span: "",
    highlight: false,
  },
  {
    icon: Users,
    title: "Gestión de equipo",
    description:
      "Roles, asignaciones y métricas por persona. Sabes quién respondió qué sin pedir reportes.",
    span: "",
    highlight: false,
  },
];

export function FeaturesBentoSection() {
  return (
    <section
      id="features"
      className="relative py-24 md:py-32 bg-[oklch(0.08_0.01_95)] overflow-hidden"
    >
      {/* Glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[oklch(0.86_0.27_148/0.06)] blur-[120px]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.86 0.27 148) 1px, transparent 1px), linear-gradient(90deg, oklch(0.86 0.27 148) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-4">
            Todo lo que necesitas
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Una plataforma completa para tu negocio
          </h2>
          <p className="mt-4 text-lg text-[oklch(0.55_0.005_95)]">
            No más herramientas desconectadas. Todo en un solo lugar.
          </p>
        </ScrollReveal>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]"
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title} className={feature.span}>
              <GlowCard
                glowColor="oklch(0.86 0.27 148)"
                className={`h-full rounded-2xl border border-white/[0.06] p-8 ${
                  feature.highlight
                    ? "bg-gradient-to-br from-[oklch(0.86_0.27_148/0.08)] to-[oklch(0.12_0.01_95)]"
                    : "bg-[oklch(0.1_0.01_95)]"
                }`}
              >
                <TiltCard tiltStrength={12} className="h-full flex flex-col">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${
                      feature.highlight
                        ? "bg-neon text-ink"
                        : "bg-white/[0.06] text-neon"
                    }`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3
                    className={`font-bold mb-3 ${
                      feature.highlight ? "text-2xl text-white" : "text-lg text-white"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-[oklch(0.55_0.005_95)] leading-relaxed ${
                      feature.highlight ? "text-base" : "text-sm"
                    }`}
                  >
                    {feature.description}
                  </p>
                  {feature.highlight && (
                    <div className="mt-auto pt-6">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-neon">
                        Conoce al agente
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  )}
                </TiltCard>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
