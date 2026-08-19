import type { MarketingPage } from "./pages.types";
import { HOTEL_PLATAFORMA } from "./hotel/plataforma";
import { HOTEL_CANALES } from "./hotel/canales";
import { HOTEL_SOLUCIONES } from "./hotel/soluciones";
import { HOTEL_RECURSOS } from "./hotel/recursos";

/**
 * HOTEL experience (the flagship sub-brand). Voice: usted, warm es-CO, «agente
 * IA», zero jargon. Positioning: the agent SELLS — direct bookings, a higher
 * value per stay, guests brought back — across WhatsApp, Instagram, the OTA
 * inboxes and the phone; PMS included; Colombian compliance (DIAN + TRA live,
 * SIRE under construction) as the moat global tools do not have.
 *
 * The hotel HOME lives at /hoteles (hand-built). These are the spokes, split by
 * intent so each file stays readable:
 *
 *   plataforma  — the mechanisms (canonical explanations)
 *   canales     — surfaces with their own rules (OTA inboxes, telephone)
 *   soluciones  — outcomes by objective (they link to mechanisms, never repeat)
 *   recursos    — the cornerstone guide, integrations, resources, pricing
 *
 * Ordering here also drives sitemap order, so the most valuable pages go first.
 */
export const HOTEL_PAGES: MarketingPage[] = [
  ...HOTEL_RECURSOS.filter((p) => p.slug === "hoteles/automatizar-hotel-con-ia"),
  ...HOTEL_PLATAFORMA,
  ...HOTEL_CANALES,
  ...HOTEL_SOLUCIONES,
  ...HOTEL_RECURSOS.filter((p) => p.slug !== "hoteles/automatizar-hotel-con-ia"),
];
