# Stack técnico — IA para Todos Landing Page Cohorte 3

Referencia arquitectural para quien construya la landing. El copy y la estructura están en [landing-estructura.md](./landing-estructura.md).

---

## Stack confirmado

| Capa | Tecnología | Estado |
|------|-----------|--------|
| Framework | Astro + HTML + CSS | Confirmado |
| Hosting | Vercel | Confirmado |
| Registro | Brevo API | Confirmado |
| Email automation | Brevo | Confirmado — 5 correos |
| Analytics | Google Analytics | Confirmado |
| Ads | Meta Ads | Confirmado — 3 etapas |
| Design system | The Tribu Design System (Claude Design) | Confirmado |

---

## Constraints de desarrollo

- **Mobile-first** — la mayoría del tráfico llega desde Meta Ads en móvil; priorizar velocidad de carga y formulario usable en una mano.
- **Single page** — todo CTA de la landing hace scroll al formulario (sección 11). No hay redirección a plataforma externa en ningún punto del flujo antes del form.
- **Sin fugas de atención** — ningún enlace externo antes del formulario, salvo el botón de WhatsApp de la Etapa 3 de retargeting (intencional).

---

## Brevo — flujo de registro

Form propio en Astro que llama a la API de Brevo. Al submit:
1. POST a la API de Brevo — crea o actualiza el contacto con estado `pendiente_por_pagar`
2. Dispara automáticamente la secuencia de 5 correos de nutrición

**Campos del formulario:** nombre completo · email · teléfono/WhatsApp · profesión

**Endpoint Brevo:** `POST /v3/contacts` (Brevo Contacts API v3)

---

## Design system

Los tokens visuales (colores, tipografía, componentes) viven en Claude Design:

- **Landing:** `ia-para-todos-landing-page` — `6fca8e65-ceb4-4016-82f1-6fc199782a13`
- **Design system base:** `The Tribu Design System` — `fb04ebcf-4ded-4587-97c6-bf878063928e`

---

## Tooling

| Herramienta | Rol |
|-------------|-----|
| Biome | Linter + formatter (reemplaza ESLint + Prettier) |

Config en `biome.json`: spaces 2, line width 100, comillas dobles, trailing commas ES5. CSS lint y format habilitados.

---

## TBD — decisiones pendientes

| Decisión | Notas |
|----------|-------|
| Meta Pixel ID | Necesario para retargeting Etapa 2 y 3 de Meta Ads |
| Brevo API key | Necesaria para el submit del form en producción |
| Google Analytics ID | Measurement ID (G-XXXXXXXXXX) para el snippet |

---

## Fechas clave

| Hito | Fecha |
|------|-------|
| Deadline construcción landing | 5 sep 2026 |
| Lanzamiento funnel pagado | 8 sep 2026 |
| Inicio Cohorte 3 | 19 sep 2026 |
