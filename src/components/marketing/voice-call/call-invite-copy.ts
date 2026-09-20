/**
 * What the call-invite popup says, and to whom (CON-293).
 *
 * Split out of the component so it can be unit-tested: this repo's CI is
 * typecheck + vitest, and a client component full of framer-motion cannot be
 * imported into a node test. The invariant worth guarding is not the wording
 * but the AUDIENCE — a hospedaje visitor must never be told the agent answers
 * "sus clientes", and somebody on `/negocios` must never be told "sus
 * huéspedes". That is the kind of mistake nobody notices for a month.
 */

export interface CallInviteCopy {
  /** Analytics label for this variant; rides on every `promo_*` event. */
  promo: string;
  /** `source` handed to the voice-call panel, so the lead carries its origin. */
  source: string;
  title: string;
  /** The punchline. Rendered in bold ahead of the body. */
  lead: string;
  body: string;
  /**
   * The phone's version. The sheet has to stay a banner rather than become the
   * interstitial this popup is deliberately not, and every line of copy is a
   * line of the page it covers.
   */
  bodyShort: string;
}

/**
 * `/` and `/hoteles/*` are the hospedaje site; `/negocios` and the generic
 * pages under it are not. Same rule as `MegaMenuHeader`'s `isHotel`, and it
 * has to stay the same rule — the root IS the hotel page (CON-216).
 */
export function isHotelPath(pathname: string): boolean {
  return pathname === "/" || pathname.startsWith("/hoteles");
}

export function callInviteCopy(pathname: string): CallInviteCopy {
  return isHotelPath(pathname)
    ? {
        promo: "llamada-hotel",
        source: "popup-hotel",
        title: "Hable con el agente IA — ahora, por voz",
        lead: "Es la misma agente que le contestaría a sus huéspedes.",
        body:
          "Pregúntele lo que quiera — tarifas, OTAs, cómo se conecta con su PMS — y ella misma le agenda la demo con un asesor.",
        bodyShort: "Pregúntele lo que quiera y ella misma le agenda la demo.",
      }
    : {
        promo: "llamada-negocios",
        source: "popup-negocios",
        title: "Hable con el agente IA — ahora, por voz",
        lead: "Es la misma agente que le contestaría a sus clientes.",
        body:
          "Pregúntele lo que quiera sobre cómo trabajaría en su negocio, y ella misma le agenda la demo con un asesor.",
        bodyShort: "Pregúntele lo que quiera y ella misma le agenda la demo.",
      };
}
