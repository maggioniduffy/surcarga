---
name: open-landing-copy-scope-conflicts
description: Landing copy advertises features and figures that project-overview.md lists as Out Of Scope or unresolved — unconfirmed, do not treat as spec.
metadata:
  type: project
---

The landing copy in `src/content/es/landing.ts` was ported verbatim from the design artifact
(see [[decision-landing-design-source]]) and asserts several things the context files do
**not** back. None of it is confirmed product scope:

- ~~**Real-time tracking**~~ — resolved 2026-07-27: **permanently deleted** from the copy,
  see [[decision-no-geolocation-tracking]].
- ~~**AI matching**~~ — resolved 2026-07-27: **deferred to a later version**, removed from
  the copy for now, see [[decision-ai-matcher-deferred]].
- **Pricing** — USD 19 standard / USD 39 destacada, 48 h top-of-listing, 7-day active
  window, volume packs, fee-back-as-credit guarantee. The fee amount and currency are an
  open question in `progress-tracker.md`; ARS was the presumed currency, not USD.
- ~~**Fabricated figures and people**~~ — resolved 2026-07-29: the 38% / 1.240 counters,
  the three named testimonials and the "próximo camión sale en 40 minutos" CTA headline
  were **removed** with the rest of the boilerplate data. The hero counters and the
  testimonials grid now take props and render empty; only the `0%` commission figure
  stayed, because zero commission is a product fact. See
  [[decision-blank-content-no-sample-data]].
- **Verification claims** — CUIT/titularidad/RUTA validation, "Transportistas
  verificados". No verification subsystem is modelled in the Prisma schema.

**Why:** The user chose to port the design verbatim and flag the conflicts rather than
soften the copy, so the page currently advertises more than the architecture supports.

**How to apply:** Treat this copy as placeholder marketing, never as a requirements
source. Before building any of the above, resolve it in `architecture-context.md` /
`project-overview.md` first. Pricing and the verification claims are what remains open
before the site goes public.
