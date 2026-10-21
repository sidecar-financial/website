"use client";

import { useEffect, useRef } from "react";

export const MEETING_URL =
  "https://meetings.hubspot.com/jennifer884?uuid=23927735-1750-4c06-a5c4-af62048836c9";

type DemoSuccessProps = {
  firstName: string;
  /** Heading level, so the success step fits the surrounding outline. */
  headingLevel?: "h2" | "h3";
};

/**
 * Completion step shown after the demo form is submitted: moves focus to the
 * heading (for keyboard and screen-reader users) and links to the meeting
 * scheduler.
 */
export default function DemoSuccess({ firstName, headingLevel = "h3" }: DemoSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const Heading = headingLevel;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    // Focus moves to the heading on mount, which announces the step; a live
    // region here would only double-announce it.
    <div
      className="success-in flex min-h-[260px] flex-col items-start justify-center gap-4 rounded-[3px] border border-navy-border px-6 py-8 lg:p-8"
    >
      {/* Decorative: ring and tick draw themselves once on mount */}
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <circle className="check-draw" cx="22" cy="22" r="20" pathLength={1} stroke="#F5A61D" strokeWidth="2" />
        <path
          className="check-draw check-draw-tick"
          d="M13 23l6 6 12-13"
          pathLength={1}
          stroke="#F5A61D"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Heading
        ref={headingRef}
        tabIndex={-1}
        className="text-[22px] font-medium leading-[1.3] text-white outline-none"
      >
        Thank you{firstName ? `, ${firstName}` : ""}.
      </Heading>
      <p className="text-base leading-[1.6] text-navy-text">
        Now select a meeting time with our expert team.
      </p>
      <a
        href={MEETING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex min-h-[48px] items-center rounded-[6px] bg-orange px-[22px] text-base font-medium text-ink transition-[color,background-color,box-shadow] hover:bg-orange-dark hover:shadow-[0_8px_28px_-4px_rgba(245,166,29,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
      >
        Choose Your Time&nbsp;
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
        >
          →
        </span>
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    </div>
  );
}
