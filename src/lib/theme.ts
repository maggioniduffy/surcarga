export type Theme = "dark" | "light";

/** Where the chosen theme is persisted, read by both the provider and the no-flash script. */
export const THEME_STORAGE_KEY = "surcarga-theme";

/**
 * Dark is the product default: the screens were designed dark-first and light is an
 * opt-in, so an unset preference stays dark rather than following the OS.
 */
export const DEFAULT_THEME: Theme = "dark";

/**
 * Runs synchronously in <head> during HTML parsing, before the first paint, so a
 * stored light preference never flashes the dark server-rendered markup.
 * See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});document.documentElement.classList.toggle("dark",t!=="light")}catch(e){}})()`;
