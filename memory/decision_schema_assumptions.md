---
name: decision-schema-assumptions
description: Minor structural additions made to the initial Prisma schema that aren't explicitly stated in architecture-context.md — flagged for confirmation
metadata:
  type: decision
  project: project-vaca-muerta-logistica
---

The initial `prisma/schema.prisma` (models: `User`, `Location`, `Trip`, `Cargo`, `Application`, `Payment`) needed a few structural calls not literally spelled out in `context/architecture-context.md`:

- `Location.type` (`LocationType`: `city` | `oilfield`) — added to distinguish the two seed categories described in the Location Catalog Model; not an explicit field in the spec.
- `CargoStatus` includes `confirmed` and `completed` in addition to the spec's literal `pending_payment`/`published`, inferred from the Core User Flow language ("carga moves to a confirmed/in-progress state", "track... until it's marked complete").
- `ApplicationStatus` (`pending` | `confirmed` | `rejected`) is invented outright — the Matching & Postulación Model only says a record is created and a notification fires, with no state machine specified.
- `Application` requires both `tripId` and `cargoId` (matches "linking the two listings" in the model doc) — the "direct contact initiated by either role" case from project-overview.md isn't modeled and may need a nullable counterpart later.
- `Ubicacion.geom` is an `Unsupported("geography(Point, 4326)")` field kept alongside plain `latitude`/`longitude` floats, since Prisma Client can't query PostGIS geography types directly — proximity queries will need raw SQL against `geom`, simple reads/writes use lat/lng.

**Why:** `ai-workflow-rules.md` says undefined business rules should be logged as open questions rather than invented — these are logged here and in `context/progress-tracker.md` Open Questions rather than treated as settled.

**How to apply:** Before building the matching/search logic or the postulación flow (separate units per `ai-workflow-rules.md`), confirm these against the user and update `context/architecture-context.md` with the actual state machines, then remove or correct this memory file.
