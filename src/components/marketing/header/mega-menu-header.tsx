"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { useDemoForm } from "@/components/marketing/demo-form/demo-form-context";
import {
  NAV_GENERAL,
  NAV_HOTEL,
  CROSSLINK,
  type NavItem,
} from "@/content/nav";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.conagentes.com";
const OPEN_MS = 120; // hover-intent open delay
const CLOSE_MS = 260; // grace period (diagonal-problem hover-bridge)

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/* ————— Desktop mega panel ————— */

function MegaPanel({ item }: { item: Extract<NavItem, { kind: "mega" }> }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      id={`mega-${item.label}`}
      role="region"
      aria-label={item.label}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ transformOrigin: "top" }}
      className="absolute left-1/2 top-full z-50 mt-3 w-[min(92vw,60rem)] -translate-x-1/2 rounded-2xl border border-border bg-card p-6 shadow-2xl"
    >
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {item.columns.map((col) => (
          <div key={col.heading}>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {col.heading}
            </p>
            <ul className="space-y-0.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group/link block rounded-lg px-2.5 py-2 transition-colors hover:bg-secondary"
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      {l.label}
                      {l.badge && (
                        <span className="rounded-full bg-neon px-1.5 py-0.5 text-[10px] font-bold text-ink">
                          {l.badge}
                        </span>
                      )}
                      {l.external && (
                        <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover/link:opacity-100" />
                      )}
                    </span>
                    {l.description && (
                      <span className="mt-0.5 block text-[12.5px] text-muted-foreground">
                        {l.description}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {item.featured && (
        <Link
          href={item.featured.href}
          className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-[oklch(0.74_0.185_50/0.3)] bg-neon/[0.06] px-5 py-4 transition-colors hover:bg-neon/[0.1]"
        >
          <span>
            <span className="block text-sm font-bold text-foreground">
              {item.featured.title}
            </span>
            <span className="block text-[12.5px] text-muted-foreground">
              {item.featured.blurb}
            </span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-[oklch(0.64_0.19_42)]" />
        </Link>
      )}
    </motion.div>
  );
}

/* ————— Mobile accordion drawer ————— */

function MobileDrawer({
  nav,
  onNavigate,
}: {
  nav: NavItem[];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden border-t border-white/[0.06] bg-[oklch(0.08_0.01_95/0.98)] backdrop-blur-xl lg:hidden"
    >
      <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <ul className="divide-y divide-white/[0.06]">
          {nav.map((item) => {
            if (item.kind === "link") {
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="block py-4 text-base font-medium text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }
            const open = expanded === item.label;
            const pid = `m-${item.label}`;
            return (
              <li key={item.label} className="py-1.5">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="py-2.5 text-base font-medium text-white"
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={pid}
                    aria-label={`${open ? "Cerrar" : "Abrir"} ${item.label}`}
                    onClick={() => setExpanded(open ? null : item.label)}
                    className="grid size-11 shrink-0 place-items-center text-white/70"
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
                {open && (
                  <div id={pid} className="pb-3">
                    {item.columns.map((col) => (
                      <div key={col.heading} className="py-2">
                        <p className="px-1 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                          {col.heading}
                        </p>
                        {col.links.map((l) => (
                          <Link
                            key={l.href}
                            href={l.href}
                            onClick={onNavigate}
                            className="block rounded-md px-1 py-2.5 text-[15px] text-[oklch(0.8_0.005_95)]"
                          >
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}

/* ————— Header ————— */

export function MegaMenuHeader() {
  const pathname = usePathname();
  const { open: openDemo } = useDemoForm();
  // CON-216: hospedaje IS the main site, so the ROOT is the hotel experience.
  // The general nav now belongs to /negocios and the generic tree beneath it.
  const isHotel = pathname === "/" || pathname.startsWith("/hoteles");
  const nav = isHotel ? NAV_HOTEL : NAV_GENERAL;

  const [scrolled, setScrolled] = useState(false);
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpenLabel(null);
    setMobileOpen(false);
  }, [pathname]);

  // Escape + focus-leave close the panel (WCAG 1.4.13 / APG)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenLabel(null);
    };
    const el = navRef.current;
    const onFocusOut = (e: FocusEvent) => {
      if (el && !el.contains(e.relatedTarget as Node | null)) setOpenLabel(null);
    };
    document.addEventListener("keydown", onKey);
    el?.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("keydown", onKey);
      el?.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const scheduleOpen = (label: string) => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setOpenLabel(label), OPEN_MS);
  };
  const scheduleClose = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpenLabel(null), CLOSE_MS);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || openLabel || mobileOpen
          ? "border-b border-white/[0.06] bg-[oklch(0.08_0.01_95/0.9)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        ref={navRef}
        aria-label="Principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
      >
        <Link href="/" className="flex items-center gap-2" aria-label="conagentes — inicio">
          <Logo size="default" variant="dark" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            if (item.kind === "link") {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-white ${
                      active ? "text-white" : "text-[oklch(0.7_0.005_95)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }
            const isOpen = openLabel === item.label;
            const active = isActive(pathname, item.href);
            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => scheduleOpen(item.label)}
                onMouseLeave={scheduleClose}
              >
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-md py-2 pl-3 pr-1 text-sm font-medium transition-colors hover:text-white ${
                      active || isOpen ? "text-white" : "text-[oklch(0.7_0.005_95)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`mega-${item.label}`}
                    aria-label={`${isOpen ? "Cerrar" : "Abrir"} menú de ${item.label}`}
                    onClick={() => setOpenLabel(isOpen ? null : item.label)}
                    className="grid size-7 place-items-center rounded-md text-[oklch(0.7_0.005_95)] hover:text-white"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
                <AnimatePresence>{isOpen && <MegaPanel item={item} />}</AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={isHotel ? CROSSLINK.fromHotel.href : CROSSLINK.toHotel.href}
            className="text-xs font-medium text-[oklch(0.55_0.005_95)] transition-colors hover:text-white"
          >
            {isHotel ? "Para su negocio →" : "Para hoteles →"}
          </Link>
          <a
            href={`${APP_URL}/login`}
            className="px-3 py-2 text-sm font-medium text-[oklch(0.7_0.005_95)] transition-colors hover:text-white"
          >
            Iniciar sesión
          </a>
          <button
            onClick={() => openDemo("navbar")}
            className="cursor-pointer rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_0_20px_oklch(0.74_0.185_50/0.3)] transition-all hover:brightness-110"
          >
            Quiero una demo
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          className="p-2 text-white lg:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <MobileDrawer nav={nav} onNavigate={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
