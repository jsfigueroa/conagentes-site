"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Check } from "lucide-react";
import { GrainOverlay } from "@/components/marketing/hotel/grain-overlay";
import {
  HotelPhoneThread,
  BEAT_MESSAGE_COUNT,
  THREAD_LENGTH,
} from "@/components/marketing/hotel/hotel-phone";
import {
  AvailabilityMock,
  LogoMarquee,
} from "@/components/marketing/hotel/integrations-wall";
import { DashboardFrame } from "@/components/marketing/story/frames";

type PanelKind = "none" | "availability" | "upsell" | "payment";
type BackofficeKind = "factura" | "sire";

type Beat = {
  id: string;
  kicker: string;
  title: string;
  highlight: string;
  body: string;
  surface: "phone" | "backoffice";
  panel?: PanelKind; // phone beats
  content?: BackofficeKind; // backoffice beats
};

const BEATS: Beat[] = [
  {
    id: "llega",
    kicker: "01 · Llega el huésped",
    title: "Un huésped escribe",
    highlight: "a medianoche.",
    body: "Su recepción está cerrada, pero su agente no. Contesta al instante, en el idioma del huésped — por WhatsApp, Instagram o la OTA.",
    surface: "phone",
    panel: "none",
  },
  {
    id: "pms",
    kicker: "02 · Consulta el PMS",
    title: "Revisa la disponibilidad",
    highlight: "real, al segundo.",
    body: "Lee su PMS en vivo — nunca inventa una habitación ni sobrevende.",
    surface: "phone",
    panel: "availability",
  },
  {
    id: "upsell",
    kicker: "03 · Sube el ticket",
    title: "Reserva y ofrece",
    highlight: "un upgrade.",
    body: "Propone desayuno, late checkout o una mejor habitación en el momento justo. Más ingreso por estadía.",
    surface: "phone",
    panel: "upsell",
  },
  {
    id: "pago",
    kicker: "04 · Cobra en el chat",
    title: "Cobra sin salir de",
    highlight: "la conversación.",
    body: "Envía el link de pago; el huésped paga con Wompi, Mercado Pago, PSE o Nequi. Reserva confirmada al instante.",
    surface: "phone",
    panel: "payment",
  },
  {
    id: "factura",
    kicker: "05 · Factura DIAN",
    title: "La factura se emite",
    highlight: "sola.",
    body: "Apenas se paga, su plataforma genera la factura electrónica y la reporta a la DIAN — sin que su equipo digite nada. Todo queda en su panel.",
    surface: "backoffice",
    content: "factura",
  },
  {
    id: "sire",
    kicker: "06 · Registro TRA",
    title: "Registra al huésped",
    highlight: "ante el MinCIT.",
    body: "Su plataforma arma y envía la Tarjeta de Registro de Alojamiento (TRA) al Ministerio de Comercio, Industria y Turismo — automático, sin planillas a mano. El reporte SIRE de extranjeros a Migración Colombia llega pronto.",
    surface: "backoffice",
    content: "sire",
  },
];

/* ————— Phone-side floating panels (numbers consistent with the phone) ————— */

function UpsellPanel() {
  return (
    <div className="w-[248px] rounded-2xl border border-border bg-card p-5 shadow-xl">
      <p className="text-xs text-muted-foreground">Ingreso de esta estadía</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl font-extrabold tabular-nums text-foreground">
          $900.000
        </span>
        <span className="text-sm font-bold text-[oklch(0.62_0.15_150)]">↑ +7%</span>
      </div>
      <div className="mt-3 space-y-1.5 text-[12.5px]">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Doble Superior · 2 noches</span>
          <span className="tabular-nums text-foreground">$840.000</span>
        </div>
        <div className="flex justify-between font-semibold text-[oklch(0.64_0.19_42)]">
          <span>+ Desayuno · late checkout</span>
          <span className="tabular-nums">$60.000</span>
        </div>
      </div>
    </div>
  );
}

