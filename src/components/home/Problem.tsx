"use client";

export default function Problem() {
  const spreadsheetProblems = [
    "Carry rules depend on spreadsheets and people",
    "Participant changes force manual model rework",
    "Historical decisions have to be reconstructed",
    "Employees and GPs come back to Finance for answers",
    "More funds and participants add to admin work",
  ];

  const navableSolutions = [
    "Plans, participants, and history live in one system",
    "Run forfeitures, dilutions, and reallocations",
    "Keep changes, records and documents connected",
    "Participants can access their own carry information directly",
    "Scale carry without needing more spreadsheets",
  ];

  return (
    <section className="py-20 bg-[#f8f7ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#5046e5] font-semibold text-sm uppercase tracking-wide mb-4">
            The Problem
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            When Growth Outpaces Excel,
            <br />
            <span className="text-[#5046e5]">Change Gets Harder to Control</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            As carry complexity grows, spreadsheets create more risk, more manual work, 
            and less control. Navable brings it into one system built for alternative asset firms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* With Spreadsheets */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="ml-3 text-xl font-bold text-gray-900">With Spreadsheets</h3>
            </div>
            <ul className="space-y-4">
              {spreadsheetProblems.map((problem, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-gray-600">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Navable */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-[#5046e5]">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-[#e8e4ff] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#5046e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="ml-3 text-xl font-bold text-gray-900">With Navable</h3>
            </div>
            <ul className="space-y-4">
              {navableSolutions.map((solution, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-[#e8e4ff] flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <svg className="w-3 h-3 text-[#5046e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
