"use client";

import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/marketing/animation/stagger";
import { cn } from "@/lib/utils";
import { useDemoForm } from "@/components/marketing/demo-form/demo-form-context";

const plans = [
  {
    name: "Inicio",
    description: "Para negocios que están empezando a automatizar",
    price: 559000,
    features: [
      "Usuarios ilimitados",
      "WhatsApp",
      "Agente IA por industria",
      "4,000 mensajes/mes",
      "Pipeline de ventas",
      "Calendario",
      "Analítica avanzada",
    ],
    cta: "Solicitar demo",
    popular: false,
  },
  {
    name: "Crecimiento",
    description: "Para equipos que quieren escalar sus ventas",
    price: 959000,
    features: [
      "Usuarios ilimitados",
      "WhatsApp + Instagram",
      "Agente IA por industria",
      "10,000 mensajes/mes",
      "Pipeline de ventas",
      "Calendario",
      "Analítica avanzada",
      "Agente BI para administradores",
      "Soporte prioritario",
    ],
    cta: "Solicitar demo",
    popular: true,
  },
  {
    name: "Profesional",
    description: "Para empresas con múltiples sucursales",
    price: null,
    features: [
      "Usuarios ilimitados",
      "Multi-sucursal",
      "Mensajes según necesidad",
      "Reportes avanzados",
      "Onboarding dedicado",
      "Soporte 24/7",
    ],
    cta: "Contactar ventas",
    popular: false,
  },
];

function formatCOP(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PricingSection() {
  const { open } = useDemoForm();

  return (
    <section id="pricing" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-4">
            Precios simples
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Planes que crecen con su negocio
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Sin costos ocultos. Sin contratos. Cancele cuando quiera.
          </p>
        </ScrollReveal>

        {/* Pricing cards */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={cn(
                  "relative h-full rounded-2xl border p-8 flex flex-col",
                  plan.popular
                    ? "border-neon/50 bg-card shadow-[0_0_40px_oklch(0.74_0.185_50/0.1)]"
                    : "border-border bg-card"
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold bg-neon text-ink px-4 py-1 rounded-full">
                    Más popular
                  </span>
                )}

                <h3 className="text-xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.description}
                </p>

                <div className="mt-6">
                  {plan.price !== null ? (
                    <>
                      <span className="text-4xl font-bold text-foreground">
                        ${formatCOP(plan.price)}
                      </span>
                      <span className="text-muted-foreground text-sm ml-1">
                        COP/mes
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-foreground">
                      Cotización personalizada
                    </span>
                  )}
                </div>

                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-foreground"
                    >
                      <Check className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => open(`pricing-${plan.name.toLowerCase()}`)}
                  className={cn(
                    "mt-8 block w-full text-center py-3 px-6 rounded-full text-sm font-semibold transition-all cursor-pointer",
                    plan.popular
                      ? "bg-neon text-ink hover:brightness-110 shadow-[0_0_20px_oklch(0.74_0.185_50/0.3)]"
                      : "bg-secondary text-foreground hover:bg-accent"
                  )}
                >
                  {plan.cta}
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <p className="text-center text-sm text-muted-foreground mt-8">
          14 días gratis en todos los planes. Sin tarjeta de crédito.
        </p>
      </div>
    </section>
  );
}
