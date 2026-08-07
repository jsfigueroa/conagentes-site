"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, CreditCard, Check } from "lucide-react";
import { PhoneFrame } from "@/components/marketing/hero-demo/phone-frame";

/* ————— The hotel booking conversation (shared by hero + story) ————— */

export type ThreadMsg = {
  id: number;
  sender: "guest" | "ai";
  text?: string;
  card?: "room" | "payment" | "invoice";
};

export const HOTEL_THREAD: ThreadMsg[] = [
  { id: 1, sender: "guest", text: "Hola 👋 ¿Tienen habitación para este fin de semana? Somos 2." },
  { id: 2, sender: "ai", text: "¡Hola! Con gusto 😊 Déjeme revisar la disponibilidad…" },
  { id: 3, sender: "ai", card: "room" },
  { id: 4, sender: "ai", text: "¿Le agrego desayuno y late checkout? Por +$60.000 toda la estadía." },
  { id: 5, sender: "guest", text: "Sí, perfecto. La reservo 🙌" },
  { id: 6, sender: "ai", card: "payment" },
  { id: 7, sender: "ai", text: "Pago recibido ✅ Reserva #A-2291 confirmada. Le envío su factura 📄" },
];

export const THREAD_LENGTH = HOTEL_THREAD.length;

// How many messages are visible at each of the 5 story beats.
// Messages shown at each of the 6 story beats (05 & 06 are backoffice — phone
// unmounted, so their count just holds the full completed thread).
export const BEAT_MESSAGE_COUNT = [2, 3, 5, 7, 7, 7];

/* ————— In-bubble cards ————— */

function RoomCard() {
  return (
    <div className="w-[188px] overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="relative h-20 bg-gradient-to-br from-[oklch(0.77_0.165_56)] to-[oklch(0.62_0.23_349)]">
        <span className="absolute bottom-1.5 left-2 rounded bg-black/25 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
          Vista al mar
        </span>
      </div>
      <div className="p-2.5">
        <p className="text-[13px] font-bold text-[oklch(0.2_0.01_95)]">Doble Superior</p>
        <p className="mt-0.5 text-[11px] text-[oklch(0.5_0.008_95)]">2 noches · desayuno incl.</p>
        <p className="mt-1.5 text-[15px] font-extrabold tabular-nums text-[oklch(0.2_0.01_95)]">
          $420.000 <span className="text-[10px] font-medium text-[oklch(0.5_0.008_95)]">/ noche</span>
        </p>
      </div>
    </div>
  );
}

function PaymentChip() {
  return (
    <div className="w-[188px] rounded-xl bg-white p-2.5 shadow-sm">
      <p className="text-[10px] text-[oklch(0.5_0.008_95)]">Link de pago · Reserva #A-2291</p>
      <p className="mt-0.5 text-[17px] font-extrabold tabular-nums text-[oklch(0.2_0.01_95)]">$900.000</p>
      <div className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-[oklch(0.74_0.185_50)] py-1.5 text-[12px] font-bold text-[oklch(0.2_0.01_95)]">
        <CreditCard className="h-3.5 w-3.5" /> Pagar ahora
      </div>
      <p className="mt-1.5 text-center text-[9px] text-[oklch(0.55_0.008_95)]">
        Wompi · Mercado Pago · PSE · Nequi
      </p>
    </div>
  );
}

/* ————— Chat bubble ————— */

function Bubble({ msg }: { msg: ThreadMsg }) {
  const isAi = msg.sender === "ai";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex ${isAi ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] ${
          msg.card ? "" : "px-3 py-2"
        } text-[12.5px] leading-snug ${
          isAi
            ? "rounded-2xl rounded-br-md bg-[oklch(0.93_0.05_55)] text-[oklch(0.2_0.01_95)]"
            : "rounded-2xl rounded-bl-md bg-white text-[oklch(0.2_0.01_95)] shadow-sm"
        } ${msg.card ? "bg-transparent" : ""}`}
      >
        {msg.card === "room" ? (
          <RoomCard />
        ) : msg.card === "payment" ? (
          <PaymentChip />
        ) : (
          msg.text
        )}
      </div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-end"
    >
      <div className="flex items-center gap-1 rounded-2xl rounded-br-md bg-[oklch(0.93_0.05_55)] px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[oklch(0.55_0.05_55)]"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ————— Phone screen ————— */

function ChatHeader() {
  return (
    <div className="flex shrink-0 items-center gap-2.5 bg-[oklch(0.16_0.01_95)] px-3 py-2.5">
      <ChevronLeft className="h-4 w-4 text-white/60" />
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.77_0.165_56)] to-[oklch(0.62_0.23_349)] text-[11px] font-bold text-white">
        HB
      </span>
      <div className="leading-tight">
        <p className="text-[13px] font-semibold text-white">Hotel Bahía</p>
        <p className="flex items-center gap-1 text-[10px] text-[oklch(0.62_0.15_150)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.62_0.15_150)]" /> en línea
        </p>
      </div>
    </div>
  );
}

function InputBar() {
  return (
    <div className="flex shrink-0 items-center gap-2 bg-[oklch(0.955_0.008_95)] px-3 py-2.5">
      <div className="flex-1 rounded-full bg-white px-3 py-2 text-[12px] text-[oklch(0.6_0.008_95)] shadow-sm">
        Escribe un mensaje…
      </div>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[oklch(0.74_0.185_50)]">
        <Check className="h-4 w-4 text-[oklch(0.2_0.01_95)]" />
      </span>
    </div>
  );
}

export function HotelPhoneThread({
  count,
  typing = false,
}: {
  count: number;
  typing?: boolean;
}) {
  const msgs = HOTEL_THREAD.slice(0, Math.max(0, Math.min(count, THREAD_LENGTH)));
  return (
    <PhoneFrame>
      <div
        className="flex h-full flex-col bg-[oklch(0.955_0.008_95)]"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.88 0.01 95) 0.5px, transparent 0.5px)",
          backgroundSize: "14px 14px",
        }}
      >
        <ChatHeader />
        <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">
          <AnimatePresence initial={false}>
            {msgs.map((m) => (
              <Bubble key={m.id} msg={m} />
            ))}
          </AnimatePresence>
          <AnimatePresence>{typing && <TypingDots key="typing" />}</AnimatePresence>
        </div>
        <InputBar />
      </div>
    </PhoneFrame>
  );
}

/* ————— Hero auto-player ————— */

export function useThreadAutoplay() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? THREAD_LENGTH : 0);
  const [typing, setTyping] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const clear = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    if (reduce) {
      setCount(THREAD_LENGTH);
      setTyping(false);
      return clear;
    }
    const at = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));

    function run() {
      setCount(0);
      setTyping(false);
      let t = 600;
      for (let i = 1; i <= THREAD_LENGTH; i++) {
        const isAi = HOTEL_THREAD[i - 1].sender === "ai";
        if (isAi) {
          at(() => setTyping(true), t);
          t += 850;
          at(() => {
            setTyping(false);
            setCount(i);
          }, t);
          t += 750;
        } else {
          at(() => setCount(i), t);
          t += 1150;
        }
      }
      at(run, t + 2600); // loop
    }
    run();
    return clear;
  }, [reduce]);

  return { count, typing };
}
