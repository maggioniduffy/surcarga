---
name: decision-inline-script-wrapper
description: Inline scripts render through src/components/common/inline-script.tsx, which is text/javascript on the server and inert text/plain on the client, because a bare <script> makes React error.
metadata:
  type: project
---

A bare `<script dangerouslySetInnerHTML>` in a component triggers a React console error:
*"Encountered a script tag while rendering React component. Scripts inside React components
are never executed when rendering on the client."* This fired on every dev page load from
the theme init script in `src/app/layout.tsx`.

`src/components/common/inline-script.tsx` is the fix, taken from
`next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md` (Extracting a
reusable component): it emits `type="text/javascript"` when `typeof window === "undefined"`
and `type="text/plain"` otherwise, with `suppressHydrationWarning` for the deliberate `type`
mismatch.

**Why:** The server-sent HTML must run the script during parsing, before first paint. A
client re-render can never execute it anyway — injected scripts don't run — so marking the
client copy inert loses nothing and silences the warning.

**How to apply:** Route every inline script through `<InlineScript html={...} />`, never a
raw `<script>` tag. Considered and rejected on 2026-07-29: dropping the script and reading
`localStorage` in a `useEffect` (reintroduces the flash, and [[decision-light-theme]] forbids
it), and moving the preference to a cookie so the layout can server-render the class (no
script, no flash, but the toggle writes a cookie and consuming pages go dynamic). The user
chose to keep the script.
