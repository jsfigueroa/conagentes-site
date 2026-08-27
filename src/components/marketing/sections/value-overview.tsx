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
    title: "Vende por usted",
    description:
      "Atiende a cada cliente por WhatsApp al instante, muestra sus productos y cierra la venta — de día y de noche.",
  },
  {
    icon: LayoutDashboard,
    title: "Organiza solo",
    description:
      "Cada conversación, pedido y cliente queda guardado y ordenado automáticamente. Usted deja de digitar.",
  },
  {
    icon: Sparkles,
    title: "Se anticipa",
    description:
      "Aprende cómo compra cada cliente, calcula cuándo va a volver a pedir y le dice a quién buscar esta semana.",
  },
];

export function ValueOverviewSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-4">
            Su nuevo equipo de ventas
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Tres cosas que hoy no alcanza a hacer.
            <br />
            <span className="text-neon">Su agente las hace todos los días.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Vende, ordena y se anticipa — en el mismo WhatsApp donde ya le
            escriben sus clientes.
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
