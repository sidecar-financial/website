"use client";

import Image from "next/image";
import Link from "next/link";

const mainFeature = {
  title: "Carry Management",
  description:
    "Manage carry plans, allocations, vesting, distributions, and participant changes in one system, keeping data and documents linked across funds with full audit trail history.",
  image: "/images/carry-plan-team.png",
  imageAlt: "Carry plan interface showing team members with compensation details",
};

const sideFeatures = [
  {
    title: "Employee & GP Portal",
    description:
      "Give participants direct access to carry, vesting, values, and documents.",
    image: "/images/employee-portal.png",
    imageAlt: "Employee portal showing compensation breakdown",
  },
  {
    title: "Scenario & Firm-Wide Planning",
    description:
      "Model allocations, vesting, and compensation with shared data.",
    image: "/images/vesting-timeline.png",
    imageAlt: "Vesting timeline chart showing schedule progression",
  },
  {
    title: "Compensation & Reporting",
    description:
      "Bring compensation, carry, GP commit, and investment data into one clear view.",
    image: "/images/total-compensation.png",
    imageAlt: "Total compensation card with carry breakdown by fund",
  },
  {
    title: "GP Commit & Co-Investment",
    description:
      "Manage commitments, onboarding, subscriptions, and co-invest reporting.",
    image: "/images/co-invest-card.png",
    imageAlt: "Co-investment card showing total value breakdown",
  },
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

        {/* Main feature - Carry Management */}
        <div className="mb-8">
          <div className="bg-[#f8f7ff] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-72 lg:h-auto bg-gradient-to-br from-[#f8f7ff] to-white p-8 flex items-center justify-center">
                <Image
                  src={mainFeature.image}
                  alt={mainFeature.imageAlt}
                  width={500}
                  height={350}
                  className="w-full h-auto max-w-md object-contain rounded-lg shadow-lg"
                />
              </div>
              {/* Content */}
              <div className="p-10 lg:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {mainFeature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {mainFeature.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/demo"
                    className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-[#5046e5] rounded-full hover:bg-[#4038c7] transition-colors shadow-lg shadow-[#5046e5]/25"
                  >
                    Book a Free Demo
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sideFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-[#f8f7ff] rounded-xl overflow-hidden hover:shadow-lg transition-all group"
            >
              {/* Image container */}
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#f8f7ff] to-white p-4 flex items-center justify-center">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  width={180}
                  height={120}
                  className="w-auto h-full max-h-28 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Content */}
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
