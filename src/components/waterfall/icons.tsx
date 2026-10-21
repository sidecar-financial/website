import type { ReactNode } from "react";

/**
 * Feature icons for the Waterfall page, ported from the supplied marketing
 * set (icons/*.svg). Geometry is unchanged; the sage/clay palette is mapped to
 * the site's: strokes use currentColor (ink), the sage accent fill becomes the
 * LP indigo tint and the clay accent fill the GP amber tint used by the hero
 * illustration. They are decorative: the visible heading names each feature.
 */

const LP_TINT = "#DAD7F2";
const GP_TINT = "#FFE2A8";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="size-12"
    >
      {children}
    </svg>
  );
}

export function ReadTermsIcon() {
  return (
    <Icon>
      <path d="M12 6h16l8 8v28H12z" />
      <path d="M28 6v8h8" />
      <path d="M18 22h12M18 28h12M18 34h7" />
      <circle cx="33" cy="35" r="5" fill={LP_TINT} />
      <path d="M36.5 38.5 40 42" />
    </Icon>
  );
}

export function ExcelWorkbookIcon() {
  return (
    <Icon>
      <rect x="6" y="8" width="36" height="32" rx="3" />
      <path d="M6 17h36M18 8v32M30 17v23M6 28h36" />
      <path d="M9 12.5h6" />
      <text
        x="35"
        y="14"
        fontFamily="var(--font-sans)"
        fontSize="7"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
        textAnchor="middle"
      >
        fx
      </text>
    </Icon>
  );
}

export function ReconcileIcon() {
  return (
    <Icon>
      <rect x="6" y="10" width="15" height="28" rx="3" />
      <rect x="27" y="10" width="15" height="28" rx="3" />
      <path d="M10 18h7M10 24h7M10 30h7M31 18h7M31 24h7M31 30h7" />
      <path d="M19 42l3 3 6-6" />
    </Icon>
  );
}

export function ExceptionsFirstIcon() {
  return (
    <Icon>
      <path d="M24 6 42 38H6z" fill={GP_TINT} />
      <path d="M24 18v10" />
      <circle cx="24" cy="33" r="1.2" fill="currentColor" />
    </Icon>
  );
}

export function VersionsIcon() {
  return (
    <Icon>
      <rect x="14" y="6" width="26" height="20" rx="3" />
      <path d="M10 12v18a3 3 0 0 0 3 3h23" />
      <path d="M6 18v18a3 3 0 0 0 3 3h23" />
      <path d="M20 14h14M20 19h9" />
    </Icon>
  );
}

export function SignOffIcon() {
  return (
    <Icon>
      <rect x="10" y="20" width="28" height="22" rx="4" />
      <path d="M16 20v-6a8 8 0 0 1 16 0v6" />
      <path d="M18 31l4 4 8-8" />
    </Icon>
  );
}

export function ManyClientsIcon() {
  return (
    <Icon>
      <rect x="6" y="8" width="16" height="14" rx="3" />
      <rect x="26" y="8" width="16" height="14" rx="3" />
      <rect x="6" y="26" width="16" height="14" rx="3" />
      <rect x="26" y="26" width="16" height="14" rx="3" fill={LP_TINT} />
    </Icon>
  );
}

export function TraceIcon() {
  return (
    <Icon>
      <circle cx="10" cy="10" r="4" fill={LP_TINT} />
      <circle cx="24" cy="24" r="4" />
      <circle cx="38" cy="38" r="4" fill={GP_TINT} />
      <path d="M13 13l8 8M27 27l8 8" />
      <path d="M10 14v24h24" />
    </Icon>
  );
}
