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

Form propio en Astro que llama a la API de Brevo (`src/pages/api/register.ts`). Al submit:
1. Busca el contacto por email (`GET /v3/contacts/{email}`). Si **ya tiene `ESTADO_PAGO = 3`**, el
   endpoint no escribe nada y responde `yaInscrito: true` — la página le dice que su cupo ya está
   confirmado. Sin esta guarda, el upsert degradaba a un estudiante pagado a "pendiente por pagar" y
   su silla desaparecía del conteo (pasó en producción con un estudiante que llenó el formulario
   después de pagar)
2. Si no ha pagado, POST a la API de Brevo — crea o actualiza el contacto en la lista de
   **prospectos** con `ESTADO_PAGO = 2` (pendiente por pagar), `COHORTE = cohorte-3` y el `NIVEL` del
   tier vigente
3. Dispara automáticamente la secuencia de 5 correos de nutrición

**Campos del formulario:** nombre completo · email · teléfono/WhatsApp · profesión

**Endpoint Brevo:** `POST /v3/contacts` (Brevo Contacts API v3)

### Dos listas: prospectos y estudiantes

| Lista | ID | Variable | Rol |
|-------|----|----------|-----|
| `IAT \| Prospectos` | 11 | `BREVO_LIST_ID` | Todo el que llena el formulario. La landing **escribe** aquí |
| `IAT-C3 \| Estudiantes` | 13 | `BREVO_STUDENTS_LIST_ID` | Inscritos reales. La landing solo **lee** de aquí |

Mover un contacto de prospectos a estudiantes es un paso **manual**: lo hace Jorge cuando confirma
el pago, junto con `ESTADO_PAGO = 3`. No hay webhook ni endpoint de confirmación de pago.

### Atributos y conteo de cupos

Atributos del contacto: `COHORTE`, `NIVEL`, `ESTADO_PAGO`, `PROFESION` (más nombre, email y WhatsApp).

`getTierStatus()` en `src/lib/brevo.ts` calcula el tier vigente contando los contactos de la **lista
de estudiantes** con `COHORTE = cohorte-3` y `ESTADO_PAGO = 3`, agrupados por `NIVEL`:
`1` Pioneros (cap 4) → `2` Early Bird (cap 6) → `3` General (cap 2). El primer nivel que no esté
lleno es el vigente. `NIVEL = 4` (regalo) no ocupa cupo en ningún nivel.

Si Brevo falla o falta la API key, se devuelve `FALLBACK_TIER_STATUS` — un tier conservador fijado en
código para no ofrecer nunca un nivel agotado.

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
| IDs de listas Brevo | `BREVO_LIST_ID` = 11 (prospectos) y `BREVO_STUDENTS_LIST_ID` = 13 (estudiantes) en Vercel |
| Google Analytics ID | Measurement ID (G-XXXXXXXXXX) para el snippet |

---

## Fechas clave

| Hito | Fecha |
|------|-------|
| Deadline construcción landing | 5 sep 2026 |
| Lanzamiento funnel pagado | 8 sep 2026 |
| Inicio Cohorte 3 | 19 sep 2026 |
