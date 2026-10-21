"use client";

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
    <section className="py-24 bg-white" aria-labelledby="why-navable-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left side - Header */}
          <div className="lg:sticky lg:top-24">
            <p className="text-[#5046e5] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Why Navable
            </p>
            <h2 id="why-navable-heading" className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-[1.15]">
              <span className="text-gray-900">Why Teams </span>
              <span className="text-[#5046e5]">Choose Navable</span>
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-md text-[15px] mt-6">
              Moving carry off Excel only works if the replacement preserves the flexibility 
              and control Finance already has, without creating another operational burden.
            </p>
          </div>

          {/* Right side - Reasons with /01, /02, /03, /04 numbering */}
          <ol className="space-y-5" role="list">
            {reasons.map((reason) => (
              <li
                key={reason.number}
                className="group"
              >
                <div className="flex items-start gap-5">
                  <span className="text-[#5046e5] font-bold text-lg tracking-tight shrink-0 pt-0.5" aria-hidden="true">
                    /{reason.number}
                  </span>
                  <div className="flex-1 pb-5 border-b border-gray-100 group-last:border-0 group-last:pb-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
