---
name: decision-english-domain-naming
description: The domain model is named in English end to end (Trip, Cargo, Location, Application, carrier/shipper); the Spanish schema was renamed via a data-preserving migration on 2026-07-28.
metadata:
  type: project
---

`code-standards.md` requires all code and files to be English, with Spanish only in UI
copy. The schema was originally Spanish, so on 2026-07-28 the user chose to **rename the
schema** rather than keep an exception or a mapping layer.

| Was | Is |
|---|---|
| `Ubicacion` / `ubicaciones` | `Location` / `locations` |
| `Viaje` / `viajes` | `Trip` / `trips` |
| `Carga` / `cargas` | `Cargo` / `cargos` |
| `Postulacion` / `postulaciones` | `Application` / `applications` |
| `viaje_id`, `carga_id` | `trip_id`, `cargo_id` |
| `Role`: `transportista`, `empresa` | `Role`: `carrier`, `shipper` (`admin` unchanged) |
| `LocationType`: `ciudad`, `yacimiento` | `LocationType`: `city`, `oilfield` |
| `carga_status`, `postulacion_status` | `cargo_status`, `application_status` |

`prisma/migrations/20260728000000_rename_domain_to_english/migration.sql` is **hand-written
as `ALTER ... RENAME` statements**, including the primary keys, the unique index and every
foreign-key constraint name. This matters: `prisma migrate diff` cannot infer a rename and
would have emitted `DROP` + `CREATE`, destroying every row.

**Why:** One vocabulary across the UI, the ORM and the database. The alternative — English
components over Spanish tables — meant a translation layer at every boundary and a
`DashboardRole` that silently disagreed with `users.role`.

**How to apply:** New models, columns and enum values are English. Spanish stays in
`src/content/es/` copy and in prose that names the product's screens ("Publicar Carga").
If a future rename is ever needed, write the SQL by hand as RENAMEs the same way — never
accept a generated DROP/CREATE for something that holds data. Related:
[[decision-role-model]], [[decision-locations-catalog]], [[decision-schema-assumptions]],
[[decision-app-screens-design-source]].
