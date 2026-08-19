"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CreditCard, FileText, Phone, Sparkles } from "lucide-react";
import type { ChatCard, ChatMsg, Section } from "@/content/pages";

type ChatSection = Extract<Section, { type: "chat" }>;

/**
 * A replayed conversation, annotated. The full transcript is present in the
 * HTML from first paint — the animation only fades bubbles in — so assistants
 * reading the page get the whole exchange, and the margin notes tell them WHY
 * the agent did each thing (the part hoteliers actually buy).
 */

const CHANNELS: Record<
  NonNullable<ChatSection["channel"]>,
  { label: string; bar: string; dot: string; note: string }
> = {
  whatsapp: {
    label: "WhatsApp",
    bar: "bg-[oklch(0.42_0.09_155)]",
    dot: "bg-[oklch(0.78_0.17_150)]",
    note: "Conversación por WhatsApp Business",
  },
  instagram: {
    label: "Instagram",
    bar: "bg-gradient-to-r from-[oklch(0.55_0.22_320)] to-[oklch(0.68_0.19_45)]",
    dot: "bg-white/80",
    note: "Mensaje directo de Instagram",
  },
  booking: {
    label: "Booking.com",
    bar: "bg-[oklch(0.42_0.14_262)]",
    dot: "bg-[oklch(0.8_0.12_250)]",
    note: "Mensajería de Booking.com",
  },
  airbnb: {
    label: "Airbnb",
    bar: "bg-[oklch(0.55_0.19_18)]",
    dot: "bg-white/80",
    note: "Mensajería de Airbnb",
  },
  voz: {
    label: "Llamada telefónica",
    bar: "bg-[oklch(0.28_0.02_265)]",
    dot: "bg-[oklch(0.74_0.185_50)]",
    note: "Transcripción de una llamada atendida por el agente de voz",
  },
  web: {
    label: "Chat del sitio web",
    bar: "bg-[oklch(0.24_0.01_95)]",
    dot: "bg-[oklch(0.74_0.185_50)]",
    note: "Chat del sitio web del hotel",
  },
};

const CARD_ICON: Record<ChatCard["kind"], typeof CreditCard> = {
  habitacion: Sparkles,
  pago: CreditCard,
  factura: FileText,
  servicio: Sparkles,
  tarifa: Sparkles,
  reserva: FileText,
};

function BubbleCard({ card }: { card: ChatCard }) {
  const Icon = CARD_ICON[card.kind];
  return (
    <div className="w-[212px] overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_oklch(0.2_0.01_95/0.14)]">
      {card.banner && (
        <div className="relative h-16 bg-brand-gradient">
          <span className="absolute bottom-1.5 left-2 rounded bg-black/25 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
            {card.banner}
          </span>
        </div>
      )}
      <div className="p-2.5">
        <p className="flex items-center gap-1.5 text-[13px] font-bold text-ink">
          <Icon className="h-3.5 w-3.5 shrink-0 text-[oklch(0.64_0.19_42)]" aria-hidden />
          {card.title}
        </p>
        {card.lines?.map((l: string, i: number) => (
          <p key={i} className="mt-0.5 text-[11px] leading-snug text-[oklch(0.5_0.008_95)]">
            {l}
          </p>
        ))}
        {card.price && (
          <p className="mt-1.5 text-[16px] font-extrabold tabular-nums text-ink">{card.price}</p>
        )}
        {card.cta && (
          <p className="mt-2 rounded-lg bg-[oklch(0.74_0.185_50)] py-1.5 text-center text-[12px] font-bold text-ink">
            {card.cta}
          </p>
        )}
        {card.foot && (
          <p className="mt-1.5 text-center text-[9px] leading-tight text-[oklch(0.55_0.008_95)]">
            {card.foot}
          </p>
        )}
      </div>
    </div>
  );
}

const FROM_LABEL: Record<ChatMsg["from"], string> = {
  guest: "Huésped",
  ai: "Agente IA",
  staff: "Recepción",
};

function Bubble({
  msg,
  index,
  animate,
}: {
  msg: ChatMsg;
  index: number;
  animate: boolean;
}) {
  const isGuest = msg.from === "guest";
  const isStaff = msg.from === "staff";
  return (
    <motion.li
      // NOTE: opacity is never animated on content. A reveal that starts at
      // opacity 0 leaves the transcript invisible for anything that renders the
      // page without scrolling it — including some search and AI crawlers — and
      // for anyone with JS off. Only the offset moves.
      initial={animate ? { y: 12 } : false}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.09, 0.9), ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${isGuest ? "items-start" : "items-end"}`}
    >
      <span className="sr-only">{FROM_LABEL[msg.from]}: </span>
      <div
        className={`max-w-[85%] text-[12.5px] leading-snug ${msg.card ? "" : "px-3 py-2"} ${
          msg.card
            ? ""
            : isGuest
              ? "rounded-2xl rounded-bl-md bg-white text-ink shadow-[0_1px_2px_oklch(0.2_0.01_95/0.1)]"
              : isStaff
                ? "rounded-2xl rounded-br-md bg-[oklch(0.24_0.01_95)] text-white"
                : "rounded-2xl rounded-br-md bg-[oklch(0.93_0.05_55)] text-ink"
        }`}
      >
        {msg.card ? <BubbleCard card={msg.card} /> : msg.text}
      </div>
      {isStaff && (
        <span className="mt-1 text-[10px] font-medium text-muted-foreground">
          escrito por una persona del hotel
        </span>
      )}
    </motion.li>
  );
}

export function ChatReplay({ s }: { s: ChatSection }) {
  const ch = CHANNELS[s.channel ?? "whatsapp"];
  const reduce = useReducedMotion();
  const animate = !reduce;

  return (
    <figure className="mx-auto max-w-6xl">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-14">
        {/* The conversation */}
        <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-[26px] border border-border bg-[oklch(0.965_0.006_95)] shadow-[0_18px_50px_-24px_oklch(0.2_0.01_95/0.3)]">
          <div className={`flex items-center gap-2.5 px-4 py-3 ${ch.bar}`}>
            <span className={`h-7 w-7 shrink-0 rounded-full ${ch.dot}`} aria-hidden />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-white">
                {s.who ?? "Huésped"}
              </p>
              <p className="truncate text-[10.5px] text-white/70">{ch.label}</p>
            </div>
            {s.channel === "voz" && (
              <Phone className="ml-auto h-4 w-4 shrink-0 text-white/70" aria-hidden />
            )}
          </div>
          <ol className="flex flex-col gap-2.5 px-3.5 py-4">
            {s.thread.map((m, i) => (
              <Bubble key={i} msg={m} index={i} animate={animate} />
            ))}
          </ol>
        </div>

        {/* Why it did that — the part that sells */}
        {/* Sticky on wide screens: a long transcript would otherwise scroll past
            a short notes column and leave a dead half-page. */}
        {s.notes && s.notes.length > 0 && (
          <dl className="space-y-5 lg:sticky lg:top-28">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Qué hizo el agente, y por qué
            </p>
            {s.notes.map((n, i) => (
              <motion.div
                key={i}
                initial={animate ? { x: 10 } : false}
                whileInView={{ x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="border-l-2 border-[oklch(0.74_0.185_50)] pl-4"
              >
                <dt className="text-[15px] font-semibold text-foreground">{n.label}</dt>
                <dd className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{n.body}</dd>
              </motion.div>
            ))}
          </dl>
        )}
      </div>
      <figcaption className="mt-6 text-center text-[12px] text-muted-foreground">
        {ch.note}. Ejemplo real de flujo; nombres y tarifas ilustrativos.
      </figcaption>
    </figure>
  );
}
