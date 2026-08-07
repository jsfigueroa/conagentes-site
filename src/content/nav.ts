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
          { label: "Hoteles", href: "/hoteles", description: "Producto insignia", badge: "Insignia", external: true },
          { label: "Comercio y distribución", href: "/soluciones/comercio" },
          { label: "Servicios y clínicas", href: "/soluciones/servicios" },
          { label: "Educación", href: "/soluciones/educacion" },
          { label: "Tu sector", href: "/soluciones/tu-sector" },
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
    href: "/hoteles",
    columns: [
      {
        heading: "Plataforma para hoteles",
        links: [
          { label: "Agente IA para hoteles", href: "/hoteles#como-vende", description: "Reserva, sube el ticket y recupera" },
          { label: "Bandeja omnicanal", href: "/hoteles/recepcion-24-7" },
          { label: "PMS incluido", href: "/hoteles/pms", description: "Gratis — o conéctelo con el suyo" },
          { label: "Cobros en el chat", href: "/hoteles/cobros" },
          { label: "Factura DIAN + SIRE", href: "/hoteles/factura-dian-sire", description: "Cumplimiento automático" },
        ],
      },
      {
        heading: "Canales",
        links: [
          { label: "WhatsApp", href: "/hoteles#omnicanal" },
          { label: "Instagram", href: "/hoteles#omnicanal" },
          { label: "Mensajes de OTAs", href: "/hoteles#omnicanal", description: "Booking, Airbnb, Expedia" },
          { label: "Voz", href: "/hoteles#omnicanal" },
          { label: "Webchat", href: "/hoteles#omnicanal" },
        ],
      },
    ],
  },
  {
    kind: "mega",
    label: "Soluciones",
    href: "/hoteles",
    columns: [
      {
        heading: "Por objetivo",
        links: [
          { label: "Reservas directas", href: "/hoteles/reservas-directas" },
          { label: "Upsell y ancillaries", href: "/hoteles/upsell" },
          { label: "Reactivación de huéspedes", href: "/hoteles/reactivacion" },
          { label: "Recepción 24/7", href: "/hoteles/recepcion-24-7" },
          { label: "Cumplimiento (DIAN/SIRE)", href: "/hoteles/factura-dian-sire" },
        ],
      },
      {
        heading: "Por rol",
        links: [
          { label: "Recepción / reservas", href: "/hoteles/reservas-directas" },
          { label: "Revenue", href: "/hoteles/upsell" },
          { label: "Gerencia (GM)", href: "/hoteles/resultados" },
        ],
      },
    ],
  },
  { kind: "link", label: "Integraciones", href: "/hoteles/integraciones" },
  {
    kind: "mega",
    label: "Recursos",
    href: "/hoteles/recursos",
    columns: [
      {
        heading: "Aprende",
        links: [
          { label: "Blog hotelero", href: "/blog" },
          { label: "Guías", href: "/hoteles/recursos" },
          { label: "Casos de éxito", href: "/hoteles/recursos" },
        ],
      },
      {
        heading: "Pruebas",
        links: [
          { label: "Resultados / ROI", href: "/hoteles/resultados" },
          { label: "Centro de ayuda", href: "/recursos/ayuda" },
        ],
      },
    ],
  },
  { kind: "link", label: "Precios", href: "/hoteles/precios" },
];

/** Cross-link shown in each header so the two experiences connect. */
export const CROSSLINK = {
  fromHotel: { label: "¿No es hotelero? Ver conagentes para su negocio", href: "/" },
  toHotel: { label: "conagentes para hoteles", href: "/hoteles" },
};
