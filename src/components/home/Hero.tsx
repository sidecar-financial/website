"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#f8f7ff] min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            <p className="text-sm font-medium text-gray-500 mb-4">
              Software for Private Funds
            </p>
            <h1 className="text-[42px] lg:text-[56px] font-bold leading-[1.1] tracking-tight">
              <span className="text-gray-900">One System for </span>
              <span className="text-[#5046e5]">Carry</span>
              <span className="text-gray-900">,</span>
              <br />
              <span className="text-[#5046e5]">Commit</span>
              <span className="text-gray-900">, and </span>
              <span className="text-[#5046e5]">Compensation</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
              Give Finance, Ops and HR teams a configurable platform to manage 
              growing complexity with greater accuracy, control, and visibility, 
              without relying on spreadsheets.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-[#5046e5] rounded-full hover:bg-[#4038c7] transition-colors"
              >
                Book a Free Demo
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/platform"
                className="inline-flex items-center px-6 py-3 text-base font-semibold text-[#5046e5] bg-white border-2 border-gray-200 rounded-full hover:border-[#5046e5] transition-colors"
              >
                Explore the Platform
              </Link>
            </div>
          </div>

          {/* Right side - Product mockup */}
          <div className="relative">
            {/* Main dashboard card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Tab bar */}
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex items-center gap-1">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
                </div>
                <div className="ml-4 flex gap-4 text-xs text-gray-400">
                  <span>Company</span>
                  <span>Fund Management</span>
                  <span className="text-[#5046e5] font-medium">Carry Management</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* User header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#5046e5] flex items-center justify-center text-white text-sm font-semibold">
                      JR
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">John Roberts, MD</p>
                      <p className="text-xs text-gray-500">Carry Management / Participants</p>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 mb-6 text-xs border-b border-gray-100 pb-3">
                  <span className="text-[#5046e5] font-medium border-b-2 border-[#5046e5] pb-3 -mb-3">Total Compensation</span>
                  <span className="text-gray-400">Profile</span>
                  <span className="text-gray-400">Documents</span>
                  <span className="text-gray-400">Co-Invest</span>
                  <span className="text-gray-400">Carry Plan</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Salary</p>
                    <p className="text-lg font-bold text-gray-900">$400,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Annual Bonus</p>
                    <p className="text-lg font-bold text-gray-900">$500,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total</p>
                    <p className="text-lg font-bold text-[#5046e5]">$2,521,483</p>
                  </div>
                </div>

                {/* Carry value */}
                <div className="bg-[#f8f7ff] rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Estimated Carry Value</p>
                      <p className="text-2xl font-bold text-[#5046e5]">$9,201,300</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Annualized</p>
                      <p className="text-lg font-semibold text-gray-900">$770,183</p>
                    </div>
                  </div>
                </div>

                {/* Carry plans table */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-3">Carry Plans</p>
                  <div className="text-xs">
                    <div className="grid grid-cols-4 gap-2 text-gray-400 mb-2 px-2">
                      <span>Source</span>
                      <span>Points</span>
                      <span>Schedule</span>
                      <span className="text-right">$ Vested</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { fund: "Global Growth Fund I", points: "10", schedule: "5 year straight", vested: "$6,941,383" },
                        { fund: "Alts Property Fund", points: "10", schedule: "5 year straight", vested: "$1,018,533" },
                        { fund: "Alts Fund IV", points: "10", schedule: "5 year straight", vested: "$1,241,383" },
                      ].map((plan, i) => (
                        <div key={i} className="grid grid-cols-4 gap-2 bg-gray-50 rounded-lg px-2 py-2 items-center">
                          <span className="text-gray-900 font-medium truncate">{plan.fund}</span>
                          <span className="text-gray-600">{plan.points}</span>
                          <span className="text-gray-600">{plan.schedule}</span>
                          <span className="text-right text-[#5046e5] font-semibold">{plan.vested}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card - Benefits */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg border border-gray-100 p-4 w-48">
              <p className="text-xs text-gray-500 mb-1">Benefits</p>
              <p className="text-xl font-bold text-gray-900">$29,000</p>
              <div className="mt-3 grid grid-cols-4 gap-1 text-[10px] text-gray-400">
                <span>401k</span>
                <span>Medical</span>
                <span>Dental</span>
                <span>Vision</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
