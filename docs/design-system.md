# The Tribu — Design System

Documentación de uso extraída del proyecto Claude Design `The Tribu Design System` (fb04ebcf).
Fuente de verdad visual para construir cualquier superficie de The Tribu.

> **CSS base:** `colors_and_type.css` del design system. Importar este archivo para acceder a todos los tokens.

---

## Identidad visual

**Dark-first, electric, confident.** Canvas profundo navy (`#020617`) iluminado por un gradiente
violeta→magenta. El color funciona como *luz*, no como pintura: pocos puntos de color intenso
sobre mucho espacio oscuro.

---

## Colores

### Marca core

| Token | Valor | Uso |
|-------|-------|-----|
| `--tribu-bg` | `#020617` | Canvas principal |
| `--tribu-accent` | `#c621e5` | Acento primario (magenta) |
| `--tribu-violet` | `#720cd4` | Inicio del gradiente |
| `--tribu-header` | `#1e1b4b` | Navegación / bandas elevadas (indigo) |

### Superficies (modo oscuro)

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg-0` | `#020617` | Canvas base |
| `--bg-1` | `#0a0f24` | Cards / superficies elevadas |
| `--bg-2` | `#11173a` | Overlays, inputs, filas hover |
| `--bg-3` | `#1e1b4b` | Banda elevada / nav (indigo) |
| `--bg-inset` | `#050a1c` | Wells, bloques de código |

### Texto

| Token | Valor | Uso |
|-------|-------|-----|
| `--fg-1` | `#f5f6fb` | Texto primario |
| `--fg-2` | `#b8bdd6` | Texto secundario |
| `--fg-3` | `#7b819e` | Muted / captions |
| `--fg-4` | `#4b5072` | Disabled / muy tenue |
| `--fg-on-accent` | `#ffffff` | Texto sobre magenta/violeta |

### Bordes

| Token | Valor | Uso |
|-------|-------|-----|
| `--border-subtle` | `rgba(255,255,255,0.06)` | Divisores suaves |
| `--border-default` | `rgba(255,255,255,0.10)` | Borde estándar de cards |
| `--border-strong` | `rgba(255,255,255,0.18)` | Énfasis de borde |
| `--border-accent` | `rgba(198,33,229,0.45)` | Borde acento (focus/active) |

### Escala de acento (magenta)

`--accent-50` → `--accent-900` — de `#fbe9fd` a `#3a0a4a`.
Usar `--accent-400` (`#d33fe1`) para eyebrows y etiquetas. `--accent-500` (`#c621e5`) es el acento de marca.

### Escala violeta

`--violet-400` (`#9a44e8`) → `--violet-700` (`#460882`). Usado en el inicio del gradiente.

### Status

| Token | Valor |
|-------|-------|
| `--success` | `#34d399` |
| `--warning` | `#fbbf24` |
| `--danger` | `#f87171` |
| `--info` | `#60a5fa` |

### Gradiente y glow

```css
--tribu-gradient:   linear-gradient(135deg, #720cd4 0%, #c621e5 100%);  /* diagonal */
--tribu-gradient-h: linear-gradient(90deg,  #720cd4 0%, #c621e5 100%);  /* horizontal */
--tribu-glow:       radial-gradient(60% 60% at 50% 0%, rgba(198,33,229,0.22) 0%, transparent 70%);
```

**Regla de uso del gradiente:** reservar para el mark/logo, UN botón primario por vista, texto
hero de display, líneas/underlines decorativos, y efectos de glow. El uso excesivo lo mata.

---

## Tipografía

### Familias

| Token | Familia | Uso |
|-------|---------|-----|
| `--font-display` | Satoshi | Todos los headings y display |
| `--font-body` | Inter Tribu | Todo el cuerpo y UI |
| `--font-mono` | JetBrains Mono | Código |

**Satoshi** es geométrica, ligeramente condensada — usar ajustada (`-0.02em`) y pesada (700–900).
**Inter** es neutral y legible — usar en 400–600 para cuerpo y labels.

