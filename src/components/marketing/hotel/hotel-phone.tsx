"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Camera,
  CheckCheck,
  ChevronLeft,
  CreditCard,
  Lock,
  Mic,
  Paperclip,
  Phone,
  Video,
} from "lucide-react";
import { PhoneFrame } from "@/components/marketing/hero-demo/phone-frame";

/* ————— The hotel booking conversation (shared by hero + story) —————
 *
 * FRAMING — this is the HOTEL's WhatsApp Business inbox, looking at one guest's
 * thread. That is why the agent's replies sit on the right (outbound, brand
 * tint, with delivery ticks) and the guest's sit on the left. It matches the
 * ChatReplay component used on every spoke page, and it is what a hotelier
 * actually recognises: their own inbox, answering itself.
 *
 * WORKFLOW REALISM — the thread has to survive a hotelier reading it closely:
 *   · the agent pins down the exact dates before quoting anything
 *   · the room card does NOT include breakfast, because breakfast is the upsell
 *     two messages later (offering what is already included reads as a bot)
 *   · the arithmetic closes: 2 x $420.000 = $840.000, + $60.000 = $900.000,
 *     and that same $900.000 is the figure every other mock on the site shows
 *   · payment happens through the link, so the confirmation lands after it
 */

export type ThreadMsg = {
  id: number;
  sender: "guest" | "ai";
  text?: string;
  card?: "room" | "payment";
  /** Clock time shown in the bubble corner, like a real thread. */
  at: string;
};

export const HOTEL_THREAD: ThreadMsg[] = [
  {
    id: 1,
    sender: "guest",
    at: "11:47 p. m.",
    text: "Hola 👋 ¿Tienen habitación para el fin de semana? Somos 2.",
  },
  {
    id: 2,
    sender: "ai",
    at: "11:47 p. m.",
    text: "¡Hola! Con gusto 😊 ¿Le sirve del viernes 12 al domingo 14? Serían 2 noches para 2 personas.",
  },
  { id: 3, sender: "guest", at: "11:48 p. m.", text: "Sí, esas fechas." },
  { id: 4, sender: "ai", at: "11:48 p. m.", card: "room" },
  {
    id: 5,
    sender: "ai",
    at: "11:48 p. m.",
    text: "Es la última con vista al mar para esas fechas. ¿Se la aparto?",
  },
  { id: 6, sender: "guest", at: "11:49 p. m.", text: "Sí, resérvela 🙌" },
  {
    id: 7,
    sender: "ai",
    at: "11:49 p. m.",
    text: "Le sumo desayuno para los dos y late checkout hasta las 3 p. m. por $60.000 toda la estadía. ¿Se los agrego?",
  },
  { id: 8, sender: "guest", at: "11:50 p. m.", text: "Dale, los dos." },
  { id: 9, sender: "ai", at: "11:50 p. m.", card: "payment" },
  {
    id: 10,
    sender: "ai",
    at: "11:52 p. m.",
    text: "Pago recibido ✅ Reserva #A-2291 confirmada del 12 al 14. Le llega la factura electrónica al correo 📄",
  },
];

export const THREAD_LENGTH = HOTEL_THREAD.length;

/**
 * How many messages are visible at each story beat.
 * 01 llega · 02 disponibilidad · 03 upsell · 04 cobro · 05 canales ·
 * 06 factura · 07 TRA — the last three are backoffice beats, so they just hold
 * the completed thread.
 */
export const BEAT_MESSAGE_COUNT = [3, 5, 8, 10, 10, 10, 10];

/* ————— In-bubble cards ————— */

function RoomCard() {
  return (
    <div className="w-[196px] overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_oklch(0.2_0.01_95/0.16)]">
      <div className="relative h-20 bg-brand-gradient">
        <span className="absolute bottom-1.5 left-2 rounded bg-black/25 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
          Vista al mar
        </span>
      </div>
      <div className="p-2.5">
        <p className="text-[13px] font-bold text-[oklch(0.2_0.01_95)]">
          Doble Superior
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-[oklch(0.5_0.008_95)]">
          Vie 12 – dom 14 · 2 noches
        </p>
        <p className="text-[11px] leading-snug text-[oklch(0.5_0.008_95)]">
          Cancelación gratis hasta 48 h antes
        </p>
        <p className="mt-1.5 text-[15px] font-extrabold tabular-nums text-[oklch(0.2_0.01_95)]">
          $420.000{" "}
          <span className="text-[10px] font-medium text-[oklch(0.5_0.008_95)]">
            / noche
          </span>
        </p>
      </div>
    </div>
  );
}

