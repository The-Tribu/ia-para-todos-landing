# Estrategia de Marketing — IA para Todos Cohorte 3

## Contexto

| Campo | Valor |
|-------|-------|
| Curso | IA para Todos · Cohorte 3 |
| Inicio | Sábado 19 de septiembre de 2026 |
| Fechas | 19 sep · 26 sep · 3 oct · 10 oct 2026 |
| Lugar | Cotecnova · Cartago, Valle del Cauca |
| Modalidad | Presencial |
| Cupos totales | 12 |
| Precios | Pioneros $400,000 (4 cupos) → Early Bird $460,000 (6 cupos) → General $540,000 (2 cupos) → ancla $600,000 (tachado, no se vende) |
| Ventana de marketing | 29 ago – 17 sep 2026 |
| Hosting landing | Vercel |
| Registro | Formulario propio en landing → Brevo (estado "pendiente por pagar") → pago → WhatsApp si se traba |

## Lo que cambia respecto a Cohorte 2

**Luma queda deprecado.** La landing page (Vercel) no es un paso intermedio — es donde vive el formulario de registro. Brevo controla el ciclo completo: captura el registro directo desde la landing, asigna el estado "pendiente por pagar" y dispara la secuencia de nutrición.

## Flujo completo

```
[REEL DOLOR]      [TESTIMONIO]         [OFERTA DIRECTA]
   Etapa 1     →      Etapa 2      →       Etapa 3
   Fría                Tibia                Caliente
                         │                     │
                         ▼                     ▼
                  ┌─────────────────────────────────┐
                  │    LANDING PAGE (Vercel)          │
                  │    formulario propio de registro  │
                  └─────────────────────────────────┘
                         │
                         ▼
                  Brevo — estado: pendiente por pagar
                         │
                         ▼
              ┌──────────────────────────┐
              │   Secuencia Brevo         │
              │   (5 correos, 5 días)     │
              └──────────────────────────┘
                         │
              ┌──────────┴───────────┐
              ▼                      ▼
         Paga solo             Se traba →
         (marcar en Brevo)     WhatsApp → Jorge cierra
```

## El Funnel — 3 Etapas (Meta Ads)

### Etapa 1 — Audiencia Fría
- **Objetivo Meta:** Reproducciones de video
- **Quién:** Profesionales 25–50 años en Cartago y zona de influencia (Pereira, Armenia, Manizales)
- **Qué hace:** Golpea un dolor específico sin mencionar el curso. Objetivo: "esto me está pasando a mí"
- **Trigger para Etapa 2:** Meta captura quienes vieron 50%+ del video

### Etapa 2 — Audiencia Tibia
- **Objetivo Meta:** Tráfico → Landing Page
- **Quién:** Personas que vieron 50%+ del video de Etapa 1
- **Qué hace:** Testimonio real de un profesional no-tech (Felipe Gómez Ospina, Folcol)
- **CTA:** "Mirá el programa completo y reservá tu lugar" → Landing page
- **Trigger para Etapa 3:** Quienes pasan 75%+ del video o interactúan con la landing

### Etapa 3 — Audiencia Caliente
- **Objetivo Meta:** Mensaje por WhatsApp + retarget a Landing
- **Quién:** Personas que ya vieron las etapas anteriores y visitaron la landing sin registrarse
- **Qué hace:** Oferta directa con urgencia real (cupo físico limitado en Cotecnova)
- **CTA:** Botón de WhatsApp → Jorge resuelve objeción → dirige a la landing para completar el registro

## Secuencia de Nutrición — Brevo (5 correos)

Se activa automáticamente cuando alguien completa el formulario con estado "pendiente por pagar".

| # | Cuándo | Objetivo | Contenido |
|---|--------|----------|-----------|
| 1 | Inmediato | Confirmar reserva | Nivel de precio asignado + instrucciones de pago (BreB 305 266 6114, Bold, efectivo) |
| 2 | +24h si no ha pagado | Recordatorio suave | "Tu cupo sigue reservado, pero el nivel puede subir si no confirmas" |
| 3 | +48–72h | Urgencia real | Cupos restantes en su nivel + días para el 19 sep |
| 4 | +4–5 días | Objeción directa | Responde la duda más común con un testimonio de alguien en situación similar |
| 5 | 48h antes del cierre | Último aviso | Cupo se libera si no confirma — última oportunidad |

**Regla operativa:** quien responda un correo con una duda real se saca de la automatización y pasa a WhatsApp directo con Jorge.

## Outreach Directo — 39 prospectos activos

Prioridad de contacto:
1. Interés explícito en Cohorte 3: Juan Rojas, Aura María Pelaez Arias, Andrea Salazar, Natalia Álvarez, Dairon Ochoa
2. Registro previo en Luma pendiente de aprobación: Liliana Aldana, Lina Etayo, Douglas Berrio
3. Resto de la lista — outreach general antes de abrir venta pública

**Acción:** contactar por WhatsApp esta semana, ofreciendo ticket Pioneros antes del lanzamiento público.

## Plan de Producción

| Pieza | Fecha límite | Depende de |
|-------|-------------|------------|
| Landing page (copy + maquetación + deploy en Vercel) | 5 sep 2026 | Formulario embebido de Brevo |
| Secuencia de correo Brevo (5 correos) | 5 sep 2026 | — |
| Reels de dolor (Etapa 1) | 3 sep 2026 | — |
| Edición video vertical Felipe Gómez (Etapa 2) | 5 sep 2026 | Video ya grabado — solo edición |
| Post de oferta directa (Etapa 3) | 5 sep 2026 | — |
| Outreach directo a 39 prospectos | 29 ago en adelante | — |
| Lanzamiento funnel pagado | 8 sep 2026 | Landing + secuencia de correo listas |
| Ventana de venta activa | 8–17 sep 2026 | — |
