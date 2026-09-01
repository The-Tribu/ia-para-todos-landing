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
- **Verificación pendiente:** confirmar preview en WhatsApp una vez el dominio `iaparatodos.co` esté en producción

---

## Flujo de correos electrónicos — Brevo

La secuencia completa está definida en `docs/estrategia-marketing.md` pero **no está configurada en Brevo todavía**. Bloquea el lanzamiento porque sin los correos nadie que se registre recibirá confirmación ni seguimiento.

### Atributos de contacto usados en `src/lib/brevo.ts`

| Atributo Brevo | Valores posibles | Qué indica |
|----------------|-----------------|------------|
| `COHORTE` | `"cohorte-3"` | A qué cohorte pertenece el registro |
| `NIVEL` | `"1"` \| `"2"` \| `"3"` | Tier de precio asignado (Pioneros / Early Bird / General) |
| `ESTADO_PAGO` | `"3"` = pagado | Estado del pago — solo `"3"` libera el cupo en `getTierStatus()` |

### Paso 1 — Atributos de contacto en Brevo (configurar una sola vez)
Crear los atributos personalizados en **Brevo → Contacts → Settings → Contact attributes**:
- `COHORTE` — tipo texto
- `NIVEL` — tipo texto
- `ESTADO_PAGO` — tipo texto
- `PROFESION` — tipo texto (lo envía el formulario, campo `profesion`)

### Paso 2 — Lista de contactos
Crear o confirmar la lista en **Brevo → Contacts → Lists** y anotar su ID numérico → ese ID va en la variable de entorno `BREVO_LIST_ID`.

### Paso 3 — 5 plantillas de correo (crear en Brevo → Email → Templates)

| # | Asunto sugerido | Cuándo se envía | Objetivo |
|---|-----------------|-----------------|----------|
| 1 | "{{contact.FIRSTNAME}}, tu cupo está apartado — instrucciones de pago" | Inmediato al registro | Confirmar reserva + datos de pago (BreB 305 266 6114 · Bold · efectivo) |
| 2 | "Tu cupo sigue aquí, pero el nivel puede subir" | +24 h si `ESTADO_PAGO ≠ 3` | Recordatorio suave con urgencia de tier |
| 3 | "Quedan X cupos en tu nivel — {{días}} días para el 19 sep" | +48–72 h | Urgencia real con cupos restantes |
| 4 | "La duda más común antes de inscribirse (y cómo la resolvió alguien igual a ti)" | +4–5 días | Objeción + testimonio de un alumno con perfil similar |
| 5 | "Última oportunidad — tu cupo se libera mañana" | 48 h antes del cierre de ventas (16 sep) | Último aviso, urgencia máxima |

### Paso 4 — Automatización en Brevo (Automation → Create workflow)
- **Trigger:** contacto añadido a la lista `BREVO_LIST_ID` con `COHORTE = cohorte-3`
- **Condición de salida:** `ESTADO_PAGO = 3` (pagó → salir de la secuencia)
- **Flujo:** enviar correo 1 → esperar 24 h → si no pagó, correo 2 → esperar 48 h → correo 3 → esperar 2–3 días → correo 4 → esperar hasta 48 h antes del 17 sep → correo 5

### Paso 5 — Sender (remitente)
Verificar o crear el sender en **Brevo → Senders** con el email y nombre desde donde saldrán los correos (ej. `jorge@thetribu.co` · "Jorge — IA para Todos").

---

## Variables de entorno (producción)

Estas claves están en `docs/stack.md` como TBD y bloquean funciones en producción:

| Variable | Uso | Estado |
|----------|-----|--------|
| `META_PIXEL_ID` | Retargeting Meta Ads etapas 2 y 3; dispara `fbq('track', 'PageView')` en `Layout.astro` | Pendiente |
| `BREVO_API_KEY` | Submit del formulario de registro → `POST /v3/contacts` de Brevo | Pendiente |
| `BREVO_LIST_ID` | ID de la lista en Brevo donde se crean los contactos | Pendiente — default hardcodeado en `11` |

> Sin `BREVO_API_KEY` el formulario falla en producción. El tier y cupos caen al fallback de desarrollo (tier 1, 4 cupos) en `src/pages/index.astro:20`.

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
- [ ] Automatización de Brevo configurada y probada (trigger → 5 correos → salida al pagar)
- [ ] Sender verificado en Brevo
- [ ] `META_PIXEL_ID` configurado en Vercel → `fbq` se dispara en `PageView` y `Lead`
- [ ] `BREVO_API_KEY` y `BREVO_LIST_ID` configurados en Vercel → formulario funciona en producción
- [ ] Flujo completo del formulario probado end-to-end: submit → contacto en Brevo → correo 1 llega
- [ ] Google Analytics activo y recibiendo hits
- [ ] Vercel preview URL revisada en móvil (< 390 px) y escritorio
