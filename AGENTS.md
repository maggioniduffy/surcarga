<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Application Building Context

Start by reading `memory/MEMORY.md` and following its links to the individual memory files. These are short, atomic facts and decisions (naming, role model, stack picks, catalog rules, etc.) meant for quick recall across sessions. They never override the context files below — if a memory file and a context file disagree, the context file wins and the memory file is stale and should be corrected or removed.

Then read the following files in order before implementing or making any architectural decision:

1. `context/project-overview.md` — product definition, goals, features, and scope
2. `context/architecture-context.md` — system structure, boundaries, storage model, and invariants
3. `context/ui-context.md` — theme, colors, typography, canvas design, and component conventions
4. `context/code-standards.md` — implementation rules and conventions
5. `context/ai-workflow-rules.md` — development workflow, scoping rules, and delivery approach
6. `context/progress-tracker.md` — current phase, completed work, open questions, and next steps

Update `context/progress-tracker.md` after each meaningful implementation change.

If implementation changes the architecture, scope, or standards documented in the context files, update the relevant file before continuing.

When a new non-obvious decision gets made during implementation (a new assumption, a scope change, a resolved ambiguity), add a short atomic file to `memory/` for it and link it from `memory/MEMORY.md`, instead of only recording it in `context/progress-tracker.md`.
