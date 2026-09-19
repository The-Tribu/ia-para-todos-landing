# Brevo — modelo de datos, listas y flujo de registro

Documento de referencia para el lado Brevo de la landing: qué escribe el código, cómo están
organizadas las listas y qué dispara los flujos automáticos.

> **Este repo no es la fuente de verdad del modelo de datos de Brevo.** El documento canónico es
> `skills/_shared/brevo-modelo-de-datos.md`, en el second brain (The Tribu Obsidian Wiki), donde la
> lógica se consolidó el 2026-09-18. Lo de acá es lo que la landing necesita saber para funcionar,
> más lo que se pudo contrastar contra el vault. Cuando los dos difieran, manda el vault — salvo en
> lo que describe el comportamiento del código de este repo, que se verifica leyéndolo.

---

## Las tres clases de lista

Las listas de Brevo no son categorías sueltas: hay **tres tipos**, y cada uno se comporta distinto.

| Tipo | Listas | Qué significa estar ahí |
|------|--------|-------------------------|
| **Prospectos** | `11 — IAT \| Prospectos` | No ha pagado. Definida **por estado, no por cohorte** |
| **Cohorte** | `13 — IAT-C3 \| Estudiantes`, `15 — IAT-C1 \| Graduados`, `16 — IAT-C2 \| Graduados` | Pagó y pertenece a esa cohorte concreta |
| **Alumni** | `14 — IAT \| Alumnis` | Graduado de **cualquier** cohorte (23 contactos: 13 de C1 + 10 de C2) |

La diferencia operativa que importa: **la lista de cohorte segmenta, la de alumni acumula.**

- Al pagar, el contacto **sale** de prospectos y **entra** a la lista de su cohorte.
- Al graduarse, **se le agrega** alumni **sin retirarlo** de la lista de su cohorte. Por eso los de
  C1 están en `[14, 15]` y los de C2 en `[14, 16]`.

**Reglas de exclusividad:**

- Lista 11 (prospectos) y lista de cohorte son **mutuamente excluyentes** — estar en las dos es un
  error de datos.
- Lista de cohorte y lista de alumni **no** son excluyentes — estar en las dos es lo normal.

La lista 11 se renombró el 2026-09-14 (antes `IA Para Todos`); en ese momento se retiraron 31
contactos ya pagados y quedaron 38. Se definió por estado y no por cohorte a propósito, para poder
usarla directo como audiencia de campañas de conversión: es el activo que sobrevive entre ciclos, y
quien se registra después de un cierre se queda ahí.

### 🔴 `IAT-C4 | Estudiantes` todavía no existe

