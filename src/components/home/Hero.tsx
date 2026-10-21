"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#f8f7ff] via-[#f5f3ff] to-[#ede9fe] overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">
              Software for Private Funds
            </p>
            <h1 className="text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.08] tracking-tight">
              <span className="text-gray-900">One System for </span>
              <span className="text-[#5046e5]">Carry</span>
              <span className="text-gray-900">,</span>
              <br />
              <span className="text-[#5046e5]">Commit</span>
              <span className="text-gray-900">, and </span>
              <span className="text-[#5046e5]">Compensation</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Give Finance, Ops and HR teams a configurable platform to manage 
              growing complexity with greater accuracy, control, and visibility, 
              without relying on spreadsheets.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center px-7 py-3.5 text-[15px] font-semibold text-white bg-[#5046e5] rounded-full hover:bg-[#4038c7] transition-colors shadow-lg shadow-[#5046e5]/25"
              >
                Book a Free Demo
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/platform"
                className="inline-flex items-center px-7 py-3.5 text-[15px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-full hover:border-[#5046e5] hover:text-[#5046e5] transition-all shadow-sm"
              >
                Explore the Platform
              </Link>
            </div>
          </div>

          {/* Right side - Product mockup */}
          <div className="relative lg:ml-8">
            {/* Main dashboard card */}
            <div className="rounded-2xl shadow-2xl shadow-gray-900/10 overflow-hidden bg-white border border-gray-100">
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
            <div className="absolute -bottom-8 -left-8 lg:-left-16 w-44 lg:w-56 rounded-xl shadow-2xl shadow-gray-900/15 overflow-hidden border border-gray-100 bg-white">
              <Image
                src="/images/employee-portal.png"
                alt="Employee portal showing Alex Morgan's compensation breakdown with benefits details"
                width={320}
                height={512}
                className="w-full h-auto"
              />
            </div>

            {/* Small floating card on top right */}
            <div className="absolute -top-4 -right-4 lg:-right-8 w-32 lg:w-40 rounded-lg shadow-xl shadow-gray-900/10 overflow-hidden border border-gray-100 bg-white">
              <Image
                src="/images/vesting-timeline.png"
                alt="Vesting timeline overview"
                width={240}
                height={180}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
