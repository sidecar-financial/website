"use client";

const outcomes = [
  {
    title: "More Senior Capacity",
    description: "Spend less time checking, reconciling, and maintaining carry.",
  },
  {
    title: "Easier Reviews & Year-End",
    description: "Keep history and documents easy to trace for year-end review.",
  },
  {
    title: "More Capacity as You Grow",
    description: "Manage more funds and participants without adding admin work.",
  },
];

export default function Outcomes() {
  return (
    <section className="py-20 bg-[#f8f7ff]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#5046e5] text-sm font-semibold tracking-wide uppercase mb-3">
            Outcomes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Changes for Your
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-[#5046e5]">
            Finance, HR and Operations Teams
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            The value of better carry infrastructure isn&apos;t more software. It&apos;s less 
            senior attention spent keeping the process under control.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {outcomes.map((outcome, index) => (
            <div key={index} className="text-center">
              <div className="w-14 h-14 rounded-xl bg-white border border-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#5046e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {outcome.title}
              </h3>
              <p className="text-gray-600 text-sm">{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
