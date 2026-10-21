"use client";

import Button from "../ui/Button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8f7ff] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            <p className="text-[#5046e5] font-semibold text-sm uppercase tracking-wide mb-4">
              Software for Private Funds
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              One System for{" "}
              <span className="text-[#5046e5]">Carry</span>,{" "}
              <span className="text-[#5046e5]">Commit</span>, and{" "}
              <span className="text-[#5046e5]">Compensation</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Give Finance, Ops and HR teams a configurable platform to manage
              growing complexity with greater accuracy, control, and visibility,
              without relying on spreadsheets.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/demo" size="lg">
                Book a Free Demo
              </Button>
              <Button href="/platform" variant="outline" size="lg">
                Explore the Platform
              </Button>
            </div>
          </div>

          {/* Right side - Product mockup placeholder */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Browser chrome */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 ml-4">
                  <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-400 max-w-xs">
                    app.navable.com
                  </div>
                </div>
              </div>
              
              {/* App content mockup */}
              <div className="p-6 bg-white">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#5046e5] flex items-center justify-center text-white font-semibold">
                      JR
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">John Roberts, MD</p>
                      <p className="text-sm text-gray-500">Carry Management</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Active
                    </span>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Total Compensation</p>
                    <p className="text-xl font-bold text-gray-900">$2,521,483</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Estimated Carry Value</p>
                    <p className="text-xl font-bold text-[#5046e5]">$9,201,300</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Annualized</p>
                    <p className="text-xl font-bold text-gray-900">$770,183</p>
                  </div>
                </div>

                {/* Carry plans table */}
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-sm text-gray-900">Carry Plans</p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {[
                      { fund: "Global Growth Fund I", points: "10", vested: "$6,941,383" },
                      { fund: "Alts Property Fund", points: "10", vested: "$1,018,533" },
                      { fund: "Alts Fund IV", points: "10", vested: "$1,241,383" },
                    ].map((plan, i) => (
                      <div key={i} className="px-4 py-3 flex items-center justify-between text-sm">
                        <span className="text-gray-900 font-medium">{plan.fund}</span>
                        <div className="flex items-center space-x-8">
                          <span className="text-gray-500">{plan.points} pts</span>
                          <span className="text-[#5046e5] font-semibold">{plan.vested}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100 max-w-[200px]">
              <p className="text-xs text-gray-500 mb-1">Forecasted Carry Value</p>
              <p className="text-2xl font-bold text-[#5046e5]">$9,201,300</p>
              <div className="flex items-center mt-2">
                <span className="text-xs text-gray-500">Vested</span>
                <span className="ml-auto text-xs font-medium text-gray-900">$770,183</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
