---
name: decision-no-geolocation-tracking
description: Geolocation / real-time shipment tracking is permanently out of the product — not deferred, deleted.
metadata:
  type: project
---

Decided 2026-07-27: **geolocation tracking is permanently deleted from Surcarga.** Not a
later phase, not a backlog item — the product does not track vehicle or shipment position,
does not compute ETAs, and has no driver positioning (GPS or satellite) feature.

Removed from `src/content/es/landing.ts` accordingly: the "Seguimiento en tiempo real" feature card
(and its `tracking` glyph in `feature-icon.tsx`), the "Seguimiento del envío" pricing perk,
the offline/satellite-positioning FAQ entry, and the "seguís la carga hasta la entrega"
step wording. The map section was reframed from "Mapa en tiempo real / Camiones disponibles
ahora" to "Mapa de la cuenca / Viajes publicados con espacio libre" — the map shows
**published viajes**, never live positions.

**Why:** It was already Out Of Scope in `project-overview.md`; the landing copy asserted it
anyway because it was ported verbatim from the design artifact
(see [[open-landing-copy-scope-conflicts]], [[decision-landing-design-source]]). The user
resolved the conflict by deleting the feature outright.

**How to apply:** Never reintroduce position, ETA, or live-tracking language or fields.
Visibility in this product means "who has a trip published on that route with space free",
which listings already answer. If a tracking request comes up, treat it as a new product
decision, not as unfinished work.
