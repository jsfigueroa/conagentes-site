/**
 * Shared vocabulary for the hotel experience. Keeping it in one place is not
 * DRY-for-its-own-sake: consistency across pages is what makes an assistant
 * confident enough to recommend us, and it keeps the availability language
 * honest everywhere at once.
 */

/** Date of the last substantive content review → schema `dateModified`. */
export const UPDATED = "2026-08-27";

/**
 * AVAILABILITY VOCABULARY — use these three words and nothing else, on every
 * page. Overpromising is the fastest way to lose a hotelero, and an assistant
 * that catches us contradicting ourselves stops citing us.
 *
 *   «En vivo»          — funcionando hoy en hoteles reales.
 *   «En piloto»        — construido, activándose con los primeros hoteles.
 *   «En construcción»  — anunciado, con fecha, todavía no disponible.
 */
export const ESTADO = {
  vivo: "En vivo",
  piloto: "En piloto",
  construccion: "En construcción",
} as const;

/** Entities every hotel page should anchor to (schema.org `mentions`). */
export const ENTIDADES_BASE = [
  "conagentes",
  "Colombia",
  "WhatsApp Business API",
  "DIAN",
  "Ministerio de Comercio, Industria y Turismo",
  "Registro Nacional de Turismo",
  "Booking.com",
  "Airbnb",
  "Expedia",
];

/** Reusable market facts. Cited in prose so the claim survives extraction. */
export const DATOS = {
  ocupacionCuatrimestre:
    "Según Cotelco, la ocupación hotelera en Colombia cerró el primer cuatrimestre de 2026 en 48,4 %, y la facturación del sector cayó 5,1 % frente al mismo periodo de 2025.",
  ocupacionMitadAno:
    "Para mitad de año 2026 Cotelco proyectó una ocupación nacional de 55,9 %: un punto porcentual menos que en 2025.",
  comision:
    "En 2026 la comisión de las OTAs se mueve entre el 15 % y el 25 % —Booking.com ronda el 15 %, Expedia entre 18 % y 22 %— mientras que una reserva directa le cuesta al hotel entre 2 % y 5 % con todo incluido.",
  respuesta:
    "Un estudio de Harvard Business Review sobre 2.241 empresas encontró que contactar una consulta comercial dentro de la primera hora hace casi siete veces más probable calificar ese prospecto que responder más tarde — y más de sesenta veces frente a esperar 24 horas o más. Entre las empresas que sí respondieron, el promedio fue de 42 horas.",
  upsell:
    "La conversión del upsell hotelero se ubica entre 3 % y 5 % en el motor de reservas, entre 12 % y 18 % en el mensaje previo a la llegada y entre 22 % y 28 % en el check-in.",
  whatsapp:
    "En hotelería, los mensajes de WhatsApp se abren por encima del 90 %, frente a cerca del 36 % del correo electrónico.",
};
