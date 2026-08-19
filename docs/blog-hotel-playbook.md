# Playbook del blog hotelero (`/hoteles/blog`)

Este documento es el contrato de contenido del blog hotelero. **La rutina que
escribe los artículos vive en `.claude/commands/hotel-post.md` y obedece este
playbook.** Si algo del playbook cambia, el próximo artículo cambia — no hay
prompt escondido en ningún servidor.

> Historia: el blog anterior (`/blog`, pymes + WhatsApp) publicó 23 artículos
> entre mayo y el 14 de junio de 2026 y murió porque su prompt vivía en una
> rutina de claude.ai en la nube, fuera del repositorio. Nadie pudo editarlo ni
> revivirlo. Por eso ahora el prompt es un archivo versionado.

---

## 0. El objetivo: que los chats de IA nos citen

**Regla que manda sobre todas las demás.** Este blog no se escribe para ganar
posiciones en Google; se escribe para que **ChatGPT, Claude, Gemini, Perplexity y
Copilot citen a conagentes** cuando un hotelero les pregunta cómo llenar su
hotel, cuánto cobra Booking, cómo cumplir con la DIAN o qué software usar. El
tráfico orgánico es un subproducto bienvenido; la autoridad en las respuestas de
IA es el objetivo.

Qué implica en la práctica, y por qué cada cosa está donde está:

- **El campo `answer` es el más importante del artículo.** Es el bloque «En
  corto» y se emite como `abstract` + `speakable` en el JSON-LD. Es el texto que
  un asistente copia. Si está flojo, el artículo no sirve para lo que existe.
- **Cada dato con fuente y URL verificable** → se emiten como `citation` en el
  JSON-LD del artículo. Un modelo que puede verificar la cita nos cita.
- **Párrafos auto-contenidos**: los sistemas de recuperación cortan el texto en
  fragmentos. Un párrafo que depende del anterior se vuelve inútil al citarse.
- **Todo en DOM real**, nunca detrás de un clic, de un tab ni en canvas.
- **Entidades explícitas** (Booking.com, DIAN, TRA, Cotelco, PMS, RevPAR…): los
  `tags` se emiten como `mentions` y la categoría como `about`. Así el artículo
  se recupera por el tema y no solo por su título.
- **Gemelo en markdown**: cada artículo se sirve también en
  `/hoteles/blog/<slug>/md`, sin navegación ni scripts, y se anuncia con
  `<link rel="alternate" type="text/markdown">`. Los agentes que navegan pagan
  por token: el que encuentra markdown limpio lee el artículo completo.
- **Corpus en un solo archivo**: `/llms-full.txt` reúne la respuesta citable de
  cada página de hoteles y de cada artículo con sus datos y fuentes.
  `/llms.txt` es el mapa corto. Ambos se regeneran solos al publicar.
- **`robots.ts` permite explícitamente** GPTBot, OAI-SearchBot, ChatGPT-User,
  ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Google-Extended,
  Applebot-Extended, meta-externalagent, CCBot y compañía.
- **IndexNow** se dispara al publicar (Bing/Yandex alimentan ChatGPT Search y
  Copilot), así que un artículo nuevo es visible en minutos, no en semanas.

Y la contracara, que es igual de importante: **un dato inventado nos borra del
mapa**. Los motores de respuesta castigan la fuente que contradice a otras
fuentes. Es preferible publicar tres datos verificados que seis verosímiles.

## 1. A quién le escribimos

- **Dueño o gerente de un hotel independiente** de 10 a 80 habitaciones en
  Colombia (después, LatAm). Vive la operación, no la tecnología.
- **Jefe de reservas / recepción**: quien responde WhatsApp y las bandejas de
  las OTAs todo el día.
- **Quien maneja tarifas** en hoteles que ya piensan en revenue management.

No le escribimos a cadenas grandes con equipo de sistemas, ni a desarrolladores.

## 2. Voz

- **Español de Colombia, tratando de «usted».** Cálido, directo, respetuoso.
- **Cero jerga.** No «webhook», no «API», no «funnel», no «stack». Si un término
  técnico es inevitable, se explica en la misma frase.
