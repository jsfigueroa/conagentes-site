import Link from "next/link";
import { Logo } from "@/components/brand/logo";

const footerLinks = {
  Producto: [
    { label: "Agente IA", href: "#features" },
    { label: "CRM", href: "#features" },
    { label: "Calendario", href: "#features" },
    { label: "Pipeline", href: "#features" },
    { label: "Precios", href: "#pricing" },
  ],
  Industrias: [
    { label: "Hoteles", href: "#industries" },
    { label: "Educación", href: "#industries" },
    { label: "Inmobiliarias", href: "#industries" },
  ],
  Empresa: [
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "#" },
    { label: "Trabaja con nosotros", href: "#" },
  ],
  Legal: [
    { label: "Privacidad", href: "/privacidad" },
    { label: "Términos", href: "/terminos" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[oklch(0.06_0.01_95)] border-t border-white/[0.06] text-[oklch(0.55_0.005_95)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo size="default" variant="dark" />
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              El CRM con agentes de IA que atienden, venden y agendan por
              WhatsApp — 24/7.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} conagentes. Todos los derechos
            reservados.
          </p>
          <p className="text-xs">
            Hecho en Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
