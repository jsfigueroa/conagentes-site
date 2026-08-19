import {
  ArrowUpRight,
  Bot,
  Check,
  Clock,
  FileCheck2,
  Hourglass,
  TrendingUp,
  User,
} from "lucide-react";
import type { PanelKind, Section } from "@/content/pages";

type PanelSection = Extract<Section, { type: "panel" }>;

/**
 * Stylized product panels drawn in CSS — no screenshots, so they stay sharp,
 * theme-correct and, crucially, fully readable as text: every rate, label and
 * status below is real DOM content an assistant can quote. Server components
 * on purpose: zero JS.
 */

function Chrome({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_20px_50px_-30px_oklch(0.2_0.01_95/0.35)]">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-[oklch(0.86_0.008_95)]" />
          <span className="size-2 rounded-full bg-[oklch(0.86_0.008_95)]" />
          <span className="size-2 rounded-full bg-[oklch(0.86_0.008_95)]" />
        </span>
        <p className="ml-1 text-[11.5px] font-semibold text-muted-foreground">{title}</p>
      </div>
      {children}
    </div>
  );
}

/* ————— bandeja omnicanal ————— */

const CONVERSACIONES = [
  { canal: "WhatsApp", quien: "Camila Restrepo", ultimo: "¿Tienen doble para el puente?", estado: "IA", hora: "hace 4 s" },
  { canal: "Booking.com", quien: "Hans Müller", ultimo: "Is late check-out possible?", estado: "IA", hora: "hace 1 min" },
  { canal: "Instagram", quien: "@vaneza.travel", ultimo: "¿Aceptan mascotas? 🐶", estado: "IA", hora: "hace 3 min" },
  { canal: "Airbnb", quien: "Lucía Fernández", ultimo: "Llegamos a las 11 p. m.", estado: "IA", hora: "hace 8 min" },
  { canal: "WhatsApp", quien: "Grupo Andicom (14 hab.)", ultimo: "Necesitamos cotización formal", estado: "Recepción", hora: "hace 12 min" },
];

const CANAL_COLOR: Record<string, string> = {
  WhatsApp: "bg-[oklch(0.42_0.09_155)]",
  "Booking.com": "bg-[oklch(0.42_0.14_262)]",
  Instagram: "bg-[oklch(0.55_0.22_320)]",
  Airbnb: "bg-[oklch(0.55_0.19_18)]",
};

