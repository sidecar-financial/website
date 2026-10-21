"use client";

import { useState } from "react";
import Link from "next/link";

export default function DemoForm() {
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
    <section className="py-20 bg-[#f8f7ff]" id="demo">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Left content */}
          <div>
            <p className="text-[#5046e5] text-sm font-semibold tracking-wide uppercase mb-3">
              Book a Demo
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Ready to Move Carry
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-[#5046e5] leading-tight mb-6">
              Beyond Spreadsheets?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Discover how Navable can help your finance team manage complex 
              carry structures, reduce manual work, and maintain control as 
              your firm grows.
            </p>
            <p className="text-sm text-gray-500">
              Trusted by firms managing over $150B+ in AUM.
            </p>
          </div>

          {/* Right form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#5046e5] focus:ring-2 focus:ring-[#5046e5]/20 outline-none transition-all text-sm"
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
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Work Email*
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#5046e5] focus:ring-2 focus:ring-[#5046e5]/20 outline-none transition-all text-sm"
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
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Company Name*
                </label>
                <input
                  type="text"
                  id="company"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#5046e5] focus:ring-2 focus:ring-[#5046e5]/20 outline-none transition-all text-sm"
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
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  What would you like to explore
                </label>
                <select
                  id="interest"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#5046e5] focus:ring-2 focus:ring-[#5046e5]/20 outline-none transition-all text-sm bg-white"
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

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-[#5046e5] rounded-full hover:bg-[#4038c7] transition-colors mt-2"
              >
                Book a Free Demo
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