function PaymentChip() {
  return (
    <div className="w-[196px] rounded-xl bg-white p-2.5 shadow-[0_1px_3px_oklch(0.2_0.01_95/0.16)]">
      <p className="text-[10px] text-[oklch(0.5_0.008_95)]">
        Link de pago · Reserva #A-2291
      </p>
      <p className="mt-0.5 text-[17px] font-extrabold tabular-nums text-[oklch(0.2_0.01_95)]">
        $900.000
      </p>
      <p className="mt-0.5 text-[10px] leading-snug text-[oklch(0.5_0.008_95)]">
        2 noches $840.000 + desayuno y late checkout $60.000
      </p>
      <div className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-brand-gradient-strong py-1.5 text-[12px] font-bold text-white">
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
        className={`max-w-[82%] text-[12.5px] leading-snug ${
          msg.card
            ? "bg-transparent"
            : isAi
              ? "rounded-2xl rounded-br-md bg-[oklch(0.93_0.05_55)] px-2.5 py-1.5 text-[oklch(0.2_0.01_95)]"
              : "rounded-2xl rounded-bl-md bg-white px-2.5 py-1.5 text-[oklch(0.2_0.01_95)] shadow-[0_1px_2px_oklch(0.2_0.01_95/0.12)]"
        }`}
      >
        {msg.card === "room" ? (
          <RoomCard />
        ) : msg.card === "payment" ? (
          <PaymentChip />
        ) : (
          <>
            {/* The timestamp/tick cluster is what makes a fake thread read as a
                real one. Floated (not absolutely placed) so it tucks onto the
                end of the last line when there is room and drops to its own
                line when there isn't — exactly how WhatsApp behaves. */}
            <span className="float-right ml-2 mt-[0.45em] flex items-center gap-0.5 text-[9px] leading-none text-[oklch(0.55_0.01_95)]">
              {msg.at}
              {isAi && (
                <CheckCheck
                  className="h-2.5 w-2.5 text-[oklch(0.62_0.14_235)]"
                  aria-hidden
                />
              )}
            </span>
            {msg.text}
          </>
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

/* ————— Phone chrome ————— */

function ChatHeader() {
  return (
    <div className="flex shrink-0 items-center gap-2.5 bg-[oklch(0.16_0.01_95)] px-3 py-2.5">
      <ChevronLeft className="h-4 w-4 shrink-0 text-white/60" aria-hidden />
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient-strong text-[11px] font-bold text-white">
        CR
      </span>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-[13px] font-semibold text-white">Camila R.</p>
        <p className="truncate text-[10px] text-white/45">+57 310 ••• ••41</p>
      </div>
      <span className="ml-auto flex shrink-0 items-center gap-3 text-white/45">
        <Video className="h-3.5 w-3.5" aria-hidden />
        <Phone className="h-3.5 w-3.5" aria-hidden />
      </span>
    </div>
  );
}

/** The two system chips WhatsApp itself puts at the head of a thread. */
function ThreadHead() {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2 pb-1">
      <span className="rounded-md bg-[oklch(0.99_0.02_95)] px-2 py-0.5 text-[9.5px] font-medium text-[oklch(0.5_0.008_95)] shadow-[0_1px_1px_oklch(0.2_0.01_95/0.08)]">
        HOY
      </span>
      <span className="mx-6 flex items-center justify-center gap-1 rounded-md bg-[oklch(0.97_0.035_85)] px-2 py-1 text-center text-[9px] leading-tight text-[oklch(0.45_0.03_85)]">
        <Lock className="h-2.5 w-2.5 shrink-0" aria-hidden />
        Los mensajes están cifrados de extremo a extremo
      </span>
    </div>
  );
}

function InputBar() {
  return (
    <div className="flex shrink-0 items-center gap-2 bg-[oklch(0.955_0.008_95)] px-2.5 py-2">
      <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
        <span className="flex-1 text-[12px] text-[oklch(0.6_0.008_95)]">
          Mensaje
        </span>
        <Paperclip
          className="h-3.5 w-3.5 shrink-0 text-[oklch(0.6_0.008_95)]"
          aria-hidden
        />
        <Camera
          className="h-3.5 w-3.5 shrink-0 text-[oklch(0.6_0.008_95)]"
          aria-hidden
        />
      </div>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient-strong">
        <Mic className="h-4 w-4 text-white" aria-hidden />
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
          <ThreadHead />
          <AnimatePresence initial={false}>
            {msgs.map((m) => (
              <Bubble key={m.id} msg={m} />
            ))}
          </AnimatePresence>
          <AnimatePresence>
            {typing && <TypingDots key="typing" />}
          </AnimatePresence>
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
    const at = (fn: () => void, ms: number) =>
      timers.current.push(setTimeout(fn, ms));

    function run() {
      setCount(0);
      setTyping(false);
      let t = 600;
      for (let i = 1; i <= THREAD_LENGTH; i++) {
        const isAi = HOTEL_THREAD[i - 1].sender === "ai";
        if (isAi) {
          at(() => setTyping(true), t);
          t += 700;
          at(() => {
            setTyping(false);
            setCount(i);
          }, t);
          t += 600;
        } else {
          at(() => setCount(i), t);
          t += 950;
        }
      }
      at(run, t + 2800); // loop
    }
    run();
    return clear;
  }, [reduce]);

  return { count, typing };
}
