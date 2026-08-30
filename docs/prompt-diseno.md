# Prompt de Diseño — Landing Page IA para Todos Cohorte 3

Versión ejecutable para Claude Design. Especifica qué debe lograr cada bloque, qué elementos son obligatorios, el copy exacto y cómo componerse.

> Este documento es el entregable de diseño. `landing-estructura.md` es la referencia de estrategia (por qué cada decisión existe). Si cambia el copy, cambia primero en `landing-estructura.md` y luego se propaga aquí.

---

**Contexto:** landing page de una sola vista para un curso presencial de IA dictado en Cartago, Valle del Cauca. Público: profesionales de 28-48 años, no programadores, que ya usan IA de forma básica pero sienten que no le sacan provecho. Objetivo único: que la persona llene el formulario de registro. No hay página secundaria ni redirección externa.

## Directrices globales

**Estructura:** scroll vertical continuo de 11 bloques. Todo CTA hace scroll suave al formulario del bloque 11 — ningún botón saca al usuario de la página.

**Prioridad mobile:** la mayoría del tráfico llega desde Meta Ads en móvil. Diseñar primero para una mano: CTAs alcanzables con el pulgar, formulario usable sin zoom, carga rápida.

**Tono:** directo, sin jerga de marketing, sin promesas exageradas. La persona ya desconfía de cursos de IA que prometen mucho.

---

## Bloque 1 — Hero

**Qué debe lograr:** que la persona se reconozca en la primera línea y entienda el formato en menos de 5 segundos.

**Elementos obligatorios:**
- Headline como el elemento de mayor peso visual de toda la página
- Subheadline con los tres datos de encuadre (formato, duración, requisito)
- Un solo botón, texto corto
- Elemento visual de respaldo: foto real del salón de Cotecnova o de un grupo de cohorte anterior — nunca imagen de stock

**Copy exacto:**
- Headline: *"La usas. Pero sientes que no le sacas todo el jugo."*
- Subheadline: *"4 sábados presenciales en Cartago · 12 horas · Sin necesitar saber programar"*
- Botón: *"Reserva tu cupo"*

**Composición:** el headline debe respirar — espacio generoso alrededor, sin elementos que compitan por atención. La foto va como soporte, no como protagonista. Sin gradientes decorativos ni formas abstractas.

**Comportamiento:** el botón hace scroll suave al bloque 11.

---

## Bloque 2 — Barra de prueba social

**Qué debe lograr:** validar el curso con una cifra concreta antes de que la persona empiece a leer argumentos.

**Elementos obligatorios:**
- Franja horizontal delgada, inmediatamente debajo del hero
- Una sola cifra, sin párrafos de acompañamiento
- Sin imágenes ni logos

**Copy exacto:** *"+23 profesionales ya se graduaron"*

**Composición:** altura mínima — es un elemento de transición, no una sección.

---

## Bloque 3 — Agitación del problema

**Qué debe lograr:** que la persona sienta que alguien está describiendo su día exacto. Bloque de transición emocional — sin botón, sin mención al curso.

**Elementos obligatorios:**
- Un **diagrama circular** como pieza central — no texto corrido
- 4 nodos sobre el perímetro del círculo, unidos por flechas en un solo sentido
- La flecha de retorno lleva su propia etiqueta
- Una línea de texto en el **centro** del círculo
- Una línea de texto **por fuera** del círculo
- Una línea de cierre debajo del diagrama, visualmente diferenciada
- Sin fotos de personas, sin íconos decorativos, sin ilustración adicional

**Copy exacto — cada texto va en la posición indicada:**

| Posición | Texto |
|----------|-------|
| Nodos del perímetro, en orden | `Abres el chat` → `Preguntas` → `Copias` → `Pegas` |
| Etiqueta de la flecha de retorno (de "Pegas" a "Abres el chat") | *mañana, otra vez* |
| Centro del círculo | **Nadie te enseñó a exigirle más de una respuesta suelta.** |
| Fuera del círculo | *Otros, en tu mismo trabajo y con la misma herramienta, ya lo automatizaron.* |

Cierre debajo del diagrama, como cita destacada: *"La uso, pero no le saco todo el jugo"* — con atribución en texto pequeño: "la frase que más repiten los profesionales antes de tomar este curso".

**Composición:** el reparto no es decorativo — el perímetro es la trampa, el centro sostiene la causa, la línea de los otros va literalmente por fuera. No mover un texto de posición. El bloque debe sentirse como una pausa en el scroll. Nunca robots, cerebros digitales ni metáforas genéricas de IA.

**Comportamiento:**
- **Móvil:** fallback explícito — los pasos pasan a una fila compacta de chips con flechas, el texto del centro baja a línea normal debajo, la línea de los otros queda al final. No encoger el círculo hasta que el texto sea ilegible, no convertir los pasos en lista vertical (perdería el efecto de ciclo).
- **Animación (opcional):** un recorrido sutil de los pasos al entrar en viewport — una sola pasada, nunca loop infinito. Respetar `prefers-reduced-motion`.

