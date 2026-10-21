"use client";

import Image from "next/image";
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
            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <Image
                src="/images/hero-dashboard.png"
                alt="Navable carry management dashboard showing John Roberts' total compensation, salary breakdown, and carry value"
                width={1024}
                height={640}
                className="w-full h-auto"
                priority
              />
            </div>
            
            {/* Floating employee portal card */}
            <div className="absolute -bottom-6 -left-6 lg:-left-12 w-40 lg:w-48 rounded-xl shadow-xl overflow-hidden border border-gray-100">
              <Image
                src="/images/employee-portal.png"
                alt="Employee portal showing Alex Morgan's compensation breakdown with benefits details"
                width={320}
                height={512}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
