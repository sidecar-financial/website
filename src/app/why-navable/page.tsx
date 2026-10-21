import { Metadata } from "next";
import Button from "@/components/ui/Button";
import { Section } from "@/components/ui/Frame";
import { CtaBand, PageHero, SectionIntro } from "@/components/ui/PageBlocks";

export const metadata: Metadata = {
  title: "Why Navable | Modern Carried Interest Management",
  description:
    "Discover why leading alternative asset managers choose Navable for carry, compensation, and GP commit management.",
};

const benefits = [
  {
    title: "Purpose-Built for Alternative Assets",
    description:
      "Unlike generic tools, Navable is designed specifically for PE, VC, and real estate fund operations.",
    icon: (
      <svg className="size-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Eliminate Excel Risk",
    description:
      "Move beyond error-prone spreadsheets with a centralized, auditable platform.",
    icon: (
      <svg className="size-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Save Hundreds of Hours",
    description:
      "Automate complex calculations and reporting that used to take days or weeks.",
    icon: (
      <svg className="size-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "White-Glove Onboarding",
    description:
      "Our expert team ensures smooth implementation in under three weeks.",
    icon: (
      <svg className="size-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "$150B+", label: "AUM on Platform" },
  { value: "100+", label: "Fund Vehicles" },
  { value: "99.9%", label: "Calculation Accuracy" },
  { value: "3 weeks", label: "Average Onboarding" },
];

export default function WhyNavablePage() {
  return (
    <>
      <PageHero
        eyebrow="Why Navable"
        title={
          <>
            The Modern Way to <span className="text-orange">Manage Carry</span>
          </>
        }
        description="Leading alternative asset managers choose Navable to eliminate spreadsheet chaos and bring confidence to their carry, compensation, and GP commit operations."
      >
        <Button href="/demo" size="lg">
          Book a Free Demo
        </Button>
        <Button href="/solutions/carried-interest-software" variant="secondary" size="lg">
          Explore Platform
        </Button>
      </PageHero>

      {/* Stats */}
      <Section labelledBy="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Navable by the numbers
        </h2>
        <dl className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse bg-white px-6 py-10 text-center lg:py-14">
              <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
                {stat.label}
              </dt>
              <dd className="text-3xl font-semibold text-ink sm:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Benefits */}
      <Section label="Benefits" labelledBy="benefits-heading">
        <SectionIntro
          id="benefits-heading"
          title="Built Different. Built Better."
          description="Navable was created by industry veterans who understand the unique challenges of alternative asset management."
          ruled
        />
        <ul className="grid md:grid-cols-2">
          {benefits.map((benefit) => (
            <li
              key={benefit.title}
              className="border-b border-line px-6 py-10 last:border-b-0 md:border-b-0 md:[&:nth-child(-n+2)]:border-b md:[&:nth-child(odd)]:border-r lg:px-12 lg:py-12"
            >
              <span className="mb-6 flex size-12 items-center justify-center rounded-[3px] bg-soft text-ink">
                {benefit.icon}
              </span>
              <h3 className="text-xl font-medium leading-7 text-ink">{benefit.title}</h3>
              <p className="mt-3 text-[15px] leading-[25px] text-body">{benefit.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={
          <>
            Ready to <span className="text-orange">Transform Your Operations?</span>
          </>
        }
        description="Join the leading alternative asset managers who trust Navable for their carry and compensation management."
        cta="Schedule a Demo"
      />
    </>
  );
}
