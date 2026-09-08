"use client";

import { useMemo, useState, type FormEvent } from "react";
import type { Section } from "@/content/pages";
import { computeLeak, LEAK_DEFAULTS, type LeakInputs, type LeakKey } from "@/lib/leak-model";

type LeakSection = Extract<Section, { type: "leak" }>;

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});
const NUM = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });

/**
 * CALCULADORA DE RESERVAS PERDIDAS (CON-271)
 *
 * The revenue a hotel loses because nobody answered, answered late, never
 * followed up, or never moved the rate. Built for two readers at once: a
 * hotelero who found the page on his own, and one of our reps working the
 * price objection on a call — which is why it shows a LEAK and never a price.
 *
 * The arithmetic (and the three rules it obeys) lives in `@/lib/leak-model`,
 * shared with the page's prose so the two can never disagree.
 */

type Field = {
  key: LeakKey;
  label: string;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  money?: boolean;
  help?: string;
};

/** «Su hotel»: the four numbers any owner knows by heart. */
const HOTEL: Field[] = [
  { key: "habitaciones", label: "Habitaciones", min: 8, max: 300, step: 1 },
  {
    key: "adr",
    label: "Tarifa promedio por noche",
    min: 80_000,
    max: 1_500_000,
    step: 10_000,
    money: true,
    help: "Su ADR: lo que en promedio paga un huésped por noche.",
  },
  {
    key: "ocupacion",
    label: "Ocupación anual",
    min: 25,
    max: 95,
    step: 1,
    suffix: " %",
    help: "Cotelco proyectó 55,9 % para el país a mitad de 2026.",
  },
  {
    key: "noches",
    label: "Noches por reserva",
    min: 1,
    max: 10,
    step: 1,
    help: "Su estadía promedio. Es lo que convierte una reserva perdida en pesos.",
  },
];

/** «Su atención hoy»: the five numbers that decide the leak. */
const ATENCION: Field[] = [
  {
    key: "consultas",
    label: "Consultas de huéspedes al mes",
    min: 20,
    max: 2000,
    step: 10,
    help: "Personas distintas que preguntan por WhatsApp, Instagram, el teléfono o el chat de la web. No mensajes: personas.",
  },
  {
    key: "sinResponder",
    label: "Consultas que hoy quedan sin respuesta",
    min: 0,
    max: 70,
    step: 1,
    suffix: " %",
    help: "Las que nadie contestó nunca: entraron de noche, en fin de semana, o se perdieron entre los chats.",
  },
  {
    key: "tarde",
    label: "Consultas que se contestan tarde",
    min: 0,
    max: 90,
    step: 1,
    suffix: " %",
    help: "Más de una hora después. Al huésped ya le cotizaron otros tres hoteles.",
  },
  {
    key: "silencio",
    label: "Huéspedes que se quedan callados y nadie persigue",
    min: 0,
    max: 95,
    step: 1,
    suffix: " %",
    help: "De los que sí atendió y no reservaron: cuántos quedaron ahí, sin un segundo mensaje.",
  },
  {
    key: "fueraHorario",
    label: "Consultas que llegan fuera de horario",
    min: 0,
    max: 80,
    step: 1,
    suffix: " %",
    help: "Noches, madrugadas y fines de semana. No suma aparte: muestra qué parte de la fuga pasa cuando no hay nadie.",
  },
];

