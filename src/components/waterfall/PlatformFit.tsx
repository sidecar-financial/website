import Link from "next/link";
import type { ReactNode } from "react";

/**
 * "Where it fits" diagram: LPA terms + fund data -> Waterfall -> LP distributions
 * and GP carry pool -> Navable Carry. Native HTML rather than the design's 1200px
 * SVG so the text stays readable on phones (stacks top to bottom) and "Navable
 * Carry" is a real link. Same labels, same flow and the design's colors.
 */

type Tone = "dark" | "lp" | "gp" | "plain";

const TONE: Record<Tone, { box: string; sub: string }> = {
  dark: { box: "border-[#4C46A3] bg-[#4C46A3] text-white", sub: "text-[#EEEDF8]" },
  lp: { box: "border-[#A9A5D6] bg-[#DCDAF0] text-ink", sub: "text-body" },
  gp: { box: "border-orange bg-[#FFF1D6] text-ink", sub: "text-[#6B4300]" },
  plain: { box: "border-line bg-soft text-ink", sub: "text-body" },
};

function Card({
  tone,
  title,
  sub,
  className = "",
}: {
  tone: Tone;
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
}) {
  const t = TONE[tone];
  return (
    <div className={`rounded-xl border px-5 py-4 ${t.box} ${className}`}>
      <p className="text-[17px] font-semibold leading-snug">{title}</p>
      {sub && <p className={`mt-1 text-sm leading-[1.45] ${t.sub}`}>{sub}</p>}
    </div>
  );
}

const arrowProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="24" viewBox="0 0 28 24" {...arrowProps} className={`text-[#4C46A3] ${className}`}>
      <path d="M3 12h20m-6-6 6 6-6 6" />
    </svg>
  );
}

function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="28" viewBox="0 0 24 28" {...arrowProps} className={`text-[#4C46A3] ${className}`}>
      <path d="M12 3v20m-6-6 6 6 6-6" />
    </svg>
  );
}

function CarryLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/solutions/carried-interest-software"
      className={`block rounded-xl border border-line bg-soft px-5 py-4 text-ink transition-colors hover:border-ink ${className}`}
    >
      <span className="block text-[17px] font-semibold leading-snug">Navable Carry</span>
      <span className="mt-1 block text-sm leading-[1.45] text-body">Per participant</span>
    </Link>
  );
}

export function PlatformFit() {
  return (
    <div className="px-6 py-12 lg:px-12 lg:py-16">
      {/* Wide screens: source -> Waterfall -> LP / GP, GP carry continues into Navable Carry. */}
      <div
        role="group"
        aria-label="Where Waterfall sits: from LPA terms to LP distributions and GP carry"
        className="hidden grid-cols-[minmax(0,1.15fr)_28px_minmax(0,1fr)_44px_minmax(0,1.15fr)_28px_minmax(0,0.85fr)] grid-rows-2 items-center gap-y-6 lg:grid"
      >
        <Card
          tone="plain"
          title="LPA terms + fund data"
          sub="Documents and records"
          className="col-start-1 row-span-2 row-start-1"
        />
        <ArrowRight className="col-start-2 row-span-2 row-start-1 justify-self-center" />
        <Card tone="dark" title="Waterfall" sub="Fund-level split" className="col-start-3 row-span-2 row-start-1" />

        {/* Fork: one line out of Waterfall, two arrows into LP and GP. */}
        <div aria-hidden="true" className="relative col-start-4 row-span-2 row-start-1 h-full text-[#4C46A3]">
          <svg viewBox="0 0 44 100" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none">
            <path
              d="M0 50H20V25H38M20 50V75H38"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className="absolute right-[4px] top-1/4 size-2 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-current" />
          <span className="absolute right-[4px] top-3/4 size-2 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-current" />
        </div>

        <Card
          tone="lp"
          title="LP distributions"
          sub="Allocations and reporting"
          className="col-start-5 row-start-1"
        />
        <Card
          tone="gp"
          title="GP carry pool"
          sub="Carried interest earned"
          className="col-start-5 row-start-2"
        />
        <ArrowRight className="col-start-6 row-start-2 justify-self-center" />
        <CarryLink className="col-start-7 row-start-2" />
      </div>

      {/* Narrow screens: the same flow, top to bottom. */}
      <div className="flex flex-col items-stretch gap-3 lg:hidden">
        <Card tone="plain" title="LPA terms + fund data" sub="Documents and records" />
        <ArrowDown className="self-center" />
        <Card tone="dark" title="Waterfall" sub="Fund-level split" />
        <ArrowDown className="self-center" />
        <div className="grid gap-3 sm:grid-cols-2">
          <Card tone="lp" title="LP distributions" sub="Allocations and reporting" />
          <Card tone="gp" title="GP carry pool" sub="Carried interest earned" />
        </div>
        <ArrowDown className="self-center" />
        <CarryLink />
      </div>
    </div>
  );
}
