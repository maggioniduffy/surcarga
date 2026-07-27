---
name: open-landing-copy-scope-conflicts
description: Landing copy advertises features and figures that project-overview.md lists as Out Of Scope or unresolved — unconfirmed, do not treat as spec.
metadata:
  type: project
---

The landing copy in `src/content/es.ts` was ported verbatim from the design artifact
(see [[decision-landing-design-source]]) and asserts several things the context files do
**not** back. None of it is confirmed product scope:

- **Real-time tracking** — "Seguimiento en tiempo real", "Posición, ETA al pad",
  offline driver app with satellite positioning (features grid + FAQ 4).
  `project-overview.md` Out Of Scope explicitly excludes live GPS tracking and
  routing-API ETAs.
- **AI matching** — "La IA matchea transportistas en tu ruta" (how-it-works).
  `architecture-context.md`'s Matching & Postulación Model describes no ML/AI component.
- **Pricing** — USD 19 standard / USD 39 destacada, 48 h top-of-listing, 7-day active
  window, volume packs, fee-back-as-credit guarantee. The fee amount and currency are an
  open question in `progress-tracker.md`; ARS was the presumed currency, not USD.
- **Fabricated figures and people** — 38% empty km, 1.240 viajes/mes, 0% commission, and
  three named testimonials (Hugo Maidana, Valeria Correa, Damián Sosa) with quotes.
  Invented for the mockup; there is no data source behind them.
- **Verification claims** — CUIT/titularidad/RUTA validation, "Transportistas
  verificados". No verification subsystem is modelled in the Prisma schema.

**Why:** The user chose to port the design verbatim and flag the conflicts rather than
soften the copy, so the page currently advertises more than the architecture supports.

**How to apply:** Treat this copy as placeholder marketing, never as a requirements
source. Before building any of the above, resolve it in `architecture-context.md` /
`project-overview.md` first. Before the site goes public, the fabricated stats,
testimonials, and prices must be replaced or confirmed.