/** The expert knobs. Visible, editable, and stated as assumptions. */
const SUPUESTOS: Field[] = [
  {
    key: "cierre",
    label: "De cada 100 consultas bien atendidas, cuántas reservan",
    min: 3,
    max: 60,
    step: 1,
    suffix: " %",
    help: "Su tasa de cierre cuando la atención sí funciona.",
  },
  {
    key: "penalDemora",
    label: "Cuánto del cierre se pierde por contestar tarde",
    min: 0,
    max: 90,
    step: 5,
    suffix: " %",
    help: "Harvard Business Review: contestar dentro de la primera hora hace casi siete veces más probable calificar la consulta. El 50 % por defecto es deliberadamente prudente frente a eso.",
  },
  {
    key: "recuperacion",
    label: "Cuántos de los callados vuelven si alguien insiste",
    min: 0,
    max: 60,
    step: 1,
    suffix: " %",
    help: "Estimación propia y conservadora: un segundo mensaje oportuno no recupera a todos, pero sí a una parte.",
  },
  {
    key: "optimizacion",
    label: "Ingreso extra por mover la tarifa según la demanda",
    min: 0,
    max: 15,
    step: 1,
    suffix: " %",
    help: "Las referencias públicas de la industria ubican el efecto de un sistema de revenue management entre 4 % y 8 % del ingreso por habitación. El 5 % por defecto es el extremo bajo.",
  },
];

