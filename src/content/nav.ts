/**
 * Single source of truth for site navigation — drives BOTH the desktop
 * mega-menu and the footer, for each of the two experiences:
 *   NAV_GENERAL — the general/multi-industry brand
 *   NAV_HOTEL   — the hotel sub-brand (shown on /hoteles/*)
 *
 * Data only — safe to add/reorder without touching components. The mega-menu
 * header consumes this (Disclosure pattern; top-level items are REAL links to
 * an overview page + a separate toggle). See docs/site-architecture.md.
 *
 * NOTE: some hrefs point to routes that are being built out — keep this in
 * sync with the route scaffold so no nav link 404s.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  external?: boolean; // e.g. crossing between the two experiences
};

export type NavColumn = { heading: string; links: NavLink[] };

export type NavItem =
  | { kind: "link"; label: string; href: string }
  | {
      kind: "mega";
      label: string;
      href: string; // real overview page — never a dead label
      columns: NavColumn[];
      featured?: { title: string; href: string; blurb: string };
    };

/* ───────────────────────── GENERAL experience ───────────────────────── */

export const NAV_GENERAL: NavItem[] = [
  {
    kind: "mega",
    label: "Producto",
    href: "/producto",
    columns: [
      {
        heading: "La plataforma",
        links: [
          { label: "Agentes IA", href: "/producto/agentes-ia", description: "Venden, atienden y hacen seguimiento" },
          { label: "Bandeja omnicanal", href: "/producto/bandeja", description: "WhatsApp, Instagram y web, en un lugar" },
          { label: "CRM y pipeline", href: "/producto/crm-pipeline", description: "Se llena solo, cero digitación" },
          { label: "Cobros + factura DIAN", href: "/producto/cobros-facturacion", description: "Cobra en el chat, factura ante la DIAN" },
          { label: "Agenda y citas", href: "/producto/agenda" },
          { label: "Campañas y reactivación", href: "/producto/campanas" },
          { label: "Analítica y BI", href: "/producto/analitica-bi" },
        ],
      },
      {
        heading: "Canales",
        links: [
          { label: "WhatsApp", href: "/producto/canales/whatsapp" },
          { label: "Instagram", href: "/producto/canales/instagram" },
          { label: "Voz", href: "/producto/canales/voz" },
          { label: "Webchat", href: "/producto/canales/webchat" },
        ],
      },
      {
        heading: "Más",
        links: [
          { label: "Integraciones", href: "/integraciones" },
          { label: "Seguridad y cumplimiento", href: "/producto/seguridad" },
        ],
      },
    ],
    featured: {
      title: "Vea al agente vender",
      href: "/producto#demo",
      blurb: "De un «hola» por WhatsApp a una venta cobrada y facturada.",
    },
  },
  {
    kind: "mega",
    label: "Soluciones",
    href: "/soluciones",
    columns: [
      {
        heading: "Por industria",
        links: [
          { label: "Hoteles y alojamientos", href: "/", description: "Nuestra especialidad", badge: "Especialidad", external: true },
          { label: "Comercio y distribución", href: "/soluciones/comercio" },
          { label: "Servicios y clínicas", href: "/soluciones/servicios" },
          { label: "Educación", href: "/soluciones/educacion" },
          { label: "Su sector", href: "/soluciones/tu-sector" },
        ],
      },
      {
        heading: "Por objetivo",
        links: [
          { label: "Vender más", href: "/soluciones/mas-ventas" },
          { label: "Subir el ticket (upsell)", href: "/soluciones/upsell" },
          { label: "Recuperar clientes", href: "/soluciones/reactivacion" },
          { label: "Cobros y facturación", href: "/soluciones/cobros" },
          { label: "Atención 24/7", href: "/soluciones/atencion-24-7" },
          { label: "BI para dueños", href: "/soluciones/bi" },
        ],
      },
    ],
  },
  { kind: "link", label: "Precios", href: "/precios" },
  {
    kind: "mega",
    label: "Recursos",
    href: "/recursos",
    columns: [
      {
        heading: "Aprende",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "Guías y ebooks", href: "/recursos/guias" },
          { label: "Webinars", href: "/recursos/webinars" },
        ],
      },
      {
        heading: "Pruebas",
        links: [
          { label: "Casos de éxito", href: "/clientes" },
          { label: "Calculadora de ROI", href: "/recursos/calculadora-roi" },
        ],
      },
      {
        heading: "Soporte",
        links: [
          { label: "Centro de ayuda", href: "/recursos/ayuda" },
          { label: "Contacto", href: "/contacto" },
        ],
      },
    ],
  },
  { kind: "link", label: "Empresa", href: "/empresa" },
];

/* ───────────────────────── HOTEL experience ─────────────────────────── */

