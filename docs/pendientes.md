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
- [ ] `META_PIXEL_ID` configurado en Vercel → `fbq` se dispara en `PageView` y `Lead`
- [ ] `BREVO_API_KEY` y `BREVO_LIST_ID` configurados en Vercel → formulario funciona en producción
- [ ] Flujo completo del formulario probado: submit → confirmación → contacto creado en Brevo
- [ ] Google Analytics activo y recibiendo hits
- [ ] Vercel preview URL revisada en móvil (< 390 px) y escritorio
