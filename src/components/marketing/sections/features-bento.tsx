"use client";

import {
  Camera,
  Mic,
  UserCheck,
  CreditCard,
  RefreshCw,
  Image as ImageIcon,
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
    icon: Camera,
    title: "WhatsApp e Instagram, una sola bandeja",
    description:
      "Tus clientes te escriben por donde quieran y tu agente responde igual de bien en ambos. Tu equipo trabaja en un solo lugar, sin saltar entre apps.",
    span: "md:col-span-2 md:row-span-2",
    highlight: true,
  },
  {
    icon: Mic,
    title: "Entiende notas de voz",
    description:
      "El cliente manda un audio y tu agente lo entiende y responde. Como hablan de verdad en Colombia.",
    span: "",
    highlight: false,
  },
  {
    icon: UserCheck,
    title: "Pasa a un humano sin perder el hilo",
    description:
      "Cuando hace falta una persona, toma la conversación al instante — con todo el contexto a la mano — y la devuelve a la IA cuando quiera.",
    span: "",
    highlight: false,
  },
  {
    icon: CreditCard,
    title: "Cobra por WhatsApp",
    description:
      "Envía el link de pago en el chat y recibe con tarjeta, PSE o Nequi. La plata llega directo a tu cuenta.",
    span: "",
    highlight: false,
  },
  {
    icon: RefreshCw,
    title: "Conecta tu contabilidad",
    description:
      "Tus clientes, productos y ventas se sincronizan con tu sistema contable. Tus libros siempre al día, sin doble digitación.",
    span: "",
    highlight: false,
  },
  {
    icon: ImageIcon,
    title: "Catálogo con fotos",
    description:
      "Carga tus productos con imagen, variantes y precio. El agente los muestra en el chat como lo haría tu mejor vendedor.",
    span: "",
    highlight: false,
  },
];

export function FeaturesBentoSection() {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-4">
            Y mucho más
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Todo lo que tu negocio necesita, en un solo lugar
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Más allá del recorrido, conagentes trae todo lo que esperas de una
            plataforma completa.
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
                className={`h-full rounded-2xl border p-8 ${
                  feature.highlight
                    ? "border-neon/20 bg-gradient-to-br from-[oklch(0.86_0.27_148/0.06)] to-card"
                    : "border-border bg-card"
                }`}
              >
                <TiltCard tiltStrength={12} className="h-full flex flex-col">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${
                      feature.highlight
                        ? "bg-neon text-ink"
                        : "bg-neon/10 text-neon"
                    }`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3
                    className={`font-bold mb-3 text-foreground ${
                      feature.highlight ? "text-2xl" : "text-lg"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-muted-foreground leading-relaxed ${
                      feature.highlight ? "text-base" : "text-sm"
                    }`}
                  >
                    {feature.description}
                  </p>
                </TiltCard>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
