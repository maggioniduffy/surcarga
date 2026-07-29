/**
 * Renders an inline script that only the server-sent HTML executes.
 *
 * React warns when a component renders a `<script>` tag, because scripts
 * inserted through DOM updates never run in the browser. Marking the client
 * render as `text/plain` keeps the tag inert there while the server still emits
 * a real `text/javascript` block that runs during HTML parsing, before the first
 * paint. `suppressHydrationWarning` covers the deliberate `type` mismatch.
 * See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
