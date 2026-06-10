"use client";

import {
  MessageCircle,
  Camera,
  CreditCard,
  ReceiptText,
  Users,
  ShieldCheck,
} from "lucide-react";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/marketing/animation/stagger";

// Honest, verifiable capability/compliance trust signals — no invented
// metrics, testimonials, or client logos (per brand decision).
const trust = [
  {
    icon: MessageCircle,
    title: "WhatsApp API oficial",
    description: "Conexión directa con Meta. Tu número, seguro y sin bloqueos.",
  },
  {
    icon: Camera,
    title: "Instagram incluido",
    description: "Atiende los DMs de Instagram desde la misma bandeja.",
  },
  {
    icon: CreditCard,
    title: "Pagos colombianos",
    description: "Cobra con PSE, Nequi y tarjeta. La plata llega a tu cuenta.",
  },
  {
    icon: ReceiptText,
    title: "Factura electrónica DIAN",
    description: "Facturación válida ante la DIAN, a nombre de tu empresa.",
    badge: "Próximamente",
  },
  {
    icon: Users,
    title: "Todo tu equipo",
    description: "Roles, asignaciones y permisos para trabajar en orden.",
  },
  {
    icon: ShieldCheck,
    title: "Datos protegidos",
    description: "Cada negocio con su información aislada y segura.",
  },
];

export function SocialProofSection() {
  return (
    <section className="py-24 md:py-32 bg-[oklch(0.08_0.01_95)] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-4">
            Hecho para Colombia
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Listo para vender desde el primer día
          </h2>
          <p className="mt-4 text-lg text-[oklch(0.55_0.005_95)]">
            Las conexiones que tu negocio necesita, ya integradas — sin
            herramientas sueltas ni configuraciones complicadas.
          </p>
        </ScrollReveal>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {trust.map((item) => (
            <StaggerItem key={item.title}>
              <div className="h-full rounded-2xl border border-white/[0.06] bg-[oklch(0.1_0.01_95)] p-7 hover:border-neon/20 transition-colors">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.06] text-neon mb-5">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-white">
                  {item.title}
                  {"badge" in item && item.badge && (
                    <span className="rounded-full border border-white/[0.12] bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-[oklch(0.62_0.005_95)]">
                      {item.badge}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-[oklch(0.55_0.005_95)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
