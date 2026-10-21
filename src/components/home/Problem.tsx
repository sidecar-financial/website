"use client";

import Image from "next/image";

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
    <section className="py-24 bg-gradient-to-b from-white to-[#f8f7ff]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Header and comparison cards */}
          <div>
            <p className="text-[#5046e5] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              The Problem
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-[1.15] mb-2">
              When Growth Outpaces
            </h2>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-[1.15] mb-6">
              <span className="text-gray-900">Excel, </span>
              <span className="text-[#5046e5]">Change Gets</span>
            </h2>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#5046e5] leading-[1.15] mb-6">
              Harder to Control
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-lg">
              As carry complexity grows, spreadsheets create more risk, more manual work, 
              and less control. Navable brings it into one system built for alternative asset firms.
            </p>
          </div>

          {/* Right side - Image placeholder */}
          <div className="relative">
            <div className="rounded-xl shadow-xl shadow-gray-900/10 overflow-hidden border border-gray-100 bg-white">
              <Image
                src="/images/spreadsheet-illustration.png"
                alt="Spreadsheet illustration showing the complexity of manual carry tracking"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Comparison cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-16">
          {/* With Spreadsheets */}
          <div className="bg-white rounded-2xl p-8 shadow-lg shadow-gray-900/5 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">With Spreadsheets</h3>
            </div>
            <ul className="space-y-5">
              {spreadsheetProblems.map((problem, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-gray-600 text-[15px] leading-relaxed">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Navable */}
          <div className="bg-white rounded-2xl p-8 shadow-lg shadow-[#5046e5]/10 border-2 border-[#5046e5]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#ede9fe] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#5046e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">With Navable</h3>
            </div>
            <ul className="space-y-5">
              {navableSolutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-[#ede9fe] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#5046e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600 text-[15px] leading-relaxed">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
