"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import type { Section } from "@/content/pages";
import {
  computeGenericLeak,
  computeHotelLeak,
  GENERIC_DEFAULTS,
  HOTEL_DEFAULTS,
  type GenericLeakInputs,
  type GenericLeakKey,
  type HotelLeakInputs,
  type HotelLeakKey,
} from "@/lib/leak-model";

type LeakSection = Extract<Section, { type: "leak" }>;

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});
const NUM = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });

/**
 * CALCULADORA DE FUGA (CON-271)
 *
 * The revenue lost because nobody answered, answered late, never followed up —
 * plus, per variant, the rate that never moved (hotel) or the hours the team
 * spends answering the same questions (generic SMB).
 *
 * Built for two readers at once: an owner who found the page on his own, and
 * one of our reps working the price objection on a call — which is why it
 * shows a LEAK and never a price.
 *
 * The arithmetic (and the three rules it obeys) lives in `@/lib/leak-model`,
 * shared with each page's prose so the two can never disagree.
 */

/* ————— piezas compartidas ————— */

type Field<K extends string> = {
  key: K;
  label: string;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  money?: boolean;
  help?: string;
};

type Group<K extends string> = { label: string; note?: string; fields: Field<K>[] };

function Slider<K extends string>({
  f,
  value,
  onChange,
}: {
  f: Field<K>;
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
 * leak he was looking at.
 */
function SendBreakdown({ context, source }: { context: string; source: string }) {
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
        body: JSON.stringify({ name, email, whatsapp, source, context }),
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
          de las fugas conviene cerrar primero.
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

/** The card: inputs on the left, the account on the right. */
function CalcShell<K extends string>({
  groups,
  values,
  onChange,
  total,
  result,
  footnote,
  inputsLabel,
}: {
  groups: Group<K>[];
  values: Record<K, number>;
  onChange: (key: K) => (v: number) => void;
  total: number;
  result: ReactNode;
  footnote?: string;
  inputsLabel: string;
}) {
  return (
    <figure className="mx-auto max-w-6xl">
      {/* No `overflow-hidden` here, deliberately: it would become the sticky
          panel's containing block and kill the sticky. The dark column rounds
          its own corners instead — bottom pair when stacked, right pair once
          it becomes the second column. */}
      <div className="grid gap-6 rounded-3xl border border-border bg-card lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-0">
        <form className="p-6 sm:p-8" onSubmit={(e) => e.preventDefault()} aria-label={inputsLabel}>
          {groups.map((g, i) => (
            <div key={g.label} className={i === 0 ? "" : "mt-8 border-t border-border pt-7"}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                {g.label}
              </p>
              {g.note && (
                <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted-foreground">
                  {g.note}
                </p>
              )}
              <div className="mt-4 space-y-5">
                {g.fields.map((f) => (
                  <Slider key={f.key} f={f} value={values[f.key]} onChange={onChange(f.key)} />
                ))}
              </div>
            </div>
          ))}

          {/* On a phone the result panel is a dozen sliders below, so the
              number would be invisible exactly while he is moving the thing
              that changes it. This pins it to the bottom of the screen for as
              long as the sliders are on it. On lg the panel itself sticks.
              Right-aligned on purpose: the site's floating call button lives in
              the bottom-left corner and would sit on top of the label. */}
          <div className="sticky bottom-0 -mx-6 mt-7 flex items-baseline justify-end gap-3 border-t border-border bg-card/95 px-6 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:hidden">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              La fuga al año
            </span>
            <span className="text-[17px] font-extrabold tabular-nums text-foreground">
              {COP.format(total)}
            </span>
          </div>
        </form>

        <div className="rounded-b-3xl bg-[oklch(0.1_0.01_95)] p-6 sm:p-8 lg:rounded-bl-none lg:rounded-r-3xl">
          <div className="lg:sticky lg:top-24">{result}</div>
        </div>
      </div>
      {footnote && (
        <figcaption className="mx-auto mt-5 max-w-3xl text-center text-[12px] leading-relaxed text-muted-foreground">
          {footnote}
        </figcaption>
      )}
    </figure>
  );
}

/** The right-hand column's shared skeleton: hero figure, lines, note, payoff. */
function ResultPanel({
  total,
  mensual,
  heroNote,
  rows,
  partition,
  payoff,
  context,
  source,
}: {
  total: number;
  mensual: number;
  heroNote: ReactNode;
  rows: { k: string; val: number }[];
  partition: ReactNode;
  payoff: { figure: string; body: ReactNode; note: string };
  context: string;
  source: string;
}) {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[oklch(0.62_0.005_95)]">
        La cuenta
      </p>
      <p className="mt-4 text-[34px] font-extrabold leading-none tabular-nums text-[oklch(0.74_0.185_50)] sm:text-[40px]">
        {COP.format(total)}
      </p>
      <p className="mt-2 text-[14px] leading-relaxed text-[oklch(0.78_0.005_95)]">{heroNote}</p>
      <p className="mt-3 text-[13px] leading-relaxed text-[oklch(0.66_0.005_95)]">
        Son <strong className="font-semibold text-white">{COP.format(mensual)}</strong> por cada mes
        que esto siga igual.
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

      <p className="mt-6 text-[12.5px] leading-relaxed text-[oklch(0.62_0.005_95)]">{partition}</p>

      <div className="mt-7 rounded-2xl border border-[oklch(0.74_0.185_50/0.3)] bg-[oklch(0.74_0.185_50/0.08)] p-5">
        <p className="text-[26px] font-extrabold leading-none tabular-nums text-white">
          {payoff.figure}
        </p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[oklch(0.82_0.005_95)]">
          {payoff.body}
        </p>
        <p className="mt-3 text-[11.5px] leading-relaxed text-[oklch(0.62_0.005_95)]">
          {payoff.note}
        </p>
      </div>

      <SendBreakdown context={context} source={source} />
    </>
  );
}

/* ————— variante hotel ————— */

const HOTEL_GROUPS: Group<HotelLeakKey>[] = [
  {
    label: "Su hotel",
    fields: [
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
    ],
  },
  {
    label: "Su atención hoy",
    fields: [
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
    ],
  },
  {
    label: "Los supuestos — cámbielos",
    note: "Acá no hay nada escondido. Estos cuatro números son los que convierten sus consultas en pesos, y son suyos para mover: si los baja, la cuenta baja.",
    fields: [
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
    ],
  },
];

function HotelLeak({ footnote }: { footnote?: string }) {
  const [v, setV] = useState<HotelLeakInputs>(HOTEL_DEFAULTS);
  const r = useMemo(() => computeHotelLeak(v), [v]);
  const onChange = (key: HotelLeakKey) => (n: number) =>
    setV((prev) => ({ ...prev, [key]: n }));

  const context = [
    `${NUM.format(v.habitaciones)} habitaciones · ADR ${COP.format(v.adr)} · ocupación ${v.ocupacion} % · ${v.noches} noches por reserva · ${NUM.format(v.consultas)} consultas al mes.`,
    `Fuga anual estimada: ${COP.format(r.total)} — el ${r.porcentajeIngreso.toFixed(1).replace(".", ",")} % del ingreso por alojamiento.`,
    `Sin contestar ${COP.format(r.fugaNunca)} · tarde ${COP.format(r.fugaTarde)} · sin seguimiento ${COP.format(r.fugaSeguimiento)} · tarifa sin optimizar ${COP.format(r.fugaTarifa)}.`,
    `Equivale a ${NUM.format(Math.round(r.ventasPerdidas))} reservas y ${NUM.format(Math.round(r.nochesVacias))} noches al año.`,
  ].join("\n");

  return (
    <CalcShell
      groups={HOTEL_GROUPS}
      values={v}
      onChange={onChange}
      total={r.total}
      footnote={footnote}
      inputsLabel="Calculadora de reservas perdidas"
      result={
        <ResultPanel
          total={r.total}
          mensual={r.mensual}
          heroNote={
            <>
              es el ingreso que su hotel deja sobre la mesa cada año: el{" "}
              {r.porcentajeIngreso.toFixed(1).replace(".", ",")} % de lo que factura por
              alojamiento.
            </>
          }
          rows={[
            { k: "Consultas que nadie contestó", val: r.fugaNunca },
            { k: "Consultas contestadas cuando ya cotizó otro hotel", val: r.fugaTarde },
            { k: "Huéspedes que se quedaron callados y nadie persiguió", val: r.fugaSeguimiento },
            { k: "Tarifa que nunca se movió según la demanda", val: r.fugaTarifa },
          ]}
          partition={
            <>
              De cada 100 consultas que le entran, {r.partition.nunca} no reciben respuesta,{" "}
              {r.partition.tarde} llegan tarde y {r.partition.aTiempo} se atienden a tiempo. Y{" "}
              <span className="font-semibold tabular-nums text-[oklch(0.82_0.005_95)]">
                {COP.format(r.fugaFueraHorario)}
              </span>{" "}
              de la fuga por no contestar ocurre de noche o en fin de semana, cuando no hay nadie
              en recepción.
            </>
          }
          payoff={{
            figure: `${NUM.format(Math.round(r.ventasPerdidas))} reservas`,
            body: (
              <>
                es lo que esa fuga significa al año: {NUM.format(Math.round(r.nochesVacias))} noches
                que su hotel tenía disponibles y nadie ocupó.
              </>
            ),
            note: "Sin construir una habitación más y sin gastar un peso más en pauta: son huéspedes que ya le habían escrito.",
          }}
          context={context}
          source="calculadora-reservas-perdidas"
        />
      }
    />
  );
}

/* ————— variante genérica (pyme) ————— */

const GENERIC_GROUPS: Group<GenericLeakKey>[] = [
  {
    label: "Su negocio",
    fields: [
      {
        key: "consultas",
        label: "Clientes que le escriben al mes",
        min: 10,
        max: 3000,
        step: 10,
        help: "Personas distintas que preguntan por WhatsApp, Instagram, el teléfono o el chat de la web. No mensajes: personas.",
      },
      {
        key: "ticket",
        label: "Valor promedio de una venta",
        min: 20_000,
        max: 5_000_000,
        step: 10_000,
        money: true,
        help: "Su ticket promedio: lo que en promedio deja un cliente que sí compra.",
      },
    ],
  },
  {
    label: "Su atención hoy",
    fields: [
      {
        key: "sinResponder",
        label: "Mensajes que hoy quedan sin respuesta",
        min: 0,
        max: 70,
        step: 1,
        suffix: " %",
        help: "Los que nadie contestó nunca: entraron de noche, un domingo, o se perdieron entre los chats.",
      },
      {
        key: "tarde",
        label: "Mensajes que se contestan tarde",
        min: 0,
        max: 90,
        step: 1,
        suffix: " %",
        help: "Más de una hora después. Al cliente ya le respondió otro.",
      },
      {
        key: "silencio",
        label: "Clientes que se quedan callados y nadie persigue",
        min: 0,
        max: 95,
        step: 1,
        suffix: " %",
        help: "De los que sí atendió y no compraron: cuántos quedaron ahí, sin un segundo mensaje.",
      },
      {
        key: "fueraHorario",
        label: "Mensajes que llegan fuera de horario",
        min: 0,
        max: 80,
        step: 1,
        suffix: " %",
        help: "Noches, madrugadas, domingos y festivos. No suma aparte: muestra qué parte de la fuga pasa cuando no hay nadie.",
      },
    ],
  },
  {
    label: "El tiempo de su equipo",
    fields: [
      {
        key: "horasDia",
        label: "Horas al día contestando siempre lo mismo",
        min: 0,
        max: 16,
        step: 1,
        help: "Precio, horarios, si hay disponible, cómo llegar, si hacen envíos. Sume el tiempo de todo el equipo.",
      },
      {
        key: "costoHora",
        label: "Lo que le cuesta una de esas horas",
        min: 5_000,
        max: 80_000,
        step: 1_000,
        money: true,
        help: "Salario más prestaciones, dividido en las horas trabajadas.",
      },
    ],
  },
  {
    label: "Los supuestos — cámbielos",
    note: "Acá no hay nada escondido. Estos cuatro números son los que convierten sus mensajes en pesos, y son suyos para mover: si los baja, la cuenta baja.",
    fields: [
      {
        key: "cierre",
        label: "De cada 100 clientes bien atendidos, cuántos compran",
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
        key: "automatizable",
        label: "Cuántas de esas horas puede absorber un agente",
        min: 0,
        max: 100,
        step: 5,
        suffix: " %",
        help: "Las preguntas repetidas se automatizan casi todas; lo que exige criterio, no. Por defecto asumimos que 3 de cada 10 horas siguen siendo humanas.",
      },
    ],
  },
];

function GenericLeak({ footnote }: { footnote?: string }) {
  const [v, setV] = useState<GenericLeakInputs>(GENERIC_DEFAULTS);
  const r = useMemo(() => computeGenericLeak(v), [v]);
  const onChange = (key: GenericLeakKey) => (n: number) =>
    setV((prev) => ({ ...prev, [key]: n }));

  const context = [
    `${NUM.format(v.consultas)} clientes escriben al mes · ticket promedio ${COP.format(v.ticket)} · ${v.horasDia} h al día en preguntas repetidas.`,
    `Fuga anual estimada: ${COP.format(r.total)}. De cada 100 clientes que podrían comprarle, hoy le compran ${r.deCada100}.`,
    `Sin contestar ${COP.format(r.fugaNunca)} · tarde ${COP.format(r.fugaTarde)} · sin seguimiento ${COP.format(r.fugaSeguimiento)} · horas del equipo ${COP.format(r.fugaHoras)}.`,
    `Equivale a ${NUM.format(Math.round(r.ventasPerdidas))} ventas y ${NUM.format(Math.round(r.horasAno))} horas al año.`,
  ].join("\n");

  return (
    <CalcShell
      groups={GENERIC_GROUPS}
      values={v}
      onChange={onChange}
      total={r.total}
      footnote={footnote}
      inputsLabel="Calculadora de ROI"
      result={
        <ResultPanel
          total={r.total}
          mensual={r.mensual}
          heroNote={
            <>
              es lo que su negocio deja sobre la mesa cada año: ventas que no entraron y horas que
              no debería estar pagando.
            </>
          }
          rows={[
            { k: "Mensajes que nadie contestó", val: r.fugaNunca },
            { k: "Mensajes contestados cuando ya le respondió otro", val: r.fugaTarde },
            { k: "Clientes que se quedaron callados y nadie persiguió", val: r.fugaSeguimiento },
            { k: "Horas del equipo en preguntas repetidas", val: r.fugaHoras },
          ]}
          partition={
            <>
              De cada 100 mensajes que le entran, {r.partition.nunca} no reciben respuesta,{" "}
              {r.partition.tarde} llegan tarde y {r.partition.aTiempo} se atienden a tiempo. Y{" "}
              <span className="font-semibold tabular-nums text-[oklch(0.82_0.005_95)]">
                {COP.format(r.fugaFueraHorario)}
              </span>{" "}
              de la fuga por no contestar ocurre de noche, un domingo o un festivo, cuando no hay
              nadie.
            </>
          }
          payoff={{
            figure: `${NUM.format(Math.round(r.ventasPerdidas))} ventas`,
            body: (
              <>
                es lo que esa fuga significa al año. Dicho al revés: de cada 100 clientes que
                podrían comprarle, hoy le compran{" "}
                <strong className="font-semibold text-white">{r.deCada100}</strong>.
              </>
            ),
            note: "Sin un peso más de pauta y sin un cliente nuevo: son personas que ya le habían escrito.",
          }}
          context={context}
          source="calculadora-roi"
        />
      }
    />
  );
}

export function LeakCalculator({ s }: { s: LeakSection }) {
  return s.variant === "generic" ? (
    <GenericLeak footnote={s.footnote} />
  ) : (
    <HotelLeak footnote={s.footnote} />
  );
}