export const NAV_HOTEL: NavItem[] = [
  {
    kind: "mega",
    label: "Plataforma",
    href: "/",
    columns: [
      {
        heading: "La plataforma",
        links: [
          {
            label: "El agente de huéspedes",
            href: "/hoteles/agente-ia",
            description: "Atiende, cotiza, cobra y factura",
          },
          {
            label: "El agente de administración",
            href: "/hoteles/agente-admin",
            description: "Sus números y sus acciones, en WhatsApp y en el panel",
          },
          {
            label: "Recepción 24/7",
            href: "/hoteles/recepcion-24-7",
            description: "Una bandeja para todos los canales",
          },
          {
            label: "PMS incluido",
            href: "/hoteles/pms",
            description: "Sin costo aparte — o conecte el suyo",
          },
          {
            label: "Revenue Manager",
            href: "/hoteles/revenue-manager",
            description: "Qué tarifa cobrar cada día",
            badge: "En piloto",
          },
          {
            label: "Agenda de servicios",
            href: "/hoteles/agenda-servicios",
            description: "Spa, tours, traslados y restaurante",
          },
          {
            label: "Cobros y anticipos",
            href: "/hoteles/cobros",
            description: "Link de pago dentro del chat",
          },
        ],
      },
      {
        heading: "Canales",
        links: [
          { label: "WhatsApp", href: "/hoteles/recepcion-24-7" },
          { label: "Instagram", href: "/hoteles/recepcion-24-7" },
          {
            label: "Mensajes de OTAs",
            href: "/hoteles/otas",
            description: "Booking, Airbnb y Expedia",
          },
          {
            label: "Teléfono con IA",
            href: "/hoteles/voz",
            description: "El agente de voz contesta",
            badge: "En piloto",
          },
          { label: "Webchat", href: "/hoteles/recepcion-24-7" },
        ],
      },
      {
        heading: "Confianza",
        links: [
          {
            label: "Control y seguridad",
            href: "/hoteles/control-y-seguridad",
            description: "Por qué no puede inventar nada",
          },
          {
            label: "Cumplimiento colombiano",
            href: "/hoteles/factura-dian-sire",
            description: "Factura DIAN y registro TRA",
          },
          { label: "Integraciones", href: "/hoteles/integraciones" },
        ],
      },
    ],
    featured: {
      title: "Vea al agente cerrar una reserva",
      href: "/hoteles/agente-ia",
      blurb: "La conversación completa: de un «hola» a una reserva pagada y facturada.",
    },
  },
  {
    kind: "mega",
    label: "Soluciones",
    href: "/hoteles/resultados",
    columns: [
      {
        heading: "Por objetivo",
        links: [
          {
            label: "Más reservas directas",
            href: "/hoteles/reservas-directas",
            description: "Menos comisión de OTAs",
          },
          {
            label: "Subir el valor de la estadía",
            href: "/hoteles/upsell",
            description: "Upgrades, servicios, experiencias",
          },
          {
            label: "Recuperar huéspedes",
            href: "/hoteles/reactivacion",
            description: "Que vuelvan directo",
          },
          { label: "Atender siempre", href: "/hoteles/recepcion-24-7" },
          { label: "Cumplir sin trabajo manual", href: "/hoteles/factura-dian-sire" },
        ],
      },
      {
        heading: "Por rol",
        links: [
          { label: "Recepción y reservas", href: "/hoteles/recepcion-24-7" },
          { label: "Revenue", href: "/hoteles/revenue-manager" },
          {
            label: "Gerencia y dueños",
            href: "/hoteles/gerencia",
            description: "Sus números por WhatsApp",
          },
          { label: "Resultados y ROI", href: "/hoteles/resultados" },
        ],
      },
    ],
  },
  { kind: "link", label: "Integraciones", href: "/hoteles/integraciones" },
  // Blog promoted to top level: it publishes three times a week, so it is the
  // freshest thing on the site and the main crawl path AI assistants follow to
  // find citable material. Buried two levels inside Recursos it was invisible
  // to both readers and crawlers.
  { kind: "link", label: "Blog", href: "/hoteles/blog" },
  {
    kind: "mega",
    label: "Recursos",
    href: "/hoteles/recursos",
    columns: [
      {
        heading: "Aprenda",
        links: [
          {
            label: "Automatizar un hotel con IA",
            href: "/hoteles/automatizar-hotel-con-ia",
            description: "La guía completa, paso a paso",
          },
          { label: "Blog hotelero", href: "/hoteles/blog", description: "Lunes, miércoles y viernes" },
          { label: "Todos los recursos", href: "/hoteles/recursos" },
        ],
      },
      {
        heading: "Calcule",
        links: [
          {
            label: "¿Cuánta comisión paga?",
            href: "/hoteles/reservas-directas",
            description: "Calculadora de comisión de OTA",
          },
          {
            label: "¿Cuánto deja el upsell?",
            href: "/hoteles/upsell",
            description: "Ingreso extra por huésped",
          },
          { label: "Las cuatro cuentas del ROI", href: "/hoteles/resultados" },
        ],
      },
      {
        heading: "Soporte",
        links: [
          { label: "Centro de ayuda", href: "/recursos/ayuda" },
          { label: "Contacto", href: "/contacto" },
        ],
      },
    ],
  },
  { kind: "link", label: "Precios", href: "/hoteles/precios" },
];

/**
 * Cross-link shown in each header so the two experiences connect.
 *
 * CON-216: hospedaje IS the main site — the hotel home lives at `/` and
 * `/hoteles` permanently redirects there. The general experience moved to
 * `/negocios`, so `fromHotel` points at it and `toHotel` points at the root.
 */
export const CROSSLINK = {
  fromHotel: { label: "¿No es hotelero? Ver conagentes para su negocio", href: "/negocios" },
  toHotel: { label: "conagentes para hoteles y alojamientos", href: "/" },
};
