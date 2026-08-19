"use client";

import { useMemo, useState } from "react";
import type { Section } from "@/content/pages";

type CalcSection = Extract<Section, { type: "calc" }>;

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});
const NUM = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });

/** What a direct booking really costs, all-in (pasarela + motor + pauta). */
const COSTO_DIRECTO = 0.045;

type Field = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  money?: boolean;
  help?: string;
};

const FIELDS: Record<CalcSection["variant"], Field[]> = {
  ota: [
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
    { key: "ocupacion", label: "Ocupación anual", min: 25, max: 95, step: 1, suffix: " %" },
    {
      key: "ota",
      label: "Reservas que llegan por OTA",
      min: 0,
      max: 100,
      step: 1,
      suffix: " %",
      help: "Booking.com, Expedia, Airbnb, Despegar y demás agencias en línea.",
    },
    {
      key: "comision",
      label: "Comisión promedio de OTA",
      min: 10,
      max: 30,
      step: 1,
      suffix: " %",
      help: "En 2026 Booking.com ronda el 15 % y Expedia entre 18 % y 22 %.",
    },
  ],
  upsell: [
    { key: "reservas", label: "Reservas al mes", min: 20, max: 2000, step: 10 },
    {
      key: "aceptacion",
      label: "Huéspedes que aceptan el complemento",
      min: 2,
      max: 40,
      step: 1,
      suffix: " %",
      help: "En la industria: 3–5 % en el motor de reservas, 12–18 % en el mensaje previo a la llegada y 22–28 % en el check-in.",
    },
    {
      key: "ticket",
      label: "Valor promedio del complemento",
      min: 20_000,
      max: 600_000,
      step: 5_000,
      money: true,
      help: "Upgrade de habitación, desayuno, late check-out, traslado, spa o tour.",
    },
  ],
};

const DEFAULTS: Record<CalcSection["variant"], Record<string, number>> = {
  // Un hotel colombiano mediano, con la ocupación que Cotelco proyecta para 2026.
  ota: { habitaciones: 40, adr: 320_000, ocupacion: 56, ota: 65, comision: 18 },
  upsell: { reservas: 240, aceptacion: 18, ticket: 85_000 },
};

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
  const id = `calc-${f.key}`;
  // Drives the filled portion of the track — see .range-brand in globals.css.
  const pct = ((value - f.min) / (f.max - f.min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[14px] font-medium text-foreground">
          {f.label}
        </label>
        <output htmlFor={id} className="text-[15px] font-bold tabular-nums text-foreground">
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
        className="range-brand mt-1"
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
      {f.help && (
        <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{f.help}</p>
      )}
    </div>
  );
}

export function RoiCalculator({ s }: { s: CalcSection }) {
  const fields = FIELDS[s.variant];
  const [v, setV] = useState<Record<string, number>>(DEFAULTS[s.variant]);

  const result = useMemo(() => {
    if (s.variant === "ota") {
      const noches = v.habitaciones * 365 * (v.ocupacion / 100);
      const ingreso = noches * v.adr;
      const ingresoOta = ingreso * (v.ota / 100);
      const comision = ingresoOta * (v.comision / 100);
      // Escenario: el agente pasa 10 puntos de la mezcla OTA a reserva directa.
      const puntos = Math.min(10, v.ota);
      const trasladado = ingreso * (puntos / 100);
      const ahorro = trasladado * (v.comision / 100 - COSTO_DIRECTO);
      return {
        hero: { value: COP.format(comision), label: "en comisión de OTA que paga al año" },
        rows: [
          { k: "Noches vendidas al año", val: NUM.format(Math.round(noches)) },
          { k: "Ingreso por alojamiento al año", val: COP.format(ingreso) },
          { k: `Ingreso que hoy pasa por OTA (${v.ota} %)`, val: COP.format(ingresoOta) },
          { k: `Comisión al ${v.comision} % sobre ese ingreso`, val: COP.format(comision) },
        ],
        payoff: {
          value: COP.format(ahorro),
          label: `es lo que se ahorra al año si el agente lleva ${puntos} puntos de esa mezcla a reserva directa`,
          note: `Ya descontando el ${(COSTO_DIRECTO * 100).toFixed(1).replace(".", ",")} % que cuesta, todo incluido, una reserva directa (pasarela de pago + motor + pauta).`,
        },
      };
    }
    const aceptan = v.reservas * (v.aceptacion / 100);
    const mes = aceptan * v.ticket;
    return {
      hero: { value: COP.format(mes * 12), label: "de ingreso extra al año, sin una habitación más" },
      rows: [
        { k: "Reservas al año", val: NUM.format(v.reservas * 12) },
        {
          k: `Huéspedes que aceptan un complemento (${v.aceptacion} %)`,
          val: NUM.format(Math.round(aceptan * 12)),
        },
        { k: "Ingreso extra al mes", val: COP.format(mes) },
        { k: "Ingreso extra al año", val: COP.format(mes * 12) },
      ],
      payoff: {
        value: COP.format(mes),
        label: "al mes, con las mismas habitaciones y el mismo personal",
        note: "El complemento es margen casi puro: no cuesta captar al huésped, ya decidió venir.",
      },
    };
  }, [s.variant, v]);

  return (
    <figure className="mx-auto max-w-5xl">
      <div className="grid gap-6 overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-0">
        {/* Inputs */}
        <form
          className="space-y-6 p-6 sm:p-8"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Calculadora"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Los datos de su hotel
          </p>
          {fields.map((f) => (
            <Slider
              key={f.key}
              f={f}
              value={v[f.key]}
              onChange={(n) => setV((prev) => ({ ...prev, [f.key]: n }))}
            />
          ))}
        </form>

        {/* Result */}
        <div className="bg-[oklch(0.1_0.01_95)] p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[oklch(0.62_0.005_95)]">
            La cuenta
          </p>
          <p className="mt-4 text-[34px] font-extrabold leading-none tabular-nums text-[oklch(0.74_0.185_50)] sm:text-[40px]">
            {result.hero.value}
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-[oklch(0.78_0.005_95)]">
            {result.hero.label}
          </p>

          <dl className="mt-7 space-y-2.5 border-t border-white/10 pt-6">
            {result.rows.map((r) => (
              <div key={r.k} className="flex items-baseline justify-between gap-4">
                <dt className="text-[13px] leading-snug text-[oklch(0.66_0.005_95)]">{r.k}</dt>
                <dd className="shrink-0 text-[13.5px] font-semibold tabular-nums text-white">
                  {r.val}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 rounded-2xl border border-[oklch(0.74_0.185_50/0.3)] bg-[oklch(0.74_0.185_50/0.08)] p-5">
            <p className="text-[26px] font-extrabold leading-none tabular-nums text-white">
              {result.payoff.value}
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[oklch(0.82_0.005_95)]">
              {result.payoff.label}
            </p>
            <p className="mt-3 text-[11.5px] leading-relaxed text-[oklch(0.62_0.005_95)]">
              {result.payoff.note}
            </p>
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
