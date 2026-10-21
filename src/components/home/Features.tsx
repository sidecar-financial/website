"use client";

import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Carry Management",
    description:
      "Manage carry plans, allocations, vesting, distributions, and participant changes in one system, keeping data and documents linked across funds with full audit trail history.",
    image: "/images/carry-plan-team.png",
    imageAlt: "Carry plan interface showing team members with compensation details",
  },
  {
    title: "Employee & GP Portal",
    description:
      "Give participants direct access to carry, vesting, values, and documents.",
    image: "/images/employee-portal.png",
    imageAlt: "Employee portal showing compensation breakdown and benefits",
  },
  {
    title: "Vesting & Distributions",
    description:
      "Track vesting schedules and manage distributions with clear timelines and forecasting.",
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
  {
    title: "Document Management",
    description:
      "Streamline award documents, signatures, and compliance tracking in one place.",
    image: "/images/award-document.png",
    imageAlt: "Award document signature cards interface",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#5046e5] text-sm font-semibold tracking-wide uppercase mb-3">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything You Need to Manage
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-[#5046e5]">
            Carry, Comp & Co-Invest With Control
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Start with carry management, then extend the same system to compensation, 
            GP commit, and employee co-investment as your firm&apos;s needs evolve.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#f8f7ff] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Image container */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#f8f7ff] to-white">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/demo"
            className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-[#5046e5] rounded-full hover:bg-[#4038c7] transition-colors"
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
