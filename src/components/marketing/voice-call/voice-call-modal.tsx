"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Mic, MicOff, PhoneOff, X } from "lucide-react";
import { useVoiceCall } from "./voice-call-context";
import { useWebCall } from "./use-web-call";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.conagentes.com";

function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * The live-call panel (CON-260).
 *
 * Two deliberate departures from how the demo-form modal behaves, both because
 * a call is not a form:
 *  - While the call is LIVE, neither Escape nor a backdrop click closes it. A
 *    stray click that silently kills a conversation mid-sentence is the worst
 *    thing this panel could do, so hanging up is an explicit, labelled action.
 *  - The panel never auto-starts. The visitor pressed "hablar con un agente",
 *    which opens the panel; the browser's microphone prompt then arrives as a
 *    direct consequence of a second, deliberate press — not as an ambush.
 */
export function VoiceCallModal() {
  const { isOpen, close } = useVoiceCall();
  const { phase, error, muted, agentSpeaking, seconds, start, hangUp, toggleMute, reset } =
    useWebCall(APP_URL);
  const primaryRef = useRef<HTMLButtonElement | null>(null);

  const isLive = phase === "live";
  const isBusy = phase === "requesting-mic" || phase === "connecting";

  // Escape closes — except mid-call, where it would drop the conversation.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLive) close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, isLive, close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset to a clean panel each time it opens, and make sure a call can never
  // outlive the panel that owns it.
  useEffect(() => {
    if (isOpen) {
      reset();
      primaryRef.current?.focus();
    } else if (phase === "live") {
      hangUp();
    }
    // `phase` intentionally omitted: this runs on open/close, not on every tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const status =
    phase === "requesting-mic"
      ? "Pidiendo permiso del micrófono…"
      : phase === "connecting"
        ? "Conectando con Valentina…"
        : phase === "live"
          ? agentSpeaking
            ? "Valentina está hablando"
            : "Su turno — hable con confianza"
          : phase === "ended"
            ? "Llamada finalizada"
            : "";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isLive) close();
          }}
        >
          <div className="absolute inset-0 bg-[oklch(0.08_0.01_95/0.85)] backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="voice-call-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md rounded-3xl border border-border bg-card p-7 text-card-foreground shadow-2xl"
          >
            {!isLive && (
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar"
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--orange)]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            )}

            {/* ── Avatar / state indicator ───────────────────────────────── */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-5 mt-2">
                {isLive && agentSpeaking && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-[var(--orange)]/30 motion-reduce:hidden"
                    animate={{ scale: [1, 1.35], opacity: [0.55, 0] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <div
                  className="relative grid h-20 w-20 place-items-center rounded-full text-2xl font-extrabold text-white"
                  style={{ backgroundImage: "var(--brand-gradient-strong)" }}
                >
                  V
                </div>
              </div>

              <h2 id="voice-call-title" className="text-xl font-extrabold tracking-tight">
                {phase === "ended" ? "Gracias por su tiempo" : "Hable con Valentina"}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                {phase === "ended"
                  ? "Si dejó sus datos, un asesor le escribe hoy mismo. ¿Quiere retomar la conversación?"
                  : "Es una agente de inteligencia artificial de conagentes. Pregúntele lo que quiera sobre cómo funcionaría en su hotel — ella misma es la demostración."}
              </p>

              {/* Status line. Polite so a screen reader is not interrupted. */}
              <p
                aria-live="polite"
                className="mt-4 flex min-h-[1.5rem] items-center gap-2 text-sm font-semibold"
              >
                {isBusy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {isLive && (
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full ${
                      agentSpeaking ? "bg-[var(--orange)]" : "bg-[oklch(0.62_0.15_150)]"
                    }`}
                  />
                )}
                <span>{status}</span>
                {isLive && (
                  <span className="tabular-nums text-muted-foreground">
                    · {formatDuration(seconds)}
                  </span>
                )}
              </p>

              {error && (
                <p
                  role="alert"
                  className="mt-3 rounded-xl bg-[oklch(0.95_0.03_25)] px-4 py-3 text-sm text-[oklch(0.45_0.18_25)]"
                >
                  {error}
                </p>
              )}
            </div>

            {/* ── Actions ────────────────────────────────────────────────── */}
            <div className="mt-7">
              {(phase === "idle" || phase === "error" || phase === "ended") && (
                <button
                  ref={primaryRef}
                  type="button"
                  onClick={start}
                  className="btn-brand w-full cursor-pointer rounded-full px-8 py-4 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--orange)]"
                >
                  {phase === "idle" ? "Iniciar la llamada" : "Llamar de nuevo"}
                </button>
              )}

              {isBusy && (
                <button
                  type="button"
                  onClick={hangUp}
                  className="w-full cursor-pointer rounded-full border border-border px-8 py-4 text-base font-semibold text-muted-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--orange)]"
                >
                  Cancelar
                </button>
              )}

              {isLive && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-pressed={muted}
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-border text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--orange)]"
                  >
                    {muted ? (
                      <MicOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Mic className="h-5 w-5" aria-hidden="true" />
                    )}
                    {muted ? "Activar micrófono" : "Silenciar"}
                  </button>
                  <button
                    type="button"
                    onClick={hangUp}
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[oklch(0.55_0.19_25)] text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.55_0.19_25)]"
                  >
                    <PhoneOff className="h-5 w-5" aria-hidden="true" />
                    Colgar
                  </button>
                </div>
              )}
            </div>

            <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
              Usamos su micrófono solo mientras dure la llamada. Si nos deja sus datos, es para que un
              asesor le escriba sobre la demo — nada más.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