### Escala de tamaño (razón 1.250 major-third)

| Token | Valor |
|-------|-------|
| `--text-xs` | 12px |
| `--text-sm` | 14px |
| `--text-base` | 16px |
| `--text-md` | 18px |
| `--text-lg` | 22px |
| `--text-xl` | 28px |
| `--text-2xl` | 36px |
| `--text-3xl` | 46px |
| `--text-4xl` | 58px |
| `--text-5xl` | 76px |

### Line-height y tracking

| Token | Valor | Uso |
|-------|-------|-----|
| `--leading-tight` | 1.08 | Headings grandes |
| `--leading-snug` | 1.25 | Subtítulos |
| `--leading-normal` | 1.55 | Cuerpo |
| `--tracking-tight` | -0.02em | Headings Satoshi |
| `--tracking-wide` | 0.08em | — |
| `--tracking-caps` | 0.16em | Eyebrows en caps |

### Estilos semánticos (clases CSS)

| Clase | Descripción |
|-------|-------------|
| `.h1` | Satoshi 900 · 58px · leading-tight · tracking-tight |
| `.h2` | Satoshi 700 · 36px · leading-snug · tracking-tight |
| `.h3` | Satoshi 700 · 28px · leading-snug |
| `.h4` | Satoshi 500 · 22px |
| `.p` | Inter 400 · 16px · leading-normal · `--fg-2` |
| `.lead` | Inter 400 · 18px · leading 1.6 · `--fg-2` |
| `.eyebrow` | Inter 600 · 12px · caps · tracking-caps · `--accent-400` |
| `.caption` | Inter 400 · 14px · `--fg-3` |
| `.gradient-text` | Gradiente horizontal recortado en el texto |
| `.code` | JetBrains Mono · 0.92em |

### Reglas de casing

- **Sentence case** para cuerpo y la mayoría de labels.
- **ALL-CAPS con tracking amplio** solo para eyebrows, tags y etiquetas pequeñas (`EVENTOS`, `COMMUNITY`).
- **Title Case para todo** — evitar.

---

## Espaciado

Grid base de 4px. Tokens de `--space-1` a `--space-10`:

| Token | Valor | Referencia |
|-------|-------|-----------|
| `--space-1` | 4px | — |
| `--space-2` | 8px | — |
| `--space-3` | 12px | Gap interno tight |
| `--space-4` | 16px | Gap estándar |
| `--space-5` | 24px | — |
| `--space-6` | 32px | — |
| `--space-7` | 48px | Sección compacta |
| `--space-8` | 64px | Padding sección marketing |
| `--space-9` | 96px | — |
| `--space-10` | 128px | Padding sección hero |

**Regla general:** superficies de marketing usan 64–128px de padding de sección. UI densa usa 12–24px.
Espacio negativo generoso alrededor del gradiente para que sea focal, no ruido.

---

## Radios

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-xs` | 4px | Pequeños detalles |
| `--radius-sm` | 8px | Inputs, chips pequeños |
| `--radius-md` | 12px | Botones, inputs principales |
| `--radius-lg` | 18px | Cards |
| `--radius-xl` | 26px | Paneles feature grandes |
| `--radius-pill` | 999px | Pills y tags |

---

## Sombras y elevación

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.40)` | Elevación mínima |
| `--shadow-md` | `0 8px 24px rgba(0,0,0,0.45)` | Cards estándar |
| `--shadow-lg` | `0 24px 64px rgba(0,0,0,0.55)` | Modales, overlays |
| `--shadow-accent` | `0 10px 40px -8px rgba(198,33,229,0.50)` | Glow magenta bajo CTAs primarios |
| `--ring-accent` | `0 0 0 3px rgba(198,33,229,0.35)` | Focus ring accesible |

La elevación en modo oscuro se comunica más por **luminosidad de superficie** (`--bg-0` → `--bg-3`)
que por sombra. Las sombras son oscuras y difusas — nunca coloreadas salvo `--shadow-accent`.

