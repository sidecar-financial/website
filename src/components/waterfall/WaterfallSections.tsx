import Link from "next/link";
import type { ReactNode } from "react";
import { DarkSection, Section } from "@/components/ui/Frame";
import { PlatformFit } from "@/components/waterfall/PlatformFit";
import SpotlightAnim, { type SpotlightKind } from "@/components/waterfall/SpotlightAnim";
import WaitlistForm from "@/components/waterfall/WaitlistForm";
import WaterfallAnimation from "@/components/waterfall/WaterfallAnimation";
import {
  CompareIcon,
  ManyFundsIcon,
  ReopenIcon,
  SignOffIcon,
  TraceIcon,
  WorkbookIcon,
} from "@/components/waterfall/icons";

/**
 * Sections of /waterfall, in page order. Copy comes from the
 * "Navable Waterfall" design (v3); layout is rebuilt with the site's frame
 * components and tokens.
 */

const H2 =
  "text-[clamp(32px,3.8vw,46px)] font-semibold leading-[1.1] tracking-[-0.025em] text-pretty";

/** Left-aligned section heading in its own ruled band (the design's section opener). */
function HeadingBand({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="border-b border-line px-6 py-14 lg:px-12 lg:py-20">
      <h2 id={id} className={`${H2} text-ink ${className}`}>
        {children}
      </h2>
    </div>
  );
}

/* ------------------------------ Hero ------------------------------ */

export function HeroSection() {
  return (
    <Section labelledBy="waterfall-hero">
      {/* Stacked, centered "vertical" hero (same structure as the earlier coming-soon page):
          badges, headline, subcopy, early-access signup, secondary links, then the chart. */}
      <div className="dot-grid flex flex-col items-center px-5 pb-[clamp(48px,6vw,72px)] pt-[clamp(40px,6vw,80px)] text-center sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <p className="flex items-center gap-2.5 rounded-md border border-line bg-white px-3 py-2 font-mono text-xs uppercase leading-none tracking-[0.12em] text-ink">
            <span aria-hidden="true" className="block size-[7px] bg-orange" />
            Navable Waterfall
          </p>
          <p className="rounded-md border border-[#F2D29A] bg-[#FFF8EB] px-3 py-2 font-mono text-xs uppercase leading-none tracking-[0.12em] text-[#7A4A00]">
            Coming soon
          </p>
        </div>
        <h1
          id="waterfall-hero"
          className="mt-6 max-w-[900px] text-[clamp(34px,4.8vw,60px)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink text-pretty"
        >
          The provable waterfall engine fund administrators run and{" "}
          <span className="text-orange">auditors can recalculate</span>
        </h1>
        <p className="mt-5 max-w-[640px] text-[clamp(16px,1.4vw,18px)] leading-[1.55] text-body text-pretty">
          Waterfall turns the economics in a fund&apos;s LPA into a calculation that fund
          administrators run, GPs approve and auditors can recalculate, without rebuilding it in
          Excel.
        </p>

        {/* Primary CTA: early-access signup. `#early-access` anchors land here. */}
        <div id="early-access" className="mt-8 flex w-full flex-col items-center">
          <WaitlistForm className="max-w-[560px]" />
          <p className="mt-3 max-w-[560px] text-sm leading-[1.5] text-body">
            Enter your work email and we&apos;ll let you know when early access opens.
          </p>
        </div>

        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-0 text-[15px]">
          <Link
            href="/demo"
            className="inline-flex min-h-[44px] items-center font-medium text-ink underline decoration-[#B8B6C9] underline-offset-4 transition-colors hover:decoration-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            Book a walkthrough
          </Link>
          <a
            href="#trace"
            className="inline-flex min-h-[44px] items-center text-body underline decoration-[#B8B6C9] underline-offset-4 transition-colors hover:text-ink hover:decoration-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            See how a number is traced
          </a>
        </p>

        <figure className="mt-10 w-full max-w-[960px] overflow-hidden rounded-xl border border-[#DCDBE6] bg-white py-2 shadow-[0_30px_60px_-30px_rgba(31,28,58,0.35)]">
          <WaterfallAnimation />
        </figure>
      </div>
    </Section>
  );
}

