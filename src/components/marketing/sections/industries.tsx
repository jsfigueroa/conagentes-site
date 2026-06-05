"use client";

import { useState } from "react";
import {
  Store,
  BedDouble,
  GraduationCap,
  Sparkles,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import { cn } from "@/lib/utils";

const industries = [
  {
    id: "comercio",
    icon: Store,
    label: "Comercio",
    headline: "Vende tu catálogo por WhatsApp",
    description:
      "Para tiendas, distribuidoras y mayoristas: tu agente cotiza, arma pedidos completos y ayuda a que cada cliente vuelva a comprar.",
    features: [
      "Catálogo con fotos y precios",
      "Pedidos consolidados al instante",
      "Cobros y factura electrónica",
      "Recompra anticipada por cliente",
    ],
  },
  {
    id: "hoteleria",
    icon: BedDouble,
    label: "Hotelería",
    headline: "El recepcionista que nunca duerme",
    description:
      "Tu agente responde por disponibilidad, muestra las habitaciones, confirma reservas y atiende al huésped — todo por WhatsApp.",
    features: [
      "Consulta de disponibilidad",
      "Reservas por WhatsApp",
      "Gestión de huéspedes y servicios",
      "Recordatorios automáticos",
    ],
  },
  {
    id: "educacion",
    icon: GraduationCap,
    label: "Educación",
    headline: "Matricula estudiantes mientras duermes",
    description:
      "Desde la primera consulta hasta la matrícula, el agente guía al estudiante, resuelve dudas y recoge los documentos.",
    features: [
      "Embudo de admisiones automatizado",
      "Recolección de documentos",
      "Información de programas y fechas",
      "Campañas por WhatsApp",
    ],
  },
  {
    id: "tusector",
    icon: Sparkles,
    label: "Tu sector",
    headline: "Hecho a la medida de tu negocio",
    description:
      "Salud, inmobiliarias, servicios y más. conagentes se adapta a cómo trabajas tú — no al revés.",
    features: [
      "Se ajusta a tu forma de vender",
      "Atención y agenda por WhatsApp",
      "CRM y pipeline a tu medida",
      "Lo configuramos contigo",
    ],
  },
];

export function IndustriesSection() {
  const [active, setActive] = useState("comercio");
  const current = industries.find((i) => i.id === active)!;

  return (
    <section id="industries" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-4">
            Para cualquier negocio
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Se adapta a tu negocio
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No es un CRM genérico — se ajusta a tu sector y a cómo vendes tú.
          </p>
        </ScrollReveal>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setActive(industry.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                active === industry.id
                  ? "bg-neon text-ink shadow-[0_0_20px_oklch(0.86_0.27_148/0.3)]"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <industry.icon className="w-4 h-4" />
              {industry.label}
            </button>
          ))}
        </div>

        {/* Active industry */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {current.headline}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {current.description}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <ul className="space-y-4">
                {current.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neon/10">
                      <Check className="h-3.5 w-3.5 text-neon" />
                    </span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