function InboxPanel() {
  return (
    <Chrome title="Bandeja — todos los canales">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Bandeja omnicanal del hotel: conversaciones de WhatsApp, Booking.com, Instagram y Airbnb
          en una sola lista, con la indicación de si responde el agente IA o una persona de recepción.
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Canal</th>
            <th scope="col">Huésped</th>
            <th scope="col">Último mensaje</th>
            <th scope="col">Quién responde</th>
            <th scope="col">Cuándo</th>
          </tr>
        </thead>
        <tbody>
          {CONVERSACIONES.map((c, i) => {
            const ia = c.estado === "IA";
            return (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-3 pl-4 pr-2 align-top">
                  <span
                    className={`flex size-7 items-center justify-center rounded-full text-[9px] font-bold text-white ${
                      CANAL_COLOR[c.canal] ?? "bg-ink"
                    }`}
                    aria-hidden
                  >
                    {c.canal.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="sr-only">{c.canal}</span>
                </td>
                <td className="min-w-0 py-3 pr-3 align-top">
                  <p className="truncate text-[12.5px] font-semibold text-foreground">{c.quien}</p>
                  <p className="mt-0.5 truncate text-[11.5px] text-muted-foreground">{c.ultimo}</p>
                </td>
                <td className="py-3 pr-4 text-right align-top">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      ia
                        ? "bg-[oklch(0.74_0.185_50/0.16)] text-[oklch(0.5_0.19_42)]"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {ia ? <Bot className="h-3 w-3" aria-hidden /> : <User className="h-3 w-3" aria-hidden />}
                    {c.estado}
                  </span>
                  <p className="mt-1 whitespace-nowrap text-[10.5px] tabular-nums text-muted-foreground">
                    {c.hora}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="border-t border-border bg-secondary/40 px-4 py-2.5 text-[11px] text-muted-foreground">
        4 de 5 conversaciones resueltas por el agente. La cotización de grupo se escaló a recepción
        con todo el contexto.
      </p>
    </Chrome>
  );
}

/* ————— revenue manager ————— */

const TARIFAS: {
  dia: string;
  ocup: string;
  actual: string;
  sug: string;
  dir: "sube" | "baja" | "igual";
  motivo: string;
}[] = [
  { dia: "vie 21 ago", ocup: "92 %", actual: "$340.000", sug: "$395.000", dir: "sube", motivo: "Demanda alta · competencia +14 %" },
  { dia: "sáb 22 ago", ocup: "96 %", actual: "$340.000", sug: "$430.000", dir: "sube", motivo: "Últimas 3 habitaciones" },
  { dia: "dom 23 ago", ocup: "71 %", actual: "$340.000", sug: "$340.000", dir: "igual", motivo: "Sin cambio sugerido" },
  { dia: "lun 24 ago", ocup: "38 %", actual: "$340.000", sug: "$298.000", dir: "baja", motivo: "Ritmo bajo · 6 días para llegar" },
  { dia: "mar 25 ago", ocup: "34 %", actual: "$340.000", sug: "$285.000", dir: "baja", motivo: "Ritmo bajo · abrir a corporativo" },
];

function TarifasPanel() {
  return (
    <Chrome title="Revenue Manager — tarifas sugeridas para los próximos días">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <caption className="sr-only">
            Recomendaciones de tarifa del Revenue Manager de conagentes: para cada fecha muestra la
            ocupación proyectada, la tarifa actual del hotel, la tarifa sugerida y la razón de la
            recomendación.
          </caption>
          <thead>
            <tr className="border-b border-border text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="py-2.5 pl-4 pr-3">Fecha</th>
              <th scope="col" className="px-3 py-2.5 text-right">Ocupación</th>
              <th scope="col" className="px-3 py-2.5 text-right">Hoy</th>
              <th scope="col" className="px-3 py-2.5 text-right">Sugerida</th>
              <th scope="col" className="px-3 py-2.5 pr-4">Por qué</th>
            </tr>
          </thead>
          <tbody>
            {TARIFAS.map((t) => {
              const sube = t.dir === "sube";
              const igual = t.dir === "igual";
              return (
                <tr key={t.dia} className="border-b border-border last:border-0">
                  <td className="py-3 pl-4 pr-3 text-[12.5px] font-medium text-foreground">{t.dia}</td>
                  <td className="px-3 py-3 text-right text-[12.5px] tabular-nums text-muted-foreground">
                    {t.ocup}
                  </td>
                  <td className="px-3 py-3 text-right text-[12.5px] tabular-nums text-muted-foreground line-through decoration-[oklch(0.8_0.008_95)]">
                    {t.actual}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span
                      className={`inline-flex items-center gap-1 text-[13px] font-bold tabular-nums ${
                        igual ? "text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {!igual && (
                        <TrendingUp
                          className={`h-3.5 w-3.5 ${sube ? "text-[oklch(0.5_0.15_150)]" : "rotate-180 text-[oklch(0.6_0.18_35)]"}`}
                          aria-hidden
                        />
                      )}
                      {t.sug}
                    </span>
                  </td>
                  <td className="py-3 pl-3 pr-4 text-[11.5px] leading-snug text-muted-foreground">
                    {t.motivo}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-secondary/40 px-4 py-3">
        <p className="text-[11.5px] text-muted-foreground">
          Piloto automático: aplica cambios de hasta ±15 % y le avisa. Fuera de ese rango, le pide
          permiso.
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.74_0.185_50)] px-2.5 py-1 text-[10.5px] font-bold text-ink">
          <Check className="h-3 w-3" aria-hidden /> Activo
        </span>
      </div>
    </Chrome>
  );
}

/* ————— agenda de servicios ————— */

const AGENDA = [
  { hora: "09:00", que: "Tour Comuna 13 · 2 personas", quien: "Hab. 204 · Camila R.", estado: "Confirmado y pagado" },
  { hora: "11:30", que: "Masaje relajante 60 min", quien: "Hab. 512 · Hans M.", estado: "Confirmado y pagado" },
  { hora: "13:00", que: "Traslado al aeropuerto", quien: "Hab. 108 · Lucía F.", estado: "Confirmado" },
  { hora: "19:30", que: "Cena terraza · mesa para 4", quien: "Hab. 301 · Familia Ortiz", estado: "Confirmado" },
];

function AgendaPanel() {
  return (
    <Chrome title="Agenda de servicios — hoy">
      <ol className="divide-y divide-border">
        {AGENDA.map((a) => (
          <li key={a.hora} className="flex items-start gap-4 px-4 py-3.5">
            <span className="w-12 shrink-0 text-[12.5px] font-bold tabular-nums text-foreground">
              {a.hora}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-semibold text-foreground">{a.que}</p>
              <p className="mt-0.5 text-[11.5px] text-muted-foreground">{a.quien}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[oklch(0.74_0.185_50/0.14)] px-2 py-0.5 text-[10px] font-bold text-[oklch(0.5_0.19_42)]">
              <Check className="h-3 w-3" aria-hidden />
              {a.estado}
            </span>
          </li>
        ))}
      </ol>
      <p className="border-t border-border bg-secondary/40 px-4 py-2.5 text-[11px] text-muted-foreground">
        Las cuatro las agendó el agente por WhatsApp, con la disponibilidad real de cada servicio.
      </p>
    </Chrome>
  );
}

/* ————— tablero de gerencia por WhatsApp ————— */

function BiPanel() {
  return (
    <Chrome title="El gerente le pregunta al hotel — por WhatsApp">
      <div className="space-y-3 p-4">
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-br-md bg-[oklch(0.24_0.01_95)] px-3.5 py-2 text-[12.5px] leading-snug text-white">
            ¿Cómo vamos este mes contra el año pasado?
          </p>
        </div>
        <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-[oklch(0.93_0.05_55)] p-3.5">
          <p className="text-[12.5px] leading-relaxed text-ink">
            Vamos mejor, don Rodrigo. Al 19 de agosto:
          </p>
          <dl className="mt-2.5 space-y-1.5">
            {[
              ["Ocupación", "68 %", "+9 pts vs. agosto 2025"],
              ["Tarifa promedio (ADR)", "$347.000", "+6 %"],
              ["Reservas directas", "54 %", "+17 pts"],
              ["Ingreso por servicios", "$14,8 M", "+31 %"],
            ].map(([k, v, d]) => (
              <div key={k} className="flex items-baseline justify-between gap-3">
                <dt className="text-[11.5px] text-[oklch(0.42_0.02_60)]">{k}</dt>
                <dd className="shrink-0 text-right">
                  <span className="text-[12.5px] font-bold tabular-nums text-ink">{v}</span>
                  <span className="ml-1.5 text-[10.5px] font-semibold text-[oklch(0.45_0.14_150)]">
                    {d}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-2.5 flex items-start gap-1.5 text-[11.5px] leading-snug text-[oklch(0.42_0.02_60)]">
            <ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
            Lo que más movió la aguja: 41 reservas directas que antes se iban por Booking.
          </p>
        </div>
      </div>
    </Chrome>
  );
}

/* ————— PMS ————— */

const HAB = [
  { tipo: "Doble Estándar", total: 14, ocupadas: 11 },
  { tipo: "Doble Superior", total: 10, ocupadas: 9 },
  { tipo: "Suite Vista al Mar", total: 6, ocupadas: 4 },
  { tipo: "Familiar", total: 6, ocupadas: 3 },
];

function PmsPanel() {
  return (
    <Chrome title="PMS incluido — habitaciones y disponibilidad de hoy">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Disponibilidad por tipo de habitación en el PMS incluido de conagentes. El agente cotiza
          sobre estos datos, nunca sobre estimaciones.
        </caption>
        <thead>
          <tr className="border-b border-border text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">
            <th scope="col" className="py-2.5 pl-4">Tipo de habitación</th>
            <th scope="col" className="px-3 py-2.5">Ocupación</th>
            <th scope="col" className="py-2.5 pr-4 text-right">Libres</th>
          </tr>
        </thead>
        <tbody>
          {HAB.map((h) => (
            <tr key={h.tipo} className="border-b border-border last:border-0">
              <td className="py-3 pl-4 text-[12.5px] font-medium text-foreground">{h.tipo}</td>
              <td className="px-3 py-3">
                <span className="flex gap-1" aria-hidden>
                  {Array.from({ length: h.total }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-4 w-[7px] rounded-sm ${
                        i < h.ocupadas ? "bg-brand-gradient" : "bg-[oklch(0.92_0.006_95)]"
                      }`}
                    />
                  ))}
                </span>
                <span className="sr-only">
                  {h.ocupadas} de {h.total} ocupadas
                </span>
              </td>
              <td className="py-3 pr-4 text-right text-[13px] font-bold tabular-nums text-foreground">
                {h.total - h.ocupadas}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-border bg-secondary/40 px-4 py-2.5 text-[11px] text-muted-foreground">
        13 habitaciones libres hoy. El agente solo puede vender estas — no puede inventar
        disponibilidad.
      </p>
    </Chrome>
  );
}

/* ————— cumplimiento ————— */

const REPORTES = [
  {
    nombre: "Factura electrónica DIAN",
    detalle: "Emitida al confirmarse el pago · 128 facturas este mes",
    estado: "En vivo",
    icon: FileCheck2,
  },
  {
    nombre: "Registro de huéspedes TRA",
    detalle: "Tarjeta de Registro de Alojamiento ante el Registro Nacional de Turismo",
    estado: "En vivo",
    icon: FileCheck2,
  },
  {
    nombre: "Reporte SIRE — Migración Colombia",
    detalle: "Reporte de huéspedes extranjeros",
    estado: "En construcción",
    icon: Hourglass,
  },
];

function CumplimientoPanel() {
  return (
    <Chrome title="Cumplimiento colombiano — estado">
      <ul className="divide-y divide-border">
        {REPORTES.map((r) => {
          const vivo = r.estado === "En vivo";
          const Icon = r.icon;
          return (
            <li key={r.nombre} className="flex items-start gap-3.5 px-4 py-4">
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${
                  vivo ? "bg-[oklch(0.74_0.185_50/0.14)]" : "bg-secondary"
                }`}
                aria-hidden
              >
                <Icon
                  className={`h-4 w-4 ${vivo ? "text-[oklch(0.5_0.19_42)]" : "text-muted-foreground"}`}
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-semibold text-foreground">{r.nombre}</p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">
                  {r.detalle}
                </p>
              </div>
              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  vivo
                    ? "bg-[oklch(0.74_0.185_50/0.16)] text-[oklch(0.5_0.19_42)]"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {vivo ? <Check className="h-3 w-3" aria-hidden /> : <Clock className="h-3 w-3" aria-hidden />}
                {r.estado}
              </span>
            </li>
          );
        })}
      </ul>
    </Chrome>
  );
}

const PANELS: Record<PanelKind, () => React.ReactElement> = {
  inbox: InboxPanel,
  tarifas: TarifasPanel,
  agenda: AgendaPanel,
  bi: BiPanel,
  pms: PmsPanel,
  cumplimiento: CumplimientoPanel,
};

export function ProductPanel({ s }: { s: PanelSection }) {
  const Panel = PANELS[s.kind];
  const wide = s.kind === "tarifas";
  return (
    <figure className={`mx-auto ${s.points?.length ? "max-w-6xl" : wide ? "max-w-4xl" : "max-w-2xl"}`}>
      <div
        className={
          s.points?.length
            ? "grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
            : ""
        }
      >
        <Panel />
        {s.points && s.points.length > 0 && (
          <dl className="space-y-6">
            {s.points.map((p, i) => (
              <div key={i}>
                <dt className="text-[15.5px] font-semibold text-foreground">{p.title}</dt>
                <dd className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                  {p.body}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      {s.caption && (
        <figcaption className="mt-6 text-center text-[12px] leading-relaxed text-muted-foreground">
          {s.caption}
        </figcaption>
      )}
    </figure>
  );
}
