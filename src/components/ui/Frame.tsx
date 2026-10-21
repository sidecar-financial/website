import type { ReactNode } from "react";

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

/** Small dots where the horizontal rule meets the vertical rules. */
export function CornerDots({ dark = false, position = "bottom" }: { dark?: boolean; position?: "top" | "bottom" }) {
  const color = dark ? "bg-[#4b40b8]" : "bg-[#dcdcf0]";
  const y = position === "bottom" ? "-bottom-[3px]" : "-top-[3px]";
  return (
    <>
      <span aria-hidden="true" className={`absolute ${y} -left-[3px] z-10 block size-[5px] rounded-full ${color}`} />
      <span aria-hidden="true" className={`absolute ${y} -right-[3px] z-10 block size-[5px] rounded-full ${color}`} />
    </>
  );
}

type DarkSectionProps = {
  children: ReactNode;
  label?: string;
  id?: string;
  labelledBy?: string;
};

/**
 * Navy section: full-bleed background, 64px bands above and below the content
 * each closed by a rule, vertical rules continuing through the bands.
 */
export function DarkSection({ children, label, id, labelledBy }: DarkSectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className="on-dark relative bg-navy text-white">
      <div className={`relative mx-auto ${FRAME_WIDTH} border-x border-navy-line`}>
        <div aria-hidden="true" className="relative h-16 border-b border-navy-line">
          <CornerDots dark position="bottom" />
        </div>
        <div className="relative">
          {label && <SideLabel dark>{label}</SideLabel>}
          {children}
        </div>
        <div aria-hidden="true" className="relative h-16 border-t border-navy-line">
          <CornerDots dark position="top" />
        </div>
      </div>
    </section>
  );
}
