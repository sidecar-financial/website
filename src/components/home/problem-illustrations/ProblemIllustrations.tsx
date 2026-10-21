"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps the two Problem illustrations so they share one trigger: when the group scrolls
 * into view the spreadsheet art plays, then the Navable art (timings live in
 * globals.css under .pi-*). The hidden start state is only applied here, after JS
 * confirms motion is allowed, so without JS or with reduced motion the art renders
 * fully and static, and there is no flash of empty art.
 */
export default function ProblemIllustrations({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    el.classList.add("pi-ready");
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Wait two frames so the hidden state is painted before the transitions start.
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => el.classList.add("pi-play"));
        });
        observer.disconnect();
      },
      { threshold: 0, rootMargin: "0px 0px -25% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} data-pi-group className={className}>
      {children}
    </div>
  );
}
