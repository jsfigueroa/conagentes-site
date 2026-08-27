"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Smartphone, Cpu, Rocket } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";

const steps = [
  {
    number: "01",
    icon: Smartphone,
    title: "Conecte su WhatsApp",
    description:
      "Vincule su número de WhatsApp Business con un par de clics. Su número y su marca, sobre la API oficial de Meta.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Cargue su negocio",
    description:
      "Suba sus productos, sus precios y sus políticas. Su agente responde con esa información — y solo con esa.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Pruébelo y enciéndalo",
    description:
      "Ensáyelo con conversaciones reales y sálgale en vivo cuando esté conforme. Desde ahí atiende 24/7, arma pedidos y le avisa a quién buscar.",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="relative flex gap-8 items-start"
    >
      {/* Vertical line connector */}
      {index < steps.length - 1 && (
        <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-neon/30 to-transparent hidden md:block" />
      )}

      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-neon text-ink font-bold text-sm shrink-0">
        {step.number}
      </div>
      <div className="pb-16">
        <div className="flex items-center gap-3 mb-3">
          <step.icon className="w-5 h-5 text-neon" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            {step.title}
          </h3>
        </div>
        <p className="text-muted-foreground leading-relaxed max-w-lg">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-4">
            Puesta en marcha
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Tres pasos para ponerlo a vender
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Sin desarrolladores y sin proyectos de meses: lo montamos con
            usted, lo prueba con sus datos y usted decide cuándo sale en vivo.
          </p>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