/* ------------------------- What it covers ------------------------- */

export function JobsSection() {
  return (
    <Section labelledBy="waterfall-jobs">
      <div className="flex flex-wrap gap-px bg-line">
        <div className="shrink grow basis-[300px] bg-white px-6 py-8 lg:px-12">
          <h2
            id="waterfall-jobs"
            className="text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-ink"
          >
            It covers both jobs a waterfall does
          </h2>
        </div>
        <div className="flex shrink grow basis-[300px] gap-3.5 bg-white px-6 py-8 lg:px-12">
          <span aria-hidden="true" className="mt-1 block size-2.5 shrink-0 bg-[#4C46A3]" />
          <p className="text-base leading-[1.5] text-[#3E3C5A]">
            <strong className="font-semibold text-ink">Actual distributions,</strong> when cash goes
            out to investors.
          </p>
        </div>
        <div className="flex shrink grow basis-[300px] gap-3.5 bg-white px-6 py-8 lg:px-12">
          <span aria-hidden="true" className="mt-1 block size-2.5 shrink-0 bg-orange" />
          <p className="text-base leading-[1.5] text-[#3E3C5A]">
            <strong className="font-semibold text-ink">Quarter-end carry accruals,</strong> a
            hypothetical liquidation at each NAV.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------- The problem --------------------------- */

const PROBLEMS: { title: string; body: string }[] = [
  {
    title: "Auditors ask for the formula behind the number.",
    body: "When a tool can't show the math, teams keep a parallel spreadsheet, and the spreadsheet stays the real system.",
  },
  {
    title: "Real LPAs break rigid tools.",
    body: "Deal-by-deal waterfalls, side letters and investor exceptions outrun fixed configuration screens.",
  },
  {
    title: "Mistakes surface late.",
    body: "A setup error can show up years later, after the cash has already gone out.",
  },
  {
    title: "Every client hits quarter-end at once.",
    body: "Administrators need to review many funds without a specialist rebuilding each one.",
  },
];

export function ProblemSection() {
  return (
    <Section id="problem" label="The problem" labelledBy="waterfall-problem">
      <HeadingBand id="waterfall-problem" className="max-w-[820px]">
        Most waterfalls still live in Excel,{" "}
        <span className="text-orange">even at firms that bought software.</span>
      </HeadingBand>
      <ul role="list" className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {PROBLEMS.map((p, i) => (
          <li key={p.title} className="bg-white px-6 pb-10 pt-8 lg:px-8">
            <p className="font-mono text-xs font-medium leading-none tracking-[0.1em] text-body">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 text-lg font-semibold leading-[1.3] text-ink">{p.title}</h3>
            <p className="mt-2.5 text-[15px] leading-[1.55] text-body">{p.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* --------------------------- How it works --------------------------- */

const STEPS: { title: string; body: string }[] = [
  {
    title: "Read the terms.",
    body: "AI reads the LPA, amendments and side letters and proposes how each clause works. Your team confirms every clause before it counts.",
  },
  {
    title: "Load fund data.",
    body: "Bring commitments, contributions, proceeds, fees and expenses from Excel or CSV.",
  },
  {
    title: "Calculate.",
    body: "A deterministic engine runs the waterfall. Same inputs, same answer, every time.",
  },
  {
    title: "Prove it.",
    body: "Trace any number, compare with your own model, sign off, and export a live Excel workbook.",
  },
];

export function HowItWorksSection() {
  return (
    <DarkSection id="how" label="How it works" labelledBy="waterfall-how">
      <div className="grid lg:grid-cols-2">
        <div className="dot-grid-dark px-6 py-12 lg:px-12 lg:py-16">
          <h2 id="waterfall-how" className={`${H2} text-white`}>
            From LPA to a number <span className="text-orange">you can prove</span>
          </h2>
        </div>
        <ol
          role="list"
          className="border-t border-navy-line px-6 py-12 lg:border-l lg:border-t-0 lg:px-12 lg:py-16"
        >
          {STEPS.map((step, i) => {
            const last = i === STEPS.length - 1;
            return (
              <li
                key={step.title}
                className={`relative grid grid-cols-[44px_minmax(0,1fr)] gap-x-6 ${last ? "" : "pb-10"}`}
              >
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-[21px] top-11 w-px bg-navy-border"
                  />
                )}
                <span
                  aria-hidden="true"
                  className={`flex size-11 items-center justify-center rounded-full border font-mono text-sm font-medium leading-none ${
                    last
                      ? "border-orange bg-orange text-ink"
                      : "border-navy-border bg-navy text-white"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="pt-2.5">
                  <h3 className="text-xl font-semibold leading-[1.3] text-white">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[520px] text-base leading-[1.6] text-navy-text">
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </DarkSection>
  );
}

/* ----------------------------- Features ----------------------------- */

const FEATURES: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Trace any number",
    body: "Open any amount to see the formula, the source records and the LPA clause behind it.",
    icon: <TraceIcon />,
  },
  {
    title: "Compare with your own model",
    body: "Upload the Excel model you trust today. Waterfall matches it cell by cell and shows every difference, with the reason.",
    icon: <CompareIcon />,
  },
  {
    title: "A workbook your auditor can recalculate",
    body: "Export live Excel formulas tied to the inputs and the terms, not a pasted table of values.",
    icon: <WorkbookIcon />,
  },
  {
    title: "Review and sign-off built in",
    body: "The preparer and the reviewer are different people. Sign-off locks the exact data, terms and version that were approved.",
    icon: <SignOffIcon />,
  },
  {
    title: "Reopen any calculation",
    body: "Every locked calculation can be reopened and gives the same result. When the terms or data change, earlier sign-offs are flagged for review.",
    icon: <ReopenIcon />,
  },
  {
    title: "Built for many funds",
    body: "One workspace across your clients, with each client's data kept separate and the exceptions shown first.",
    icon: <ManyFundsIcon />,
  },
];

export function FeaturesSection() {
  return (
    <Section id="features" label="Features" labelledBy="waterfall-features">
      <HeadingBand id="waterfall-features" className="max-w-[760px]">
        Built to be checked, <span className="text-orange">not just trusted</span>
      </HeadingBand>
      <ul role="list" className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <li key={f.title} className="bg-white px-6 pb-10 pt-8 lg:px-8">
            {f.icon}
            <h3 className="mt-6 text-lg font-semibold leading-[1.3] text-ink">{f.title}</h3>
            <p className="mt-2.5 text-[15px] leading-[1.55] text-body">{f.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ----------------------- Product spotlights ----------------------- */

type Spotlight = {
  id?: string;
  kind: SpotlightKind;
  eyebrow: string;
  title: string;
  body?: string;
};

const SPOTLIGHTS: Spotlight[] = [
  {
    id: "trace",
    kind: "trace",
    eyebrow: "Trace",
    title: "Every number has a reason.",
    body: "Click any amount and follow it down: the tier, the formula, the records it came from, and the clause that says so.",
  },
  {
    kind: "compare",
    eyebrow: "Compare",
    title: "Keep your model until you don't need it.",
    body: "Run Waterfall in parallel with your spreadsheet. It shows where the two agree, where they differ, and why. Explain a difference or accept it within policy; both go into the evidence.",
  },
  {
    kind: "review",
    eyebrow: "Review",
    title: "Ready for review.",
    body: "Each distribution opens as a record with its summary, fees and expenses, trace, differences, sign-off, versions and evidence in one place.",
  },
  {
    kind: "exceptions",
    eyebrow: "Scale",
    title: "Exceptions first, across every client.",
  },
];

export function SpotlightsSection() {
  return (
    <Section>
      <div role="group" aria-label="Product spotlights" className="flex flex-col gap-px bg-line">
        {SPOTLIGHTS.map((s, i) => {
          const flip = i % 2 === 1;
          const headingId = `waterfall-spotlight-${s.kind}`;
          return (
            <article
              key={s.kind}
              id={s.id}
              aria-labelledby={headingId}
              className={`flex flex-wrap items-center gap-x-14 gap-y-10 px-6 py-12 lg:px-12 lg:py-20 ${
                flip ? "flex-row-reverse bg-soft" : "bg-white"
              }`}
            >
              <div className="max-w-[400px] shrink grow basis-[300px]">
                <p className="font-mono text-xs font-medium uppercase leading-none tracking-[0.12em] text-[#4C46A3]">
                  {s.eyebrow}
                </p>
                <h2
                  id={headingId}
                  className="mt-4 text-[clamp(28px,3vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink text-pretty"
                >
                  {s.title}
                </h2>
                {s.body && <p className="mt-4 text-base leading-[1.6] text-body">{s.body}</p>}
              </div>
              <figure className="m-0 min-w-0 shrink grow-[2] basis-[440px]">
                <div
                  className={`rounded-xl border border-line p-[clamp(14px,3vw,32px)] [background-image:radial-gradient(#D9D8E5_1px,transparent_1px)] [background-size:16px_16px] ${
                    flip ? "bg-white" : "bg-soft"
                  }`}
                >
                  <SpotlightAnim kind={s.kind} />
                </div>
              </figure>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------------------- Who it's for ---------------------------- */

const AUDIENCES: { who: string; body: string }[] = [
  {
    who: "Fund administrators",
    body: "Run waterfalls across your clients without a parallel workbook for each fund.",
  },
  {
    who: "GP finance teams",
    body: "Check your administrator's number and approve it with the evidence in front of you.",
  },
  {
    who: "Auditors",
    body: "Get the finalized version, its inputs, its terms and a workbook you can recalculate.",
  },
];

export function WhoSection() {
  return (
    <Section label="Who it's for" labelledBy="waterfall-who">
      <HeadingBand id="waterfall-who">Who it&apos;s for</HeadingBand>
      <ul role="list" className="grid gap-px bg-line md:grid-cols-3">
        {AUDIENCES.map((a) => (
          <li key={a.who} className="bg-white px-6 pb-10 pt-8 lg:px-8">
            <h3 className="border-b border-line pb-4 font-mono text-xs font-semibold uppercase leading-none tracking-[0.1em] text-ink">
              {a.who}
            </h3>
            <p className="mt-5 text-[17px] leading-[1.5] text-[#3E3C5A]">{a.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------------------- Where it fits ---------------------------- */

export function WhereItFitsSection() {
  return (
    <Section labelledBy="waterfall-fit">
      <div className="bg-soft px-6 py-14 lg:px-12 lg:py-24">
        <div className="flex flex-wrap items-end gap-x-16 gap-y-6">
          <h2 id="waterfall-fit" className={`${H2} shrink grow basis-[320px] text-ink`}>
            Where it fits
          </h2>
          <div className="shrink grow basis-[420px]">
            <p className="text-base leading-[1.6] text-body">
              Waterfall splits fund proceeds between LPs and the GP. The GP&apos;s carry then flows
              into Navable Carry, which allocates it to individual participants. Together they cover
              the path from fund proceeds to a person&apos;s carry statement.
            </p>
            <p className="mt-4 text-[15px]">
              <Link
                href="/solutions/carried-interest-software"
                className="font-medium text-[#4C46A3] underline-offset-2 hover:text-ink hover:underline"
              >
                See Navable Carry →
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-12 rounded-xl border border-line bg-white">
          <PlatformFit />
        </div>
      </div>
    </Section>
  );
}
