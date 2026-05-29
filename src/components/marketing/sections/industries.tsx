"use client";

import { useState } from "react";
import {
  BedDouble,
  GraduationCap,
  Building2,
  Stethoscope,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import { cn } from "@/lib/utils";

const industries = [
  {
    id: "hotels",
    icon: BedDouble,
    label: "Hoteles",
    headline: "El recepcionista IA que nunca duerme",
    description:
      "Tu agente responde consultas de disponibilidad, muestra fotos de habitaciones, confirma reservas y hace check-in — todo por WhatsApp. Integra con tu sistema de reservaciones para disponibilidad en tiempo real.",
    features: [
      "Consulta de disponibilidad en tiempo real",
      "Reservas automáticas por WhatsApp",
      "Gestión de huéspedes y servicios",
      "Timeline de ocupación visual",
    ],
    stat: "3x",
    statLabel: "más reservas en 90 días",
    available: true,
  },
  {
    id: "education",
    icon: GraduationCap,
    label: "Educación",
    headline: "Matricula estudiantes mientras duermes",
    description:
      "Desde la primera consulta hasta la matrícula completa, el agente guía al estudiante por todo el proceso — respondiendo preguntas sobre programas, requisitos y fechas, y recolectando documentos.",
    features: [
      "Embudo de matrículas automatizado",
      "Validación de documentos",
      "Pipeline de admisiones visual",
      "Campañas masivas por WhatsApp",
    ],
    stat: "180%",
    statLabel: "incremento en matrículas",
    available: true,
  },
  {
    id: "realestate",
    icon: Building2,
    label: "Inmobiliarias",
    headline: "Convierte cada consulta en una visita agendada",
    description:
      "El agente captura interesados, califica su presupuesto, muestra propiedades disponibles y agenda visitas — sin que tu equipo levante un dedo.",
    features: [
      "Calificación automática de prospectos",
      "Agendamiento de visitas por WhatsApp",
      "Pipeline de ventas inmobiliarias",
      "Seguimiento automático de leads",
    ],
    stat: "67%",
    statLabel: "más visitas agendadas",
    available: false,
  },
  {
    id: "health",
    icon: Stethoscope,
    label: "Salud",
    headline: "Agenda citas médicas sin llamadas",
    description:
      "Pacientes agendan citas, reciben recordatorios y confirman asistencia — todo por WhatsApp. Reduce el no-show y libera a tu equipo administrativo.",
    features: [
      "Agendamiento de citas por WhatsApp",
      "Recordatorios automáticos 24h y 1h antes",
      "Gestión de proveedores y servicios",
      "Seguimiento post-consulta",
    ],
    stat: "45%",
    statLabel: "reducción en no-shows",
    available: false,
  },
];

export function IndustriesSection() {
  const [active, setActive] = useState("hotels");
  const current = industries.find((i) => i.id === active)!;

  return (
    <section id="industries" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-4">
            Tu industria
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Diseñado para tu negocio
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Módulos específicos para cada sector. No es un CRM genérico — es tu
            CRM.
          </p>
        </ScrollReveal>

        {/* Industry tabs */}
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
              {!industry.available && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-ink/10 text-muted-foreground">
                  Pronto
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active industry detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Content */}
            <div>
              <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {current.headline}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {current.description}
              </p>
              <ul className="space-y-3">
                {current.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Stat + placeholder */}
            <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-border bg-card">
              <span className="text-6xl md:text-7xl font-bold text-neon">
                {current.stat}
              </span>
              <span className="mt-2 text-muted-foreground text-center">
                {current.statLabel}
              </span>
              {!current.available && (
                <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-4 py-2 text-sm font-medium text-neon">
                  Próximamente
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
