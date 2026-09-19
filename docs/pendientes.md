# Pendientes — Landing IA para Todos Cohorte 3

Lista de ítems sin resolver para finalizar la página web antes del deadline (5 sep 2026).

---

## Assets visuales

### ~~Hero — imagen de fondo~~ ✅ Resuelto
- **Branch:** `feat/hero-background-image` — commit `9d15829`
- **Asset:** `public/hero/fondo-cohorte.webp` — 187 KB (desde 2.1 MB), 1440 × 1080 px
- **Implementado en:** `src/components/Hero.astro` — `<img fetchpriority="high">` con `object-fit: cover`

### Foto de Vanessa Colorado — tarjeta de transformación
- **Archivo a modificar:** `src/components/Transformation.astro`
- **Qué hay ahora:** `avatar: null` → se muestra iniciales "VC" como fallback
- **Qué se necesita:** foto real de Vanessa Colorado, preferiblemente en contexto profesional
- **Dónde colocarla:** `public/avatars/vanessa-colorado.jpg` (siguiendo la convención de `saray-foronda.jpg`)
- **Cómo implementar:** cambiar `avatar: null` a `avatar: "/avatars/vanessa-colorado.jpg"` en el objeto `vanessa` del array `cases`
- **Formato:** JPG o WebP, mínimo 144 × 144 px (se muestra a 72 × 72 px, radio 999px)

### ~~Foto de Felipe Gómez — tarjeta de transformación~~ ✅ Resuelto
- **Branch:** `feat/avatar-felipe-gomez`
- **Asset:** `public/avatars/felipe-gomez.webp` — 14 KB, 288 × 288 px
- **Implementado en:** `src/components/Transformation.astro` — `avatar: "/avatars/felipe-gomez.webp"`

### ~~OG Image — thumbnail al compartir por WhatsApp / redes~~ ✅ Resuelto
- **Branch:** `feat/og-image`
- **Asset:** `public/og/og-image.jpg` — 63 KB, 1200 × 630 px (desde 173 KB / 2400×1260)
- **Implementado en:** `src/layouts/Layout.astro` — `og:image`, `og:image:width`, `og:image:height`, `og:url`, `twitter:card`
- **Verificación pendiente:** confirmar preview en WhatsApp una vez el dominio `latribuia.com` esté en producción

---

## Flujo de correos electrónicos — Brevo

La secuencia completa está definida en `docs/estrategia-marketing.md`. El modelo de datos completo
(listas, atributos, qué dispara cada flujo) está en **[brevo.md](./brevo.md)** — acá va solo lo que
queda por hacer.

### Atributos de contacto usados en `src/lib/brevo.ts`

