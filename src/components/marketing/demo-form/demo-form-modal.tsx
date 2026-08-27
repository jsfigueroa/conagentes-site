"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { useDemoForm } from "./demo-form-context";

type Status = "idle" | "submitting" | "success" | "error";

export function DemoFormModal() {
  const { isOpen, source, close } = useDemoForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setStatus("idle");
    setErrorMsg("");
    setName("");
    setEmail("");
    setWhatsapp("");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsapp, source }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error enviando solicitud");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Error enviando solicitud"
      );
      setStatus("error");
    }
  }

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
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[oklch(0.08_0.01_95/0.85)] backdrop-blur-sm" />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_24px_80px_oklch(0.08_0.01_95/0.4)]"
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[oklch(0.55_0.008_95)] hover:text-[oklch(0.2_0.01_95)] hover:bg-[oklch(0.96_0.003_95)] transition-colors"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <CheckCircle
                    size={56}
                    className="text-[oklch(0.64_0.19_42)]"
                  />
                </motion.div>
                <h3 className="mt-4 text-xl font-bold text-[oklch(0.2_0.01_95)]">
                  ¡Listo, ya la recibimos!
                </h3>
                <p className="mt-2 text-[oklch(0.55_0.008_95)]">
                  Le escribimos en menos de 24 horas para coordinar su demo.
                </p>
                <button
                  onClick={close}
                  className="mt-6 rounded-full bg-[oklch(0.96_0.003_95)] px-8 py-2.5 text-sm font-semibold text-[oklch(0.2_0.01_95)] hover:bg-[oklch(0.92_0.004_95)] transition-colors"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-[oklch(0.2_0.01_95)]">
                  Agende su demo
                </h3>
                <p className="mt-2 text-sm text-[oklch(0.55_0.008_95)]">
                  Se la mostramos con sus datos reales: sus precios, su
                  información y sus políticas. Sin costo y sin compromiso.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="demo-name"
                      className="block text-sm font-medium text-[oklch(0.32_0.008_95)] mb-1.5"
                    >
                      Nombre *
                    </label>
                    <input
                      id="demo-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nombre y apellido"
                      className="w-full rounded-xl border border-[oklch(0.92_0.004_95)] bg-white px-4 py-3 text-sm text-[oklch(0.2_0.01_95)] placeholder:text-[oklch(0.7_0.005_95)] outline-none focus:border-[oklch(0.74_0.185_50)] focus:ring-2 focus:ring-[oklch(0.74_0.185_50/0.2)] transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="demo-email"
                      className="block text-sm font-medium text-[oklch(0.32_0.008_95)] mb-1.5"
                    >
                      Email *
                    </label>
                    <input
                      id="demo-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@suempresa.com"
                      className="w-full rounded-xl border border-[oklch(0.92_0.004_95)] bg-white px-4 py-3 text-sm text-[oklch(0.2_0.01_95)] placeholder:text-[oklch(0.7_0.005_95)] outline-none focus:border-[oklch(0.74_0.185_50)] focus:ring-2 focus:ring-[oklch(0.74_0.185_50/0.2)] transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="demo-whatsapp"
                      className="block text-sm font-medium text-[oklch(0.32_0.008_95)] mb-1.5"
                    >
                      Celular / WhatsApp *
                    </label>
                    <input
                      id="demo-whatsapp"
                      type="tel"
                      inputMode="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+57 300 123 4567"
                      className="w-full rounded-xl border border-[oklch(0.92_0.004_95)] bg-white px-4 py-3 text-base sm:text-sm text-[oklch(0.2_0.01_95)] placeholder:text-[oklch(0.7_0.005_95)] outline-none focus:border-[oklch(0.74_0.185_50)] focus:ring-2 focus:ring-[oklch(0.74_0.185_50/0.2)] transition-all"
                    />
                    <p className="mt-1.5 text-xs text-[oklch(0.55_0.008_95)]">
                      Le escribimos por aquí para coordinar su demo.
                    </p>
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-[oklch(0.55_0.21_25)]">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-full bg-[oklch(0.74_0.185_50)] px-8 py-3.5 text-sm font-semibold text-[oklch(0.2_0.01_95)] shadow-[0_0_24px_oklch(0.74_0.185_50/0.3)] hover:shadow-[0_0_36px_oklch(0.74_0.185_50/0.5)] hover:brightness-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Enviando…
                      </span>
                    ) : (
                      "Solicitar demo"
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
