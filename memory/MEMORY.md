# Memory Index

Short, atomic facts and decisions for quick recall across sessions. These never override
the files in `context/` — if a memory file and a context file disagree, `context/` wins
and the memory file is stale.

- [Landing design source](decision-landing-design-source.md) — the landing page is a port of a delivered design artifact; brand is Surcarga, never "CargaSur".
- [Landing copy scope conflicts](open-landing-copy-scope-conflicts.md) — ported landing copy advertises USD pricing, verification claims, and invented stats/testimonials that the context files don't back (tracking and AI matching now resolved).
- [No geolocation tracking](decision-no-geolocation-tracking.md) — position/ETA/live tracking is permanently deleted from the product, not deferred.
- [AI matcher deferred](decision-ai-matcher-deferred.md) — matching is search + filters for now; the AI matcher must not appear anywhere in the app.

## Referenced but not yet written

`context/progress-tracker.md` links these; the files were never created. Write them from
the tracker's Completed / Open Questions sections when next touching that area.

- `decision-stack-versions` — Next.js 16.2.12, Tailwind v4.3.3, Prisma 7.9.1.
- `decision-prisma7-driver-adapter` — Prisma 7 requires the driver-adapter pattern (`@prisma/adapter-pg`).
- `decision-schema-assumptions` — invented enum values and structural fields in `prisma/schema.prisma`.
