---
name: open-form-taxonomies-unbacked
description: Cargo type, requisitos, flexibilidad, carga/descarga and recurrence days render as controls but have no Prisma column — schema + migration owed.
metadata:
  type: project
---

The publish forms offer five taxonomies that `prisma/schema.prisma` cannot store: **tipo de carga** (pallets, skids, herramienta, tubería, bolsones, equipo completo), **requisitos especiales** (peligrosa, refrigerada, hidrogrúa, sobredimensionada, acceso al yacimiento, HSE), **flexibilidad** de salida, **carga/descarga**, and the weekly **recurrence days**. The search screen filters on the same cargo types. `Cargo` only has `description`, `neededDate` and `urgent`; `Trip` only has `availableCapacity` and dates.

When the boilerplate data was removed on 2026-07-29 the user chose to **leave these controls in place** and implement the schema for them later, rather than blank them out.

**Why:** they are the forms' real vocabulary, not sample data — deleting them would have gutted the screens for a gap that belongs in the data model.

**How to apply:** before wiring the publish Server Actions, add the columns (enums or join tables) plus a migration, then source the option lists from the schema instead of `src/content/es/`. Until then nothing these controls capture can be persisted. See [[decision-blank-content-no-sample-data]], [[decision-schema-assumptions]].