function PaymentPanel() {
  return (
    <div className="w-[248px] rounded-2xl border border-border bg-card p-5 shadow-xl">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold text-foreground">Pago</p>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[oklch(0.62_0.15_150)]">
          <Check className="h-3.5 w-3.5" /> Aprobado
        </span>
      </div>
      <p className="text-2xl font-extrabold tabular-nums text-foreground">$900.000</p>
      <p className="mt-1 text-[12px] text-muted-foreground">Reserva #A-2291 · pagada</p>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-2.5 text-[11px] font-semibold text-muted-foreground">
        <span>Wompi</span>
        <span>Mercado Pago</span>
        <span>PSE</span>
        <span>Nequi</span>
      </div>
    </div>
  );
}

function Panel({ kind }: { kind: PanelKind }) {
  switch (kind) {
    case "availability":
      return <AvailabilityMock />;
    case "upsell":
      return <UpsellPanel />;
    case "payment":
      return <PaymentPanel />;
    default:
      return null;
  }
}

/* ————— Backoffice (our platform) views — beats 05 & 06 ————— */

function FacturaBackoffice() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-white/50">Reserva #A-2291 · Hotel Bahía</p>
          <p className="text-lg font-extrabold tabular-nums text-white">$900.000</p>
        </div>
        <span className="rounded-md bg-[oklch(0.62_0.15_150/0.18)] px-2 py-1 text-[10px] font-bold text-[oklch(0.74_0.16_150)]">
          Aceptada
        </span>
      </div>
      <div className="space-y-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 text-[12px]">
        <div className="flex justify-between text-white/70">
          <span>Alojamiento + servicios</span>
          <span className="tabular-nums">$818.182</span>
        </div>
        <div className="flex justify-between text-white/70">
          <span>IVA (19%)</span>
          <span className="tabular-nums">$81.818</span>
        </div>
        <div className="flex justify-between border-t border-white/[0.08] pt-1.5 font-bold text-white">
          <span>Total</span>
          <span className="tabular-nums">$900.000</span>
        </div>
      </div>
      <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[oklch(0.74_0.16_150)]">
        <Check className="h-3.5 w-3.5" /> Enviada a la DIAN · CUFE 8f3a…c21
      </p>
    </div>
  );
}

const SIRE_ROWS: [string, string][] = [
  ["Huésped", "John P."],
  ["Documento", "X1234567"],
  ["Nacionalidad", "Estados Unidos"],
  ["Estadía", "12–14 jul"],
];

function SireBackoffice() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-white">Registro de huésped</p>
        <span className="rounded-md bg-[oklch(0.62_0.15_150/0.18)] px-2 py-1 text-[10px] font-bold text-[oklch(0.74_0.16_150)]">
          Registrado
        </span>
      </div>
      <div className="space-y-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 text-[12px]">
        {SIRE_ROWS.map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <span className="text-white/50">{k}</span>
            <span className="font-medium text-white">{v}</span>
          </div>
        ))}
      </div>
      <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[oklch(0.74_0.16_150)]">
        <Check className="h-3.5 w-3.5" /> Reportado al MinCIT · TRA
      </p>
    </div>
  );
}

