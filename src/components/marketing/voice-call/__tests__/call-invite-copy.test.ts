import { describe, it, expect } from "vitest";
import { callInviteCopy, isHotelPath } from "../call-invite-copy";

/**
 * Each assertion is pinned BOTH ways — it must fail if the audience split
 * breaks in either direction. A test that only checks the hotel path still
 * passes when every visitor, everywhere, is told about their huéspedes.
 */

const HOTEL_PATHS = [
  "/",
  "/hoteles/precios",
  "/hoteles/agente-ia",
  "/hoteles/blog",
  "/hoteles/blog/como-vender-mas-directo",
];

const GENERIC_PATHS = [
  "/negocios",
  "/negocios/restaurantes",
  "/integraciones",
  "/recursos",
];

describe("isHotelPath", () => {
  it.each(HOTEL_PATHS)("treats %s as hospedaje", (p) => {
    expect(isHotelPath(p)).toBe(true);
  });

  it.each(GENERIC_PATHS)("does not treat %s as hospedaje", (p) => {
    expect(isHotelPath(p)).toBe(false);
  });

  it("does not match a path that merely contains 'hoteles'", () => {
    // `startsWith`, not `includes` — `/negocios/para-hoteles` would otherwise
    // flip a generic page into hospedaje copy.
    expect(isHotelPath("/negocios/para-hoteles")).toBe(false);
  });
});

describe("callInviteCopy", () => {
  it.each(HOTEL_PATHS)("speaks about huéspedes, never clientes, on %s", (p) => {
    const copy = callInviteCopy(p);
    expect(copy.lead).toContain("huéspedes");
    expect(copy.lead).not.toContain("clientes");
    expect(copy.promo).toBe("llamada-hotel");
    expect(copy.source).toBe("popup-hotel");
  });

  it.each(GENERIC_PATHS)("speaks about clientes, never huéspedes, on %s", (p) => {
    const copy = callInviteCopy(p);
    expect(copy.lead).toContain("clientes");
    expect(copy.lead).not.toContain("huéspedes");
    expect(copy.promo).toBe("llamada-negocios");
    expect(copy.source).toBe("popup-negocios");
  });

  it("gives the two audiences distinct analytics labels", () => {
    // Otherwise the dashboard averages a hotelero and a distributor into one
    // number that describes neither.
    expect(callInviteCopy("/").promo).not.toBe(callInviteCopy("/negocios").promo);
    expect(callInviteCopy("/").source).not.toBe(callInviteCopy("/negocios").source);
  });

  it("keeps the phone's body genuinely shorter than the desktop one", () => {
    // The whole reason `bodyShort` exists is sheet height. If an edit lets the
    // two converge, the sheet silently grows back into an interstitial.
    for (const p of [...HOTEL_PATHS, ...GENERIC_PATHS]) {
      const copy = callInviteCopy(p);
      expect(copy.bodyShort.length).toBeLessThan(copy.body.length);
      expect(copy.bodyShort.length).toBeLessThanOrEqual(70);
    }
  });

  it("does not let the title break across 'agente IA'", () => {
    // A non-breaking space, not a plain one: with a normal space the headline
    // wrapped to "…el agente" / "IA — ahora, por voz" at the card's width.
    expect(callInviteCopy("/").title).toContain("agente IA");
    expect(callInviteCopy("/").title).not.toContain("agente IA");
  });
});
