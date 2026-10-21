"use client";

import Link from "next/link";

const teamMembers = [
  {
    initials: "AM",
    name: "Alex Morgan",
    title: "Director",
    department: "Financial Analysis Department",
    hireDate: "03/15/2021",
    totalComp: "$12,345,678",
    totalCarryValue: "$8,345,672",
    vestedCarryValue: "1,143,162",
    highlight: true,
  },
  {
    initials: "TS",
    name: "Taylor Smith",
    title: "VP",
    department: "Risk Management Team",
    hireDate: "11/09/2019",
    totalComp: "$11,234,567",
    totalCarryValue: "$3,456,789",
    vestedCarryValue: "1,143,162",
    badge: "+ 16 points",
  },
  {
    initials: "JC",
    name: "Jamie Chen",
    title: "Analyst",
    department: "Client Advisory Services",
    hireDate: "05/30/2022",
    totalComp: "$14,987,654",
    totalCarryValue: "$9,123,456",
    vestedCarryValue: "1,143,162",
  },
];

const carryByFund = [
  { fund: "Fund I", vested: "$2,812,400", unvested: "$937,600", progress: 75 },
  { fund: "Fund II", vested: "$2,104,300", unvested: "$1,295,700", progress: 62 },
  { fund: "Fund III", vested: "$1,322,150", unvested: "$677,850", progress: 45 },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#5046e5] text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight">
            Everything You Need to
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight">
            <span className="text-gray-900">Manage </span>
            <span className="text-[#5046e5]">Carry, Comp &</span>
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#5046e5] leading-tight">
            Co-Invest With Control
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Start with carry management, then extend the same system to compensation, 
            GP commit, and employee co-investment as your firm&apos;s needs evolve.
          </p>
        </div>

        {/* Main UI showcase grid */}
        <div className="grid lg:grid-cols-12 gap-6 mb-8">
          {/* Left column - Carry Plan Selector + Team Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Carry Plan Selector Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h4 className="font-semibold text-gray-900 text-sm">Carry Plan</h4>
                <p className="text-xs text-gray-500 mt-1">Select a fund from list</p>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 mb-3">Select a fund to create a fund level carry plan</p>
                <div className="flex gap-2 mb-4">
                  <button className="px-3 py-1.5 text-xs font-medium bg-[#5046e5] text-white rounded-md">Fund Level</button>
                  <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">Deal Level</button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-[#5046e5]" />
                    <span className="text-sm text-gray-700">Opportunity Fund</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-gray-300" />
                    <span className="text-sm text-gray-700">Core Fund</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member Cards */}
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl border shadow-md p-4 ${
                  member.highlight ? 'border-[#5046e5] ring-2 ring-[#5046e5]/10' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5046e5] text-white flex items-center justify-center text-sm font-semibold">
                    {member.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 text-sm">{member.name}, {member.title}</h4>
                      {member.badge && (
                        <span className="text-xs font-medium text-[#5046e5] bg-[#f0eeff] px-2 py-0.5 rounded">{member.badge}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{member.department}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Hire Date: {member.hireDate}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Total Comp</p>
                    <p className="text-xs font-semibold text-gray-900">{member.totalComp}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Total Carry Value</p>
                    <p className="text-xs font-semibold text-gray-900">{member.totalCarryValue}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Vested Carry</p>
                    <p className="text-xs font-semibold text-gray-900">{member.vestedCarryValue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right column - Compensation Summary + Charts */}
          <div className="lg:col-span-7 space-y-4">
            {/* Total Compensation Summary with Pie Chart */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Total compensation (USD)</h4>
                  <p className="text-3xl font-bold text-gray-900">$8,123,848</p>
                </div>
                {/* Mini pie chart */}
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e8e4ff" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#5046e5" strokeWidth="3" strokeDasharray="60 40" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="-60" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#c4b5fd" strokeWidth="3" strokeDasharray="12 88" strokeDashoffset="-80" />
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-[#f8f7ff] rounded-lg">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Carry</p>
                  <p className="text-sm font-bold text-[#5046e5]">$6,238,848</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Bonus</p>
                  <p className="text-sm font-bold text-gray-900">$685,000</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Salary</p>
                  <p className="text-sm font-bold text-gray-900">$1,200,000</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Co-invest</p>
                  <p className="text-sm font-bold text-gray-900">$720</p>
                </div>
              </div>
            </div>

            {/* Carry by Fund Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h4 className="font-semibold text-gray-900 text-sm">Carry by Fund</h4>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="grid grid-cols-4 gap-4 px-4 py-2 text-[10px] text-gray-500 uppercase tracking-wide bg-gray-50">
                  <span>Fund</span>
                  <span>Vested</span>
                  <span>Unvested</span>
                  <span>Vesting Progress</span>
                </div>
                {carryByFund.map((fund, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 px-4 py-3 items-center">
                    <span className="text-sm font-medium text-gray-900">{fund.fund}</span>
                    <span className="text-sm text-gray-600">{fund.vested}</span>
                    <span className="text-sm text-gray-600">{fund.unvested}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#5046e5] h-2 rounded-full" 
                          style={{ width: `${fund.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{fund.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vesting Timeline Chart */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900 text-sm">Vesting Timeline</h4>
                <div className="flex gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#5046e5]" /> Current plan
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#c4b5fd]" /> Scenario
                  </span>
                </div>
              </div>
              {/* Chart visualization */}
              <div className="relative h-32">
                <div className="absolute left-0 top-0 text-xs text-gray-500">$1.5M</div>
                <div className="absolute left-0 top-1/2 text-xs text-gray-500">$750K</div>
                <div className="absolute left-0 bottom-0 text-xs text-gray-500">0</div>
                <svg className="w-full h-full pl-10" viewBox="0 0 400 100" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="0" x2="400" y2="0" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="0" y1="50" x2="400" y2="50" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#e5e7eb" strokeWidth="1" />
                  {/* Current plan line */}
                  <path d="M 0 80 Q 100 60 200 40 T 400 20" fill="none" stroke="#5046e5" strokeWidth="2" />
                  {/* Scenario line */}
                  <path d="M 0 85 Q 100 70 200 55 T 400 35" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="5,5" />
                  {/* Highlight point */}
                  <circle cx="280" cy="30" r="4" fill="#5046e5" />
                </svg>
                {/* X-axis labels */}
                <div className="flex justify-between text-[10px] text-gray-500 mt-2 pl-10">
                  <span>Jan 25</span>
                  <span>Apr 25</span>
                  <span>May 25</span>
                  <span>Oct 25</span>
                  <span>Jan 26</span>
                  <span>Apr 26</span>
                  <span>Jul 26</span>
                </div>
              </div>
              {/* Upcoming vest callout */}
              <div className="mt-4 flex items-center justify-between p-3 bg-[#f8f7ff] rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">Fund II</p>
                  <p className="text-xs text-gray-400">Apr 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#5046e5]">$1,295,700</p>
                  <p className="text-[10px] text-gray-500">Upcoming Vest</p>
                </div>
              </div>
            </div>

            {/* Award Document Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-4">
              <h4 className="font-semibold text-gray-900 text-sm mb-3">Award Document</h4>
              <div className="space-y-2">
                {[
                  { date: "Sept 2023", requireWet: true, requireGP: false },
                  { date: "Oct 2023", requireWet: false, requireGP: true },
                  { date: "Sept 2023", requireWet: true, requireGP: false },
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-xs text-gray-600">{doc.date}</span>
                    </div>
                    <div className="flex gap-2">
                      {doc.requireWet && (
                        <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded">Require Wet Signature</span>
                      )}
                      {doc.requireGP && (
                        <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded">Require GP Signature</span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded">Require Signature</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Carry Management description */}
        <div className="bg-[#f8f7ff] rounded-2xl p-8 lg:p-10 mb-8">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Carry Management</h3>
            <p className="text-gray-600 leading-relaxed">
              Manage carry plans, allocations, vesting, distributions, and participant changes in one 
              system, keeping data and documents linked across funds with full audit trail history.
            </p>
          </div>
        </div>

        {/* Feature cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Employee & GP Portal",
              description: "Give participants direct access to carry, vesting, values, and documents.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              ),
            },
            {
              title: "Scenario & Firm-Wide Planning",
              description: "Model allocations, vesting, and compensation with shared data.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
            },
            {
              title: "Compensation & Reporting",
              description: "Bring compensation, carry, GP commit, and investment data into one clear view.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
            },
            {
              title: "GP Commit & Co-Investment",
              description: "Manage commitments, onboarding, subscriptions, and co-invest reporting.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-[#f8f7ff] rounded-xl p-6 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#e8e4ff] flex items-center justify-center text-[#5046e5] mb-4 group-hover:bg-[#5046e5] group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/demo"
            className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-[#5046e5] rounded-full hover:bg-[#4038c7] transition-colors shadow-lg shadow-[#5046e5]/25"
          >
            Book a Free Demo
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