---

## Modo claro

Sistema dark-first, pero soporta modo claro. Activar con `data-theme="light"` en `<html>` o `<body>`.

Los tokens de acento, violeta y gradiente son **idénticos** en ambos modos. Solo cambian:
- Superficies → ramp claro (`--bg-0: #ffffff` → `--bg-3: #e7e6f6`)
- Bordes/sombras → tinta oscura a baja opacidad
- Texto acento en modo claro → usar `--accent-ink` (`#9d13bd`) en lugar de `--accent-500` para contraste AA
- Glow reducido para que sea legible sobre blanco
- Logo: usar `tribu-logo-horizontal-light.svg` en modo claro

---

## Animación

- **Entrada:** fade + slide suave hacia arriba (8–16px), 200–400ms, `cubic-bezier(0.16,1,0.3,1)` ease-out
- **Hover botón:** `translateY(-1px)` + intensificación del glow
- **Press:** volver a `translateY(0)` + `scale(0.98)`, ~120ms
- **Hover card:** ligera elevación + borde con tinte acento
- **Nada de:** bounce, spin, efectos cartoon. Motion premium y calmado.
- Respetar `prefers-reduced-motion`.

---

## Iconografía

The Tribu no tiene font de íconos propio. Sistema de íconos: **[Lucide](https://lucide.dev)**.

- Solo íconos de línea/stroke (no filled, no duotone)
- Stroke 1.75px · caja 24px · `currentColor` (heredan `--fg-2`/`--fg-1`)
- Acento (magenta) reservado para íconos activos/seleccionados
- El mark de la marca (`assets/tribu-mark.svg`) es el único glifo propio — usar para app icon, favicon o loading state

---

## Componentes

Tres componentes reutilizables exportados en el design system:

### Button
Variantes: `primary` (gradiente) · `ghost` · `soft`
Tamaños: `md` · `sm`
Estados: default · hover (`translateY -1px` + glow) · press (`scale 0.98`) · disabled

### Card
Superficie `--bg-1` con borde 1px `--border-default`, `--radius-lg`, `--shadow-md`.
Hover: borde con tinte acento + leve elevación. Glow superior opcional en feature cards.

### Tag / Badge
Pill con variantes de tono: `default` · `accent` · `solid` · `success` · `info` · `warning` · `danger`
Radio `--radius-pill`. Texto en caps + tracking para etiquetas tipo `LIVE`, `PRÓXIMO`.

---

## Voz y tono

- **Persona:** habla como "nosotros" (la comunidad), se dirige como "tú". Bilingüe ES/EN natural.
- **Tono:** energético pero sin pretensiones. Invita a participar, no vende.
- **Casing:** sentence case por defecto. ALL-CAPS solo en eyebrows y etiquetas cortas.
- **Longitud:** corto. Headlines 2–6 palabras. Sub-copy 1–2 oraciones apretadas. Verbos sobre adjetivos.
- **Emoji:** solo en contextos de comunidad/social (chat, posts). Nunca en headlines, botones o copy formal.

**Ejemplos correctos:**
- Eyebrow: `LA TRIBU` · `PRÓXIMO EVENTO` · `COMMUNITY`
- Headline: *"Donde los builders se encuentran."*
- CTA: `Únete a la tribu` · `Reservar lugar`

**Evitar:** "¡Potencia tu journey de desarrollo con nuestro ecosistema sinérgico! 🚀🔥💯"

---

## Assets

| Archivo | Uso |
|---------|-----|
| `assets/tribu-mark.svg` | Mark standalone — favicon, app icon, loading state |
| `assets/tribu-logo-horizontal-dark.svg` | Logo completo sobre canvas oscuro |
| `assets/tribu-logo-horizontal-light.svg` | Logo completo sobre canvas claro |

Espacio libre alrededor del mark: igual a la altura de una capa del chevron. Nunca recolorear
el mark fuera del gradiente de marca o blanco/indigo sólido.