| Atributo Brevo | Valores posibles | Qué indica |
|----------------|-----------------|------------|
| `COHORTE` | `"cohorte-4"` \| `"cohorte-5"` | A cuál se le asoció **al registrarse** — no a cuál va a entrar. `cohorte-5` = llegó sin cupo ⚠️ ver [brevo.md](./brevo.md#conteo-de-cupos-y-el-id-de-la-lista-de-estudiantes) |
| `NIVEL` | `"1"` \| `"2"` \| `"3"` \| `"4"` | Tier de precio asignado (Pioneros / Early Bird / General / regalo) |
| `ESTADO_PAGO` | `"1"` prospecto \| `"2"` pendiente por pagar \| `"3"` pagado | Estado del pago |

### Cómo se cuentan los cupos ocupados

`getTierStatus()` lee **la lista de estudiantes** (`BREVO_STUDENTS_LIST_ID`, hoy `13`), no la de
prospectos. Un cupo se considera ocupado solo cuando se cumplen **ambas** condiciones:

1. el contacto está en la lista de estudiantes, **y**
2. tiene `ESTADO_PAGO = "3"` (pagado) con `COHORTE` igual al slug de la cohorte vigente.

`NIVEL = "4"` (regalo) **no ocupa cupo**: no cuenta para ningún tier de precio ni para el total de 12.

### Paso 1 — Atributos de contacto en Brevo (configurar una sola vez)
Crear los atributos personalizados en **Brevo → Contacts → Settings → Contact attributes**:
- `COHORTE` — tipo texto
- `NIVEL` — tipo texto
- `ESTADO_PAGO` — tipo texto
- `PROFESION` — tipo texto (lo envía el formulario, campo `profesion`)

### Paso 2 — Listas de contactos

Hay **tres clases** de lista, no dos (detalle completo en [brevo.md](./brevo.md#las-tres-clases-de-lista)):

| Lista | ID | Variable de entorno | Rol |
|-------|----|---------------------|-----|
| `IAT \| Prospectos` | 11 | `BREVO_LIST_ID` | No ha pagado. Donde el formulario crea o actualiza el contacto |
| `IAT-C3 \| Estudiantes` | 13 | `BREVO_STUDENTS_LIST_ID` | Estudiantes de C3 — de aquí sale el conteo de cupos |
| `IAT-C4 \| Estudiantes` | 🔴 **no existe** | — | **Hay que crearla antes de abrir la venta** |
| `IAT \| Alumnis` | 14 | — | Graduados de todas las cohortes |
| `IAT-C1 \| Graduados` / `IAT-C2 \| Graduados` | 15 / 16 | — | Cohortes cerradas |

**El paso de prospectos a la lista de cohorte NO lo hace la landing.** Lo hace la skill `confirm-pago`
de Claude Code cuando Jorge confirma el pago: actualiza `ESTADO_PAGO = 3`, retira de la 11 y agrega a
la lista de la cohorte. La landing nunca escribe en la lista de estudiantes: solo la lee.

🔴 **Bloqueante para abrir la venta de C4:** `BREVO_STUDENTS_LIST_ID` sigue apuntando a `13`, que es la
lista de Cohorte 3. Como los estudiantes de C4 entrarán a `IAT-C4 | Estudiantes` (que aún no existe),
el conteo de cupos de C4 da cero de forma indefinida y la landing se queda anunciando Pioneros para
siempre. Hay que crear la lista, anotar su ID y apuntar la variable ahí.

### Paso 3 — 5 plantillas de correo (crear en Brevo → Email → Templates)

| # | Asunto sugerido | Cuándo se envía | Objetivo |
|---|-----------------|-----------------|----------|
| 1 | "{{contact.FIRSTNAME}}, tu cupo está apartado — instrucciones de pago" | Inmediato al registro | Confirmar reserva + datos de pago (BreB 305 266 6114 · Bold · efectivo) |
| 2 | "Tu cupo sigue aquí, pero el nivel puede subir" | +24 h si `ESTADO_PAGO ≠ 3` | Recordatorio suave con urgencia de tier |
| 3 | "Quedan X cupos en tu nivel — {{días}} días para el 19 sep" | +48–72 h | Urgencia real con cupos restantes |
| 4 | "La duda más común antes de inscribirse (y cómo la resolvió alguien igual a ti)" | +4–5 días | Objeción + testimonio de un alumno con perfil similar |
| 5 | "Última oportunidad — tu cupo se libera mañana" | 48 h antes del cierre de ventas (16 sep) | Último aviso, urgencia máxima |

### Paso 4 — Automatización en Brevo (Automation → Create workflow)

⚠️ **El disparador está sin confirmar y es lo primero que hay que resolver.** Según Jorge (19 sep 2026)
los flujos automáticos ya **no** se disparan por cambios de atributo sino por **cambios de lista**,
pero ese cambio no está registrado en el second brain, que a esa fecha seguía documentando el disparo
por `ESTADO_PAGO`. Falta:

- el **mapeo lista → automation**: qué workflow dispara cada lista, al entrar y al salir;
- el **motivo** del cambio;
- si implica que `/api/register` deba escribir en otra lista o mover el contacto — hoy solo escribe en la 11.

La fuente real es `skills/_shared/brevo-modelo-de-datos.md`, en el vault de origen (la VPS). Ver
[brevo.md](./brevo.md#qué-dispara-los-flujos-automáticos) antes de configurar nada.

- **Flujo (sin cambios):** correo 1 → esperar 24 h → si no pagó, correo 2 → esperar 48 h → correo 3 → esperar 2–3 días → correo 4 → esperar hasta 48 h antes del cierre → correo 5
- ⚠️ **Revisar qué plantilla envía realmente:** las copias `_step_#N` que genera Automations pueden
  seguir diciendo "Cohorte 3". Pregunta abierta registrada en el vault.

### Paso 5 — Sender (remitente)
Verificar o crear el sender en **Brevo → Senders** con el email y nombre desde donde saldrán los correos (ej. `jorge@thetribu.co` · "Jorge — IA para Todos").

---

## Variables de entorno (producción)

Estas claves están en `docs/stack.md` como TBD y bloquean funciones en producción:

| Variable | Uso | Estado |
|----------|-----|--------|
| `META_PIXEL_ID` | Retargeting Meta Ads etapas 2 y 3; dispara `fbq('track', 'PageView')` en `Layout.astro` | Pendiente |
| `BREVO_API_KEY` | Submit del formulario de registro → `POST /v3/contacts` de Brevo | Pendiente |
| `BREVO_LIST_ID` | ID de la lista de prospectos (`IAT \| Prospectos`) donde el formulario crea los contactos | Pendiente — default hardcodeado en `11` |
| `BREVO_STUDENTS_LIST_ID` | ID de la lista de estudiantes (`IAT-C3 \| Estudiantes`) de donde se cuentan los cupos ocupados | Pendiente — default hardcodeado en `13` |

> Sin `BREVO_API_KEY` el formulario falla en producción. El tier y cupos caen a `FALLBACK_TIER_STATUS` en `src/lib/brevo.ts` — hoy tier 2 (Early Bird) con 1 cupo. Ese valor es deliberadamente conservador: si Brevo no responde, la landing nunca debe ofrecer un nivel de precio ya agotado. **Actualizarlo a mano cuando avance la venta.**

---

## Google Analytics

- **Variable:** `MEASUREMENT_ID` (formato `G-XXXXXXXXXX`)
- **Estado:** no implementado todavía en `src/layouts/Layout.astro`
- **Cómo implementar:** agregar el snippet de GA4 en el `<head>` de `Layout.astro`, similar al patrón del Meta Pixel que ya está condicional a la variable de entorno

---

## Checklist de QA antes del lanzamiento (8 sep 2026)

- [x] Hero muestra foto real (no fondo sólido)
- [ ] Tarjeta de Vanessa Colorado tiene foto real (no iniciales)
- [x] Tarjeta de Felipe Gómez tiene foto real (no iniciales)
- [x] OG image creada y `og:image` agregado en `Layout.astro` → link preview correcto en WhatsApp
- [ ] Atributos de contacto creados en Brevo (`COHORTE`, `NIVEL`, `ESTADO_PAGO`, `PROFESION`)
- [ ] 5 plantillas de correo creadas en Brevo
- [ ] Confirmado con Jorge el disparador real (¿cambio de lista o cambio de atributo?) y documentado el mapeo lista → automation
- [ ] `IAT-C4 | Estudiantes` creada en Brevo y `BREVO_STUDENTS_LIST_ID` apuntando a su ID
- [ ] Automatización de Brevo configurada y probada (trigger → 5 correos → salida al pagar)
- [ ] Verificado que los correos que salen no dicen "Cohorte 3" (plantillas madre vs. copias `_step_#N`)
- [ ] Sender verificado en Brevo
- [ ] `META_PIXEL_ID` configurado en Vercel → `fbq` se dispara en `PageView` y `Lead`
- [ ] `BREVO_API_KEY`, `BREVO_LIST_ID` (11) y `BREVO_STUDENTS_LIST_ID` (13) configurados en Vercel → formulario funciona en producción
- [ ] El conteo de cupos de la landing coincide con la lista de estudiantes de la cohorte vigente (solo contactos con `ESTADO_PAGO = 3`, ignorando `NIVEL = 4`)
- [ ] Flujo completo del formulario probado end-to-end: submit → contacto en Brevo → correo 1 llega
- [ ] Google Analytics activo y recibiendo hits
- [ ] Vercel preview URL revisada en móvil (< 390 px) y escritorio