---

## Bloque 4 — La transformación

**Qué debe lograr:** que la persona vea a alguien con su mismo cargo logrando un resultado medible.

**Elementos obligatorios:**
- Tres tarjetas en fila, apiladas en móvil, una por caso
- Cada tarjeta: **avatar con el rostro real del estudiante** + nombre + cargo + una sola línea de resultado con número
- **Nunca ilustraciones, iniciales, siluetas ni avatares genéricos** — el propósito del rostro es que se entienda que esta gente existe

**Contenido de las tarjetas:**

| Nombre | Cargo | Resultado |
|--------|-------|-----------|
| Felipe Gómez | Gerente General, Folcol | Sistema MRP construido en 3 horas — eliminó el trabajo manual que le tomaba toda la mañana |
| Saray Foronda | Asistente de facturación | Reporte de conciliación de cartera: de un día completo a 2 minutos |
| Vanessa Colorado | Contadora pública | Sistema de retención en la fuente que detectó 2 errores reales que llevaban tiempo pasando |

**Composición:** el resultado debe ser el elemento de mayor peso dentro de cada tarjeta. El avatar va pequeño y circular, junto al nombre — es verificación, no protagonista. Las tres fotos con el mismo tratamiento. La tarjeta de Vanessa puede llevar nota adicional de menor jerarquía: *"empezó el curso diciendo 'no tengo ni idea de cómo funciona'"*.

**Comportamiento:** el avatar no se enlaza a ningún perfil externo.

---

## Bloque 5 — Quién enseña

**Qué debe lograr:** que la persona confíe en que no la van a hacer sentir bruta.

**Elementos obligatorios:**
- Foto profesional de Jorge Olarte
- Dos párrafos cortos (ver copy exacto — no reordenar)
- Las credenciales como línea escaneable independiente, fuera de la prosa
- Mención del podcast y newsletter como respaldo editorial al pie

**Copy exacto:**

> Estudié esto formalmente, antes de que fuera tendencia. Máster en Ingeniería de Software y especialización en ingeniería de IA — cuando explico por qué la IA alucina o qué es un token, no lo digo de oídas.
>
> Pero lo que hace que este curso funcione no es eso. Es que llevo años enseñándole a profesionales no técnicos: sé qué omitir, cómo traducir lo complejo a lo que de verdad importa, y cómo lograr que un abogado, un contador o un diseñador salga con algo que pueda usar el lunes.

Línea de credenciales:
`Máster en Ingeniería de Software · U. Pontificia de Salamanca` · `AI Engineering Specialization · ByteByteGo, 2026` · `Fundador de The Tribu`

**Restricciones de copy:** no reordenar los párrafos. No presentar The Tribu como marca comercial aparte. Si se enlaza al podcast, debe ser un enlace de referencia discreto, nunca un CTA.

**Composición:** dos columnas (foto + texto), apilado en móvil. La línea de credenciales va subordinada a los párrafos.

---

## Bloque 6 — Qué incluye

**Qué debe lograr:** hacer tangible el valor de lo que se recibe, en formato escaneable.

**Elementos obligatorios:**
- Lista vertical de una sola columna — no grid, no tarjetas. Seis filas.
- Cada fila: **ícono + título corto + una línea de detalle**. Sin párrafos.
- Los íconos alineados en una columna fija a la izquierda, todos del mismo set y peso visual

**Contenido:**

| Beneficio | Detalle |
|-----------|---------|
| Formación práctica | 12 horas · 4 sábados · 9:00 AM – 12:00 PM |
| Claude Pro | Acceso durante todo el programa (~$86,000 COP de valor) |
| Proyecto final | Personalizado a la profesión del estudiante |
| Certificado | Certificado virtual — *Inteligencia Artificial Aplicada al Trabajo Profesional* · apto para LinkedIn |
| Comunidad | Grupo privado de WhatsApp con acceso directo al instructor |
| Recursos | Materiales y recursos de por vida |

**Composición:** lista vertical en desktop y móvil — el layout no cambia entre breakpoints. El ítem de "Proyecto final" es el diferenciador más fuerte — puede recibir jerarquía ligeramente mayor.

**Comportamiento:** en móvil el detalle puede envolverse debajo del título, pero el ícono se mantiene alineado con la primera línea, nunca centrado sobre el bloque de texto.

---

## Bloque 7 — Testimonio

**Qué debe lograr:** cerrar la brecha de credibilidad con una persona real, con nombre y cargo verificables.

**Elementos obligatorios:**
- Video vertical embebido (9:16) como elemento principal
- Nombre, cargo y empresa visibles junto al video
- Cita ancla en texto, para quienes no reproducen el video