function Slider({
  f,
  value,
  onChange,
}: {
  f: Field;
  value: number;
  onChange: (v: number) => void;
}) {
  const shown = f.money ? COP.format(value) : `${NUM.format(value)}${f.suffix ?? ""}`;
  const id = `leak-${f.key}`;
  // Drives the filled portion of the track — see .range-brand in globals.css.
  const pct = ((value - f.min) / (f.max - f.min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13.5px] font-medium leading-snug text-foreground">
          {f.label}
        </label>
        <output
          htmlFor={id}
          className="shrink-0 text-[15px] font-bold tabular-nums text-foreground"
        >
          {shown}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={f.min}
        max={f.max}
        step={f.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onWheel={(e) => {
          // In Chromium a FOCUSED range input consumes the page's wheel and
          // moves itself. So the visitor drags a slider, scrolls down to read
          // the result, and the number he just set has quietly changed. Drop
          // the focus instead of preventing the default: the page keeps
          // scrolling, and his number stays where he put it.
          if (document.activeElement === e.currentTarget) e.currentTarget.blur();
        }}
        className="range-brand mt-1"
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
      {f.help && (
        <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{f.help}</p>
      )}
    </div>
  );
}

type SendStatus = "idle" | "submitting" | "success" | "error";

/**
 * «Envíeme el desglose». Ungated on purpose — the number is already on screen;
 * this exists for the owner who wants it in writing, and it carries HIS OWN
 * figures into the notification, so whoever calls him back already knows which
 * of the four leaks he was looking at.
 */
function SendBreakdown({ context }: { context: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<SendStatus>("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          whatsapp,
          source: "calculadora-reservas-perdidas",
          context,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "No pudimos enviar el desglose");
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos enviar el desglose");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="mt-6 rounded-2xl border border-[oklch(0.74_0.185_50/0.35)] bg-[oklch(0.74_0.185_50/0.08)] p-5"
        role="status"
      >
        <p className="text-[14px] font-semibold text-white">Listo, va en camino.</p>
        <p className="mt-1 text-[13px] leading-relaxed text-[oklch(0.78_0.005_95)]">
          Le enviamos el desglose con sus números y le escribimos por WhatsApp para conversar cuál
          de las cuatro fugas conviene cerrar primero.
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 w-full cursor-pointer rounded-xl border border-white/15 px-5 py-3 text-[13.5px] font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/5"
      >
        Envíeme este desglose
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-3" aria-label="Enviar el desglose">
      <p className="text-[13px] leading-relaxed text-[oklch(0.72_0.005_95)]">
        Se lo mandamos con sus propios números. Sin descargas y sin curso de nada.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Su nombre"
          aria-label="Su nombre"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-[16px] text-white placeholder:text-[oklch(0.6_0.005_95)] focus-visible:border-[oklch(0.74_0.185_50)] focus-visible:outline-none sm:text-[14px]"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
          aria-label="Correo"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-[16px] text-white placeholder:text-[oklch(0.6_0.005_95)] focus-visible:border-[oklch(0.74_0.185_50)] focus-visible:outline-none sm:text-[14px]"
        />
        <input
          type="tel"
          required
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="WhatsApp"
          aria-label="WhatsApp"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-[16px] text-white placeholder:text-[oklch(0.6_0.005_95)] focus-visible:border-[oklch(0.74_0.185_50)] focus-visible:outline-none sm:text-[14px]"
        />
      </div>
      {status === "error" && (
        <p className="text-[12.5px] text-[oklch(0.72_0.17_25)]" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-brand w-full cursor-pointer rounded-xl px-5 py-3 text-[13.5px] font-semibold disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? "Enviando…" : "Enviar el desglose"}
      </button>
    </form>
  );
}

export function LeakCalculator({ s }: { s: LeakSection }) {
  const [v, setV] = useState<LeakInputs>(LEAK_DEFAULTS);
  const r = useMemo(() => computeLeak(v), [v]);

  const set = (key: LeakKey) => (n: number) => setV((prev) => ({ ...prev, [key]: n }));

  const rows = [
    { k: "Consultas que nadie contestó", val: r.fugaNunca },
    { k: "Consultas contestadas cuando ya cotizó otro hotel", val: r.fugaTarde },
    { k: "Huéspedes que se quedaron callados y nadie persiguió", val: r.fugaSeguimiento },
    { k: "Tarifa que nunca se movió según la demanda", val: r.fugaTarifa },
  ];

  /** What the owner's own email — and whoever calls him back — needs to see. */
  const context = [
    `${NUM.format(v.habitaciones)} habitaciones · ADR ${COP.format(v.adr)} · ocupación ${v.ocupacion} % · ${v.noches} noches por reserva · ${NUM.format(v.consultas)} consultas al mes.`,
    `Fuga anual estimada: ${COP.format(r.total)} — el ${r.porcentajeIngreso.toFixed(1).replace(".", ",")} % del ingreso por alojamiento.`,
    `Sin contestar ${COP.format(r.fugaNunca)} · tarde ${COP.format(r.fugaTarde)} · sin seguimiento ${COP.format(r.fugaSeguimiento)} · tarifa sin optimizar ${COP.format(r.fugaTarifa)}.`,
    `Equivale a ${NUM.format(Math.round(r.reservasPerdidas))} reservas y ${NUM.format(Math.round(r.nochesVacias))} noches al año.`,
  ].join("\n");

  return (
    <figure className="mx-auto max-w-6xl">
      {/* No `overflow-hidden` here, deliberately: it would become the sticky
          panel's containing block and kill the sticky. The dark column rounds
          its own corners instead — bottom pair when stacked, right pair once
          it becomes the second column. */}
      <div className="grid gap-6 rounded-3xl border border-border bg-card lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-0">
        {/* Inputs */}
        <form
          className="p-6 sm:p-8"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Calculadora de reservas perdidas"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Su hotel
          </p>
          <div className="mt-4 space-y-5">
            {HOTEL.map((f) => (
              <Slider key={f.key} f={f} value={v[f.key]} onChange={set(f.key)} />
            ))}
          </div>

          <p className="mt-8 border-t border-border pt-7 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Su atención hoy
          </p>
          <div className="mt-4 space-y-5">
            {ATENCION.map((f) => (
              <Slider key={f.key} f={f} value={v[f.key]} onChange={set(f.key)} />
            ))}
          </div>

          <details className="mt-8 border-t border-border pt-7">
            <summary className="cursor-pointer list-none text-[11px] font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
              Los supuestos — ábralos y cámbielos
            </summary>
            <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">
              Acá no hay nada escondido. Estos cuatro números son los que convierten sus consultas
              en pesos, y son suyos para mover: si los baja, la cuenta baja.
            </p>
            <div className="mt-5 space-y-5">
              {SUPUESTOS.map((f) => (
                <Slider key={f.key} f={f} value={v[f.key]} onChange={set(f.key)} />
              ))}
            </div>
          </details>

          {/* On a phone the result panel is nine sliders below, so the number
              would be invisible exactly while he is moving the thing that
              changes it. This pins it to the bottom of the screen for as long
              as the sliders are on it. On lg the panel itself sticks instead. */}
          {/* Right-aligned on purpose: the site's floating call button lives in
              the bottom-left corner and would sit on top of the label. */}
          <div className="sticky bottom-0 -mx-6 mt-7 flex items-baseline justify-end gap-3 border-t border-border bg-card/95 px-6 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:hidden">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              La fuga al año
            </span>
            <span className="text-[17px] font-extrabold tabular-nums text-foreground">
              {COP.format(r.total)}
            </span>
          </div>
        </form>

        {/* Result — the column fills, its content follows the sliders. Nine
            inputs make the left side much taller than the panel, and a number
            that scrolls out of view while you are moving the slider that
            changes it is the one thing this screen cannot afford. */}
        <div className="rounded-b-3xl bg-[oklch(0.1_0.01_95)] p-6 sm:p-8 lg:rounded-bl-none lg:rounded-r-3xl">
          <div className="lg:sticky lg:top-24">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[oklch(0.62_0.005_95)]">
              La cuenta
            </p>
            <p className="mt-4 text-[34px] font-extrabold leading-none tabular-nums text-[oklch(0.74_0.185_50)] sm:text-[40px]">
              {COP.format(r.total)}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[oklch(0.78_0.005_95)]">
              es el ingreso que su hotel deja sobre la mesa cada año: el{" "}
              {r.porcentajeIngreso.toFixed(1).replace(".", ",")} % de lo que factura por alojamiento.
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-[oklch(0.66_0.005_95)]">
              Son <strong className="font-semibold text-white">{COP.format(r.mensual)}</strong> por
              cada mes que esto siga igual.
            </p>

            <dl className="mt-7 space-y-2.5 border-t border-white/10 pt-6">
              {rows.map((row) => (
                <div key={row.k} className="flex items-baseline justify-between gap-4">
                  <dt className="text-[13px] leading-snug text-[oklch(0.66_0.005_95)]">{row.k}</dt>
                  <dd className="shrink-0 text-[13.5px] font-semibold tabular-nums text-white">
                    {COP.format(row.val)}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-[12.5px] leading-relaxed text-[oklch(0.62_0.005_95)]">
              De cada 100 consultas que le entran, {r.partition.nunca} no reciben respuesta,{" "}
              {r.partition.tarde} llegan tarde y {r.partition.aTiempo} se atienden a tiempo. Y{" "}
              <span className="font-semibold tabular-nums text-[oklch(0.82_0.005_95)]">
                {COP.format(r.fugaFueraHorario)}
              </span>{" "}
              de la fuga por no contestar ocurre de noche o en fin de semana, cuando no hay nadie en
              recepción.
            </p>

            <div className="mt-7 rounded-2xl border border-[oklch(0.74_0.185_50/0.3)] bg-[oklch(0.74_0.185_50/0.08)] p-5">
              <p className="text-[26px] font-extrabold leading-none tabular-nums text-white">
                {NUM.format(Math.round(r.reservasPerdidas))} reservas
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[oklch(0.82_0.005_95)]">
                es lo que esa fuga significa al año: {NUM.format(Math.round(r.nochesVacias))} noches
                que su hotel tenía disponibles y nadie ocupó.
              </p>
              <p className="mt-3 text-[11.5px] leading-relaxed text-[oklch(0.62_0.005_95)]">
                Sin construir una habitación más y sin gastar un peso más en pauta: son huéspedes que
                ya le habían escrito.
              </p>
            </div>

            <SendBreakdown context={context} />
          </div>
        </div>
      </div>
      {s.footnote && (
        <figcaption className="mx-auto mt-5 max-w-3xl text-center text-[12px] leading-relaxed text-muted-foreground">
          {s.footnote}
        </figcaption>
      )}
    </figure>
  );
}