La lista de estudiantes de Cohorte 4 **no está creada** (se intentó el 2026-09-18 y el MCP de Brevo
estaba caído). Va en la misma carpeta que la 13 (`folderId: 1`). **Bloquea la apertura de la venta** —
ver [Conteo de cupos](#conteo-de-cupos-y-el-id-de-la-lista-de-estudiantes), donde explica por qué la
landing cuenta mal sin ella.

---

## Atributos de contacto

Los atributos **siguen vivos y con rol activo**, no son solo para reportería.

| Atributo | Valores | Qué indica |
|----------|---------|------------|
| `ESTADO_PAGO` | `1` prospecto (alta manual) · `2` pendiente por pagar (llegó por el formulario web) · `3` pagado | Estado del pago |
| `COHORTE` | `cohorte-3`, `cohorte-4`, … | A cuál se le asoció **al registrarse** |
| `NIVEL` | `1` Pioneros · `2` Early Bird · `3` General ⚠️ · `4` regalo | Tier de precio asignado |
| `PROFESION` | texto libre | Lo envía el formulario (campo `profesion`) |

La distinción entre `1` y `2` no es de estado comercial sino de **procedencia**: `2` significa "llegó
por el formulario de la web", `1` significa alta manual. Las dos son "no ha pagado".

**La regla dura del modelo:** lista y atributo **deben coincidir siempre**. Una discrepancia es un
error a reportar, no a interpretar — el atributo es el invariante contra el que se valida en qué
lista debería estar un contacto. La skill `sync-prospectos` del second brain tiene una categoría
dedicada a cazar movimientos a medias ("E. Incoherencia lista/atributo").

**Trampa con `COHORTE`:** en un prospecto, ese atributo dice **a cuál cohorte se le asoció cuando se
registró, no a cuál va a entrar.** No sirve para predecir matrícula, y escribirlo preventivamente
ensucia el campo con el que después se segmentan las campañas. Ver el pendiente sobre
`cohorte-5` más abajo.

⚠️ `NIVEL = 3` (General) está **inferido por descarte**: el mapeo `1` / `2` / `4` se dedujo de
contactos reales en el vault, pero no se encontró ningún contacto registrado con `NIVEL = 3`. El
código lo asume. Confirmar antes de darlo por cierto.

⚠️ El vault registra `NIVEL` de dos formas: como números (en los contactos reales) y como strings
(`pioneros` · `early-bird` · `general` · `regalo`, en la definición de
`secuencia-correos-cohorte-3.md`, del 31 de agosto). **El código de la landing escribe números.**

---

## Qué dispara los flujos automáticos

> ### ⚠️ Pendiente de confirmar — cambio de modelo no ingerido
>
> **Según Jorge (19 sep 2026), los flujos automáticos ya no se disparan por cambios de atributo sino
> por cambios de lista.** Ese cambio **no está documentado en ninguna parte del second brain**: no
> hay entrada de log, decisión ni nota que lo registre, ni el problema que resolvía.
>
> Es más: al 19 de septiembre **el vault sigue describiendo el disparo por atributo como el modelo
> vigente**. `wiki/courses/marketing/secuencia-correos-cohorte-3.md` lo dice sin ambigüedad — *"la
> secuencia automática de correos se activa única y exclusivamente cuando `ESTADO_PAGO` cambia a
> `pendiente-por-pagar`. Se detiene cuando cambia a `pagado`"* — pero esa página está en
> `status: draft` con `updated: 2026-08-31`, unas tres semanas atrás, así que es plausible que el
> cambio simplemente no se haya ingerido todavía.
>
> **Lo que falta para cerrar esto, y que nadie debería inventar:**
>
> 1. El **mapeo lista → automation**: qué workflow dispara cada lista, al entrar y al salir. No
>    existe en ninguna página del vault.
> 2. El **motivo** del cambio y qué problema tenía el disparo por atributo.
> 3. Si el cambio vive **enteramente del lado de Brevo** o implica que `/api/register` deba escribir
>    en otra lista o mover el contacto de lista. Hoy el endpoint solo escribe en la 11.
>
> La fuente real para los tres puntos es `skills/_shared/brevo-modelo-de-datos.md`, que vive en el
> vault de origen (la VPS) y no en la copia de solo lectura. Sacarlo de ahí antes de preguntar.

### Lo que sí está documentado sobre automations

La automation conocida es **`IAT-C3 | Secuencia Pendiente por Pagar`**: 5 correos (inmediato, +24 h,
+48–72 h, +4–5 días, y el último ~17 sep). El copy completo está en el vault, en
`wiki/courses/marketing/secuencia-correos-cohorte-3.md`, y resumido en
[estrategia-marketing.md](./estrategia-marketing.md).

Plantillas madre por ID: **29–33** = correos C1–C5 de la secuencia · **34** = Confirmación de Pago
(hoy `IAT-C4 | Confirmación de Pago`) · **42** = Notificación Interna. Se están renombrando de
`IAT-C3 | C1…` a `IAT | P1…` para quitarles la cohorte del nombre (la 30 ya es
`IAT | P1 — Confirmación de Reserva` y la 31 `IAT | P3 — Urgencia Real`).

⚠️ **Pregunta abierta registrada en el vault:** las plantillas `_step_#N` (35–40, 43, 45–51) son
copias que genera Automations; la API las lista pero devuelve `404 document_not_found` al
escribirlas. No se sabe si los envíos salen de las madres o de las copias. **Si salen de las copias,
los correos siguen diciendo "Cohorte 3".**

---

## Flujo de registro (lo que hace este repo)

Todo esto es verificable leyendo `src/pages/api/register.ts` y `src/lib/brevo.ts`.

```
        Formulario (Registration.astro)
                    │  POST /api/register
                    ▼
      ┌─────────────────────────────┐
      │ GET /v3/contacts/{email}    │
      └─────────────────────────────┘
                    │
        ¿ESTADO_PAGO = 3 (ya pagó)?
          │                     │
         sí                    no
          │                     │
          ▼                     ▼
   NO ESCRIBE NADA      getTierStatus() → tier vigente
   yaInscrito: true              │
   "tu cupo ya está             ▼
    confirmado"          POST /v3/contacts (upsert)
                         → lista 11 (Prospectos)
                         → ESTADO_PAGO = 2
                         → COHORTE, NIVEL
                                │
                     ┌──────────┴──────────┐
                     ▼                     ▼
              hay cupo:              sin cupo:
              COHORTE = cohorte-4    COHORTE = cohorte-5 ⚠️
              NIVEL = tier           (sin NIVEL)
              "tu lugar está         "estás en la lista"
               apartado"
```

**Campos del formulario:** nombre completo · email · teléfono/WhatsApp · profesión. El teléfono se
normaliza a `+57` + dígitos en el cliente antes de enviarse.

### La guarda de contacto ya pagado

El endpoint **siempre** busca primero el contacto por email. Si ya tiene `ESTADO_PAGO = 3`, no
escribe **nada** y responde `yaInscrito: true`.

Esa guarda no es defensiva por gusto: sin ella el upsert degradaba a un estudiante pagado a
`ESTADO_PAGO = 2` y lo devolvía a la lista 11, liberando su silla del conteo. **Pasó en producción**
el 2026-09-16 con un estudiante que llenó el formulario después de haber pagado.

> 📌 **Para ingerir al second brain:** `hot.md` todavía tiene esto como pendiente 🔴 abierto ("cualquier
> estudiante pagado que vuelva a tocar el formulario se degrada solo"). **El código ya lo previene** —
> el vault no se enteró.

### La landing nunca escribe en la lista de estudiantes

El endpoint escribe **solo** en la lista 11. La lista de estudiantes se **lee** para contar cupos y
nada más. Mover a alguien de prospectos a su lista de cohorte **no lo hace este repo**.

---

## Cómo se mueve un contacto al pagar

El movimiento está **semi-automatizado, pero fuera de Brevo y fuera de este código**: lo hace la
skill **`confirm-pago`** de Claude Code, que Jorge invoca al confirmar un pago. Desde el 2026-09-18
su paso 2 son tres operaciones más verificación:

1. actualizar `ESTADO_PAGO = 3`
2. **retirar** de la lista 11
3. **agregar** a la lista de su cohorte

> Antes del 2026-09-18 esa skill tenía un bug: retiraba de la 11 pero nunca agregaba a la lista de
> cohorte (le faltaba el permiso `lists_add_contact_to_list`), y el contacto quedaba **sin ninguna
> lista**, invisible para todos los flujos. Ya está corregido. Vale tenerlo presente al auditar
> contactos movidos antes de esa fecha.

**La graduación NO está automatizada.** Ninguna skill agrega a la lista 14 (`IAT | Alumnis`) al
terminar una cohorte: es manual. Cohorte 3 cierra el 10 de octubre de 2026.

---

## Conteo de cupos y el ID de la lista de estudiantes

`getTierStatus()` en `src/lib/brevo.ts` lee la **lista de estudiantes** (nunca la de prospectos) y
cuenta un cupo como ocupado solo cuando se cumplen **las tres** condiciones:

1. el contacto está en la lista de estudiantes (filtro `listIds` de la query), **y**
2. `COHORTE` = el slug de la cohorte vigente (`COHORTE.slug`), **y**
3. `ESTADO_PAGO = 3`.

Los cupos se agrupan por `NIVEL` contra los caps de `TIERS` (Pioneros 4 → Early Bird 6 → General 2).
El primer nivel que no esté lleno es el vigente. `NIVEL = 4` (regalo) **no ocupa cupo**: al contar
solo 1/2/3 queda fuera por construcción.

Si falta `BREVO_API_KEY` o Brevo falla, se devuelve `FALLBACK_TIER_STATUS` sin romper la página. Ese
valor está fijado en código y **debe subirse a mano según avance la venta** — nunca debe anunciar un
nivel ya agotado.

### 🔴 El default `13` va a contar cero cupos en Cohorte 4

`BREVO_STUDENTS_LIST_ID` tiene el default `13` hardcodeado en dos sitios
(`src/pages/index.astro:20` y `src/pages/api/register.ts:17`). **La 13 es `IAT-C3 | Estudiantes`, la
lista de la cohorte 3.**

Al pagar, `confirm-pago` mueve al estudiante **a la lista de su cohorte** — para C4 será
`IAT-C4 | Estudiantes`, que todavía no existe y tendrá un ID nuevo. El contador busca
`en lista 13 AND COHORTE = cohorte-4 AND ESTADO_PAGO = 3`, y esa combinación **no se va a dar nunca**,
porque ningún estudiante de C4 va a entrar a la 13.

**Consecuencia:** la landing se queda mostrando Pioneros con los 4 cupos completos de forma
indefinida, sin avanzar de tier ni agotarse, por más que se venda.

Para resolverlo hacen falta dos cosas, en este orden:

1. **Crear `IAT-C4 | Estudiantes`** en Brevo y anotar su ID. Bloqueante para abrir la venta.
2. **Apuntar `BREVO_STUDENTS_LIST_ID` a ese ID nuevo** en Vercel (y actualizar el default del
   código). Dado que `src/lib/cohorte.ts` es el punto único de verdad de la cohorte, el ID de la
   lista de estudiantes probablemente debería vivir ahí y no como default suelto en dos archivos.

Cohorte 4 arranca el **17 de octubre de 2026**, así que la ventana es de menos de cuatro semanas.

### ⚠️ `COHORTE = cohorte-5` para la lista de espera

Cuando no quedan cupos, el endpoint escribe `COHORTE = COHORTE.siguienteSlug` (`cohorte-5`). La
estrategia documentada en el vault dice otra cosa: quien llega después del cierre *"queda en la lista
11 con `ESTADO_PAGO = 2`, **sin cohorte asignada**"*.

El motivo es la trampa descrita arriba: `COHORTE` en un prospecto significa a cuál se le asoció al
registrarse, así que escribir `cohorte-5` preventivamente ensucia justo el campo con el que se
segmentan las campañas después. **Decisión de Jorge** — no cambiar por cuenta propia.

---

## Variables de entorno

| Variable | Uso | Default |
|----------|-----|---------|
| `BREVO_API_KEY` | Autenticación contra la API de Brevo. Sin ella el formulario devuelve 500 y el tier cae al fallback | — |
| `BREVO_LIST_ID` | Lista de **prospectos** donde escribe el formulario | `11` |
| `BREVO_STUDENTS_LIST_ID` | Lista de **estudiantes** de donde se cuentan los cupos | `13` 🔴 ver arriba |
| `META_PIXEL_ID` | Opcional. El snippet del pixel solo se inyecta si está | — |
| `GA_MEASUREMENT_ID` | Declarada en docs, **aún no cableada en el código** | — |

---

## Resumen de pendientes

| # | Pendiente | Quién lo resuelve |
|---|-----------|-------------------|
| 🔴 | Crear `IAT-C4 \| Estudiantes` y apuntar `BREVO_STUDENTS_LIST_ID` a su ID | Jorge (Brevo) + código |
| ⚠️ | Confirmar el disparo por **cambio de lista**: el vault documenta lo contrario y su fuente es del 31 ago | Jorge |
| ⚠️ | Mapeo **lista → automation** (entrada y salida). No existe en el vault | Jorge / `brevo-modelo-de-datos.md` |
| ⚠️ | Motivo del cambio de atributos a listas | Jorge |
| ⚠️ | Confirmar `NIVEL = 3` = General (inferido por descarte, sin contacto registrado) | Jorge |
| ⚠️ | ¿Las automations envían las plantillas madre o las copias `_step_#N`? Si son las copias, los correos dicen "Cohorte 3" | Jorge |
| ⚠️ | ¿`COHORTE = cohorte-5` en lista de espera, o sin cohorte asignada? | Jorge |
| 📌 | Ingerir al vault que la guarda de `ESTADO_PAGO = 3` ya cierra el pendiente de degradación por upsert | Jorge (second brain) |
| 📌 | Automatizar (o al menos documentar) el paso a `IAT \| Alumnis` al graduar. C3 cierra el 10 oct | Jorge |
