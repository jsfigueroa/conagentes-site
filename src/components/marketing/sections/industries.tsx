"use client";

import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Store,
  Check,
  MessageCircle,
  Receipt,
  CalendarClock,
  RefreshCw,
} from "lucide-react";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import { useDemoForm } from "@/components/marketing/demo-form/demo-form-context";

const generalCaps = [
  { icon: MessageCircle, label: "Atiende y vende por WhatsApp" },
  { icon: Store, label: "Catálogo con fotos y precios" },
  { icon: Receipt, label: "Cobros + factura electrónica (DIAN)" },
  { icon: CalendarClock, label: "Agenda citas automáticamente" },
  { icon: RefreshCw, label: "Recupera y reactiva clientes" },
];

const hotelCaps = [
  "Reservas directas",
  "PMS incluido, gratis",
  "Menos comisión de OTA",
  "Factura DIAN + registro TRA",
];

export function IndustriesSection() {
  const { open } = useDemoForm();

  return (
    <section id="industries" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-neon">
            ¿Para quién es?
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Un agente IA, a la medida de su negocio.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Funciona para cualquier negocio que venda o atienda por WhatsApp — y
            para hotelería tenemos un producto dedicado.
          </p>
        </ScrollReveal>

        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {/* ——— General product ——— */}
          <ScrollReveal>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <Store className="h-6 w-6 text-foreground" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Para cualquier negocio
              </p>
              <h3 className="mt-2 text-2xl font-bold text-foreground">
                Vende, cobra y agenda por usted.
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Su agente IA atiende WhatsApp, muestra su catálogo, arma
                pedidos, cobra con factura electrónica y agenda citas — para
                comercios, servicios, clínicas, academias y más.
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {generalCaps.map((c) => (
                  <li key={c.label} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-tint">
                      <c.icon className="h-4 w-4 text-[oklch(0.64_0.19_42)]" />
                    </span>
                    <span className="text-[15px] text-foreground">{c.label}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => open("industries-general")}
                className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Quiero una demo
              </button>
            </div>
          </ScrollReveal>

          {/* ——— Hotel flagship ——— */}
          <ScrollReveal delay={0.1}>
            <Link
              href="/"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[oklch(0.77_0.165_56/0.35)] bg-brand-tint-soft p-8 transition-shadow hover:shadow-[0_18px_50px_-20px_oklch(0.55_0.235_350/0.35)]"
            >
              {/* flagship accent bar */}
              <span className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" />

              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-tint">
                  <BedDouble className="h-6 w-6 text-[oklch(0.64_0.19_42)]" />
                </span>
                <span className="rounded-full bg-brand-gradient-strong px-3 py-1 text-xs font-bold text-white">
                  Producto insignia
                </span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.64_0.19_42)]">
                Para hoteles
              </p>
              <h3 className="mt-2 text-2xl font-bold text-foreground">
                conagentes para hoteles.
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                El agente IA que le hace ganar más por habitación: cierra la
                reserva directa, sube el valor de cada estadía y recupera
                huéspedes. Un producto completo, hecho para hotelería.
              </p>

              <div className="mt-6 flex flex-1 flex-wrap content-start gap-2">
                {hotelCaps.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.74_0.185_50/0.3)] bg-card px-3 py-1.5 text-[13px] font-medium text-foreground"
                  >
                    <Check className="h-3.5 w-3.5 text-[oklch(0.64_0.19_42)]" />
                    {c}
                  </span>
                ))}
              </div>

              <span className="btn-brand mt-8 inline-flex items-center gap-2 self-start rounded-full px-6 py-3 text-sm font-semibold">
                Ver el producto para hoteles
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
