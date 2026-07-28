# Development Workflow

## Approach

Implement strictly against the context files (`project-overview.md`, `architecture-context.md`, `ui-context.md`, `code-standards.md`). Do not invent business rules, entities, copy, or visual treatments that aren't stated or clearly implied by these files — if it's not there, treat it as a missing requirement (see below), not a creative opportunity.

Before starting any unit of work, also read `memory/MEMORY.md` and follow its links to the individual memory files. `context/` is the full spec; `memory/` holds shorter, atomic facts and decisions (naming, role model, stack picks, catalog rules, etc.) meant to be recalled quickly across sessions without re-reading all of `context/`. `memory/` never overrides `context/` — if a memory file and a context file disagree, `context/` wins and the memory file is stale and should be corrected or removed.

When a new non-obvious decision gets made during implementation (a new assumption, a scope change, a resolved ambiguity), add a short atomic file to `memory/` for it — following the existing frontmatter pattern (`name`, `description`, `metadata.type`, body with **Why:** / **How to apply:**) — and link it from `memory/MEMORY.md`. Don't duplicate the full reasoning already in `context/`; the memory file is a pointer plus the one or two lines someone needs to not re-break the decision.

## Scoping Rules

Work one feature or subsystem at a time, in small, independently verifiable increments. Don't mix unrelated boundaries in a single change — e.g. don't touch payment logic while building search filtering, and don't touch the matching algorithm while adjusting dashboard layout.

## When To Split Work

- Never combine changes to the matching/search logic with changes to the payment flow in the same unit of work — they have different failure modes and different invariants (#1 and #4 in architecture-context.md's Invariants).
- Keep "Publicar Carga" (empresa, paid) and "Publicar Viaje" (transportista, free) as separate implementation units even though the forms look similar — they have different validation rules and one has a payment branch, the other doesn't.
- Separate map/GeoJSON rendering work from locations catalog/data-model work — one is presentation, the other is the data source it depends on.
- Treat "a postulación is created" and "a WhatsApp notification is sent for it" as separate, independently verifiable units — don't build the event and its delivery in one unmeasurable step.
- Build the empresa dashboard view and the transportista dashboard view as separate verifiable units, not one combined pass, even though they share a dashboard shell.
- Keep "any user can add a ubicación inline while publishing" separate from "admin can edit/delete a ubicación" — the first is open-write validation logic in the publish flow, the second is a permission-gated admin action; don't build both behind one shared code path.
- If a change can't be verified end-to-end quickly (e.g. it requires a manual Mercado Pago sandbox checkout or a live WhatsApp send), split it into a smaller piece that can be verified first, and isolate the part that needs manual/external verification.

## Handling Missing Requirements

Don't invent missing business rules or Spanish copy to fill a gap. Resolve genuine ambiguity in the relevant context file first — business/data logic gaps go into `architecture-context.md`, visual gaps go into `ui-context.md` — then log what was unresolved or assumed in `progress-tracker.md` under Open Questions. Undefined UI copy is a missing requirement, not something to draft inline: add a placeholder key in the content/dictionary file and flag it, rather than writing plausible-sounding Spanish text directly into a component.

## Protected Foundation Components

shadcn/ui primitives in `components/ui/`, and the internals of third-party libraries (MapLibre GL, the Mercado Pago SDK, the WhatsApp Business API client), are never modified directly. Project-specific behavior is built by wrapping or composing them in app-level components under `components/{domain}/`.

## Role, Payment, and Notification Consistency

Role gating (`carrier`/`shipper`), the paid-listing invariant, and the notification triggers all cut across multiple files. Any change touching one of the following must be checked against all of the others before it's considered done:

- `architecture-context.md` — Auth and Access Model, Cargo Publishing & Payment Model, Notification Model, and Invariants #1, #2, #5, #6.
- The RLS policies in `lib/db/` (or wherever they're defined).
- The Publicar Carga server action and the Mercado Pago webhook handler.
- The notification-triggering service in `lib/services/` and its WhatsApp/email fallback logic.

Separately, any change to the locations catalog (add/edit/delete) must be checked against `architecture-context.md`'s Location Catalog Model and Invariant #3, and against the RLS policy that restricts `update`/`delete` to `role = 'admin'` — a change that lets a non-admin edit or delete an existing entry is an invariant violation even if the insert path is working correctly.

These are updated together or not at all — a change to one without checking the others is how the "carga visible before payment" or "transportista gets charged" invariants get silently broken.

## Keeping Docs In Sync

Update the relevant context file whenever architecture, storage, standards, or scope actually change during implementation — don't let the docs drift from what's been built. `progress-tracker.md` reflects the actual current state of the project, not the intended end state.

## Before Moving To The Next Unit

1. The feature works end to end against a real (or realistically seeded) database — not mocked data.
2. No invariant listed in `architecture-context.md` has been violated.
3. All user-facing copy introduced is in Spanish and lives in a content/dictionary file, not hardcoded inline.
4. `progress-tracker.md` is updated — Completed, In Progress, Next Up, and Open Questions all reflect reality.
