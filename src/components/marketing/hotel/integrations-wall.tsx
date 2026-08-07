import { BedDouble, CreditCard, Check } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import { BRAND_MARKS } from "@/components/marketing/hotel/brand-marks";

type MarkKey = keyof typeof BRAND_MARKS;
type Logo = { name: string; mark?: MarkKey; accent?: boolean };

function Mark({ k, className }: { k: MarkKey; className?: string }) {
  const m = BRAND_MARKS[k];
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={m.title} className={className}>
      <title>{m.title}</title>
      <path d={m.path} />
    </svg>
  );
}

function LogoChip({ item, subtle }: { item: Logo; subtle?: boolean }) {
  if (item.accent) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[oklch(0.74_0.185_50/0.4)] bg-neon/[0.08] px-3 py-2 text-[13px] font-bold text-[oklch(0.64_0.19_42)]">
        {item.name}
        <span className="rounded-full bg-neon px-1.5 py-0.5 text-[10px] font-bold text-ink">
          gratis
        </span>
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors ${
        subtle ? "text-muted-foreground hover:text-foreground" : "text-foreground"
      }`}
    >
      {item.mark && <Mark k={item.mark} className="h-4 w-4 shrink-0 fill-current" />}
      {item.name}
    </span>
  );
}

/* ————— Marquee (breadth) ————— */

const ALL_LOGOS: Logo[] = [
  { name: "Booking.com", mark: "booking" },
  { name: "Cloudbeds" },
  { name: "Airbnb", mark: "airbnb" },
  { name: "Wompi" },
  { name: "Mercado Pago", mark: "mercadopago" },
  { name: "Mews" },
  { name: "Expedia", mark: "expedia" },
  { name: "DIAN" },
  { name: "WhatsApp", mark: "whatsapp" },
  { name: "LobbyPMS" },
  { name: "Trivago", mark: "trivago" },
  { name: "Nequi" },
  { name: "Instagram", mark: "instagram" },
  { name: "Loggro · Ayenda" },
  { name: "Despegar" },
  { name: "Alegra" },
  { name: "PSE" },
  { name: "Channex" },
];

export function LogoMarquee() {
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
      <div className="flex w-max gap-3 animate-marquee motion-reduce:animate-none">
        {[...ALL_LOGOS, ...ALL_LOGOS].map((it, i) => (
          <LogoChip key={i} item={it} subtle />
        ))}
      </div>
    </div>
  );
}

/* ————— Use-case mocks ————— */

function InboxMock() {
  const rows: { mark: MarkKey; name: string; detail: string }[] = [
    { mark: "booking", name: "María G.", detail: "2 noches · Doble" },
    { mark: "airbnb", name: "John P.", detail: "3 noches · Suite" },
    { mark: "expedia", name: "Lucía R.", detail: "1 noche · Sencilla" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-bold text-foreground">Reservas</p>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[oklch(0.62_0.15_150)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.62_0.15_150)]" />
          Sincronizado
        </span>
      </div>
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div
            key={r.name}
            className="flex items-center gap-3 rounded-xl border border-border bg-secondary/60 px-3 py-2.5"
          >
            <Mark k={r.mark} className="h-5 w-5 shrink-0 fill-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {r.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">{r.detail}</p>
            </div>
            <span className="rounded-md bg-neon/10 px-2 py-1 text-[10px] font-bold text-[oklch(0.64_0.19_42)]">
              Directa
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AvailabilityMock() {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const rooms = [
    { name: "Estándar", pattern: [1, 1, 0, 1, 1, 0, 0] },
    { name: "Doble", pattern: [1, 0, 0, 1, 1, 1, 0] },
    { name: "Suite", pattern: [1, 1, 1, 0, 0, 1, 1] },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-bold text-foreground">Disponibilidad</p>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[oklch(0.64_0.19_42)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[oklch(0.74_0.185_50)]" />
          En vivo
        </span>
      </div>
      <div className="grid grid-cols-[64px_repeat(7,1fr)] gap-1.5">
        <span />
        {days.map((d, i) => (
          <span
            key={i}
            className="text-center text-[10px] font-semibold uppercase text-muted-foreground"
          >
            {d}
          </span>
        ))}
        {rooms.map((room) => (
          <div key={room.name} className="contents">
            <span className="flex items-center text-[11px] font-medium text-foreground">
              {room.name}
            </span>
            {room.pattern.map((free, i) => (
              <span
                key={i}
                className={`h-6 rounded-md ${
                  free
                    ? "bg-neon/25 ring-1 ring-inset ring-[oklch(0.74_0.185_50/0.4)]"
                    : "bg-secondary"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded bg-neon/25 ring-1 ring-inset ring-[oklch(0.74_0.185_50/0.4)]" />
          Libre
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded bg-secondary" />
          Ocupada
        </span>
      </div>
    </div>
  );
}