- Frases cortas. Párrafos de 2 a 4 frases, **cada uno auto-contenido**: debe
  entenderse solo, sin el párrafo anterior (así es como los motores de respuesta
  cortan y citan el texto).
- Concreto sobre abstracto: pesos, porcentajes, horas, número de habitaciones.
- Nunca vender con miedo ni con hype. Se muestra la cuenta y el lector decide.
- Prohibido el relleno: nada de «en el mundo actual», «la era digital»,
  «como todos sabemos».

## 3. Reglas de GEO/AEO (por qué escribimos así)

Investigación de referencia (Princeton/Georgia Tech, KDD 2024) y lo aprendido en
CON-025 / CON-198:

1. **Estadísticas con fuente citada** suben la visibilidad en respuestas de LLM
   entre 29 % y 44 %. Cada artículo lleva de 3 a 6 datos, cada uno con `source`
   y `source_url` **reales y verificados en la sesión**.
2. **Señales explícitas de credibilidad**: «Según Cotelco…», «Los datos de
   Migración Colombia muestran…». Nunca un dato huérfano.
3. **Nada de keyword stuffing** — repetir la keyword degrada la visibilidad en
   LLM (~8 %). Se escribe para una persona; la keyword aparece donde cae natural.
4. **Respuesta auto-contenida** (`answer`, el bloque «En corto»): 40 a 70
   palabras que responden la pregunta del artículo **sin contexto previo**. Es
   lo que un asistente copia y cita. Se emite además como `abstract` +
   `speakable` en el JSON-LD.
5. **Todo el contenido en DOM real.** Nada que exista solo después de un clic ni
   dibujado en canvas. Las tablas son `<table>`; las listas, `<ul>`.
6. **Preguntas frecuentes reales** (4 a 6), con respuesta completa en 2 a 4
   frases. Se emiten como `FAQPage`.
7. **URL evergreen**: el slug **no lleva el año** (`revenue-management-hotel-independiente`,
   no `...-2026`). Cuando el tema se actualiza, se actualiza el artículo y su
   `dateModified`, no se crea uno nuevo.

## 4. La verdad del producto (esto no se negocia)

El blog es contenido, no folleto, pero **jamás puede contradecir al sitio**. Se
usa exactamente el mismo vocabulario de tres estados que las páginas de
`/hoteles` (ver `src/content/pages.types.ts`):

- **«En vivo»** — funciona hoy: WhatsApp, Instagram, chat web, PMS incluido,
  cotización con disponibilidad real, cobros (Wompi / Mercado Pago: PSE, Nequi),
  agenda de servicios (spa, tours, traslados, restaurante), upsell, reactivación
  de huéspedes, factura electrónica DIAN, registro de huéspedes TRA, BI por
  WhatsApp para gerencia, atención multiidioma con detección automática.
- **«En piloto»** — construido, activándose con los primeros hoteles:
  mensajería de OTAs (Booking, Airbnb, Expedia), Revenue Manager, agente de voz
  telefónico, conexión con PMS externos y channel manager (Channex).
- **«En construcción»** — todavía no: reporte SIRE a Migración Colombia.

Errores que **no** se cometen:

- ❌ Decir que el reporte SIRE ya funciona. **TRA sí, SIRE no.** Son dos cosas
  distintas y confundirlas nos quema con un hotelero.
- ❌ Inventar clientes, nombres de hoteles, testimonios, cifras de «+X hoteles»
  o casos de éxito. **Hoy no hay caso público.** Donde otros ponen testimonios,
  nosotros ponemos datos de categoría con fuente.
- ❌ Inventar precios. Solo existen dos modelos (tarifa fija con 0 % de comisión,
  o base baja + comisión sobre lo que cierre el agente). Sin cifras en COP.
- ❌ Prometer una integración concreta con un PMS específico como si ya
  estuviera lista.
- ❌ Afirmar una norma colombiana sin verificarla en la sesión (DIAN, RNT, TRA,
  SIRE, Ley 1581 de datos, Ley 2300 de llamadas, exención de IVA a no
  residentes del art. 481 lit. d). Si no se pudo verificar, no se afirma.

