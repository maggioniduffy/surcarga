# UI Context

## Theme
**Dark-first with an opt-in light theme.** The product's tone is industrial and operational — logistics for oilfield operations, not a consumer lifestyle app — and the primary visual direction (near-black background, vibrant orange accents, styled regional map) is modeled on Vaquia, an HSE platform for Vaca Muerta with the same dark, high-contrast aesthetic. Dark stays the default: an unset preference renders dark, and the theme does **not** follow `prefers-color-scheme`.

Light is a warm off-white palette (`#f7f6f2` canvas, white panels) taken from the delivered `.dc.html` screens, which all shipped the same toggle. Mechanics:

- `.dark` on `<html>` selects the dark scale; its absence selects light. The class is set by a synchronous inline script in `<head>` (`src/lib/theme.ts`) so a stored light preference never flashes the dark server-rendered markup — the pattern documented in `next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`.
- The preference persists to `localStorage` under `surcarga-theme`. `ThemeProvider` (`components/theme/`) holds the React state; `ThemeToggle` sits in both the landing header and the app header.

**What flips and what doesn't.** Only the Surface, Border and Ink scales plus `--color-topo-line` are themed. Brand orange, the warm empresa/brand surfaces, and the status and route colors are **fixed** — identical in both themes — because the source designs pin them: a warm panel or a status chip stays dark-on-light so it reads as an accent block.

Any container with a fixed dark fill must carry the `on-dark-panel` class, which re-declares the dark Surface/Border/Ink scale locally so nested `text-ink-*` and `border-line-*` utilities stay legible in light mode. `CardPanel`'s `warm`, `warning` and `published` tones apply it automatically.

Text sitting on a brand-orange fill uses `--color-on-brand` (near-black, fixed) — never `--color-surface-base`, which flips to off-white.

## Content Language
Spanish only — there is no locale switcher. The landing header's ES/EN control was carried over from the design artifacts and removed on 2026-07-28; it was decorative (no English dictionary exists behind it) and advertised a capability the product doesn't have.

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

Exact hex values are defined in `src/app/globals.css` and pulled from the delivered design files rather than re-guessed (brand orange `#FF5A1F` / hover `#FF7038`). Route density resolves to `--color-route-high` `#2ecc71`, `--color-route-medium` `#f0c419`, `--color-route-low` `#FF5A1F`.

## Surface, Border, and Ink Scales

Beyond the status colors, the theme defines three ordered scales in `globals.css`. Use these instead of ad hoc greys or `bg-zinc-*` utilities; shadcn's `--background`/`--foreground`/`--card`/`--border`/`--muted-foreground` alias into them.

These three scales are the themed ones — the hex values below are the dark scale, held in the `.dark` block; `:root` holds the light counterparts (canvas `#f7f6f2`, panels `#ffffff`, primary ink `#17171d`, default card edge `#e6e2d9`). The warm variants listed under Surface and Border are **not** themed and keep their dark values in both.

| Scale | Tokens (light → deep / faint → strong) |
|---|---|
| Surface | `--color-surface-base` `#0a0a0f` (page canvas), `-sunken` `#0d0d14`, `-panel` `#101017` (cards), `-raised` `#16161f`, `-control` `#1e1e28`; warm variants `-warm` `#12100f`, `-warm-raised` `#1b1108`, `-warm-featured` `#12111a` for empresa/brand-side panels |
| Border | `--color-line-faint` `#14141c` (section rules), `-subtle` `#1c1c26`, `--color-line` `#23232e` (default card edge), `-raised` `#2a2a38`, `-control` `#2f2f3d`, `-control-hover` `#4a4a5c`; warm `-warm` `#33241c`, `-warm-raised` `#4a2a18` |
| Ink | `--color-ink` `#e8e8ee` (primary), `-strong` `#d7d7e0`, `-muted` `#c9c9d6`, `-subtle` `#9a9aab` (body copy), `-faint` `#71718a`, `-dim` `#6b6b80`, `-ghost` `#5f5f76` (metadata) |

`--color-topo-line` `#2b3c5c` is reserved for the decorative contour-line SVG backgrounds.

## Landing Design Language

Established by the landing page port (see `memory/decision-landing-design-source.md`) and the reference for any new public-facing surface:

- **Section rhythm** — `py-[110px] px-8`, `border-t border-line-faint`, inner column capped at `1240px` (`920px` for text-heavy sections like the FAQ).
- **Section headers** — an uppercase eyebrow at `11.5px` / `tracking-[0.2em]` in brand orange (or `--color-ink-faint` for secondary sections), followed by an Archivo heading at `clamp(2rem,5vw,52px)`, `font-extrabold`, `leading-[1.02]`, `tracking-[-0.035em]`.
- **Display type** — Archivo carries heavy weights (800/900) with tight negative tracking; the hero runs `clamp(3rem,9vw,100px)` at `leading-[0.92]`. Body copy is IBM Plex Sans at `14.5–18.5px`, `leading-[1.6]`, in `--color-ink-subtle`.
- **Decorative backgrounds** — layered contour-line SVGs (`components/landing/topo-lines.tsx`) in three variants (`hero`, `band`, `inverted`), plus a radial brand glow behind the hero headline. Always `pointer-events-none` and `aria-hidden`.
- **Inverted blocks** — the final CTA flips to a solid `--color-brand` panel with near-black type, using hand-picked deep-orange shades for its eyebrow and body copy.

## Component Library
shadcn/ui. Components live in `components/ui/` and are treated as generated/vendored — not hand-rolled from scratch. Domain-specific composition happens in `components/{domain}/`, building on top of the primitives rather than modifying them (see code-standards.md and ai-workflow-rules.md for the protected-component rule).

## Layout Patterns
- Public marketing landing (built): header, hero with stat row, problema (3 cards), cómo funciona (two role columns with numbered steps), funcionalidades grid (6 cards), mapa de cobertura (schematic SVG + listing/corridor side panel), testimonios, precios (free-transportista banner + two empresa tiers), FAQ accordion, inverted CTA block, four-column footer.
- Search/browse grid with filter sidebar (Buscar Camiones / cargas listing).
- Detail page combining a map view with a side info panel (Detalle Viaje).
- Two-column publishing form with a location picker tied to the map/catalog (Publicar Carga, Publicar Viaje).
- Role-differentiated dashboard (tabbed or split view distinguishing empresa vs. transportista data).
- Auth / onboarding flow (sign up with role selection, sign in).

## Motion
Lightweight CSS transitions (or Framer Motion if interaction complexity warrants it) at roughly 150–250ms for hover/press/panel states. Respect `prefers-reduced-motion`: fall back to instant state changes with no transform/opacity animation.

## Icons
`lucide-react`, sized on a 16 / 20 / 24px scale depending on context (inline text icons at 16px, standalone UI icons at 20–24px).
