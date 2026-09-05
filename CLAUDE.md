# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # astro dev server
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint      # biome check .
npm run format    # biome format --write .
```

There is no test suite in this repo. `npm run lint` (Biome) is the only automated check — run it before considering a change done.

## What this is

Single-page marketing landing (Astro, server output, deployed on Vercel) for **IA para Todos · Cohorte 3**, a paid in-person course in Cartago, Colombia. Full business context (dates, pricing, funnel, copy) lives in `docs/` — read `docs/README.md` first for the index, `docs/stack.md` for architecture constraints, and `docs/pendientes.md` for known open items before starting work.

## Architecture

**Single page, section components.** `src/pages/index.astro` composes one page out of section components in `src/components/` (`Hero`, `SocialProof`, `CycleDiagram`, `Transformation`, `Instructor`, `Includes`, `Testimonial`, `Logistics`, `Pricing`, `FAQ`, `Registration`, `Footer`), each wrapped by `src/layouts/Layout.astro`. There is no client router — every CTA on the page scrolls to `#registro` (the `Registration` component); nothing links out before the form except one intentional WhatsApp retargeting link.

**Tiered pricing driven by live Brevo data.** `src/lib/brevo.ts` (`getTierStatus`) queries the Brevo Contacts API at request time (`output: "server"`, no prerendering of the index) to count how many paid contacts exist per tier (`pioneros`/`earlyBird`/`general`, capped at 4/6/2) and returns which tier is currently active plus cupos remaining. This result is fetched once in `index.astro` and passed as `tier`/`cuposDisponibles` props into `Hero`, `Pricing`, and `Registration` — those three components must stay in sync on tier logic (tier labels/prices are currently duplicated across `Pricing.astro` and `Registration.astro`; check both when changing pricing). If `BREVO_API_KEY` is missing or the request fails, it silently falls back to tier 1 with default caps rather than erroring — the page must never break due to Brevo being unavailable.

**Registration flow.** `Registration.astro` renders a form with client-side JS (`<script>` in the component, no framework) that POSTs to `src/pages/api/register.ts` (`prerender = false`). That endpoint re-derives the current tier server-side, then upserts the contact into Brevo: if a tier is open, it sets `ESTADO_PAGO=2` (pendiente por pagar) and `COHORTE=cohorte-3`; if all tiers are full, it instead tags the contact `ESTADO_PAGO=1`/`COHORTE=cohorte-4` (waitlist) — the UI shows a different confirmation message for each case. Vercel Analytics custom events (`registration_attempt`, `registration_success`, `registration_error`, `cta_click`) and a Meta Pixel `Lead` event fire from the client script; `META_PIXEL_ID` is optional and the pixel snippet in `Layout.astro` only injects if it's set.

**Env vars** (see `.env.template` / `src/env.d.ts`): `BREVO_API_KEY`, `BREVO_LIST_ID` (required for real tier/pricing data and registration to work), `META_PIXEL_ID` (optional), `GA_MEASUREMENT_ID` (declared in docs, not yet wired into code).

**Design system.** All visual tokens (color, type, spacing, radius, shadow) come from The Tribu Design System — full reference in `docs/design-system.md`, CSS in `src/styles/design-system.css` + `src/styles/global.css`. Dark-first system (`--bg-0` navy `#020617`, magenta/violet accent gradient), but this page runs in light mode (`data-theme="light"` on `<html>`). Components lean heavily on inline `style` attributes for one-off layout alongside `<style>` blocks for reusable/stateful classes — follow the existing per-component pattern rather than introducing a new styling approach. Icons are Lucide (line/stroke only); voice/tone and copy-length rules for any new marketing copy are in `docs/design-system.md` under "Voz y tono".

**Content/copy source of truth.** Exact section-by-section copy lives in `docs/landing-estructura.md`; marketing/funnel rationale is in `docs/estrategia-marketing.md`. When changing on-page copy, check these docs for the approved wording rather than inventing new copy.
