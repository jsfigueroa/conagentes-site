# conagentes-site — Robust Site Architecture & Build Plan (v1)

**Goal:** take the site from "2-page landing + blog" to a **robust multi-page website** with real mega-menu navigation and dedicated Solutions / Features / Impact / Resources pages.

**Decisions (locked with Sebastián, 2026-08):**
- **Two separate experiences** — a **general-brand** nav/site and a **distinct hotel sub-brand** nav/site on `/hoteles/*` (like Asksuite is 100% hotel). Shared design system (Atardecer) + shared section components, but different headers/footers and page sets.
- **Full build ("todo de una")** — the complete sitemap below, not a phase-1 subset.
- Voice: **usted + "agente(s) IA"** (brand = *con-agentes*). Reference bar: Asksuite, HiJiffy, Canary, Duve (hotel) + Intercom, HubSpot, Zendesk, Gorgias, Vercel, Linear (SaaS).

> **Execution note (weekly usage limit):** the full build must run **foundation-first, keeping the site compiling at every checkpoint** — build new files (nav config, mega-menu, templates) *without wiring* first, create route stubs from templates so nav links resolve, then wire the headers last. Never leave a header importing a component or linking to a route that doesn't exist. Order in §6.

---

## 1. Route + layout architecture (two experiences)

