import Image from "next/image";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { Section } from "@/components/ui/Frame";
import { SectionIntro } from "@/components/ui/PageBlocks";
import {
  HowItWorksSteps,
  PlatformFit,
  TraceANumber,
  WaterfallTiers,
} from "@/components/waterfall/diagrams";
import {
  ExcelWorkbookIcon,
  ExceptionsFirstIcon,
  ManyClientsIcon,
  ReadTermsIcon,
  ReconcileIcon,
  SignOffIcon,
  TraceIcon,
  VersionsIcon,
} from "@/components/waterfall/icons";

/**
 * Sections that follow the hero on /solutions/waterfall. All copy is drawn from
 * the supplied diagrams and product screens (sample data throughout).
 */

/* ---------------------------- Tiers ---------------------------- */

export function TiersSection() {
  return (
    <Section label="Tiers" labelledBy="waterfall-tiers">
      <SectionIntro
        id="waterfall-tiers"
        title="How a distribution waterfall allocates cash, tier by tier"
        description="Distributable cash moves down the tiers in order: first to limited partners, then shared with the general partner."
        ruled
      />
      <div className="px-6 py-12 lg:px-12 lg:py-14">
        <WaterfallTiers />
      </div>
    </Section>
  );
}

/* ------------------------- How it works ------------------------- */

export function HowItWorksSection() {
  return (
    <Section label="How it works" labelledBy="waterfall-how">
      <SectionIntro id="waterfall-how" title="How Waterfall works in four steps" ruled />
      <HowItWorksSteps />
    </Section>
  );
}

/* --------------------------- Features --------------------------- */

const FEATURES: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Read the terms",
    body: "AI reads the LPA, amendments and side letters. You confirm each clause.",
    icon: <ReadTermsIcon />,
  },
  {
    title: "Live Excel workbook",
    body: "Bring your Excel or CSV in, and export a live Excel workbook out.",
    icon: <ExcelWorkbookIcon />,
  },
  {
    title: "Reconcile to your model",
    body: "Compare results with the client's own Excel model. Every difference is explained, or accepted within policy.",
    icon: <ReconcileIcon />,
  },
  {
    title: "Exceptions first",
    body: "Anything waiting on a reviewer, the client or counsel comes first.",
    icon: <ExceptionsFirstIcon />,
  },
  {
    title: "Versions you can reproduce",
    body: "A deterministic engine: same inputs, same answer. Each calculation pins the model version it ran on.",
    icon: <VersionsIcon />,
  },
  {
    title: "Sign off and lock",
    body: "You never see a calculation you prepared as yours to sign off.",
    icon: <SignOffIcon />,
  },
  {
    title: "Many clients, one workspace",
    body: "Open items across your clients in one place. Each client is listed separately; no amounts are combined.",
    icon: <ManyClientsIcon />,
  },
  {
    title: "Trace any number",
    body: "Every result traces to its formula, its source records and the clause that governs it.",
    icon: <TraceIcon />,
  },
];

