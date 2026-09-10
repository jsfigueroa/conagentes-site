/**
 * EL MODELO DE LA CALCULADORA DE FUGA (CON-271)
 *
 * Lives outside the client component on purpose: the pages' PROSE quotes the
 * default scenario in plain text — a reader (or an assistant) who never moves a
 * slider still has to find a concrete number — and prose and calculator must
 * not be able to drift apart. Both import from here.
 *
 * Two variants share one core:
 *   hotel   — /hoteles/calculadora-reservas-perdidas. Value of a lost sale is
 *             ADR × nights; the fifth line is the rate that never moved.
 *   generic — /recursos/calculadora-roi. Value of a lost sale is the average
 *             ticket; the fifth line is the team's hours spent answering the
 *             same questions (a cost, not lost revenue — labelled as such).
 *
 * Three rules the model obeys, because a calculator that can be argued with is
 * worth nothing in a price conversation:
 *
 * 1. NO DOUBLE COUNTING. The month's inquiries are partitioned into mutually
 *    exclusive states (never answered / answered late / answered in time), the
 *    follow-up leak draws ONLY from inquiries that were answered and did not
 *    close, and the fifth line never touches the same pool. After-hours is a
 *    SLICE of the response leak, never an extra line.
 * 2. EVERY ASSUMPTION IS ON SCREEN AND EDITABLE — the close rate, the penalty
 *    for answering late, the share recovered by following up and the fifth
 *    line's own knob are all sliders, not constants, and they sit in a visible
 *    group, not behind a disclosure. A skeptical owner has to be able to dial
 *    the whole thing down and still see a number.
 * 3. THE DEFAULTS SIT AT THE CONSERVATIVE END of every public reference we can
 *    name (Cotelco occupancy, the Harvard Business Review response-time study,
 *    the industry range for a revenue management system). Overstating the leak
 *    loses the room.
 */

/* ————— el núcleo: la fuga por atención ————— */

/** The inputs both variants share — the response/follow-up funnel. */
export type AttentionInputs = {
  /** Distinct people who ask per month, across every channel. */
  consultas: number;
  /** % of them nobody ever answers. */
  sinResponder: number;
  /** % answered more than an hour later. */
  tarde: number;
  /** % of the answered-but-not-closed who go quiet and get no second message. */
  silencio: number;
  /** % of inquiries arriving outside business hours — a slice, never a line. */
  fueraHorario: number;
  /** Close rate when the inquiry IS handled well. */
  cierre: number;
  /** Share of the close rate lost by answering late. */
  penalDemora: number;
  /** Share of the quiet ones that come back if someone follows up. */
  recuperacion: number;
};

/**
 * The shared arithmetic. `valorVenta` is what one closed sale is worth — ADR ×
 * nights for a hotel, the average ticket for everyone else.
 */
function computeAttention(v: AttentionInputs, valorVenta: number) {
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
  // close, so it cannot overlap 1 or 2.
  const respondidas = tardias + aTiempo;
  const cerradas = tardias * cierre * (1 - v.penalDemora / 100) + aTiempo * cierre;
  const noCerradas = Math.max(0, respondidas - cerradas);
  const callados = noCerradas * (v.silencio / 100);
  const perdidasSeguimiento = callados * (v.recuperacion / 100);

  const ventasPerdidas = perdidasNunca + perdidasTarde + perdidasSeguimiento;

  const fugaNunca = perdidasNunca * valorVenta;
  const fugaTarde = perdidasTarde * valorVenta;
  const fugaSeguimiento = perdidasSeguimiento * valorVenta;
  const fugaAtencion = fugaNunca + fugaTarde + fugaSeguimiento;

  return {
    consultasAno,
    valorVenta,
    partition: {
      nunca: Math.round(pSin * 100),
      tarde: Math.round(pTarde * 100),
      aTiempo: Math.round(pTiempo * 100),
    },
    /** Sales the business closes today, per year — the honest comparison base. */
    ventasActuales: cerradas,
    fugaNunca,
    fugaTarde,
    fugaSeguimiento,
    fugaAtencion,
    ventasPerdidas,
    // A slice of the response leak, not an extra line.
    fugaFueraHorario: (fugaNunca + fugaTarde) * (v.fueraHorario / 100),
  };
}

/* ————— variante hotel ————— */

export type HotelLeakInputs = AttentionInputs & {
  habitaciones: number;
  adr: number;
  ocupacion: number;
  /** Average nights per reservation — what turns a lost booking into pesos. */
  noches: number;
  /** Extra revenue from moving the rate with demand, as % of room revenue. */
  optimizacion: number;
};

export type HotelLeakKey = keyof HotelLeakInputs;