**Contenido:**
- Video: Felipe Gómez Ospina, Gerente General de Folcol Ltda.
- Cita ancla: *"Más que tiempo es el enfoque que a uno le puede ahorrar esta herramienta."*

**Composición:** el video en formato vertical es el protagonista — no recortarlo a horizontal. La cita va al lado (desktop) o debajo (móvil).

**Comportamiento:** el video no se autoreproducirá con sonido. Miniatura con botón de play.

---

## Bloque 8 — Logística

**Qué debe lograr:** eliminar la fricción específica de un curso presencial — "dónde queda" y "cómo llego" son objeciones reales.

**Elementos obligatorios:**
- Mapa embebido o captura de ubicación de Cotecnova, Cartago, Valle del Cauca
- Dirección exacta en texto seleccionable
- Lista corta de logística práctica

**Contenido:**
- Fechas: sábados 19 y 26 de septiembre, 3 y 10 de octubre de 2026
- Horario: 9:00 AM – 12:00 PM
- Qué llevar: computador portátil (requisito para los ejercicios prácticos)

**Composición:** mapa a un lado, datos al otro (apilado en móvil). Las fechas deben poder leerse de un vistazo.

---

## Bloque 9 — Precio y escasez

**Qué debe lograr:** presentar la estructura de precios con ancla de valor real y urgencia genuina — el cupo es físico y limitado, no un truco de marketing.

**Elementos obligatorios:**
- Tabla o cards de 3 niveles de precio + precio de referencia tachado
- Indicación visible de cupos por nivel
- Copy de escasez anclado en el límite físico del salón

**Contenido:**

| Nivel | Precio | Cupos |
|-------|--------|-------|
| Pioneros | $400,000 COP | 4 cupos |
| Early Bird | $460,000 COP | 6 cupos |
| General | $540,000 COP | 2 cupos |
| ~~Precio de referencia~~ | ~~$600,000 COP~~ | ancla — no se vende a este nivel |

**Copy de escasez:** *"12 cupos totales — presencial, sin transmisión virtual. Cuando se acaban las sillas de Cotecnova, se acaban los cupos."*

**Composición:** el nivel vigente debe estar visualmente destacado. El precio de referencia tachado debe leerse como ancla, no como opción disponible. Si el desarrollo lo permite, incluir contador de cupos restantes.

---

## Bloque 10 — FAQ

**Qué debe lograr:** resolver las objeciones que bloquean el registro antes de que la persona llegue al formulario.

**Elementos obligatorios:** acordeón de 6 preguntas, todas cerradas por defecto.

**Contenido:**

1. *"No sé nada de tecnología, ¿igual me sirve?"* — Sí. El curso está diseñado para personas que no programan, y ese es el punto de partida, no una excepción.
2. *"Ya uso ChatGPT de vez en cuando, ¿para qué pagar un curso?"* — El curso no repite lo que ya sabes, parte de ahí. La diferencia es el proyecto final: se construye sobre tu tarea repetitiva real, no sobre un ejemplo genérico. Lo que cambia no es si usas IA, sino si la IA te está ahorrando horas de verdad.
3. *"No tengo tiempo."* — Son 12 horas totales, repartidas en 4 sábados de mañana.
4. *"¿Sirve si no soy programador?"* — Sí. El enfoque es criterio y flujo de trabajo, no código.
5. *"¿Qué necesito llevar?"* — Computador portátil, nada más.
6. *"¿Cómo pago?"* — BreB, Bold o efectivo, una vez confirmado el registro.

**Composición:** una sola columna, ancho de lectura cómodo. Las dos primeras preguntas cubren las dos objeciones de entrada más frecuentes — deben ir en ese orden.

---

## Bloque 11 — CTA final y formulario

**Qué debe lograr:** capturar el registro sin fricción, repitiendo la promesa y la fecha límite.

**Elementos obligatorios:**
- Copy de cierre con fecha de inicio y cupos restantes
- Formulario embebido en la misma página — no hay página de registro separada
- Botón de envío con texto de acción

**Copy exacto:** *"Empezamos el 19 de septiembre. Quedan [N] cupos Pioneros a $400,000."*

**Campos del formulario:**
- Nombre completo
- Email
- Teléfono / WhatsApp
- Profesión

**Composición:** el formulario debe caber en una pantalla de móvil sin scroll interno. Cuatro campos, etiquetas visibles, sin campos opcionales. El botón de envío ocupa el ancho completo en móvil.

**Comportamiento:** al enviarse, crea el contacto en Brevo con estado "pendiente por pagar" y dispara la secuencia de 5 correos. Mostrar confirmación en la misma página tras el envío — no redirigir a una página de gracias.

---

## Notas para desarrollo

- **Stack:** Vercel (hosting) + formulario de Brevo, embebido o vía API
- **Sin fugas de atención:** ningún enlace saca al usuario de la landing antes de llegar al formulario
- **Deadline construcción:** 29 ago – 5 sep 2026