Si un dato no se pudo verificar: **se omite**. Nunca se rellena con una cifra
plausible.

## 5. Estructura del artículo

- **1.500 a 2.200 palabras.** Menos es delgado; más se dispersa.
- `<h2>` cada 250–400 palabras; `<h3>` cuando haga falta. **Nunca `<h1>`** (lo
  pone la página).
- Una **tabla comparativa** cuando el tema lo pide (canal vs canal, antes vs
  después, opción A vs B). En `<table>` real.
- Los números importantes en negrita (`<strong>`), no párrafos enteros.
- **Enlaces internos**: mínimo **3** a páginas de `/hoteles/*` pertinentes al
  tema y **1 o 2** a artículos anteriores del blog hotelero (si ya existen).
  Rutas relativas: `/hoteles/reservas-directas`, `/hoteles/blog/<slug>`.
  Enlaces naturales dentro del texto, no un bloque de «ver también».
- **Cierre**: qué hacer el lunes por la mañana, en pasos concretos. Sin CTA
  agresivo — la página ya trae su propio llamado a la acción.

## 6. Mapa de enlaces internos (destinos válidos)

| Tema del artículo | Enlazar a |
| --- | --- |
| Venta directa, comisión OTA | `/hoteles/reservas-directas`, `/hoteles/resultados` |
| Responder rápido, 24/7 | `/hoteles/recepcion-24-7`, `/hoteles/agente-ia` |
| Tarifas, ocupación, ADR, RevPAR | `/hoteles/revenue-manager`, `/hoteles/gerencia` |
| Upsell, ancillaries | `/hoteles/upsell`, `/hoteles/agenda-servicios` |
| Huéspedes que vuelven | `/hoteles/reactivacion` |
| PMS, channel manager | `/hoteles/pms`, `/hoteles/integraciones` |
| Booking / Airbnb / Expedia | `/hoteles/otas` |
| Cobros, anticipos, depósitos | `/hoteles/cobros` |
| DIAN, TRA, SIRE, RNT | `/hoteles/factura-dian-sire` |
| Miedo a que la IA se equivoque | `/hoteles/control-y-seguridad` |
| Teléfono | `/hoteles/voz` |
| Cuánto cuesta / retorno | `/hoteles/precios`, `/hoteles/resultados` |
| Guía completa (pilar) | `/hoteles/automatizar-hotel-con-ia` |

## 7. Categorías (obligatorio usar una de estas siete)

Definidas en `src/lib/blog/verticals.ts`. Una categoría desconocida hace que
`/api/publish` rechace el artículo con 400.

| Slug | Cubre |
| --- | --- |
| `reservas-directas` | Venta directa, comisión de OTAs, motor de reservas, seguimiento |
| `revenue-management` | Tarifas, ocupación, ADR, RevPAR, temporadas, forecast |
| `experiencia-huesped` | Atención, upsell, reseñas, pre y post estadía, fidelidad |
| `tecnologia-hotelera` | PMS, channel manager, IA, integraciones, cómo elegir |
| `cumplimiento-hotelero` | DIAN, TRA, SIRE, RNT, datos personales, IVA a extranjeros |
| `operacion-hotelera` | Recepción, equipo, procesos, turnos, costos operativos |
| `mercado-hotelero` | Datos del mercado CO/LatAm: ocupación, tarifas, canales, viajero |

## 8. Cadencia y autoría

- **Lunes, miércoles y viernes**, 9:00 a. m. hora de Bogotá (14:00 UTC).
- Autor: **«Equipo conagentes»** (autoría organizacional, `author_bio` incluido).
  No se inventan personas.
- Se publica automáticamente. Cualquier artículo se puede corregir o despublicar
  después cambiando `status` en Supabase (`blog_posts`).

## 9. Formato del archivo que se entrega

Un JSON por artículo en `_pending_posts/YYYY-MM-DD-<slug>.json`. Al hacer push,
el workflow `publish-post.yml` lo publica y borra el archivo.

