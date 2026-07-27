---
name: decision-ubicaciones-catalog
description: The Vaca Muerta location catalog is extensible by any user but only editable/deletable by admin
metadata:
  type: decision
  project: project-vaca-muerta-logistica
---

The `ubicaciones` catalog is seeded with base cities (Rincón de los Sauces, Cutral Có, Neuquén, Añelo, Centenario, Cipolletti, Catriel, El Chañar, Plottier) and known yacimientos (e.g. Loma Campana). Any authenticated user — transportista, empresa, or admin — can add a new yacimiento or ciudad (name + geographic coordinates) inline while publishing a viaje/carga if it's missing. Existing entries can only be **edited or deleted by admin**, enforced at the RLS layer, not just the app layer.

**Why:** Vaca Muerta's operational geography (yacimientos, bases, campamentos) changes and expands faster than a fixed static list could keep up with, but letting anyone silently overwrite or delete a shared location would corrupt other users' listings and the map. Open-write, admin-moderated edit/delete balances both.

**How to apply:** Free-text-only locations are never allowed for viajes or cargas — always resolve to a catalog entry with PostGIS coordinates. The "add a location" action in the publish flow and the "edit/delete a location" admin action must stay separate code paths with separate permission checks — don't build them behind one shared handler. Full detail in `context/architecture-context.md` → Location Catalog Model and Invariant #3.