export function PaymentMock() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
      <p className="mb-4 text-sm font-bold text-foreground">WhatsApp</p>
      <div className="space-y-3">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[oklch(0.93_0.05_55)] px-3.5 py-2.5 text-sm text-ink">
          Le dejo el link de pago para confirmar su reserva 👇
        </div>
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md border border-border bg-secondary/60 p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Hotel · 2 noches</p>
              <p className="text-lg font-extrabold tabular-nums text-foreground">
                $ 420.000
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neon px-3 py-1.5 text-xs font-bold text-ink">
              <CreditCard className="h-3.5 w-3.5" /> Pagar
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3 border-t border-border pt-2.5">
            <Mark k="mercadopago" className="h-4 w-4 fill-muted-foreground" />
            <span className="text-[11px] font-semibold text-muted-foreground">
              Wompi
            </span>
            <span className="text-[11px] font-semibold text-muted-foreground">
              PSE
            </span>
            <span className="text-[11px] font-semibold text-muted-foreground">
              Nequi
            </span>
          </div>
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-secondary px-3.5 py-2.5 text-sm text-foreground">
          <span className="font-semibold text-[oklch(0.62_0.15_150)]">
            ✓ Pago confirmado
          </span>{" "}
          · Reserva #A-2291
        </div>
      </div>
    </div>
  );
}

export function InvoiceMock() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-bold text-foreground">Factura electrónica</p>
        <span className="rounded-md bg-neon/10 px-2 py-1 text-[10px] font-bold text-[oklch(0.64_0.19_42)]">
          DIAN
        </span>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Alojamiento · 2 noches</span>
          <span className="tabular-nums text-foreground">$ 380.000</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">IVA</span>
          <span className="tabular-nums text-foreground">$ 40.000</span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-2 font-bold">
          <span className="text-foreground">Total</span>
          <span className="tabular-nums text-foreground">$ 420.000</span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-border pt-3 text-[11px] font-semibold text-[oklch(0.62_0.15_150)]">
        <span className="inline-flex items-center gap-1">
          <Check className="h-3.5 w-3.5" /> Enviada a la DIAN
        </span>
        <span className="inline-flex items-center gap-1">
          <Check className="h-3.5 w-3.5" /> SIRE reportado
        </span>
      </div>
    </div>
  );
}

/* ————— Frames ————— */

const frames: {
  tag: string;
  headline: string;
  body: string;
  logos: Logo[];
  mock: React.ReactNode;
}[] = [
  {
    tag: "Canales · OTAs",
    headline: "Todas las OTAs, una sola bandeja.",
    body: "Las reservas de Booking, Airbnb, Expedia y más entran a un solo lugar. Cuando se vende una habitación, su disponibilidad se actualiza sola en todos los canales — vía Channex. Cero overbooking.",
    logos: [
      { name: "Booking.com", mark: "booking" },
      { name: "Airbnb", mark: "airbnb" },
      { name: "Expedia", mark: "expedia" },
      { name: "Trivago", mark: "trivago" },
      { name: "Despegar" },
    ],
    mock: <InboxMock />,
  },
  {
    tag: "PMS",
    headline: "Su PMS, siempre sincronizado.",
    body: "El agente lee la disponibilidad y las tarifas reales de su PMS en tiempo real — nunca las inventa. ¿No tiene PMS? Incluimos uno gratis y listo.",
    logos: [
      { name: "Cloudbeds" },
      { name: "LobbyPMS" },
      { name: "Mews" },
      { name: "Loggro · Ayenda" },
      { name: "Su PMS", accent: true },
    ],
    mock: <AvailabilityMock />,
  },
  {
    tag: "Pagos",
    headline: "Cobra dentro del chat.",
    body: "Envía un link de pago y el huésped paga sin salir de WhatsApp — con Wompi, Mercado Pago, PSE o Nequi. La reserva queda confirmada y pagada al instante.",
    logos: [
      { name: "Mercado Pago", mark: "mercadopago" },
      { name: "Wompi" },
      { name: "PSE" },
      { name: "Nequi" },
    ],
    mock: <PaymentMock />,
  },
  {
    tag: "Facturación · Cumplimiento",
    headline: "Factura y reporta, automático.",
    body: "Emite factura electrónica ante la DIAN y le ayuda con el reporte SIRE de huéspedes extranjeros a Migración Colombia. Ningún otro agente de IA en Colombia lo hace.",
    logos: [{ name: "DIAN" }, { name: "Alegra" }, { name: "SIRE" }],
    mock: <InvoiceMock />,
  },
];

export function IntegrationsWall() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-[oklch(0.64_0.19_42)] uppercase tracking-widest mb-4">
            Integraciones
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Todo su hotel, conectado.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Su PMS, sus canales, sus pagos y la DIAN — trabajando juntos, sin que
            usted mueva un dedo.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mb-20">
          <LogoMarquee />
        </ScrollReveal>

        <div className="space-y-16 md:space-y-24">
          {frames.map((f, i) => {
            const mockRight = i % 2 === 0;
            return (
              <div
                key={f.tag}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
              >
                <ScrollReveal
                  direction={mockRight ? "right" : "left"}
                  className={mockRight ? "md:order-2" : "md:order-1"}
                >
                  {f.mock}
                </ScrollReveal>

                <ScrollReveal
                  direction={mockRight ? "left" : "right"}
                  className={mockRight ? "md:order-1" : "md:order-2"}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.64_0.19_42)] mb-3">
                    {f.tag}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    {f.headline}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {f.body}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {f.logos.map((l) => (
                      <LogoChip key={l.name} item={l} />
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
