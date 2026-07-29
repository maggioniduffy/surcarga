---
name: decision-locations-degrade-when-db-unreachable
description: listLocations() returns an empty catalog on Prisma connection errors (P1000-P1003, P1017) so / and /search-trucks render empty states instead of 500ing while no database is provisioned.
metadata:
  type: project
---

`src/lib/services/locations.ts` catches `Prisma.PrismaClientKnownRequestError` with a code in
`{P1000, P1001, P1002, P1003, P1017}` — the connection-level codes — logs a warning naming
`DATABASE_URL`, and returns `[]`. Every other error still throws.

**Why:** `DATABASE_URL` is still the placeholder `postgresql://…@localhost:5432/mydb`, so
`/` and `/search-trucks` (both `force-dynamic` catalog readers) crashed the dev server with
`P1001 Can't reach database server at 127.0.0.1:5432`. The screens are already prop-driven
shells with empty states per [[decision-blank-content-no-sample-data]], so an empty catalog
is a state they render correctly.

**How to apply:** This is scaffolding for the unprovisioned window, not a permanent pattern —
revisit it when the Supabase instance is live, because after that a silently empty catalog
would hide a real outage. Do **not** widen the catch to all Prisma errors; a malformed query
must still surface. Don't copy the pattern into write paths.
