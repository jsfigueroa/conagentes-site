"use client";

import { MessageSquareOff, FolderSearch, UserMinus } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/marketing/animation/stagger";

const pains = [
  {
    icon: MessageSquareOff,
    title: "Mensajes sin responder",
    description:
      "El 60% de los mensajes llegan fuera de horario. Sin respuesta inmediata, el cliente elige a otro.",
    stat: "60%",
    statLabel: "de mensajes llegan fuera de horario",
  },
  {
    icon: FolderSearch,
    title: "Datos en todas partes",
    description:
      "WhatsApp, Excel, cuadernos. Tu equipo pierde horas buscando información que debería estar en un solo lugar.",
    stat: "4h",
    statLabel: "promedio de respuesta sin automatizar",
  },
  {
    icon: UserMinus,
    title: "Crecimiento limitado",
    description:
      "No puedes atender más clientes sin contratar más personas. Cada nuevo empleado es un costo fijo más.",
    stat: "3x",
    statLabel: "más costoso que automatizar",
  },
];

export function PainPointsSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-4">
            El problema
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            ¿Tu negocio pierde clientes todos los días?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Si tu equipo no puede responder al instante, alguien más lo hará.
          </p>
        </ScrollReveal>

        <StaggerContainer
          staggerDelay={0.15}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {pains.map((pain) => (
            <StaggerItem key={pain.title}>
              <div className="group relative rounded-2xl border border-border bg-card p-8 hover:border-neon/30 hover:shadow-[0_0_30px_oklch(0.86_0.27_148/0.06)] transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-destructive/10 text-destructive mb-6">
                  <pain.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {pain.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pain.description}
                </p>
                <div className="mt-6 pt-6 border-t border-border">
                  <span className="text-3xl font-bold text-destructive">
                    {pain.stat}
                  </span>
                  <span className="block text-sm text-muted-foreground mt-1">
                    {pain.statLabel}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
