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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#5046e5] text-sm font-semibold tracking-wide uppercase mb-3">
            Why Navable
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Teams Choose Navable
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Moving carry off Excel only works if the replacement preserves the flexibility 
            and control Finance already has, without creating another operational burden.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="bg-[#f8f7ff] rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <span className="text-[#5046e5] font-bold text-lg">
                  /{reason.number}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
