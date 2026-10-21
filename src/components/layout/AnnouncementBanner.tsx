"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** localStorage key remembering that the visitor dismissed the banner. */
export const BANNER_STORAGE_KEY = "navable-waterfall-banner-dismissed";

/** Attribute set on <html> (by the inline script in layout.tsx, and on dismiss) to hide the banner pre-paint. */
export const BANNER_HTML_ATTR = "data-banner-dismissed";

const WATERFALL_HREF = "/solutions/waterfall";

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange); // keep other tabs in sync
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(BANNER_STORAGE_KEY) === "1";
  } catch {
    return false; // storage blocked: just show the banner
  }
}

// Server (and hydration) snapshot: shown. The inline script in layout.tsx hides it before
// first paint for returning dismissers, so there is neither a flash nor a layout jump.
const getServerSnapshot = () => false;

function dismiss() {
  try {
    window.localStorage.setItem(BANNER_STORAGE_KEY, "1");
  } catch {
    // ignore (private mode / blocked storage): it is still hidden for this page view below
  }
  document.documentElement.setAttribute(BANNER_HTML_ATTR, "");
  listeners.forEach((l) => l());
}

/**
 * Slim announcement bar rendered above the (sticky) header, in normal document flow, so it
 * scrolls away with the page and nothing needs measuring or offsetting. When dismissed it is
 * removed from the DOM, and the page simply reflows.
 */
export default function AnnouncementBanner() {
  const pathname = usePathname();
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // The link would point at the page you're already on.
  const onWaterfallPage = pathname.replace(/\/+$/, "") === WATERFALL_HREF;
  if (dismissed || onWaterfallPage) return null;

  return (
    <div
      id="announcement-banner"
      role="region"
      aria-label="Announcement"
      className="on-dark relative bg-navy text-white"
    >
      <div className="mx-auto flex min-h-10 max-w-[1128px] items-center justify-center gap-2 py-2 pl-6 pr-14 text-center text-[13px] leading-5 lg:px-[62px]">
        <p className="min-w-0">
          <span aria-hidden="true">🎉 </span>
          <span className="font-medium">Coming soon: Waterfall</span>
          <span aria-hidden="true" className="mx-1.5 text-navy-text">
            —
          </span>
          <Link
            href={WATERFALL_HREF}
            className="group/link inline-flex items-center gap-1 whitespace-nowrap rounded-sm font-semibold text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy motion-reduce:transition-none"
          >
            Find out more
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/link:translate-x-0 motion-reduce:group-focus-visible/link:translate-x-0"
            >
              →
            </span>
          </Link>
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-md text-navy-text transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-inset motion-reduce:transition-none lg:right-[18px]"
      >
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
