/**
 * EL MODELO DE LA CALCULADORA DE RESERVAS PERDIDAS (CON-271)
 *
 * Lives outside the client component on purpose: the page's PROSE has to state
 * the default-scenario figure in plain text — a reader (or an assistant) who
 * never moves a slider still has to find a concrete number — and prose and
 * calculator must not be able to drift apart. Both import from here.
 *
 * Three rules the model obeys, because a calculator that can be argued with is
 * worth nothing in a price conversation:
 *
 * 1. NO DOUBLE COUNTING. The month's inquiries are partitioned into mutually
 *    exclusive states (never answered / answered late / answered in time), the
 *    follow-up leak draws ONLY from inquiries that were answered and did not
 *    book, and the rate line is computed on revenue the hotel already earns.
 *    After-hours is a SLICE of the response leak, never an extra line.
 * 2. EVERY ASSUMPTION IS ON SCREEN AND EDITABLE — the close rate, the penalty
 *    for answering late, the share recovered by following up and the rate
 *    uplift are all sliders, not constants. A skeptical owner has to be able
 *    to dial the whole thing down and still see a number.
 * 3. THE DEFAULTS SIT AT THE CONSERVATIVE END of every public reference we can
 *    name (Cotelco occupancy, the Harvard Business Review response-time study,
 *    the industry range for a revenue management system). Overstating the leak
 *    loses the room.
 */

export type LeakKey =
  | "habitaciones"
  | "adr"
  | "ocupacion"
  | "noches"
  | "consultas"
  | "sinResponder"
  | "tarde"
  | "silencio"
  | "fueraHorario"
  | "cierre"
  | "penalDemora"
  | "recuperacion"
  | "optimizacion";

export type LeakInputs = Record<LeakKey, number>;

/**
 * A mid-size Colombian hotel. Occupancy is Cotelco's mid-2026 national
 * projection; every other default sits at the cautious end (see rule 3).
 */
export const LEAK_DEFAULTS: LeakInputs = {
  habitaciones: 40,
  adr: 320_000,
  ocupacion: 56,
  noches: 2,
  consultas: 250,
  sinResponder: 20,
  tarde: 35,
  silencio: 55,
  fueraHorario: 35,
  cierre: 18,
  penalDemora: 50,
  recuperacion: 15,
  optimizacion: 5,
};

export function computeLeak(v: LeakInputs) {
  const nochesVendidas = v.habitaciones * 365 * (v.ocupacion / 100);
  const ingresoAlojamiento = nochesVendidas * v.adr;
  const valorReserva = v.adr * v.noches;

  const consultasAno = v.consultas * 12;
  const cierre = v.cierre / 100;

  // The partition has to stay exhaustive and exclusive, so «tarde» can never
  // eat into a share already counted as never answered.
  const pSin = Math.min(Math.max(v.sinResponder, 0), 100) / 100;
  const pTarde = Math.min(Math.max(v.tarde, 0) / 100, 1 - pSin);
  const pTiempo = Math.max(0, 1 - pSin - pTarde);

  const nunca = consultasAno * pSin;
  const tardias = consultasAno * pTarde;
  const aTiempo = consultasAno * pTiempo;

  // 1 — never answered: the whole close rate is lost.
  const perdidasNunca = nunca * cierre;

  // 2 — answered late: only the part of the close rate the delay costs.
  const perdidasTarde = tardias * cierre * (v.penalDemora / 100);

  // 3 — no follow-up: draws ONLY from inquiries that were answered and did not
  // book, so it cannot overlap 1 or 2.
  const respondidas = tardias + aTiempo;
  const cerradas = tardias * cierre * (1 - v.penalDemora / 100) + aTiempo * cierre;
  const noCerradas = Math.max(0, respondidas - cerradas);
  const callados = noCerradas * (v.silencio / 100);
  const perdidasSeguimiento = callados * (v.recuperacion / 100);

  const reservasPerdidas = perdidasNunca + perdidasTarde + perdidasSeguimiento;

  const fugaNunca = perdidasNunca * valorReserva;
  const fugaTarde = perdidasTarde * valorReserva;
  const fugaSeguimiento = perdidasSeguimiento * valorReserva;
  const fugaAtencion = fugaNunca + fugaTarde + fugaSeguimiento;

  // 4 — the rate line rides on revenue the hotel ALREADY earns, so it is
  // independent of everything above.
  const fugaTarifa = ingresoAlojamiento * (v.optimizacion / 100);

  const total = fugaAtencion + fugaTarifa;

  return {
    nochesVendidas,
    ingresoAlojamiento,
    valorReserva,
    consultasAno,
    partition: {
      nunca: Math.round(pSin * 100),
      tarde: Math.round(pTarde * 100),
      aTiempo: Math.round(pTiempo * 100),
    },
    fugaNunca,
    fugaTarde,
    fugaSeguimiento,
    fugaAtencion,
    fugaTarifa,
    total,
    mensual: total / 12,
    reservasPerdidas,
    nochesVacias: reservasPerdidas * v.noches,
    // A slice of the response leak, not an extra line.
    fugaFueraHorario: (fugaNunca + fugaTarde) * (v.fueraHorario / 100),
    // Share of room revenue, so the total can be sanity-checked at a glance.
    porcentajeIngreso: ingresoAlojamiento > 0 ? (total / ingresoAlojamiento) * 100 : 0,
  };
}

export type LeakResult = ReturnType<typeof computeLeak>;

/** The default scenario, so the page's prose can quote it without hardcoding. */
export const LEAK_EXAMPLE = computeLeak(LEAK_DEFAULTS);

const COP_UNIT = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

/**
 * Millions, rounded, for prose: «$369 millones» reads and is remembered;
 * «$369.316.000» in a sentence is noise. Exact figures stay in the panel.
 */
export function millones(v: number): string {
  return `$${new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(
    Math.round(v / 1_000_000)
  )} millones`;
}

export function cop(v: number): string {
  return COP_UNIT.format(v);
}
