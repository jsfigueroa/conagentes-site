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

/**
 * The "¿para quién es?" band — deliberately ASYMMETRIC.
 *
 * Hospedaje (hoteles, aparta-hoteles, alquiler vacacional) is the product we
 * take to market, so it gets the wide card and the specifics. Every other
 * industry is real and supported, but it gets ONE honest door — not equal
 * billing — because nothing in marketing or outbound points at it. If that
 * ever changes, widen the second card; don't add a third.
 */

const hospedajeSegments = [
  "Hoteles independientes y boutique",
  "Aparta-hoteles",
  "Alquiler vacacional y Airbnb",
  "Hostales, fincas y glamping",
];

const hospedajeCaps = [
  "Reservas directas",
  "PMS incluido, gratis",
  "Mensajes de OTAs",
  "Upsell y reactivación",
  "Factura DIAN + registro TRA",
  "32 idiomas",
];

const generalCaps = [
  { icon: MessageCircle, label: "Atiende y vende por WhatsApp" },
  { icon: Store, label: "Catálogo con fotos y precios" },
  { icon: Receipt, label: "Cobros + factura electrónica (DIAN)" },
  { icon: CalendarClock, label: "Agenda citas automáticamente" },
  { icon: RefreshCw, label: "Recupera y reactiva clientes" },
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
            Hecho para hospedaje. Sirve para más.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nos especializamos en hoteles y alojamientos — ahí está todo nuestro
            producto. La misma plataforma atiende a otros negocios que venden
            por WhatsApp.
          </p>
        </ScrollReveal>

        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {/* ——— Hospedaje: the product we sell ——— */}
          <ScrollReveal className="md:col-span-2">
            <Link
              href="/hoteles"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-[oklch(0.74_0.185_50/0.45)] bg-neon/[0.05] p-8 transition-shadow hover:shadow-[0_0_40px_oklch(0.74_0.185_50/0.18)]"
            >
              {/* flagship accent bar */}
              <span className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" />

              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neon/15">
                  <BedDouble className="h-6 w-6 text-[oklch(0.64_0.19_42)]" />
                </span>
                <span className="rounded-full bg-neon px-3 py-1 text-xs font-bold text-ink">
                  Nuestra especialidad
                </span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.64_0.19_42)]">
                Hoteles y alojamientos
              </p>
              <h3 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
                conagentes para hospedaje.
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                El agente IA que llena su hotel: atiende a cada huésped al
                instante, reserva directo, sube el valor de cada estadía y
                recupera huéspedes. Un producto completo, con PMS incluido y el
                cumplimiento colombiano resuelto.
              </p>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {hospedajeSegments.map((s) => (
                  <li key={s} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-[oklch(0.64_0.19_42)]" />
                    <span className="min-w-0 text-[15px] text-foreground">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-1 flex-wrap content-start gap-2">
                {hospedajeCaps.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.74_0.185_50/0.3)] bg-card px-3 py-1.5 text-[13px] font-medium text-foreground"
                  >
                    <Check className="h-3.5 w-3.5 text-[oklch(0.64_0.19_42)]" />
                    {c}
                  </span>
                ))}
              </div>

              <span className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-neon px-6 py-3 text-sm font-semibold text-ink shadow-[0_0_24px_oklch(0.74_0.185_50/0.25)]">
                Ver la plataforma para hospedaje
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </ScrollReveal>

          {/* ——— Every other industry: one honest door ——— */}
          <ScrollReveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <Store className="h-6 w-6 text-foreground" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Otros negocios
              </p>
              <h3 className="mt-2 text-2xl font-bold text-foreground">
                ¿No es hotelero?
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                La misma plataforma atiende comercios, servicios, clínicas y
                academias: su agente responde WhatsApp, muestra el catálogo,
                arma pedidos, cobra con factura electrónica y agenda citas.
                Cuéntenos qué vende y le decimos si le servimos.
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {generalCaps.map((c) => (
                  <li key={c.label} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <c.icon className="h-4 w-4 text-muted-foreground" />
                    </span>
                    <span className="min-w-0 text-[15px] text-foreground">
                      {c.label}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => open("industries-general")}
                className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Cuéntenos de su negocio
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
