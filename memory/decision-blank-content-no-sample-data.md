---
name: decision-blank-content-no-sample-data
description: Screens are prop-driven shells with empty states; sample data never goes back into src/content/es/.
metadata:
  type: project
---

On 2026-07-29 every invented record and figure the design artifacts carried was removed from the five app screens and the landing page. Pages and UI blocks all stayed in place — only the data came out. `src/content/es/` is copy only (labels, headings, actions, taxonomies, and one `empty` string per list); records arrive as props, and a block with nothing to show renders `EmptyState` from `components/common/empty-state.tsx`, or the `NO_VALUE` em dash for a single missing figure.

Real data on screen today: the locations catalog (selects + both maps) and the Clerk session in the header via `lib/auth/current-app-user.ts`. Everything else is empty until its service exists.

**Why:** the artifacts' fake carriers, trips, reviews and stats read as real product state and were blocking the switch to real queries and real accounts.

**How to apply:** never reintroduce instance data into `src/content/es/` — add a prop and an `empty` key instead. New screens follow the same split. See [[decision-app-screens-design-source]], [[open-form-taxonomies-unbacked]], [[decision-locations-single-table]].
