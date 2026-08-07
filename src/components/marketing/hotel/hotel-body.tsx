"use client";

import {
  MessageCircle,
  CalendarCheck,
  TrendingUp,
  RefreshCw,
  CreditCard,
  BedDouble,
  Eye,
  ShieldCheck,
  FileCheck,
  Sparkles,
  Clock,
  TrendingDown,
  Check,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import { MagneticButton } from "@/components/marketing/animation/magnetic-button";
import { useDemoForm } from "@/components/marketing/demo-form/demo-form-context";
import { HotelStory } from "@/components/marketing/hotel/hotel-story";
import { OmnichannelSection } from "@/components/marketing/hotel/omnichannel";

const outcomes = [
  {
    icon: CalendarCheck,
    title: "Más reservas directas",
    body: "Responde y reserva al instante, a cualquier hora — sin crecer el equipo. Cada consulta que se contesta a tiempo es una reserva que no se pierde.",
    stat: "Hasta 40%",
    statLabel: "de las consultas llegan fuera del horario de recepción.",
  },
  {
    icon: TrendingUp,
    title: "Sube el valor de cada estadía",
    body: "Ofrece upgrades, late checkout, spa y tours en el momento justo. Más ingreso por huésped, sin que usted mueva un dedo.",
    stat: "8–12%",
    statLabel: "de conversión en upsell es el estándar de la industria.",
  },
  {
    icon: RefreshCw,
    title: "Recupera huéspedes",
    body: "Al que preguntó y no reservó, su agente lo vuelve a contactar y cierra. Al que ya se hospedó, lo trae de vuelta.",
    stat: "24/7",
    statLabel: "haciendo seguimiento, incluso de madrugada.",
  },
];

const capabilities = [
  {
    icon: MessageCircle,
    title: "Atiende en todos sus canales",
    body: "Responde en WhatsApp, Instagram y en los mensajes de Booking, Airbnb y Expedia: muestra disponibilidad y tarifas en vivo y confirma la reserva — en español, inglés y portugués.",
  },
  {
    icon: CreditCard,
    title: "Cobra en el chat",
    body: "Envía un link de pago (Wompi o Mercado Pago) y el huésped paga sin salir de WhatsApp. La reserva queda confirmada y pagada.",
  },
  {
    icon: BedDouble,
    title: "Su PMS, ya incluido",
    body: "No necesita comprar Cloudbeds ni nada aparte: incluimos un PMS gratis. ¿Ya tiene uno? Nos conectamos con él.",
  },
  {
    icon: Eye,
    title: "Usted ve todo",
    body: "Cada reserva, huésped y conversación queda ordenada en su panel. Y el agente le muestra qué hizo y por qué.",
  },
];

const trust = [
  {
    icon: Eye,
    title: "Le muestra qué hizo y por qué",
    body: "«Porque el huésped preguntó por el spa, le ofrecí el paquete de bienestar.» Nada de cajas negras.",
  },
  {
    icon: ShieldCheck,
    title: "Nunca inventa precios ni disponibilidad",
    body: "Lee su sistema en tiempo real. Si no lo sabe, pregunta o escala — no improvisa.",
  },
  {
    icon: RefreshCw,
    title: "Un humano toma el control cuando hace falta",
    body: "Su equipo entra en cualquier conversación con un clic. El agente potencia a su gente; no la reemplaza.",
  },
];

const faqs = [
  {
    q: "¿Tengo que cambiar mi PMS?",
    a: "No. Nos conectamos con Cloudbeds, LobbyPMS, Mews y más. Y si no tiene PMS, incluimos uno gratis.",
  },
  {
    q: "¿En qué idiomas atiende a mis huéspedes?",
    a: "Español, inglés y portugués — reconoce el idioma del huésped y le responde en el suyo.",
  },
  {
    q: "¿Y si no hay disponibilidad para las fechas que piden?",
    a: "Ofrece alternativas: otras fechas, otro tipo de habitación o combinaciones, para no perder la reserva.",
  },
  {
    q: "¿Reemplaza a mi recepción?",
    a: "No: la potencia. Atiende el volumen 24/7 para que su equipo se concentre en el huésped que tiene enfrente y en lo importante.",
  },
  {
    q: "¿Cómo cobran ustedes?",
    a: "Dos formas: una tarifa fija sin comisiones, o una tarifa baja más una comisión pequeña que solo se cobra cuando el huésped realmente se hospeda. Hablemos y le mostramos cuál le conviene.",
  },
  {
    q: "¿Cumple con la DIAN y el SIRE?",
    a: "Sí. Emite factura electrónica ante la DIAN y le ayuda con el reporte SIRE de huéspedes extranjeros a Migración Colombia.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold text-[oklch(0.64_0.19_42)] uppercase tracking-widest mb-4">
      {children}
    </p>
  );
}

export function HotelBody() {
  const { open } = useDemoForm();

  return (
    <>
      {/* ——— PINNED STORY (pushed to top — show it working first) ——— */}
      <HotelStory />

      {/* ——— OUTCOMES ——— */}
      <section className="py-24 md:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Lo que hace por su hotel</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Un agente que trabaja, no un software que usted opera.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tres cosas que le mueven la aguja al hotel — y que pasan solas.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {outcomes.map((o, i) => (
              <ScrollReveal key={o.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-border bg-card p-8 flex flex-col">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 mb-5">
                    <o.icon className="h-6 w-6 text-[oklch(0.64_0.19_42)]" />
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {o.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {o.body}
                  </p>
                  <div className="mt-6 pt-5 border-t border-border">
                    <span className="text-2xl font-extrabold text-foreground tabular-nums">
                      {o.stat}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      {o.statLabel}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— THE REAL PROBLEM ——— */}
      <section className="py-24 md:py-28 bg-[oklch(0.11_0.01_95)] text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
          <ScrollReveal>
            <Eyebrow>El problema real</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              El problema no son las OTAs. Es que su equipo no da abasto.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[oklch(0.72_0.005_95)]">
              Los huéspedes escriben a toda hora y por todos lados —WhatsApp, Instagram, Booking, Airbnb—, en varios idiomas, y esperan
              respuesta al instante, seguimiento y una buena recomendación.
              Ningún equipo humano alcanza a darle esa atención a cada uno.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[oklch(0.72_0.005_95)]">
              Y lo que no se atiende se convierte en{" "}
              <span className="font-semibold text-white">reservas perdidas</span>{" "}
              y{" "}
              <span className="font-semibold text-white">tickets más bajos</span>.
              La salida no es contratar más gente — es un agente que sí
              alcanza.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.55_0.21_25/0.15)]">
                    <Clock className="h-5 w-5 text-[oklch(0.72_0.15_25)]" />
                  </span>
                  <div>
                    <p className="font-bold">Reservas perdidas</p>
                    <p className="mt-1 text-sm leading-relaxed text-[oklch(0.7_0.005_95)]">
                      <span className="font-bold tabular-nums text-white">
                        Hasta 40%
                      </span>{" "}
                      de las consultas llegan cuando la recepción está cerrada.
                      Sin respuesta a tiempo, se van con la competencia.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.55_0.21_25/0.15)]">
                    <TrendingDown className="h-5 w-5 text-[oklch(0.72_0.15_25)]" />
                  </span>
                  <div>
                    <p className="font-bold">Tickets más bajos</p>
                    <p className="mt-1 text-sm leading-relaxed text-[oklch(0.7_0.005_95)]">
                      Sin seguimiento ni upgrades ofrecidos en el momento justo,
                      cada estadía rinde menos de lo que podría.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ——— OMNICHANNEL (WhatsApp + Instagram + OTA inboxes) ——— */}
      <OmnichannelSection />

      {/* ——— REVENUE ENGINE (proactive recovery + upsell) ——— */}
      <section className="py-24 md:py-32 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal className="mx-auto mb-14 max-w-3xl text-center">
            <Eyebrow>El motor de ingresos</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Su agente no espera a que le compren. Persigue la venta.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Contestar rápido es apenas el comienzo. Lo que de verdad sube su
              facturación es{" "}
              <span className="font-semibold text-foreground">
                recuperar al que no reservó
              </span>{" "}
              y{" "}
              <span className="font-semibold text-foreground">
                subir el ticket de cada estadía
              </span>{" "}
              — y eso solo pasa cuando alguien hace seguimiento, siempre.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Proactive recovery / reactivation */}
            <ScrollReveal>
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-8">
                <span className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" />
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10">
                  <RefreshCw className="h-6 w-6 text-[oklch(0.64_0.19_42)]" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.64_0.19_42)]">
                  Ventas recuperadas · proactivo
                </p>
                <h3 className="mt-2 text-2xl font-bold text-foreground">
                  Recupera al que se iba a ir.
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  La mayoría de los huéspedes que preguntan no reservan a la
                  primera. Su agente no los deja enfriar: hace seguimiento en el
                  momento justo, resuelve la última duda y cierra la reserva —
                  horas o días después, por iniciativa propia. Y a los que ya se
                  hospedaron, los trae de vuelta.
                </p>
                <div className="mt-6 rounded-2xl border border-border bg-secondary/50 p-4">
                  <div className="flex flex-wrap items-center gap-2 text-[13px]">
                    <span className="rounded-lg bg-card px-2.5 py-1.5 text-muted-foreground shadow-sm">
                      Preguntó, no reservó
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="rounded-lg bg-[oklch(0.93_0.05_55)] px-2.5 py-1.5 text-ink">
                      El agente hace seguimiento
                    </span>
                  </div>
                  <p className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[oklch(0.62_0.15_150)]">
                    <Check className="h-4 w-4" /> Reserva recuperada — sin que
                    usted mueva un dedo
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Upsell */}
            <ScrollReveal delay={0.1}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-8">
                <span className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" />
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10">
                  <TrendingUp className="h-6 w-6 text-[oklch(0.64_0.19_42)]" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.64_0.19_42)]">
                  Ticket más alto · en cada reserva
                </p>
                <h3 className="mt-2 text-2xl font-bold text-foreground">
                  Sube el valor de cada estadía.
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Ofrece el upgrade, el late checkout, el spa o el tour justo
                  cuando el huésped dice que sí — algo que su recepción rara vez
                  alcanza a hacer a tiempo. Cada reserva vale más, automáticamente.
                </p>
                <div className="mt-6 rounded-2xl border border-border bg-secondary/50 p-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] text-muted-foreground">
                        Reserva base
                      </p>
                      <p className="text-lg font-bold tabular-nums text-muted-foreground line-through">
                        $840.000
                      </p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-[oklch(0.62_0.15_150)]" />
                    <div className="text-right">
                      <p className="text-[11px] text-muted-foreground">
                        Con upsell
                      </p>
                      <p className="text-lg font-extrabold tabular-nums text-foreground">
                        $900.000
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-[12px] text-muted-foreground">
                    <span className="font-bold text-foreground">8–12%</span> de
                    conversión en upsell es el estándar de la industria.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ——— CAPABILITIES ——— */}
      <section id="como-funciona" className="py-24 md:py-32 bg-background scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Cómo trabaja su agente</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Atiende, vende y cobra — donde le escriban.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Donde ya le escriben sus huéspedes, sin apps nuevas ni códigos.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {capabilities.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-card p-8 flex gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon/10">
                    <c.icon className="h-6 w-6 text-[oklch(0.64_0.19_42)]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {c.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— COMPLIANCE ——— */}
      <section className="py-20 md:py-24 bg-background">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal>
            <div className="rounded-3xl border border-[oklch(0.74_0.185_50/0.25)] bg-neon/[0.06] p-8 md:p-12">
              <Eyebrow>Colombia</Eyebrow>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground max-w-2xl">
                Cumple con la ley, sin que usted piense en eso.
              </h2>
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <FileCheck className="h-6 w-6 shrink-0 text-[oklch(0.64_0.19_42)]" />
                  <div>
                    <h3 className="font-bold text-foreground">
                      Factura electrónica DIAN
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      Emite la factura a nombre del huésped cuando la pide, sin
                      salir del chat.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <ShieldCheck className="h-6 w-6 shrink-0 text-[oklch(0.64_0.19_42)]" />
                  <div>
                    <h3 className="font-bold text-foreground">
                      Reporte SIRE / TRA
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      Le ayuda con el reporte de huéspedes extranjeros a
                      Migración Colombia.
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.64_0.19_42)]">
                <Sparkles className="h-4 w-4" />
                Ningún otro agente de IA en Colombia lo hace.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ——— PLANS (model, no numbers) ——— */}
      <section className="py-24 md:py-32 bg-background">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow>Cómo se paga</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Dos formas de trabajar con nosotros.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Usted elige. En una de las dos, solo ganamos más cuando vendemos
              por usted.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="h-full rounded-2xl border border-border bg-card p-8">
                <h3 className="text-xl font-bold text-foreground">Plan fijo</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Una tarifa mensual fija. Cero comisiones. Usted se queda con el
                  100% de cada reserva y cada venta. Predecible, sin sorpresas.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="h-full rounded-2xl border-2 border-[oklch(0.74_0.185_50/0.5)] bg-neon/[0.05] p-8 relative">
                <span className="absolute -top-3 left-8 rounded-full bg-neon px-3 py-1 text-xs font-bold text-ink">
                  Alineado con su hotel
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  Plan base + comisión
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Una tarifa baja, y una comisión pequeña solo cuando su agente
                  produce: una reserva, un upsell o un huésped recuperado —
                  cobrada únicamente cuando el huésped de verdad se hospeda.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal className="text-center mt-10">
            <MagneticButton strength={0.2}>
              <button
                onClick={() => open("hotel-pricing")}
                className="inline-flex items-center justify-center rounded-full bg-neon px-8 py-4 text-base font-semibold text-ink shadow-[0_0_24px_oklch(0.74_0.185_50/0.3)] hover:shadow-[0_0_36px_oklch(0.74_0.185_50/0.5)] transition-shadow cursor-pointer"
              >
                Hablemos de su hotel
              </button>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      {/* ——— TRUST / CONTROL ——— */}
      <section className="py-24 md:py-28 bg-secondary">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Usted manda</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Usted manda. Él ejecuta.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Un agente IA en el que puede confiar porque puede
              supervisarlo.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {trust.map((t, i) => (
              <ScrollReveal key={t.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-border bg-card p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 mb-5">
                    <t.icon className="h-6 w-6 text-[oklch(0.64_0.19_42)]" />
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {t.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— FAQ ——— */}
      <section className="py-24 md:py-32 bg-background">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal className="text-center mb-14">
            <Eyebrow>Preguntas frecuentes</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Lo que todo hotelero pregunta.
            </h2>
          </ScrollReveal>

          <div className="divide-y divide-border rounded-2xl border border-border bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="group px-6">
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-left font-semibold text-foreground list-none [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-[oklch(0.64_0.19_42)] transition-transform group-open:rotate-45 text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="pb-5 -mt-1 text-muted-foreground leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ——— FINAL CTA ——— */}
      <section className="py-24 md:py-32 bg-[oklch(0.08_0.01_95)] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-[oklch(0.74_0.185_50/0.10)] blur-[130px]" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Su próxima reserva directa está
              <br />
              <span className="text-brand-gradient">
                esperando en WhatsApp.
              </span>
            </h2>
            <p className="mt-5 text-lg text-[oklch(0.68_0.005_95)]">
              Le mostramos a su agente IA atendiendo a un huésped — con las
              habitaciones y tarifas de su propio hotel.
            </p>
            <div className="mt-9">
              <MagneticButton strength={0.2}>
                <button
                  onClick={() => open("hotel-final")}
                  className="inline-flex items-center justify-center rounded-full bg-neon px-8 py-4 text-base font-semibold text-ink shadow-[0_0_30px_oklch(0.74_0.185_50/0.35)] hover:shadow-[0_0_40px_oklch(0.74_0.185_50/0.55)] transition-shadow cursor-pointer"
                >
                  Pruebe su agente IA
                </button>
              </MagneticButton>
              <p className="mt-4 text-sm text-[oklch(0.5_0.005_95)]">
                Sin cambiar su PMS · Sin compromiso
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
