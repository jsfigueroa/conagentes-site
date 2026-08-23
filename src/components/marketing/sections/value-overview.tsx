"use client";

import { MessageCircle, LayoutDashboard, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/marketing/animation/stagger";

const promises = [
  {
    icon: MessageCircle,
    title: "Reserva por usted",
    description:
      "Atiende a cada huésped al instante, cotiza con la disponibilidad real de sus habitaciones y cierra la reserva — de día y de madrugada.",
  },
  {
    icon: LayoutDashboard,
    title: "Organiza solo",
    description:
      "Cada conversación, reserva y huésped queda guardado y ordenado automáticamente. Usted deja de digitar.",
  },
  {
    icon: Sparkles,
    title: "Se anticipa",
    description:
      "Sube el valor de cada estadía con upgrades y servicios, y le dice a qué huésped buscar para que vuelva directo.",
  },
];

export function ValueOverviewSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-4">
            Su nueva recepción comercial
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            No es otro chatbot.
            <br />
            <span className="text-neon">Es quien llena su alojamiento.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Un agente IA que reserva, organiza y se anticipa — donde ya le
            escriben sus huéspedes.
          </p>
        </ScrollReveal>

        <StaggerContainer
          staggerDelay={0.15}
          className="grid md:grid-cols-3 gap-6"
        >
          {promises.map((p) => (
            <StaggerItem key={p.title}>
              <div className="h-full rounded-2xl border border-border bg-card p-8 hover:border-neon/20 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-neon/10 text-neon mb-6">
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {p.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