```jsonc
{
  "slug": "revenue-management-hotel-independiente",   // sin año, kebab-case
  "title": "…",                                        // 55–75 caracteres
  "subtitle": "…",                                      // 1 frase con el dato ancla
  "excerpt": "…",                                       // 140–200 caracteres
  "answer": "…",                                        // «En corto»: 40–70 palabras, auto-contenido
  "content": "<p>…</p><h2>…</h2>…",                     // HTML, sin <h1>
  "content_markdown": "…",                              // el mismo texto en markdown
  "category": "revenue-management",                     // una de las siete
  "tags": ["revenue-management", "adr", "revpar", "…"], // 5–8, kebab-case
  "meta_title": "…",                                    // ≤ 60 car., SIN «| conagentes»
  "meta_description": "…",                              // 150–160 caracteres
  "key_takeaways": ["…", "…", "…"],                     // 3–5, cada uno auto-contenido
  "statistics": [
    { "stat": "…", "source": "Cotelco (2026)", "source_url": "https://…" }
  ],                                                    // 3–6, URL verificada
  "faq": [{ "question": "…", "answer": "…" }],          // 4–6
  "author_name": "Equipo conagentes",
  "author_bio": "…",                                    // ver §10
  "reading_time_minutes": 8,                            // ceil(palabras / 200)
  "word_count": 1720
}
```

- `cover_image_url`: **se omite** mientras no haya una imagen propia real. No se
  usan fotos de stock ajenas ni se enlazan imágenes de terceros.
- `published_at`: se omite (lo pone el servidor al publicar).
- `meta_title` **sin** «| conagentes»: la plantilla del sitio ya agrega la marca.

## 10. Bio de autoría (usar tal cual)

> Equipo conagentes construye agentes de inteligencia artificial que venden y
> atienden por WhatsApp, Instagram y las bandejas de las OTAs para hoteles y
> pymes de Colombia y Latinoamérica, con PMS incluido y cumplimiento colombiano
> (factura electrónica DIAN y registro de huéspedes TRA).

## 11. Lista de verificación antes de entregar el JSON

- [ ] `answer` responde la pregunta del título en 40–70 palabras, se entiende solo.
- [ ] Cada estadística tiene fuente **y** URL que se abrió y verificó hoy.
- [ ] Ningún dato inventado, ningún cliente inventado, ningún precio inventado.
- [ ] TRA «en vivo», SIRE «en construcción». Revisado literalmente.
- [ ] 3+ enlaces a `/hoteles/*` y 1–2 a artículos previos del blog hotelero.
- [ ] Categoría entre las siete. Slug sin año y sin duplicar uno existente.
- [ ] 1.500–2.200 palabras; `word_count` y `reading_time_minutes` calculados.
- [ ] `meta_title` sin la marca y ≤ 60 caracteres.
- [ ] HTML válido, sin `<h1>`, sin estilos en línea, sin `<script>`.
- [ ] Se leyó el resultado completo una vez, en voz de hotelero: ¿sirve el lunes
      a las 8 a. m. o es palabrería?

## 12. Cómo se publica (resumen técnico)

```
.claude/commands/hotel-post.md   (la rutina)
        ↓ escribe
_pending_posts/YYYY-MM-DD-slug.json
        ↓ commit + push a master
.github/workflows/publish-post.yml
        ↓ POST /api/publish (valida categoría, arma structured_data.answer)
Supabase blog_posts (status = published)
        ↓ revalidate + IndexNow
/hoteles/blog · /hoteles/blog/<slug> · sitemap · llms.txt · feeds
```

Push a `master` despliega el sitio en Vercel (producción). Un artículo nuevo no
requiere despliegue: entra por API y se revalida.

**Regla aprendida a golpes (2026-08-19): no mezcle código y artículo en el mismo
push.** El workflow dispara a los pocos segundos; si el push también cambió
código, Vercel todavía está compilando y el `/api/publish` **viejo** es el que
atiende. Eso pasó con el primer artículo: se publicó sin su `answer`, es decir
sin el bloque «En corto» —justo lo que existe para que un asistente nos cite— y
hubo que corregir la fila a mano. El workflow ahora detecta ese caso y espera 180
segundos, pero la forma correcta sigue siendo: **un push para código, otro para
el artículo.**
