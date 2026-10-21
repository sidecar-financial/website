"use client";

import { useEffect, useRef, useState } from "react";

type Geometry = { width: number; height: number; top: number; length: number };

/**
 * Left-edge light for a dark section that has a side tab. The straight frame
 * line is hidden behind the tab, so on wide screens the light instead runs
 * the whole way up the left edge and detours around the tab outline
 * (up the line, left along the tab's bottom, up its left edge, back along its
 * top, then on up the line). The path is measured from the rendered tab, so it
 * follows the tab whatever its label length. Decorative; hidden when the tab
 * is, and switched off for reduced motion.
 */
export default function TabTrace() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);

  useEffect(() => {
    const host = svgRef.current?.parentElement;
    const tab = host?.querySelector<HTMLElement>("[data-side-tab]");
    if (!host || !tab) return;

    const measure = () => {
      const width = tab.offsetWidth;
      setGeometry(
        width
          ? { width, height: tab.offsetHeight, top: tab.offsetTop, length: host.offsetHeight }
          : null,
      );
    };

    const observer = new ResizeObserver(measure);
    observer.observe(host);
    observer.observe(tab);
    return () => observer.disconnect();
  }, []);

  const g = geometry;
  // Coordinates are offset by the tab width so x = 0 is the tab's left edge;
  // the half-pixel insets put the stroke on the 1px borders.
  const path = g
    ? `M ${g.width - 0.5} ${g.length} V ${g.top + g.height - 0.5} H 0.5 V ${g.top + 0.5} H ${g.width - 0.5} V 0`
    : undefined;

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute top-0 z-20 hidden overflow-visible min-[1200px]:block"
      style={g ? { left: -g.width, width: g.width, height: g.length } : undefined}
    >
      {path &&
        // A comet: three dashes of different length sharing one head, so the tail fades.
        [0.16, 0.09, 0.04].map((tail) => (
          <path
            key={tail}
            d={path}
            pathLength={1}
            className="tab-trace-path"
            style={{ "--tail": tail, "--end": tail - 1 } as React.CSSProperties}
          />
        ))}
    </svg>
  );
}
