/**
 * The landing feature glyphs are drawn to a shared 24px stroke grid rather than
 * pulled from lucide — they encode logistics concepts (route matching, pad
 * access) that the icon set doesn't carry.
 */

const PATHS = {
  publish: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  matching: (
    <>
      <path d="M4 7h6l2 3 2-3h6" />
      <path d="M4 17h6l2-3 2 3h6" />
      <circle cx="12" cy="12" r="1.6" />
    </>
  ),
  payment: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 10h18M7 15h4" />
    </>
  ),
  documents: (
    <>
      <path d="M14 3v5h5" />
      <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" />
      <path d="M9 13h6M9 17h4" />
    </>
  ),
  reputation: <path d="M12 4l2.3 4.9 5.2.7-3.8 3.7.9 5.2L12 16l-4.6 2.5.9-5.2L4.5 9.6l5.2-.7z" />,
  alerts: (
    <>
      <path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7" />
      <path d="M10.5 20a2 2 0 0 0 3 0" />
    </>
  ),
} as const;

export type FeatureIconName = keyof typeof PATHS;

export function FeatureIcon({ name }: { name: FeatureIconName }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-brand"
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  );
}
