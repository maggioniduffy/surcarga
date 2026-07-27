# UI Context

## Theme
Dark-only, no light/dark toggle. The product's tone is industrial and operational — logistics for oilfield operations, not a consumer lifestyle app — and the confirmed visual direction (near-black background, vibrant orange accents, styled regional map) is modeled on Vaquia, an HSE platform for Vaca Muerta with the same dark, high-contrast aesthetic. Do not implement toggle logic unless explicitly requested.

## Content Language
The UI language is Spanish (Argentina) — all copy the user sees (labels, buttons, form fields, status names, error messages, marketing content) must be written in Spanish. All code identifiers (variables, functions, component names, database columns, route segments) are English camelCase, regardless of the UI language. Copy must live in dedicated content/dictionary files (e.g. `content/es.ts` or `lib/i18n/es.json`), never hardcoded inline inside components — this keeps the two languages cleanly separated and makes future localization possible without touching component logic.

## Typography

| Role | Font | CSS Variable |
|---|---|---|
| Display / Headings | Archivo (condensed, bold weights) | `--font-display` |
| Body / UI text | IBM Plex Sans | `--font-body` |

Both loaded via `next/font/google`. This matches the pairing already used across the delivered screen designs (Landing, Dashboard, Buscar Camiones, Detalle Viaje, Publicar Carga, Publicar Viaje).

## Border Radius

| Context | Class |
|---|---|
| Pills / status badges | `rounded-full` |
| Buttons, inputs, small controls | `rounded-lg` (~9–10px) |
| Cards, panels | `rounded-2xl` (~14–16px) |
| Avatars / icon circles | `rounded-full` |

Values inferred from the delivered `.dc.html` screens (observed radii cluster at 6–10px for controls and 12–16px for cards).

## Status & Availability Color System
Core visual categorization is listing status and route/availability density, observed consistently across the delivered screens (Publicado, Urgente, Destacada badges; green/yellow/orange density coding on map routes). Dim background + saturated text, per dark-theme convention — never a solid fill with white text.

| Status / Category | Background | Text |
|---|---|---|
| Publicado | Dim green (`--color-status-published-bg`) | Saturated green (`--color-status-published-text`) |
| Confirmado | Dim green (`--color-status-confirmed-bg`) | Saturated green (`--color-status-confirmed-text`) |
| Pendiente | Dim yellow (`--color-status-pending-bg`) | Saturated yellow (`--color-status-pending-text`) |
| Urgente | Dim orange/red (`--color-status-urgent-bg`) | Saturated orange/red (`--color-status-urgent-text`) |
| Destacada | Dim brand-orange (`--color-status-featured-bg`) | Saturated orange (`--color-status-featured-text`), brand accent `#FF5A1F` family |
| Alta disponibilidad (route density) | — | Green line |
| Media disponibilidad (route density) | — | Yellow line |
| Baja disponibilidad (route density) | — | Orange line |

Exact hex values should be pulled into CSS variables from the delivered design files rather than re-guessed (brand orange observed at `#FF5A1F` / hover `#FF7038`).

## Component Library
shadcn/ui. Components live in `components/ui/` and are treated as generated/vendored — not hand-rolled from scratch. Domain-specific composition happens in `components/{domain}/`, building on top of the primitives rather than modifying them (see code-standards.md and ai-workflow-rules.md for the protected-component rule).

## Layout Patterns
- Public marketing landing: hero, "how it works," role-split call-to-action (Empresa vs. Transportista).
- Search/browse grid with filter sidebar (Buscar Camiones / cargas listing).
- Detail page combining a map view with a side info panel (Detalle Viaje).
- Two-column publishing form with a location picker tied to the map/catalog (Publicar Carga, Publicar Viaje).
- Role-differentiated dashboard (tabbed or split view distinguishing empresa vs. transportista data).
- Auth / onboarding flow (sign up with role selection, sign in).

## Motion
Lightweight CSS transitions (or Framer Motion if interaction complexity warrants it) at roughly 150–250ms for hover/press/panel states. Respect `prefers-reduced-motion`: fall back to instant state changes with no transform/opacity animation.

## Icons
`lucide-react`, sized on a 16 / 20 / 24px scale depending on context (inline text icons at 16px, standalone UI icons at 20–24px).
