import type { ReactNode } from "react";

/**
 * Feature icons for the Waterfall "Built to be checked" grid (ported from the
 * design build). Decorative: every icon is aria-hidden, the card heading names
 * the feature. 40×40 tile with an indigo-tint fill; ink and indigo strokes.
 */

const INK = "#1E1B3A";
const PURPLE = "#4C46A3";

function Tile({ children }: { children: ReactNode }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
      <rect x=".5" y=".5" width="39" height="39" rx="6" fill="#EEEDF8" stroke="#DCDAF0" />
      {children}
    </svg>
  );
}

/** Magnifier over lines: trace any number. */
export function TraceIcon() {
  return (
    <Tile>
      <path d="M12 12h9M12 20h6M12 28h4" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="25" cy="24" r="4.5" stroke={PURPLE} strokeWidth="1.5" />
      <path d="M28.3 27.3 31 30" stroke={PURPLE} strokeWidth="1.5" strokeLinecap="round" />
    </Tile>
  );
}

/** Two matched columns: compare with your own model. */
export function CompareIcon() {
  return (
    <Tile>
      <rect x="10" y="12" width="8" height="16" rx="1" stroke={INK} strokeWidth="1.5" />
      <rect x="22" y="12" width="8" height="16" rx="1" stroke={PURPLE} strokeWidth="1.5" />
      <path d="M10 17h8M10 22h8M22 17h8M22 22h8" stroke={INK} strokeWidth="1" opacity=".5" />
      <circle cx="26" cy="19.5" r="1.6" fill="#F5A61D" />
    </Tile>
  );
}

/** Spreadsheet grid: a workbook your auditor can recalculate. */
export function WorkbookIcon() {
  return (
    <Tile>
      <rect x="10" y="10" width="20" height="20" rx="2" stroke={INK} strokeWidth="1.5" />
      <path d="M10 16h20M17 10v20" stroke={INK} strokeWidth="1" opacity=".5" />
      <path d="M20 21.5h7M20 25h4" stroke={PURPLE} strokeWidth="1.5" strokeLinecap="round" />
    </Tile>
  );
}

/** Person and padlock: review and sign-off. */
export function SignOffIcon() {
  return (
    <Tile>
      <circle cx="15" cy="15" r="3.5" stroke={INK} strokeWidth="1.5" />
      <path d="M9 28c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="23" y="18" width="9" height="8" rx="1.5" stroke={PURPLE} strokeWidth="1.5" />
      <path d="M25 18v-2a2.5 2.5 0 0 1 5 0v2" stroke={PURPLE} strokeWidth="1.5" />
    </Tile>
  );
}

/** Branching versions: reopen any calculation. */
export function ReopenIcon() {
  return (
    <Tile>
      <path d="M12 12v16" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="14" r="2.5" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
      <circle cx="12" cy="26" r="2.5" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
      <path d="M12 20h6a6 6 0 0 0 6-6" stroke={PURPLE} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="26" cy="13" r="2.5" fill="#FFFFFF" stroke={PURPLE} strokeWidth="1.5" />
    </Tile>
  );
}

/** Four tiles, one highlighted: built for many funds. */
export function ManyFundsIcon() {
  return (
    <Tile>
      <rect x="9" y="10" width="9" height="9" rx="1.5" stroke={INK} strokeWidth="1.5" />
      <rect x="22" y="10" width="9" height="9" rx="1.5" stroke={INK} strokeWidth="1.5" />
      <rect x="9" y="22" width="9" height="9" rx="1.5" stroke={INK} strokeWidth="1.5" />
      <rect x="22" y="22" width="9" height="9" rx="1.5" fill="#F5A61D" stroke={INK} strokeWidth="1.5" />
    </Tile>
  );
}
