"use client";

import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import { AnimatedCounter } from "@/components/marketing/animation/animated-counter";
import { Marquee } from "@/components/marketing/animation/marquee";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/marketing/animation/stagger";

const stats = [
  { value: 2400, suffix: "+", label: "Conversaciones gestionadas" },
  { value: 98.5, suffix: "%", decimals: 1, label: "Tasa de respuesta" },
  { value: 30, prefix: "< ", suffix: "s", label: "Tiempo promedio de respuesta" },
  { value: 500, suffix: "+", label: "Negocios activos" },
];

const testimonials = [
  {
    quote:
      "Antes perdíamos el 60% de los mensajes que llegaban después de las 6pm. Con conagentes, cada mensaje tiene respuesta en segundos.",
    author: "Carolina M.",
    role: "Directora, Hotel Boutique Cartagena",
  },
  {
    quote:
      "Triplicamos las matrículas en un semestre. El agente precalifica estudiantes y solo nos llegan los que están listos para inscribirse.",
    author: "Andrés R.",
    role: "Rector, Academia Lingua",
  },
  {
    quote:
      "Mi equipo pasó de perseguir leads en WhatsApp a cerrar ventas. El pipeline nos da visibilidad completa del embudo.",
    author: "Juliana P.",
    role: "Gerente Comercial, Inmobiliaria Habitat",
  },
];

const clientNames = [
  "Hotel Boutique Cartagena",
  "Academia Lingua",
  "Clínica Vital",
  "Inmobiliaria Habitat",
  "Restaurante Sabor Local",
  "Centro Wellness",
  "Colegio Moderno",
  "Hotel Playa Azul",
];

export function SocialProofSection() {
  return (
    <section className="py-24 md:py-32 bg-[oklch(0.08_0.01_95)] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Stats row */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              <AnimatedCounter
                to={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                decimals={stat.decimals}
                className="text-4xl md:text-5xl font-bold text-neon"
              />
              <p className="mt-2 text-sm text-[oklch(0.5_0.005_95)]">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Testimonials */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Negocios reales. Resultados reales.
          </h2>
        </ScrollReveal>

        <StaggerContainer
          staggerDelay={0.15}
          className="grid md:grid-cols-3 gap-6 mb-20"
        >
          {testimonials.map((t) => (
            <StaggerItem key={t.author}>
              <div className="h-full rounded-2xl border border-white/[0.06] bg-[oklch(0.1_0.01_95)] p-8 flex flex-col">
                <blockquote className="text-[oklch(0.75_0.005_95)] leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 pt-6 border-t border-white/[0.06]">
                  <p className="font-semibold text-white text-sm">
                    {t.author}
                  </p>
                  <p className="text-xs text-[oklch(0.45_0.005_95)] mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Logo marquee */}
        <div className="relative">
          <p className="text-center text-xs font-medium text-[oklch(0.35_0.005_95)] uppercase tracking-widest mb-8">
            Empresas que confían en conagentes
          </p>
          <Marquee
            speed={30}
            pauseOnHover
            className="[--gradient-from:oklch(0.08_0.01_95)]"
          >
            {clientNames.map((name) => (
              <span
                key={name}
                className="text-base font-semibold text-white/30 hover:text-white/60 transition-colors whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
