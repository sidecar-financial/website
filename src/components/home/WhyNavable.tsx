import { DarkSection } from "@/components/ui/Frame";

const reasons = [
  {
    number: "01",
    title: "Configured to Your Firm",
    description:
      "Adapt Navable to your actual carry structures and workflows without forcing a rigid template.",
  },
  {
    number: "02",
    title: "Faster to Implement",
    description:
      "Get up and running in weeks, with legacy plan setup supported by the Navable team.",
  },
  {
    number: "03",
    title: "Self-Service by Design",
    description:
      "Let Finance manage day-to-day changes directly instead of relying on consultants or vendor support.",
  },
  {
    number: "04",
    title: "Hands-On Partnership",
    description:
      "Get expert support through onboarding and as your carry program evolves.",
  },
];

export default function WhyNavable() {
  return (
    <DarkSection label="Why Navable" labelledBy="why-navable-heading">
      <div className="grid lg:grid-cols-2">
        {/* Left side - heading on a dot grid */}
        <div className="dot-grid-dark border-b border-navy-line px-6 py-12 lg:border-b-0 lg:border-r lg:px-12 lg:pb-12 lg:pt-[63px]">
          <h2
            id="why-navable-heading"
            className="text-[32px] font-semibold leading-[1.25] text-white lg:text-[40px] lg:leading-[50px]"
          >
            Why Teams
            <br className="hidden lg:block" /> <span className="text-orange">Choose Navable</span>
          </h2>
          <p className="mt-5 max-w-[430px] text-[15px] leading-[25px] text-navy-text">
            Moving carry off Excel only works if the replacement preserves the flexibility and
            control Finance already has, without creating another operational burden.
          </p>
        </div>

        {/* Right side - numbered reasons */}
        <ol className="grid lg:grid-rows-4">
          {reasons.map((reason) => (
            <li
              key={reason.number}
              className="flex items-baseline gap-6 border-b border-navy-line px-6 py-8 last:border-b-0 lg:gap-[42px] lg:pl-[50px] lg:pr-6 lg:pb-[34px] lg:pt-[38px]"
            >
              <span aria-hidden="true" className="w-5 shrink-0 font-mono text-[11px] leading-none text-orange">
                /{reason.number}
              </span>
              <div>
                <h3 className="text-xl font-medium leading-7 text-white">{reason.title}</h3>
                <p className="mt-2 max-w-[400px] text-[15px] leading-[25px] text-navy-text">
                  {reason.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </DarkSection>
  );
}
