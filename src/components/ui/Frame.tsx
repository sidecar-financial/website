import type { CSSProperties, ReactNode } from "react";
import TabTrace from "@/components/ui/TabTrace";

/**
 * Building blocks for the "framed grid" look of the landing page design:
 * a centered 1128px column bounded by hairline vertical rules, with sections
 * separated by horizontal rules and a small vertical tab label on the left.
 */

export const FRAME_WIDTH = "max-w-[1128px]";

type SideLabelProps = {
  children: ReactNode;
  dark?: boolean;
};

/** Vertical tab (orange square + mono caps) that hangs off the left edge of a section. */
export function SideLabel({ children, dark = false }: SideLabelProps) {
  return (
    <div
      aria-hidden="true"
      data-side-tab
      className={`absolute right-full top-6 z-10 hidden min-[1200px]:flex flex-col-reverse items-center gap-[10px] border border-r-0 px-[9px] py-3 ${
        dark ? "border-navy-line bg-navy" : "border-line bg-white"
      }`}
    >
      <span className="block size-2 shrink-0 bg-orange" />
      <span
        className={`font-mono text-[10px] uppercase leading-none tracking-[0.16em] [writing-mode:vertical-rl] rotate-180 ${
          dark ? "text-white" : "text-subtle"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  label?: string;
  id?: string;
  labelledBy?: string;
  className?: string;
  /** Drop the horizontal rule under the section (used when the next block draws its own). */
  noBorder?: boolean;
};

/** Standard light section: full-width bottom rule, bordered 1128px column, optional side tab. */
export function Section({
  children,
  label,
  id,
  labelledBy,
  className = "",
  noBorder = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative ${noBorder ? "" : "border-b border-line"}`}
    >
      <div className={`relative mx-auto ${FRAME_WIDTH} border-x border-line ${className}`}>
        {label && <SideLabel>{label}</SideLabel>}
        {children}
        {!noBorder && <CornerDots />}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  id: string;
  title: ReactNode;
  description: ReactNode;
  /** Extra left inset for the heading (the Outcomes section is indented further). */
  indent?: "default" | "wide";
  /** Top padding on large screens. */
  topPadding?: string;
};

/** Two-column section intro: big heading on the left, short paragraph bottom-aligned on the right. */
export function SectionHeader({
  id,
  title,
  description,
  indent = "default",
  topPadding = "lg:pt-[92px]",
}: SectionHeaderProps) {
  return (
    <div className="grid items-end gap-6 border-b border-line px-6 py-12 lg:grid-cols-[611px_1fr] lg:gap-0 lg:px-0 lg:py-0">
      <h2
        id={id}
        className={`text-[32px] font-semibold leading-[1.25] text-ink lg:pb-[92px] lg:text-[40px] lg:leading-[50px] ${topPadding} ${
          indent === "wide" ? "lg:pl-[70px]" : "lg:pl-12"
        }`}
      >
        {title}
      </h2>
      <p className="max-w-[447px] text-[15px] leading-[25px] text-muted lg:pb-[92px]">
        {description}
      </p>
    </div>
  );
}

/** Empty 64px band between sections that keeps the vertical rules running. */
export function Gap({ ruled = false }: { ruled?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto h-16 ${FRAME_WIDTH} border-x border-line ${ruled ? "border-b" : ""}`}
    />
  );
}

type CornerDotsProps = {
  dark?: boolean;
  position?: "top" | "bottom";
  /**
   * When set, the dot flares once per 8s loop as the traced light arrives: 0.32s
   * before the light lands, so `delay = arrival time - 0.32` (see `.trace-dot`).
   */
  leftDelay?: number;
  rightDelay?: number;
};

/** Small dots where the horizontal rule meets the vertical rules. */
export function CornerDots({ dark = false, position = "bottom", leftDelay, rightDelay }: CornerDotsProps) {
  const color = dark ? "bg-[#4b40b8]" : "bg-[#dcdcf0]";
  const y = position === "bottom" ? "-bottom-[3px]" : "-top-[3px]";
  const dot = (side: "-left-[3px]" | "-right-[3px]", delay?: number) => (
    <span
      aria-hidden="true"
      className={`absolute ${y} ${side} z-10 block size-[5px] rounded-full ${color} ${delay === undefined ? "" : "trace-dot"}`}
      style={
        delay === undefined
          ? undefined
          : ({ animationDelay: `${delay}s`, "--dot-base": dark ? "#4b40b8" : "#dcdcf0" } as CSSProperties)
      }
    />
  );
  return (
    <>
      {dot("-left-[3px]", leftDelay)}
      {dot("-right-[3px]", rightDelay)}
    </>
  );
}

type DarkSectionProps = {
  children: ReactNode;
  label?: string;
  id?: string;
  labelledBy?: string;
  /** Run a light around the frame, dot to dot (decorative; disabled for reduced motion). */
  traceLines?: boolean;
};

/**
 * Navy section: full-bleed background, 64px bands above and below the content
 * each closed by a rule, vertical rules continuing through the bands.
 */
export function DarkSection({ children, label, id, labelledBy, traceLines = false }: DarkSectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className="on-dark relative bg-navy text-white">
      <div className={`relative mx-auto ${FRAME_WIDTH} border-x border-navy-line`}>
        <div aria-hidden="true" className="relative h-16 border-b border-navy-line">
          {traceLines && <span className="trace-line trace-line-top -bottom-px left-0 right-0 h-px" />}
          <CornerDots dark position="bottom" leftDelay={traceLines ? 7.2 : undefined} rightDelay={traceLines ? 1.2 : undefined} />
        </div>
        <div className="relative">
          {label && <SideLabel dark>{label}</SideLabel>}
          {traceLines && label && <TabTrace />}
          {children}
        </div>
        <div aria-hidden="true" className="relative h-16 border-t border-navy-line">
          {traceLines && <span className="trace-line trace-line-bottom -top-px left-0 right-0 h-px" />}
          <CornerDots dark position="top" leftDelay={traceLines ? 5.2 : undefined} rightDelay={traceLines ? 3.2 : undefined} />
        </div>
        {traceLines && (
          <>
            {/* With a side tab the left light is TabTrace on wide screens, so it can follow the tab outline. */}
            <span
              aria-hidden="true"
              className={`trace-line trace-line-left -left-px bottom-16 top-16 w-px ${label ? "min-[1200px]:hidden" : ""}`}
            />
            <span aria-hidden="true" className="trace-line trace-line-right -right-px bottom-16 top-16 w-px" />
          </>
        )}
      </div>
    </section>
  );
}
