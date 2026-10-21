import { Section } from "@/components/ui/Frame";

const steps = [
  {
    number: "1",
    title: "Share a Workbook",
    description: "We review your current plans, structure, and legacy data.",
  },
  {
    number: "2",
    title: "See a Working Fund",
    description: "We set up a working fund to test your specific use cases.",
  },
  {
    number: "3",
    title: "Validate the Fit",
    description: "Use your working fund in a 14-day guided trial to decide.",
  },
];

export default function Validation() {
  return (
    <Section labelledBy="validation-heading">
      <div className="px-6 pb-14 pt-14 text-center lg:pb-[82px] lg:pt-[115px]">
        <h2
          id="validation-heading"
          className="mx-auto max-w-[620px] text-[32px] font-semibold leading-[1.25] text-ink lg:text-[40px] lg:leading-[50px]"
        >
          Validate Navable With Your Own Fund Before You Commit
        </h2>
        <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-[25px] text-muted">
          You don&apos;t need to decide whether Navable works for your carry structure based on a
          generic demo. Typical setup takes under three weeks, with support for legacy plan setup.
        </p>
      </div>

      <div className="relative pb-[47px]">
        {/* Dashed connector behind the step circles */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-7 hidden h-px bg-[repeating-linear-gradient(to_right,#8e8d9a_0_5px,transparent_5px_9px)] md:block"
        />
        <ol className="relative grid gap-12 md:grid-cols-3 md:gap-0">
          {steps.map((step) => {
            const isLast = step.number === "3";
            return (
              <li key={step.number} className="flex flex-col items-center px-6 text-center">
                <span
                  aria-hidden="true"
                  className={`flex size-14 items-center justify-center rounded-full border border-ink text-sm ${
                    isLast ? "bg-orange text-ink" : "bg-white text-ink"
                  }`}
                >
                  {step.number}
                </span>
                <h3 className="mt-7 text-lg font-medium leading-6 text-ink">
                  <span className="sr-only">Step {step.number}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[230px] text-[15px] leading-6 text-muted">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