/**
 * A mid-size Colombian hotel. Occupancy is Cotelco's mid-2026 national
 * projection; every other default sits at the cautious end (see rule 3).
 */
export const HOTEL_DEFAULTS: HotelLeakInputs = {
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

export function computeHotelLeak(v: HotelLeakInputs) {
  const nochesVendidas = v.habitaciones * 365 * (v.ocupacion / 100);
  const ingresoAlojamiento = nochesVendidas * v.adr;
  const a = computeAttention(v, v.adr * v.noches);

  // The rate line rides on revenue the hotel ALREADY earns, so it is
  // independent of everything above.
  const fugaTarifa = ingresoAlojamiento * (v.optimizacion / 100);
  const total = a.fugaAtencion + fugaTarifa;

  return {
    ...a,
    nochesVendidas,
    ingresoAlojamiento,
    fugaTarifa,
    total,
    mensual: total / 12,
    nochesVacias: a.ventasPerdidas * v.noches,
    /** Share of room revenue, so the total can be sanity-checked at a glance. */
    porcentajeIngreso: ingresoAlojamiento > 0 ? (total / ingresoAlojamiento) * 100 : 0,
  };
}

export type HotelLeakResult = ReturnType<typeof computeHotelLeak>;

/** The hotel page's worked example, quoted in its prose. */
export const HOTEL_EXAMPLE = computeHotelLeak(HOTEL_DEFAULTS);

/* ————— variante genérica (pyme) ————— */

export type GenericLeakInputs = AttentionInputs & {
  /** Average sale value — what one closed inquiry is worth. */
  ticket: number;
  /** Hours a day the team spends answering the same questions. */
  horasDia: number;
  /** Loaded cost of one of those hours. */
  costoHora: number;
  /** Share of those hours an agent can absorb. */
  automatizable: number;
};

export type GenericLeakKey = keyof GenericLeakInputs;

/**
 * A Colombian SMB that sells over WhatsApp — and MORE cautious than the hotel
 * set on the three attention percentages. The reason is the comparison base:
 * a hotel's room revenue includes bookings that never came through an inquiry
 * (OTAs, walk-ins), so the leak lands at a modest share of it. Here every sale
 * comes through an inquiry, so the same percentages would say the business
 * loses more than it sells — arithmetically true given those inputs, and an
 * easy thing for a prospect to dismiss. Start where he cannot.
 */
export const GENERIC_DEFAULTS: GenericLeakInputs = {
  ticket: 350_000,
  consultas: 200,
  sinResponder: 10,
  tarde: 25,
  silencio: 40,
  fueraHorario: 35,
  cierre: 20,
  penalDemora: 50,
  recuperacion: 10,
  horasDia: 3,
  costoHora: 12_000,
  automatizable: 70,
};

export function computeGenericLeak(v: GenericLeakInputs) {
  const a = computeAttention(v, v.ticket);

  // The hours line is a COST, not lost revenue, and it shares no pool with the
  // three above — so it can be added without double counting, as long as the
  // label says what it is. 30 days a month: these businesses answer on Sundays.
  const fugaHoras = v.horasDia * 360 * v.costoHora * (v.automatizable / 100);
  const total = a.fugaAtencion + fugaHoras;

  return {
    ...a,
    fugaHoras,
    total,
    mensual: total / 12,
    ingresoActual: a.ventasActuales * v.ticket,
    /**
     * «De cada 100 clientes que podrían comprarle, hoy le compran N.» This is
     * the frame for the generic variant instead of a share of revenue: it can
     * never exceed 100, so it cannot produce the absurd-looking headline that
     * a leak-over-current-sales ratio does when the inputs are bad.
     */
    deCada100:
      a.ventasActuales + a.ventasPerdidas > 0
        ? Math.round((a.ventasActuales / (a.ventasActuales + a.ventasPerdidas)) * 100)
        : 100,
    horasAno: v.horasDia * 360 * (v.automatizable / 100),
  };
}

export type GenericLeakResult = ReturnType<typeof computeGenericLeak>;

/** The generic page's worked example, quoted in its prose. */
export const GENERIC_EXAMPLE = computeGenericLeak(GENERIC_DEFAULTS);

/* ————— formato ————— */

const COP_UNIT = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

/**
 * Millions, rounded, for prose: «$369 millones» reads and is remembered;
 * «$369.316.000» inside a sentence is noise. Exact figures stay in the panel.
 */
export function millones(v: number): string {
  return `$${new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(
    Math.round(v / 1_000_000)
  )} millones`;
}

export function cop(v: number): string {
  return COP_UNIT.format(v);
}

export function num(v: number): string {
  return new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(Math.round(v));
}
