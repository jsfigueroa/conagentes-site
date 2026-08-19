---
description: Escribe y publica el artículo del día en el blog hotelero (/hoteles/blog)
argument-hint: "[tema opcional o número del calendario]"
allowed-tools: Read, Write, Edit, Glob, Grep, WebSearch, WebFetch, Bash(git *), Bash(curl *), Bash(node *), Bash(date *)
---

Usted es el editor del blog hotelero de conagentes. Escriba y publique **un solo
artículo**, completo, de calidad publicable sin edición humana.

Tema pedido: **$ARGUMENTS** (si está vacío, tome el siguiente del calendario).

## 0. Lea el contrato primero (no lo omita)

1. `docs/blog-hotel-playbook.md` — voz, reglas GEO/AEO, verdad del producto,
   formato del JSON y lista de verificación. **Es de cumplimiento obligatorio.**
2. `docs/blog-hotel-calendar.md` — el orden de los temas.

## 1. Elija el tema

- Si `$ARGUMENTS` trae un tema o un número, use ese.
- Si no: el primer tema sin marcar (`[ ]`) del calendario.
- Confirme que no está publicado ni pendiente:
  - `curl -s https://conagentes.com/sitemap.xml | grep "<slug candidato>"`
  - revise `_pending_posts/`
  Si ya existe, pase al siguiente tema y dígalo al final.

## 2. Investigue antes de escribir (esto separa un buen artículo del relleno)

- Busque **3 a 6 datos reales y recientes** con `WebSearch`, y **abra cada
  fuente con `WebFetch` para confirmar que el número está ahí**. Fuentes
  preferidas: Cotelco, DANE, MinCIT, Migración Colombia, DIAN, ProColombia,
  STR, Skift, PhocusWire, Harvard Business Review, informes públicos de las OTAs.
- **Si no puede abrir la fuente o el dato no aparece, el dato no entra.** Nunca
  invente una cifra ni una URL. Es mejor un artículo con tres datos verificados
  que con seis inventados.
- Si el tema toca norma colombiana (DIAN, TRA, SIRE, RNT, IVA a extranjeros,
  Ley 1581, Ley 2300), verifique el estado vigente hoy antes de afirmar nada.

## 3. Alinee con el producto (para no contradecir el sitio)

- Lea la página pilar del tema en `src/content/hotel/*.ts` (el mapa de enlaces
  está en el §6 del playbook) y respete su vocabulario.
- Vocabulario de tres estados, literal: **en vivo / en piloto / en construcción**.
  Recuerde: **registro TRA en vivo; reporte SIRE en construcción.**
- Traiga los slugs de los artículos previos para enlazarlos:
  `curl -s https://conagentes.com/hoteles/blog/feed.xml | grep "<link>"`

## 4. Escriba el JSON

- Archivo: `_pending_posts/<fecha>-<slug>.json`, con la fecha de hoy en Bogotá
  (`date -u +%F` sirve: publicamos 14:00 UTC = 9:00 a. m. Bogotá, mismo día).
- Estructura exacta del §9 del playbook. Slug **sin año**.
- 1.500–2.200 palabras. `content` en HTML (sin `<h1>`), `content_markdown` con el
  mismo texto.
- `answer`: 40–70 palabras, auto-contenido — es lo que citará un asistente.
- 3+ enlaces internos a `/hoteles/*` y 1–2 a artículos previos, dentro del texto.
- `author_name`: «Equipo conagentes» + el `author_bio` del §10 del playbook.
- Calcule `word_count` y `reading_time_minutes` de verdad (no los estime a ojo):
  cuente sobre el texto sin etiquetas.

## 5. Revise contra la lista del §11

Recórrala punto por punto y corrija lo que falle **antes** de publicar. Preste
atención especial a: ningún dato sin fuente verificada, ningún cliente ni precio
inventado, TRA/SIRE correctos, categoría entre las siete.

## 6. Publique

```bash
# marque el tema en docs/blog-hotel-calendar.md como [x] con su slug real
git add _pending_posts docs/blog-hotel-calendar.md
git commit -m "Nuevo artículo del blog hotelero: <título>"
git push origin master
```

El workflow `publish-post.yml` hace el resto: `POST /api/publish` → Supabase →
revalidación + IndexNow, y borra el JSON publicado.

## 7. Verifique que quedó en vivo

Espere ~90 segundos y confirme:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://conagentes.com/hoteles/blog/<slug>
```

- `200` → listo.
- Otro código → revise el run: `gh run list --workflow=publish-post.yml --limit 1`
  y `gh run view <id> --log`. Un `400` con «Unknown category» significa categoría
  fuera de las siete; un `401`, que el secreto de publicación no coincide con
  `REVALIDATION_SECRET` en Vercel.

## 8. Informe (en 5 líneas, en español)

- Título y URL del artículo.
- Categoría y palabras.
- Las fuentes citadas (dominio de cada una).
- Qué enlazó internamente.
- Cualquier dato que decidió **no** usar por no poder verificarlo.