Split the current single `(marketing)` group into two route groups, each with its **own layout = its own header + footer** (route groups don't change URLs):

```
src/app/
  (general)/
    layout.tsx              # <GeneralHeader/> (general mega-menu) + <Footer/> + <SmoothScroll/>
    page.tsx                # Home  (= current (marketing)/page.tsx)
    producto/page.tsx                     # Plataforma hub (Template A)
    producto/[feature]/page.tsx           # feature spokes (Template C) — generateStaticParams
    producto/canales/[channel]/page.tsx   # WhatsApp, Instagram, OTAs, Voz, Webchat
    integraciones/page.tsx + [slug]/page.tsx
    soluciones/page.tsx                   # index
    soluciones/[segment]/page.tsx         # comercio, servicios, educacion + use-cases (Template B)
    precios/page.tsx
    recursos/page.tsx + [category]/page.tsx
    clientes/page.tsx + [slug]/page.tsx   # case studies
    empresa/page.tsx  contacto/page.tsx
  (hotel)/
    hoteles/
      layout.tsx            # <HotelHeader/> (hotel mega-menu) + <HotelFooter/>
      page.tsx              # hotel home (current /hoteles — DONE)
      reservas-directas/  upsell/  reactivacion/  recepcion-24-7/   (Template B, hotel use-cases)
      pms/  cobros/  factura-dian-sire/                              (Template C, hotel features)
      integraciones/                                                # PMS / channel-manager directory
      resultados/                                                   # impact / ROI
      recursos/                                                     # hotel blog/guides/cases
  blog/…                   # shared (keep)
  layout.tsx (root)        # title template, metadataBase
```

Key points (from the completed implementation research):
- **Route groups** organize without touching URLs; each group's `layout.tsx` mounts its own header once (survives client navigation).
- The **hotel logo** links back to the general home; add a small "¿No es hotelero? Ver conagentes para su negocio →" link in the hotel header/footer so the two experiences cross-link.
- Dynamic segments + `generateStaticParams` + content files → each new feature/solution is **data, not a hand-authored route**.
- `generateMetadata` per page (unique title/desc/OG + self-canonical); `sitemap.ts` generated from the same content source.

---

## 2. Navigation — two nav configs (single source of truth each)

One typed `NAV` object per experience drives **both** the desktop mega-menu and the footer. Schema (from research):

```ts
// src/content/nav-types.ts
export type NavLink = { label: string; href: string; description?: string; icon?: string; badge?: string };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "mega"; label: string; href: string; columns: NavColumn[];
      featured?: { title: string; href: string; blurb: string } };
```

### 2a. GENERAL experience — `NAV_GENERAL`
Top level: **Producto ▾ · Soluciones ▾ · Precios · Recursos ▾ · Empresa** + `[Iniciar sesión]` `[Quiero una demo]`
- **Producto ▾**
  - *La plataforma:* Agentes IA · Bandeja omnicanal · CRM y pipeline · Cobros + factura DIAN · Agenda y citas · Campañas y reactivación · Analítica y BI
  - *Canales:* WhatsApp · Instagram · Voz · Webchat
  - *Más:* Integraciones · Seguridad y cumplimiento · **featured:** "Vea el agente trabajar"
- **Soluciones ▾**
  - *Por industria:* **Hoteles** (badge "Insignia" → crosses into the hotel experience `/hoteles`) · Comercio y distribución · Servicios y clínicas · Educación · Tu sector
  - *Por objetivo:* Más ventas · Subir el ticket (upsell) · Recuperar clientes · Cobros y facturación · Atención 24/7 · BI para dueños
- **Precios** (link)
- **Recursos ▾** — *Aprende:* Blog · Guías y ebooks · Webinars · *Pruebas:* Casos de éxito · Calculadora de ROI · *Soporte:* Centro de ayuda
- **Empresa** (link → about; footer carries Contacto, Trabaja con nosotros, Legal)

### 2b. HOTEL experience — `NAV_HOTEL` (sub-brand, shown on /hoteles/*)
Top level: **Plataforma ▾ · Soluciones ▾ · Integraciones · Recursos ▾ · Precios** + `[Iniciar sesión]` `[Quiero una demo]`
- **Plataforma ▾**
  - *Plataforma para hoteles:* Agente IA para hoteles · Bandeja omnicanal · PMS incluido · Cobros en el chat · Factura DIAN + reporte SIRE
  - *Canales:* WhatsApp · Instagram · Mensajes de OTAs (Booking/Airbnb/Expedia) · Voz · Webchat
- **Soluciones ▾**
  - *Por objetivo:* Reservas directas · Upsell y ancillaries · Reactivación de huéspedes · Recepción 24/7 · Cumplimiento (DIAN/SIRE)
  - *Por rol:* Recepción / reservas · Revenue · Gerencia (GM)
- **Integraciones** (link → PMS + channel-manager directory: Cloudbeds, LobbyPMS, Loggro·Ayenda, Mews…)
- **Recursos ▾** — Blog hotelero · Guías · Casos de éxito · Resultados/ROI · Centro de ayuda
- **Precios** (link → the two-plan model, quote-only — see positioning-brief §5)
- Header also: logo → general site + "¿No es hotelero? →" cross-link.

---

## 3. Full sitemap (todo de una)
**General:** `/` · `/producto` (+ ~7 feature pages + `/producto/canales/*`) · `/integraciones` (+ per-integration) · `/soluciones` (+ comercio, servicios, educacion, + use-case pages) · `/precios` · `/recursos` (+ blog, guías, calculadora-roi) · `/clientes` (+ cases) · `/empresa` · `/contacto`.
**Hotel:** `/hoteles` (done) · `/hoteles/reservas-directas` · `/upsell` · `/reactivacion` · `/recepcion-24-7` · `/pms` · `/cobros` · `/factura-dian-sire` · `/integraciones` · `/resultados` · `/recursos`.
≈ **28–34 pages**, most generated from 3 templates + content files.

---

## 4. Reusable page templates (build ~3, cover ~all pages)
Anti-duplication rule (research): **Features describe a mechanism ONCE (canonical); Solutions describe outcomes for a segment and LINK to Features — never re-explain the mechanism.** Hub-and-spoke internal linking.
- **Template A — Plataforma/Producto (hub):** hero → logo bar → sticky anchor-nav → how it works (3–4 steps) → feature groups (link to spokes) → proof/stats band → integrations strip → testimonial → FAQ → final CTA → related.
- **Template B — Solución (industry/role/use-case spoke):** segment hero → problem in buyer's words → segment social proof → outcome→feature map (links to Features) → case study → segment stats → objection FAQ → CTA → related.
- **Template C — Feature (spoke):** hero → how it works (canonical mechanism) → benefit bullets/before-after → one proof point → "funciona con" (related features + solutions that use it) → CTA.
- Shared blocks (build once): `Hero, LogoBar, AnchorNav, SectionHeading, FeatureGrid, StatBand, StepList, TestimonialCard, CaseStudyCard, IntegrationStrip, FAQAccordion, CTASection, RelatedLinks, Breadcrumbs`. Reuse existing hotel section components where possible.

---

## 5. Mega-menu component (accessible, responsive)
From the implementation research (NN/g + Baymard + WAI-ARIA APG):
- **Disclosure pattern, NOT `role="menu"`** (top-level = real link to overview page + a separate toggle `<button aria-expanded aria-controls>`). Highest-impact a11y decision.
- **Hover-intent:** ~150–300 ms open delay + a close grace period (hover-bridge) to solve the diagonal problem; open on hover AND click; **Escape** + **focus-leave** close the panel (WCAG 1.4.13).
- **3–4 columns max**, grouped with headings; each choice appears once; front-loaded labels.
- **`aria-current="page"`** on the active top-level (Baymard: 95% of sites fail to show current scope).
- **Mobile:** full-height accordion drawer, one panel open at a time, ≥44px targets, `100dvh`, safe-area inset.
- Motion: transform/opacity only, <300 ms, honor `prefers-reduced-motion`, correct transform-origin (per ui-craft.md). framer-motion is fine; **or** use Radix `NavigationMenu` (a11y-correct by default, avoids the menu role) to save effort.
- Build **two** headers — `GeneralHeader` (drives from `NAV_GENERAL`) and `HotelHeader` (`NAV_HOTEL`) — sharing one `MegaMenu` primitive + `MobileNavDrawer`. (Full reference component in the session's implementation-research deliverable.)

---

## 6. Build order (foundation-first; keep it compiling)
1. `content/nav-types.ts` + `content/nav-general.ts` + `content/nav-hotel.ts` (data only — safe, unused until wired).
2. `MegaMenu` primitive + `MobileNavDrawer` (new files, not wired).
3. Reusable section blocks + `ProductTemplate` / `SolutionTemplate` / `FeatureTemplate` (new files).
4. **Route stubs** for every nav destination, each rendering its template with placeholder content → nav links resolve (no 404s).
5. Restructure layouts: create `(general)/layout.tsx` (GeneralHeader) and `(hotel)/hoteles/layout.tsx` (HotelHeader); move/retarget existing pages. **← the only step that can break the build; do it last, verify immediately.**
6. Fill real content per page (Template B/C from content files), section by section.
7. `sitemap.ts` from the content source; per-page `generateMetadata`.
Verify `next build`/dev + at 375/1280 + reduced-motion after steps 5 and 7.

---
*Reference material: this session's positioning brief (`docs/positioning-brief.md`), the completed mega-menu/Next.js implementation research, Asksuite (founder reference), and the hotel + big-SaaS competitor teardowns. The hotel-tech and big-SaaS site-teardown research agents were interrupted by the account's weekly usage limit; re-run after reset to enrich the per-page content if desired.*
