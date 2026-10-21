import type { NavIconName } from "./navigation";

/** Stroke icons on a 24px grid (1.75 stroke, round caps) used by the header menus. */
const paths: Record<NavIconName, string[]> = {
  // stacked layers
  platform: ["M12 3l9 5-9 5-9-5 9-5z", "M3 12.5l9 5 9-5", "M3 17l9 5 9-5"],
  // stepped cascading bars
  waterfall: ["M4 4.5h7v3.5H4z", "M8.5 10.25h7v3.5h-7z", "M13 16h7v3.5h-7z"],
  // pie chart (carry share)
  carry: ["M12 3a9 9 0 109 9h-9V3z", "M15.5 3.6A9 9 0 0120.4 8.5H15.5V3.6z"],
  // banknote
  compensation: ["M3 6.5h18a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1v-9a1 1 0 011-1z", "M12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z", "M5.5 9.5v.01M18.5 14.5v.01"],
  // two people
  "co-invest": ["M9 11a3 3 0 100-6 3 3 0 000 6z", "M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6", "M16.5 11a2.5 2.5 0 100-5", "M17 14.2c2.3.4 4 2.3 4 4.8"],
  // briefcase
  "private-equity": ["M4 7h16a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z", "M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2", "M3 13h18"],
  // trending up
  "venture-capital": ["M3 17l6-6 4 4 8-8", "M15 7h6v6"],
  // building
  "real-estate": ["M4 21V5a1 1 0 011-1h8a1 1 0 011 1v16", "M14 10h5a1 1 0 011 1v10", "M3 21h18", "M8 8h2M8 12h2M8 16h2"],
  // open book
  "resource-hub": ["M12 6.5C10.5 5 8 4.5 4 4.5v13c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-13c-4 0-6.5.5-8 2z", "M12 6.5v13"],
  // document with lines
  blog: ["M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z", "M14 3v5h5", "M9 13h6M9 17h6"],
  // question mark in circle
  faq: ["M12 3a9 9 0 100 18 9 9 0 000-18z", "M9.6 9.6a2.5 2.5 0 114 2c-.9.6-1.6 1.1-1.6 2.2", "M12 17h.01"],
  // checklist
  "how-it-works": ["M4 6l1.5 1.5L8 5", "M4 12l1.5 1.5L8 11", "M4 18l1.5 1.5L8 17", "M12 6h8M12 12h8M12 18h8"],
  // compass
  about: ["M12 3a9 9 0 100 18 9 9 0 000-18z", "M15.5 8.5l-2 5-5 2 2-5 5-2z"],
  // shield with check
  "why-navable": ["M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z", "M8.5 12l2.5 2.5 4.5-5"],
};

export default function NavIcon({ name, className = "size-5" }: { name: NavIconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
