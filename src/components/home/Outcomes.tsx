"use client";

const outcomes = [
  {
    title: "More Senior Capacity",
    description: "Spend less time checking, reconciling, and maintaining carry.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Easier Reviews & Year-End",
    description: "Keep history and documents easy to trace for year-end review.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "More Capacity as You Grow",
    description: "Manage more funds and participants without adding admin work.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export default function Outcomes() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#5046e5] font-semibold text-sm uppercase tracking-wide mb-4">
            Outcomes
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 max-w-3xl mx-auto">
            What Changes for Your{" "}
            <span className="text-[#5046e5]">Finance, HR and Operations</span> Teams
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            The value of better carry infrastructure isn&apos;t more software. It&apos;s less 
            senior attention spent keeping the process under control.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {outcomes.map((outcome, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#f8f7ff] flex items-center justify-center text-[#5046e5] mx-auto mb-6">
                {outcome.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {outcome.title}
              </h3>
              <p className="text-gray-600">{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
