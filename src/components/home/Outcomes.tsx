"use client";

const outcomes = [
  {
    title: "More Senior Capacity",
    description: "Spend less time checking, reconciling, and maintaining carry.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Easier Reviews & Year-End",
    description: "Keep history and documents easy to trace for year-end review.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "More Capacity as You Grow",
    description: "Manage more funds and participants without adding admin work.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export default function Outcomes() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#f8f7ff] to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#5046e5] text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Outcomes
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight">
            What Changes for Your
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#5046e5] leading-tight">
            Finance, HR and Operations Teams
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The value of better carry infrastructure isn&apos;t more software. It&apos;s less 
            senior attention spent keeping the process under control.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {outcomes.map((outcome, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg shadow-gray-900/5 border border-gray-100 hover:shadow-xl hover:shadow-gray-900/10 transition-all text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#f8f7ff] border border-[#ede9fe] flex items-center justify-center mx-auto mb-6 text-[#5046e5]">
                {outcome.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {outcome.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
