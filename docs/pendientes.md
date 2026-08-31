# Pendientes — Landing IA para Todos Cohorte 3

Lista de ítems sin resolver para finalizar la página web antes del deadline (5 sep 2026).

---

## Assets visuales

### Hero — imagen de fondo
- **Archivo a reemplazar:** `src/components/Hero.astro` línea 26
- **Qué hay ahora:** fondo sólido `var(--bg-2)` como placeholder
- **Qué se necesita:** foto real del salón de Cotecnova o foto grupal de una cohorte anterior
- **Formato sugerido:** JPG/WebP, ≥ 1440 × 960 px, optimizada para web (< 300 KB)
- **Cómo implementar:** reemplazar el `<div>` placeholder por `<img src="/hero/salon-cotecnova.webp" alt="Salón de Cotecnova" ...>` (o el componente `<Image>` de Astro) dentro del contenedor de fondo en `Hero.astro`

### Foto de Vanessa Colorado — tarjeta de transformación
- **Archivo a modificar:** `src/components/Transformation.astro`
- **Qué hay ahora:** `avatar: null` → se muestra iniciales "VC" como fallback
- **Qué se necesita:** foto real de Vanessa Colorado, preferiblemente en contexto profesional
- **Dónde colocarla:** `public/avatars/vanessa-colorado.jpg` (siguiendo la convención de `saray-foronda.jpg`)
- **Cómo implementar:** cambiar `avatar: null` a `avatar: "/avatars/vanessa-colorado.jpg"` en el objeto `vanessa` del array `cases`
- **Formato:** JPG o WebP, mínimo 144 × 144 px (se muestra a 72 × 72 px, radio 999px)

### Foto de Felipe Gómez — tarjeta de transformación
- **Archivo a modificar:** `src/components/Transformation.astro`
- **Qué hay ahora:** `avatar: null` → se muestra iniciales "FG" como fallback
- **Qué se necesita:** foto real de Felipe Gómez (distinta al thumbnail del video de testimonio)
- **Dónde colocarla:** `public/avatars/felipe-gomez.jpg`
- **Cómo implementar:** cambiar `avatar: null` a `avatar: "/avatars/felipe-gomez.jpg"` en el objeto `felipe` del array `cases`
- **Nota:** el video de Felipe ya está en `public/testimonials/felipe-testimonio.mp4` con su thumbnail en `public/testimonials/felipe-thumbnail.webp`. La foto del avatar es independiente y va en la sección 04 (Transformación), no en la sección 07 (Testimonio)

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

- [ ] Hero muestra foto real (no fondo sólido)
- [ ] Tarjeta de Vanessa Colorado tiene foto real (no iniciales)
- [ ] Tarjeta de Felipe Gómez tiene foto real (no iniciales)
- [ ] `META_PIXEL_ID` configurado en Vercel → `fbq` se dispara en `PageView` y `Lead`
- [ ] `BREVO_API_KEY` y `BREVO_LIST_ID` configurados en Vercel → formulario funciona en producción
- [ ] Flujo completo del formulario probado: submit → confirmación → contacto creado en Brevo
- [ ] Google Analytics activo y recibiendo hits
- [ ] Vercel preview URL revisada en móvil (< 390 px) y escritorio
