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
    <section className="py-24 bg-[#f8f7ff]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight">
            Validate Navable With Your
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#5046e5] leading-tight">
            Own Fund Before You Commit
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
          <div className="hidden md:block absolute top-7 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-0.5 bg-gradient-to-r from-[#5046e5]/30 via-[#5046e5]/50 to-[#5046e5]/30" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="text-center relative z-10">
                  {/* Step number circle */}
                  <div className="w-14 h-14 rounded-full bg-[#5046e5] text-white text-xl font-bold flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#5046e5]/25 border-4 border-[#f8f7ff]">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-[15px]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
