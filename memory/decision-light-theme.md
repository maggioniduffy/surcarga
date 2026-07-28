---
name: decision-light-theme
description: Dark-only was reversed on 2026-07-28 — there is now an opt-in light theme (dark still the default) and the decorative ES/EN toggle was removed.
metadata:
  type: project
---

Two reversals, both at the user's direction on 2026-07-28:

- **Light theme added.** `ui-context.md` had said "dark-only, no light/dark toggle. Do not
  implement toggle logic unless explicitly requested" — it was then explicitly requested.
  [[decision-app-screens-design-source]] had also listed the artifacts' theme switch as
  deliberately dropped; that bullet is now corrected there.
- **ES/EN toggle removed** from the landing header. It was decorative — no English
  dictionary ever existed behind it — and it advertised a capability the product doesn't
  have. `landing.header.locales` is deleted.

The light palette is imported from the same Claude Design project as the screens
(`2d54966f-337b-409e-8ee7-171401eb61f1`); all seven `.dc.html` files carry an identical
`#app-root[data-theme="light"]` block, which maps onto the project's token names.

**Why:** Dark stays the *default* (an unset preference renders dark, and the theme
deliberately does not follow `prefers-color-scheme`) because the industrial, high-contrast
direction is the brand. Light is an accommodation, not a co-equal mode.

**How to apply:**

- Only the **surface, line and ink scales plus `--color-topo-line`** are themed — light in
  `:root`, dark in `.dark`. Brand, the warm empresa/brand surfaces, and the status and
  route colors are **fixed**: the designs pin them, so a warm panel or a status chip stays
  dark-on-light and reads as an accent block.
- Any container with a fixed dark fill must carry **`on-dark-panel`**. Forgetting it is the
  failure mode: it produced every light-mode bug in this work (`WarningNote`, and the
  pricing banner + `FreeCard` dark→light gradients).
- **`on-dark-panel` must do three things, not one.** Re-declaring the surface/line/ink
  scales is necessary but not sufficient for a panel nested inside a light page:
  1. Re-declare the scales (it shares a rule body with `.dark`).
  2. Re-declare the **shadcn aliases** (`--foreground`, `--card`, `--border`, …). They are
     declared on `:root` as `var(--color-ink)` etc., and custom properties resolve where
     they are *declared* — so they already computed against the light scale and do **not**
     recompute in a nested block. `.dark` never hits this because it sits on `<html>`, the
     same element as `:root`. `border-border` on the base-layer `*` selector makes it show
     up on borders too.
  3. Set **`color`** directly, because text with no colour utility inherits from `<body>`
     — i.e. light-mode ink. This was the visible bug: `<dd className="m-0 text-right">`,
     the fee figure and "Total a pagar hoy" all render dark-on-dark without it. The source
     designs sidestepped this by hardcoding `color:#e8e8ee` on every such panel.
- Ink on a brand-orange fill is **`--color-on-brand`** (near-black, fixed), never
  `text-surface-base` — that token flips to off-white.
- The `dark` class is set by a synchronous inline script in `<head>` (`src/lib/theme.ts`,
  key `surcarga-theme`) per
  `next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`; `<html>` carries
  `suppressHydrationWarning` and `ThemeProvider`'s lazy initializer reads back the class the
  script set. Don't switch this to `useEffect` — it reintroduces the flash.
