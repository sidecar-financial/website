"use client";

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
    <section className="py-24 bg-[#f8f7ff]" aria-labelledby="validation-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="validation-heading" className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight">
            <span className="text-gray-900">Validate Navable With Your </span>
            <span className="text-[#5046e5]">Own Fund Before You Commit</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            You don&apos;t need to decide whether Navable works for your carry structure 
            based on a generic demo. Typical setup takes under three weeks, with 
            support for legacy plan setup.
          </p>
        </div>

        {/* Steps with connecting line */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line - visible on md and up */}
          <div className="hidden md:block absolute top-7 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-0.5 bg-gradient-to-r from-[#5046e5]/30 via-[#5046e5]/50 to-[#5046e5]/30" aria-hidden="true" />
          
          <ol className="grid md:grid-cols-3 gap-8" role="list">
            {steps.map((step) => (
              <li key={step.number} className="relative">
                <div className="text-center relative z-10">
                  {/* Step number circle */}
                  <div 
                    className="w-14 h-14 rounded-full bg-[#5046e5] text-white text-xl font-bold flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#5046e5]/25 border-4 border-[#f8f7ff]"
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    <span className="sr-only">Step {step.number}: </span>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-[15px]">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
