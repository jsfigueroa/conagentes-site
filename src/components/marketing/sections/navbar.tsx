"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.conagentes.com";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { useDemoForm } from "@/components/marketing/demo-form/demo-form-context";

const navLinks = [
  { href: "#features", label: "Producto" },
  { href: "#industries", label: "Industrias" },
  { href: "#pricing", label: "Precios" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const { open } = useDemoForm();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[oklch(0.08_0.01_95/0.85)] backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo size="default" variant="dark" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[oklch(0.7_0.005_95)] hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`${APP_URL}/login`}
            className="text-sm font-medium text-[oklch(0.7_0.005_95)] hover:text-white transition-colors px-4 py-2"
          >
            Iniciar sesión
          </a>
          <button
            onClick={() => open("navbar")}
            className="text-sm font-semibold bg-neon text-ink px-5 py-2.5 rounded-full hover:brightness-110 transition-all shadow-[0_0_20px_oklch(0.86_0.27_148/0.3)] cursor-pointer"
          >
            Demo gratis
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Menú"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[oklch(0.08_0.01_95/0.95)] backdrop-blur-xl border-t border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-medium text-[oklch(0.7_0.005_95)] hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/[0.06] space-y-3">
                <a
                  href={`${APP_URL}/login`}
                  className="block text-base font-medium text-[oklch(0.7_0.005_95)] hover:text-white transition-colors"
                >
                  Iniciar sesión
                </a>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    open("navbar");
                  }}
                  className="block w-full text-center text-sm font-semibold bg-neon text-ink px-5 py-3 rounded-full cursor-pointer"
                >
                  Demo gratis
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