function BackofficeVisual({ content }: { content: BackofficeKind }) {
  return (
    <DashboardFrame
      title={
        content === "sire"
          ? "Registro TRA · MinCIT"
          : "Facturación · conagentes"
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={content}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {content === "sire" ? <SireBackoffice /> : <FacturaBackoffice />}
        </motion.div>
      </AnimatePresence>
    </DashboardFrame>
  );
}

function BeatCopy({ beat }: { beat: Beat }) {
  return (
    <div className="max-w-md">
      <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[oklch(0.74_0.185_50)]">
        {beat.kicker}
      </p>
      <h3 className="text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-4xl lg:text-5xl">
        {beat.title}{" "}
        <span className="text-brand-gradient">{beat.highlight}</span>
      </h3>
      <p className="mt-5 text-base leading-relaxed text-[oklch(0.62_0.005_95)] md:text-lg">
        {beat.body}
      </p>
    </div>
  );
}

/* ————— Desktop: pinned stage; phone (01–04) hands off to backoffice (05–06) ————— */

function PinnedStory() {
  const outer = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);
  const { scrollYProgress } = useScroll({
    target: outer,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setBeat(Math.min(BEATS.length - 1, Math.max(0, Math.floor(v * BEATS.length))));
  });

  const yPhone = useTransform(scrollYProgress, [0, 1], [26, -26]);
  const yGlow = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const current = BEATS[beat];

  return (
    <div
      ref={outer}
      className="relative hidden lg:block"
      style={{ height: `${BEATS.length * 90}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[oklch(0.74_0.185_50/0.06)] blur-[140px]"
            style={{ y: yGlow }}
          />
        </div>
        <GrainOverlay opacity={0.05} />

        {/* progress rail */}
        <div className="absolute left-8 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 xl:left-12">
          {BEATS.map((b, i) => (
            <div
              key={b.id}
              className={`rounded-full transition-all duration-300 ${
                i === beat
                  ? "h-8 w-1.5 bg-[oklch(0.74_0.185_50)]"
                  : "h-1.5 w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

        <div className="mx-auto grid h-full max-w-7xl grid-cols-2 items-center gap-12 px-8 lg:px-16">
          {/* copy */}
          <div className="relative min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <BeatCopy beat={current} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* visual: phone (persists 01–04) → backoffice (05–06) */}
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              {current.surface === "phone" ? (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <motion.div style={{ y: yPhone }} className="relative">
                    <HotelPhoneThread count={BEAT_MESSAGE_COUNT[beat]} />
                    <AnimatePresence>
                      {current.panel && current.panel !== "none" && (
                        <motion.div
                          key={current.id}
                          initial={{ opacity: 0, x: 28, y: 24, scale: 0.94 }}
                          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -18, scale: 0.94 }}
                          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                          className="absolute -left-24 bottom-10 z-20"
                        >
                          <Panel kind={current.panel} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="backoffice"
                  initial={{ opacity: 0, scale: 0.95, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <BackofficeVisual content={current.content ?? "factura"} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ————— Mobile: full phone once, then stacked beat cards ————— */

function MobileBeat({ beat }: { beat: Beat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[oklch(0.74_0.185_50)]">
        {beat.kicker}
      </p>
      <h3 className="text-2xl font-bold tracking-tight text-white">
        {beat.title} <span className="text-brand-gradient">{beat.highlight}</span>
      </h3>
      <p className="mt-3 text-[oklch(0.62_0.005_95)]">{beat.body}</p>
      {beat.surface === "backoffice" ? (
        <div className="mt-5 flex justify-center">
          <BackofficeVisual content={beat.content ?? "factura"} />
        </div>
      ) : beat.panel && beat.panel !== "none" ? (
        <div className="mt-5 flex justify-center">
          <Panel kind={beat.panel} />
        </div>
      ) : null}
    </motion.div>
  );
}

function MobileStory() {
  return (
    <div className="relative z-10 mx-auto max-w-md px-6 pb-20 lg:hidden">
      <div className="mb-10 flex justify-center">
        <HotelPhoneThread count={THREAD_LENGTH} />
      </div>
      <div className="space-y-5">
        {BEATS.map((b) => (
          <MobileBeat key={b.id} beat={b} />
        ))}
      </div>
    </div>
  );
}

export function HotelStory() {
  return (
    <section id="como-vende" className="relative bg-[oklch(0.08_0.01_95)]">
      <div className="relative z-10 mx-auto max-w-2xl px-6 pt-24 text-center lg:pt-28">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[oklch(0.74_0.185_50)]">
          En vivo
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
          Vea a su agente trabajar, paso a paso.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[oklch(0.55_0.005_95)]">
          De un «hola» a medianoche a una reserva pagada, facturada y reportada.
          El huésped ve WhatsApp; usted lo ve todo resuelto en su plataforma.
        </p>
      </div>

      <PinnedStory />
      <MobileStory />

      {/* breadth: everything it connects to */}
      <div className="relative z-10 border-t border-white/[0.06] py-16">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-[oklch(0.5_0.005_95)]">
          Se conecta con todo su stack
        </p>
        <LogoMarquee />
      </div>
    </section>
  );
}
