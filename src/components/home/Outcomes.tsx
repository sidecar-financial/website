"use client";

const outcomes = [
  {
    title: "More Senior Capacity",
    description: "Spend less time checking, reconciling, and maintaining carry.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Easier Reviews & Year-End",
    description: "Keep history and documents easy to trace for year-end review.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "More Capacity as You Grow",
    description: "Manage more funds and participants without adding admin work.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight">
            <span className="text-gray-900">What Changes for</span>
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight">
            <span className="text-gray-900">Your </span>
            <span className="text-[#5046e5]">Finance, HR and</span>
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#5046e5] leading-tight">
            Operations Teams
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The value of better carry infrastructure isn&apos;t more software. It&apos;s less 
            senior attention spent keeping the process under control.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {outcomes.map((outcome, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-lg shadow-gray-900/5 border border-gray-100 hover:shadow-xl hover:shadow-[#5046e5]/10 hover:border-[#5046e5]/20 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f8f7ff] to-[#ede9fe] flex items-center justify-center mb-6 text-[#5046e5]">
                {outcome.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {outcome.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
