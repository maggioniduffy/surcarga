---
name: decision-locations-single-table
description: Cities and yacimientos share one `locations` table via LocationType; Loma La Lata added to the seed.
metadata:
  type: project
---

Asked on 2026-07-29 to give cities and "depósitos" their own schema and table, the answer was that `prisma/schema.prisma` already models exactly that: **one `locations` table** with a `LocationType` discriminator (`city` | `oilfield`). `trips` and `cargos` both carry FKs to it, and Invariant #3 in `architecture-context.md` requires a single shared catalog, so splitting it in two would break the FKs and the invariant for no functional gain. `prisma/seed.ts` now seeds the nine context cities plus `Loma Campana` and **`Loma La Lata`** (oilfield, ≈ -38.55 / -68.75).

Both schematic maps render one node per catalog row, projected from real lat/long by `lib/map-projection.ts` — cities in ink, yacimientos in brand orange.

**Why:** one catalog keeps every trip/cargo location resolvable to a single row and keeps admin moderation to one table.

**How to apply:** add new location kinds as `LocationType` values, not new tables. Admin edit/delete over this table is still unbuilt. See [[decision-locations-catalog]], [[decision-blank-content-no-sample-data]].
