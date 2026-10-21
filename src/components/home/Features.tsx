"use client";

import Image from "next/image";
import Link from "next/link";

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
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

        {/* Main Product Screenshots Grid */}
        <div className="grid lg:grid-cols-12 gap-6 mb-12">
          {/* Left column - Carry Plan Team */}
          <div className="lg:col-span-5">
            <div className="rounded-xl shadow-2xl shadow-gray-900/15 overflow-hidden bg-white border border-gray-200">
              <Image
                src="/images/carry-plan-team.png"
                alt="Carry plan management showing team members with total compensation, carry values, and vesting details"
                width={600}
                height={700}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right column - Stacked product images */}
          <div className="lg:col-span-7 space-y-6">
            {/* Total Compensation Card */}
            <div className="rounded-xl shadow-2xl shadow-gray-900/15 overflow-hidden bg-white border border-gray-200">
              <Image
                src="/images/total-compensation.png"
                alt="Total compensation breakdown showing salary, bonus, carry, and co-invest allocation with pie chart"
                width={700}
                height={300}
                className="w-full h-auto"
              />
            </div>

            {/* Two column layout for smaller cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Vesting Timeline */}
              <div className="rounded-xl shadow-xl shadow-gray-900/10 overflow-hidden bg-white border border-gray-200">
                <Image
                  src="/images/vesting-timeline.png"
                  alt="Vesting timeline chart showing current plan vs scenario projections"
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
              </div>

              {/* Co-Invest Card */}
              <div className="rounded-xl shadow-xl shadow-gray-900/10 overflow-hidden bg-white border border-gray-200">
                <Image
                  src="/images/co-invest-card.png"
                  alt="Co-investment card showing total return and investment details"
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Award Document */}
            <div className="rounded-xl shadow-xl shadow-gray-900/10 overflow-hidden bg-white border border-gray-200">
              <Image
                src="/images/award-document.png"
                alt="Award document management with signature requirements and status tracking"
                width={700}
                height={200}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Carry Management description */}
        <div className="bg-[#f8f7ff] rounded-2xl p-8 lg:p-10 mb-12">
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
