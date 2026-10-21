import { Metadata } from "next";
import { Section } from "@/components/ui/Frame";
import { CheckBadge, CtaBand, PageHero, SectionIntro } from "@/components/ui/PageBlocks";

export const metadata: Metadata = {
  title: "How It Works | Navable",
  description:
    "Learn how Navable simplifies carry, compensation, and GP commit management in three easy steps.",
};

const steps = [
  {
    number: "01",
    title: "Onboard Your Data",
    description:
      "Our team works with you to migrate your existing carry plans, participant data, and waterfall rules into Navable. We handle the heavy lifting so you can focus on your business.",
    features: [
      "White-glove data migration",
      "Historical data import",
      "Plan structure validation",
      "Participant verification",
    ],
  },
  {
    number: "02",
    title: "Configure Your Rules",
    description:
      "Set up vesting schedules, forfeiture rules, and allocation logic that match your fund documents. Our platform supports even the most complex waterfall structures.",
    features: [
      "Custom vesting schedules",
      "Flexible allocation rules",
      "Multi-fund support",
      "Deal-by-deal or whole-fund",
    ],
  },
  {
    number: "03",
    title: "Operate with Confidence",
    description:
      "Run calculations, generate reports, and manage participants with full audit trails. Real-time visibility for your finance team and leadership.",
    features: [
      "Automated calculations",
      "Audit-ready reports",
      "LP-ready statements",
      "Real-time dashboards",
    ],
  },
];

const timeline = [
  { week: "Week 1", activity: "Data collection & analysis" },
  { week: "Week 2", activity: "Platform configuration & testing" },
  { week: "Week 3", activity: "Validation & go-live" },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title={
          <>
            Simple Setup. <span className="text-orange">Powerful Results.</span>
          </>
        }
        description="Getting started with Navable is straightforward. Our expert team guides you through every step, ensuring a smooth transition from spreadsheets to a purpose-built platform."
      />

      {/* Steps */}
      <Section label="Steps" labelledBy="steps-heading">
        <h2 id="steps-heading" className="sr-only">
          Three steps to get started
        </h2>
        <ol>
          {steps.map((step, index) => (
            <li
              key={step.number}
              className="grid items-center border-b border-line last:border-b-0 lg:grid-cols-2"
            >
              <div
                className={`px-6 py-12 lg:px-12 lg:py-[72px] ${
                  index % 2 === 1 ? "lg:order-2" : "lg:border-r lg:border-line"
                }`}
              >
                <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-subtle">
                  <span aria-hidden="true" className="block size-2 bg-orange" />
                  Step {step.number}
                </p>
                <h3 className="mt-6 text-[28px] font-semibold leading-[1.25] text-ink lg:text-[32px]">
                  {step.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[25px] text-body">{step.description}</p>
                <ul className="mt-6 space-y-3">
                  {step.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckBadge className="size-5" />
                      <span className="text-[15px] text-body">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`dot-grid self-stretch p-6 lg:p-12 ${
                  index % 2 === 1 ? "lg:order-1 lg:border-r lg:border-line" : ""
                }`}
              >
                <div className="flex aspect-video items-center justify-center border border-line bg-white">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
                    Step {step.number} Illustration
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Timeline */}
      <Section label="Timeline" labelledBy="timeline-heading">
        <SectionIntro
          id="timeline-heading"
          title="Go Live in Under Three Weeks"
          description="Our streamlined onboarding process gets you up and running fast."
          ruled
        />
        <div className="relative pb-[47px] pt-12">
          {/* Dashed connector behind the step circles */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[76px] hidden h-px bg-[repeating-linear-gradient(to_right,#8e8d9a_0_5px,transparent_5px_9px)] md:block"
          />
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-0">
            {timeline.map((item, index) => (
              <li key={item.week} className="flex flex-col items-center px-6 text-center">
                <span
                  aria-hidden="true"
                  className={`flex size-14 items-center justify-center rounded-full border border-ink text-sm text-ink ${
                    index === timeline.length - 1 ? "bg-orange" : "bg-white"
                  }`}
                >
                  {index + 1}
                </span>
                <h3 className="mt-7 text-lg font-medium leading-6 text-ink">{item.week}</h3>
                <p className="mt-3 max-w-[230px] text-[15px] leading-6 text-body">{item.activity}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <CtaBand
        title={
          <>
            Ready to <span className="text-orange">Get Started?</span>
          </>
        }
        description="Book a demo to see how Navable can transform your carry and compensation management."
        cta="Book a Free Demo"
      />
    </>
  );
}
