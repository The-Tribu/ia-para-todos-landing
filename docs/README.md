# IA para Todos — Landing Page Cohorte 3

Documentación de estrategia y diseño importada del second brain (The Tribu Obsidian Wiki).

## Archivos

| Archivo | Descripción |
|---------|-------------|
| [buyer-persona.md](./buyer-persona.md) | El Operativo Inseguro — perfil del cliente ideal |
| [estrategia-marketing.md](./estrategia-marketing.md) | Funnel de ventas completo, contexto y plan de producción |
| [landing-estructura.md](./landing-estructura.md) | Estructura sección por sección con copy exacto |
| [prompt-diseno.md](./prompt-diseno.md) | Prompt ejecutable para Claude Design (guía de maquetación) |
| [stack.md](./stack.md) | Stack técnico, constraints de desarrollo y decisiones pendientes |
| [brevo.md](./brevo.md) | **Modelo de datos de Brevo: listas, atributos, flujo de registro y qué dispara los flujos automáticos** |
| [design-system.md](./design-system.md) | Tokens, tipografía, colores, animación y reglas de uso del design system |
| [landing-reference.html](./landing-reference.html) | Diseño completo de la landing en HTML estático — referencia visual para implementar en Astro |
| [pendientes.md](./pendientes.md) | Ítems sin resolver para finalizar la página antes del lanzamiento (assets, env vars, QA) |

## Contexto del proyecto

- **Curso:** IA para Todos · Cohorte 3
- **Fechas:** Sábados 19 sep · 26 sep · 3 oct · 10 oct 2026
- **Lugar:** Cotecnova · Cartago, Valle del Cauca
- **Cupos:** 12 (presencial, sin transmisión virtual)
- **Stack:** Vercel (hosting) + Brevo (registro y nutrición) — Luma deprecado
- **Listas Brevo:** tres clases — prospectos (`IAT | Prospectos`, ID 11, donde escribe el formulario), cohorte (`IAT-C3 | Estudiantes` ID 13, `IAT-C1/C2 | Graduados` ID 15/16) y alumni (`IAT | Alumnis`, ID 14). El paso de prospectos a la lista de cohorte lo hace la skill `confirm-pago` al confirmar el pago, no la landing. Detalle completo en [brevo.md](./brevo.md)
- 🔴 **`IAT-C4 | Estudiantes` no existe todavía** — sin ella la landing cuenta cero cupos de Cohorte 4. Ver [brevo.md](./brevo.md#conteo-de-cupos-y-el-id-de-la-lista-de-estudiantes)
- **Precios:** Pioneros $400k → Early Bird $460k → General $540k → ancla $600k (tachado)
- **Ventana de marketing:** 29 ago – 17 sep 2026
- **Deadline de construcción:** 5 sep 2026
