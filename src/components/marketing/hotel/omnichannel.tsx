"use client";

import { MessageSquare } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import { BRAND_MARKS } from "@/components/marketing/hotel/brand-marks";

const channels = [
  { key: "whatsapp", name: "WhatsApp" },
  { key: "instagram", name: "Instagram" },
  { key: "booking", name: "Booking.com" },
  { key: "airbnb", name: "Airbnb" },
  { key: "expedia", name: "Expedia" },
] as const;

function Mark({ k }: { k: string }) {
  const m = BRAND_MARKS[k];
  if (!m) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 shrink-0 fill-current">
      <path d={m.path} />
    </svg>
  );
}

export function OmnichannelSection() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[oklch(0.64_0.19_42)]">
            Omnicanal
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            No solo en WhatsApp. En todos sus canales.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Sus huéspedes preguntan por WhatsApp, por Instagram y por los
            mensajes de Booking, Airbnb y Expedia. Su agente responde en todos
            — al instante y en una sola bandeja. Y en las OTAs, contestar rápido
            también mejora su posición.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-wrap justify-center gap-3">
              {channels.map((c) => (
                <span
                  key={c.key}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mark k={c.key} />
                  <span className="text-sm font-semibold text-foreground">
                    {c.name}
                  </span>
                </span>
              ))}
            </div>

            <div className="h-8 w-px bg-gradient-to-b from-[oklch(0.74_0.185_50/0.5)] to-transparent" />

            <div className="inline-flex items-center gap-3 rounded-2xl border-2 border-[oklch(0.74_0.185_50/0.4)] bg-neon/[0.06] px-6 py-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neon">
                <MessageSquare className="h-5 w-5 text-ink" />
              </span>
              <div className="text-left">
                <p className="font-bold text-foreground">
                  Un solo agente · una sola bandeja
                </p>
                <p className="text-sm text-muted-foreground">
                  Responde en todos los canales, 24/7, en 32 idiomas.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
