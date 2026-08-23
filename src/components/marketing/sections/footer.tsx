"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { CROSSLINK, NAV_GENERAL, NAV_HOTEL, type NavItem } from "@/content/nav";

/**
 * Footer — derived from the SAME nav config as the mega-menu.
 *
 * It used to be a hardcoded list, which quietly rotted: it still advertised
 * "CRM", "Calendario" and "Inmobiliarias", and half its links were on-page
 * anchors (#features, #pricing, #industries) that only ever existed on the old
 * generic homepage. Once the hotel page was promoted to `/` (CON-216) those
 * anchors pointed at sections that are not on the page — dead links on the most
 * crawled URL of the site, and the footer is a primary crawl path.
 *
 * Deriving from NAV means a new page is reachable from the footer the moment it
 * is added to the nav, and no link can point at a route that does not exist.
 */

/** Flatten one nav experience into footer columns, dropping anchors + dupes. */
function columnsFrom(nav: NavItem[]) {
  const cols: { heading: string; links: { label: string; href: string }[] }[] = [];

  for (const item of nav) {
    if (item.kind === "link") continue; // top-level links are covered elsewhere
    for (const col of item.columns) {
      const seen = new Set<string>();
      const links = col.links.filter((l) => {
        // On-page anchors are not footer material, and a repeated href inside
        // one column reads as a mistake.
        if (l.href.includes("#")) return false;
        if (seen.has(l.href)) return false;
        seen.add(l.href);
        return true;
      });
      if (links.length) {
        cols.push({
          heading: col.heading,
          links: links.map((l) => ({ label: l.label, href: l.href })),
        });
      }
    }
  }
  return cols;
}

const LEGAL = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos", href: "/terminos" },
];

export function Footer() {
  const pathname = usePathname();
  // Same rule as the header: the ROOT is the hospedaje experience.
  const isHotel = pathname === "/" || pathname.startsWith("/hoteles");

  const columns = columnsFrom(isHotel ? NAV_HOTEL : NAV_GENERAL).slice(0, 3);
  const crosslink = isHotel ? CROSSLINK.fromHotel : CROSSLINK.toHotel;

  return (
    <footer className="border-t border-white/[0.06] bg-[oklch(0.06_0.01_95)] text-[oklch(0.55_0.005_95)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="conagentes — inicio">
              <Logo size="default" variant="dark" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              {isHotel
                ? "El agente IA que atiende, reserva y cobra por usted — para hoteles y alojamientos, 24/7."
                : "Agentes IA que atienden, venden y agendan por WhatsApp — 24/7."}
            </p>
            <Link
              href={crosslink.href}
              className="mt-4 inline-block text-sm underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
            >
              {crosslink.label}
            </Link>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 text-sm font-semibold text-white">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Más</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={isHotel ? "/hoteles/blog" : "/blog"}
                  className="text-sm transition-colors hover:text-white"
                >
                  {isHotel ? "Blog hotelero" : "Blog"}
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm transition-colors hover:text-white"
                >
                  Contacto
                </Link>
              </li>
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} conagentes. Todos los derechos
            reservados.
          </p>
          <p className="text-xs">Hecho en Colombia</p>
        </div>
      </div>
    </footer>
  );
}
