import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { DarkSection, Gap, Section } from "@/components/ui/Frame";

/**
 * Shared page-level building blocks for the inner (non-landing) pages so they
 * use the same palette and treatments as the landing page: dot-grid hero with
 * a mono eyebrow, hairline-bordered sections, orange check badges and a navy
 * call-to-action band.
 */

type PageHeroProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional vertical tab label hanging off the left edge. */
  label?: string;
  children?: ReactNode;
};

/** Centered dot-grid hero (same treatment as the landing page and the Resource Hub). */
export function PageHero({ id = "page-heading", eyebrow, title, description, label, children }: PageHeroProps) {
  return (
    <Section labelledBy={id} label={label} noBorder>
      <div className="dot-grid flex flex-col items-center border-b border-line px-6 pb-14 pt-16 text-center lg:pb-[64px] lg:pt-[88px]">
        {eyebrow && (
          <p className="mb-9 flex items-center gap-2.5 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-subtle">
            <span aria-hidden="true" className="block size-2 bg-orange" />
            {eyebrow}
          </p>
        )}
        <h1
          id={id}
          className="max-w-[860px] text-[36px] font-semibold leading-[1.15] text-ink sm:text-[46px] lg:text-[52px] lg:leading-[60px]"
        >
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-[680px] text-base leading-6 text-body">{description}</p>
        )}
        {children && <div className="mt-10 flex flex-wrap items-center justify-center gap-3">{children}</div>}
      </div>
    </Section>
  );
}

type SectionIntroProps = {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Draw the hairline under the intro (use when a grid of cells follows). */
  ruled?: boolean;
};

/** Centered section title (+ optional paragraph), matching the landing "Validation" heading. */
export function SectionIntro({ id, title, description, ruled = false }: SectionIntroProps) {
  return (
    <div
      className={`px-6 py-12 text-center lg:py-[72px] ${ruled ? "border-b border-line" : ""}`}
    >
      <h2
        id={id}
        className="mx-auto max-w-[720px] text-[28px] font-semibold leading-[1.25] text-ink lg:text-[40px] lg:leading-[50px]"
      >
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-[25px] text-body">{description}</p>
      )}
    </div>
  );
}

/** Small orange square with an ink check, used wherever the old pages had a purple check badge. */
export function CheckBadge({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-6 shrink-0 items-center justify-center rounded-[3px] bg-orange text-ink ${className}`}
    >
      <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

/** Mono "/01" style index, as used in the Why Navable and Resource Hub sections. */
export function MonoIndex({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`font-mono text-[11px] leading-none ${dark ? "text-orange" : "text-ink"}`}
    >
      {children}
    </span>
  );
}

type CtaBandProps = {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  cta: string;
  href?: string;
};

/** Navy call-to-action band that closes every inner page (replaces the old purple block). */
export function CtaBand({ id = "cta-heading", title, description, cta, href = "/demo" }: CtaBandProps) {
  return (
    <>
      <Gap />
      <DarkSection labelledBy={id} traceLines>
        <div className="dot-grid-dark flex flex-col items-start gap-8 px-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-[63px]">
          <div className="max-w-[600px]">
            <h2
              id={id}
              className="text-[32px] font-semibold leading-[1.25] text-white lg:text-[40px] lg:leading-[50px]"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-5 text-[15px] leading-[25px] text-navy-text">{description}</p>
            )}
          </div>
          <Button href={href} size="lg" className="shrink-0">
            {cta}
          </Button>
        </div>
      </DarkSection>
    </>
  );
}
