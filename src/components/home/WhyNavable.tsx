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
    <section className="py-20 bg-[#f8f7ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#5046e5] font-semibold text-sm uppercase tracking-wide mb-4">
            Why Navable
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Why Teams Choose Navable
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Moving carry off Excel only works if the replacement preserves the flexibility 
            and control Finance already has, without creating another operational burden.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#5046e5] hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start">
                <span className="text-[#5046e5] font-bold text-lg mr-4">
                  /{reason.number}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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