export function FeaturesSection() {
  return (
    <Section label="Features" labelledBy="waterfall-features">
      <SectionIntro id="waterfall-features" title="Built so you can prove every number" ruled />
      <ul role="list" className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <li key={feature.title} className="bg-white px-6 py-8 lg:px-8 lg:py-10">
            <span className="flex size-[60px] items-center justify-center rounded-lg border border-line bg-soft text-ink">
              {feature.icon}
            </span>
            <h3 className="mt-6 text-lg font-semibold leading-[1.3] text-ink">{feature.title}</h3>
            <p className="mt-2 text-[15px] leading-6 text-body">{feature.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------- Platform fit ------------------------- */

export function PlatformFitSection() {
  return (
    <Section label="Platform" labelledBy="waterfall-platform">
      <SectionIntro
        id="waterfall-platform"
        title="Where Waterfall sits"
        description="From LPA terms and fund data, to LP distributions and GP carry."
        ruled
      />
      <PlatformFit />
    </Section>
  );
}

/* --------------------------- Product ---------------------------- */

type Screen = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

/**
 * Browser-style frame for a product screenshot. The screens are 1440px-wide
 * captures, so below `lg` they keep a readable width inside a focusable,
 * horizontally scrollable region instead of shrinking to unreadable type.
 */
function ScreenFrame({ screen }: { screen: Screen }) {
  return (
    <figure className="mt-8">
      <p aria-hidden="true" className="mb-2 font-mono text-[11px] uppercase leading-none tracking-[0.12em] text-subtle lg:hidden">
        Swipe sideways to see the full screen →
      </p>
      <div
        role="region"
        aria-label={`${screen.label} screen, scrolls sideways on small screens`}
        tabIndex={0}
        className="overflow-x-auto rounded-xl border border-line-strong bg-white shadow-[0_30px_60px_-30px_rgba(31,28,58,0.35)]"
      >
        <div className="min-w-[880px] lg:min-w-0">
          <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-line bg-soft px-4">
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
          </div>
          <Image
            src={screen.src}
            alt={screen.alt}
            width={screen.width}
            height={screen.height}
            sizes="(min-width: 1128px) 1076px, (min-width: 1024px) 90vw, 880px"
            className="block h-auto w-full"
            unoptimized
          />
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[11px] uppercase leading-none tracking-[0.12em] text-subtle">
        Sample data
      </figcaption>
    </figure>
  );
}

function ProductRow({
  id,
  title,
  body,
  screen,
  before,
}: {
  id: string;
  title: string;
  body: ReactNode;
  screen: Screen;
  /** Optional content between the text and the screen (e.g. the trace diagram). */
  before?: ReactNode;
}) {
  return (
    <article
      aria-labelledby={id}
      className="border-b border-line px-6 py-12 last:border-b-0 lg:px-12 lg:py-16"
    >
      <h3 id={id} className="max-w-[620px] text-[24px] font-semibold leading-[1.25] text-ink lg:text-[28px]">
        {title}
      </h3>
      <p className="mt-4 max-w-[620px] text-[15px] leading-[25px] text-body">{body}</p>
      {before && <div className="mt-8">{before}</div>}
      <ScreenFrame screen={screen} />
    </article>
  );
}

export function ProductSection() {
  return (
    <Section label="In the product" labelledBy="waterfall-product">
      <SectionIntro
        id="waterfall-product"
        title="See it in the product"
        description="Screens from the Waterfall workspace, shown with sample data."
        ruled
      />
      <ProductRow
        id="waterfall-product-overview"
        title="Start with what needs attention"
        body="Each fund opens on the items waiting on a reviewer, the client or counsel, with setup progress alongside: terms read from the LPA, confirmations, structure, history loaded and validation."
        screen={{
          src: "/images/waterfall/fund-overview.webp",
          alt: "Waterfall fund overview for a sample fund: a table of items needing attention with status, reason and owner, an investments table, and setup progress for terms, confirmations, structure, history and validation.",
          label: "Fund overview",
          width: 2000,
          height: 1250,
        }}
      />
      <ProductRow
        id="waterfall-product-trace"
        title="Click any amount to open its trace"
        body="Results sit in a grid you can read like a spreadsheet, with the formula behind each cell. Totals tie to distributable cash, and a short note explains why no carry has been earned yet."
        before={<TraceANumber />}
        screen={{
          src: "/images/waterfall/distribution-results.webp",
          alt: "Waterfall distribution results for a sample distribution: distributable cash, calculation details, a note on why no carry is earned yet, and a per-investor grid of preferred return, capital, catch-up and carry split with the selected cell's formula shown above.",
          label: "Distribution results",
          width: 2000,
          height: 1250,
        }}
      />
      <ProductRow
        id="waterfall-product-differences"
        title="Compare with the client's own model"
        body="Upload the client's Excel model and see every difference by LP and tier. Each one is explained, or accepted within policy with a note, who and when. Both go into the evidence."
        screen={{
          src: "/images/waterfall/differences-vs-client-model.webp",
          alt: "Waterfall differences screen: 41 of 42 cells match the client's model to the cent, with the one difference listed by LP and tier along with its explanation, and an option to accept a difference within policy with a note.",
          label: "Differences vs the client model",
          width: 2000,
          height: 1250,
        }}
      />
      <ProductRow
        id="waterfall-product-work"
        title="Work across clients in one place"
        body="Open items across your clients, exceptions first. Each client is listed separately; no amounts are combined."
        screen={{
          src: "/images/waterfall/work-across-clients.webp",
          alt: "Waterfall work screen: a table of open items across clients with fund, period, state, owner, preparer and reviewer, and due date, above a quarter-end summary by fund.",
          label: "Work across clients",
          width: 2000,
          height: 1217,
        }}
      />
    </Section>
  );
}

/* ----------------------- Repeat early-access CTA ----------------------- */

/** One repeat of the hero's early-access ask; it scrolls back to the hero form. */
export function EarlyAccessRepeat() {
  return (
    <Section labelledBy="waterfall-cta-heading">
      <div className="dot-grid flex flex-col items-center px-6 py-14 text-center lg:py-[72px]">
        <h2
          id="waterfall-cta-heading"
          className="text-[28px] font-semibold leading-[1.25] text-ink lg:text-[40px] lg:leading-[50px]"
        >
          Get early access to <span className="text-orange">Waterfall.</span>
        </h2>
        <p className="mt-4 max-w-[520px] text-[15px] leading-[25px] text-body">
          Enter your work email and we&apos;ll let you know when early access opens.
        </p>
        <Button href="#early-access" size="lg" className="mt-8">
          Get Early Access
        </Button>
      </div>
    </Section>
  );
}
