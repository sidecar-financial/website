import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Native (HTML) versions of the four marketing diagrams: waterfall tiers, how
 * it works, trace a number and platform fit. The supplied SVGs were 1200px-wide
 * images with 13-14px text and a sage/clay palette, which shrank to ~4px type on
 * phones and clashed with the site. Rebuilding them keeps every word and the
 * same structure, wraps responsively, and uses the site's palette: navy for the
 * source / emphasis, indigo tint for limited partners, amber tint for the GP.
 */

type Tone = "dark" | "lp" | "gp" | "plain";

const TONE: Record<Tone, { box: string; sub: string; eyebrow: string }> = {
  dark: { box: "border-navy bg-navy text-white", sub: "text-navy-text", eyebrow: "text-navy-text" },
  lp: { box: "border-[#D3D0EC] bg-[#EEEDF8] text-ink", sub: "text-body", eyebrow: "text-body" },
  gp: { box: "border-[#F2D29A] bg-[#FFF1D6] text-ink", sub: "text-[#6B4300]", eyebrow: "text-[#6B4300]" },
  plain: { box: "border-line-strong bg-soft text-ink", sub: "text-body", eyebrow: "text-body" },
};

function Card({
  tone,
  eyebrow,
  title,
  sub,
  className = "",
}: {
  tone: Tone;
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
}) {
  const t = TONE[tone];
  return (
    <div className={`rounded-xl border px-5 py-4 ${t.box} ${className}`}>
      {eyebrow && (
        <p className={`mb-2 font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.12em] ${t.eyebrow}`}>
          {eyebrow}
        </p>
      )}
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
    <svg width="28" height="24" viewBox="0 0 28 24" {...arrowProps} className={`text-subtle ${className}`}>
      <path d="M3 12h20m-6-6 6 6-6 6" />
    </svg>
  );
}

function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="28" viewBox="0 0 24 28" {...arrowProps} className={`text-subtle ${className}`}>
      <path d="M12 3v20m-6-6 6 6 6-6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Waterfall tiers                                                     */
/* ------------------------------------------------------------------ */

const TIERS: { n: string; title: string; sub: string; tone: Tone }[] = [
  { n: "1", title: "Return of capital", sub: "LPs get back what they put in", tone: "lp" },
  { n: "2", title: "Preferred return", sub: "LPs earn their hurdle, e.g. 8%", tone: "lp" },
  { n: "3", title: "GP catch-up", sub: "The GP catches up to its share", tone: "gp" },
  { n: "4", title: "Carried interest split", sub: "The rest splits, e.g. 80 / 20", tone: "gp" },
];

const TIER_STEP = ["lg:mt-0", "lg:mt-7", "lg:mt-14", "lg:mt-[84px]"];

/** Staircase of the four tiers under the distributable-cash source. */
export function WaterfallTiers() {
  return (
    <figure>
      <Card
        tone="dark"
        title="Distributable cash"
        sub="Proceeds less reserves and expenses"
        className="max-w-[360px]"
      />
      <ol role="list" className="mt-6 grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {TIERS.map((tier, i) => (
          // Each tier steps down from the one before it on wide screens.
          <li key={tier.n} className={TIER_STEP[i]}>
            <Card tone={tier.tone} eyebrow={`Tier ${tier.n}`} title={tier.title} sub={tier.sub} />
          </li>
        ))}
      </ol>
      <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] leading-5 text-body lg:mt-6">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="size-3.5 rounded-[4px] border border-[#D3D0EC] bg-[#EEEDF8]" />
          To limited partners
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="size-3.5 rounded-[4px] border border-[#F2D29A] bg-[#FFF1D6]" />
          Shared with the general partner
        </span>
        <span className="sm:ml-auto">Illustrative. Each fund follows its own LPA.</span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

const STEPS: { title: string; body: string }[] = [
  { title: "Read the terms", body: "AI reads the LPA, amendments and side letters. You confirm each clause." },
  { title: "Load fund data", body: "Bring your Excel or CSV: commitments, contributions, proceeds, fees." },
  { title: "Calculate", body: "A deterministic engine runs the waterfall. Same inputs, same answer." },
  {
    title: "Prove it",
    body: "Trace any number, compare to your model, sign off, export a live Excel workbook.",
  },
];

export function HowItWorksSteps() {
  return (
    <ol role="list" className="grid gap-4 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-12 lg:py-16">
      {STEPS.map((step, i) => {
        const last = i === STEPS.length - 1;
        return (
          <li
            key={step.title}
            className={`relative rounded-xl border p-6 ${
              last ? "border-[#F2D29A] bg-[#FFF1D6]" : "border-line-strong bg-soft"
            }`}
          >
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-full border-2 border-ink bg-white text-[15px] font-bold text-ink"
            >
              {i + 1}
            </span>
            <h3 className="mt-6 text-xl font-semibold leading-[1.3] text-ink">{step.title}</h3>
            <p className={`mt-2 text-[15px] leading-6 ${last ? "text-[#6B4300]" : "text-body"}`}>{step.body}</p>
            {!last && (
              <ArrowRight className="absolute -right-[22px] top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white lg:block" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Trace a number                                                      */
/* ------------------------------------------------------------------ */

const TRACE: { eyebrow: string; title: string; sub: string; tone: Tone }[] = [
  { eyebrow: "The number", title: "LP-03 preferred return", sub: "1,971,538.71", tone: "dark" },
  { eyebrow: "The formula", title: "=MIN(available, accrued pref)", sub: "Monthly compounding, 8%", tone: "plain" },
  { eyebrow: "The inputs", title: "Contributions since 2023", sub: "Ledger load, Sep 28", tone: "plain" },
  { eyebrow: "The term", title: "LPA §4.2(a)(i)", sub: "Says: compounded monthly", tone: "gp" },
];

export function TraceANumber() {
  return (
    <figure>
      <ol role="list" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TRACE.map((item, i) => (
          <li key={item.eyebrow} className="relative">
            <Card tone={item.tone} eyebrow={item.eyebrow} title={item.title} sub={item.sub} className="h-full" />
            {i < TRACE.length - 1 && (
              <ArrowRight className="absolute -right-[22px] top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white lg:block" />
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-sm leading-6 text-body">
        Every result traces to its formula, its source records and the clause that governs it. Sample data.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Platform fit                                                        */
/* ------------------------------------------------------------------ */

function CarryLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/solutions/carried-interest-software"
      className={`block rounded-xl border border-line-strong bg-soft px-5 py-4 text-ink transition-colors hover:border-ink ${className}`}
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
        <div aria-hidden="true" className="relative col-start-4 row-span-2 row-start-1 h-full text-subtle">
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
