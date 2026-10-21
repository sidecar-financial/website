"use client";

import { useState } from "react";
import Button from "../ui/Button";

export default function DemoPageContent() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    interest: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f7ff] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left content */}
          <div className="lg:sticky lg:top-32">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Carry Management Software for{" "}
              <span className="text-[#5046e5]">Alternative Asset Firms</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              See How Navable Fits Your Carry Structure
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              As funds and participants grow, Navable helps finance teams manage 
              complex carry with greater confidence, less manual work, and reduced 
              operational risk.
            </p>

            <div className="mt-10">
              <h3 className="font-semibold text-gray-900 mb-4">
                In your demo, you&apos;ll see how to:
              </h3>
              <ul className="space-y-3">
                {[
                  "Manage allocations, vesting, and participant changes.",
                  "Connect carry, compensation, and GP commit workflows.",
                  "Configure Navable to fit your firm's carry workflows.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#5046e5] mr-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 p-6 bg-white rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Trusted by Firms Managing</p>
              <p className="text-3xl font-bold text-[#5046e5]">Over $150 Bn AUM.</p>
            </div>
          </div>

          {/* Right form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Book a Free Demo
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#5046e5] focus:ring-2 focus:ring-[#5046e5]/20 outline-none transition-all"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Work Email*
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#5046e5] focus:ring-2 focus:ring-[#5046e5]/20 outline-none transition-all"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company Name*
                </label>
                <input
                  type="text"
                  id="company"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#5046e5] focus:ring-2 focus:ring-[#5046e5]/20 outline-none transition-all"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="interest"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  What would you like to explore?
                </label>
                <select
                  id="interest"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#5046e5] focus:ring-2 focus:ring-[#5046e5]/20 outline-none transition-all bg-white"
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                >
                  <option value="">Select an option</option>
                  <option value="carry">Carry Management</option>
                  <option value="compensation">Compensation Management</option>
                  <option value="coinvest">Employee Co-Invest</option>
                  <option value="gpcommit">GP Commit</option>
                  <option value="all">All of the above</option>
                </select>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Book a Free Demo
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting, you agree to our{" "}
                <a href="/privacy" className="text-[#5046e5] hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
