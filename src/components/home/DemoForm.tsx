"use client";

import { useState } from "react";

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
    <section className="py-24 bg-gradient-to-b from-white to-[#f8f7ff]" id="demo">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          {/* Left content */}
          <div className="lg:sticky lg:top-24">
            <p className="text-[#5046e5] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Book a Demo
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-[1.15]">
              Ready to Move Carry
            </h2>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#5046e5] leading-[1.15] mb-6">
              Beyond Spreadsheets?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              Discover how Navable can help your finance team manage complex 
              carry structures, reduce manual work, and maintain control as 
              your firm grows.
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#5046e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Trusted by firms managing over $150B+ in AUM.
            </p>
          </div>

          {/* Right form */}
          <div className="bg-white rounded-2xl p-10 shadow-xl shadow-gray-900/10 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5046e5] focus:ring-4 focus:ring-[#5046e5]/10 outline-none transition-all text-[15px]"
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
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Work Email*
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5046e5] focus:ring-4 focus:ring-[#5046e5]/10 outline-none transition-all text-[15px]"
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
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Company Name*
                </label>
                <input
                  type="text"
                  id="company"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5046e5] focus:ring-4 focus:ring-[#5046e5]/10 outline-none transition-all text-[15px]"
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
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  What would you like to explore
                </label>
                <select
                  id="interest"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5046e5] focus:ring-4 focus:ring-[#5046e5]/10 outline-none transition-all text-[15px] bg-white appearance-none cursor-pointer"
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
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
                className="w-full inline-flex items-center justify-center px-6 py-4 text-base font-semibold text-white bg-[#5046e5] rounded-full hover:bg-[#4038c7] transition-all mt-4 shadow-lg shadow-[#5046e5]/25 hover:shadow-xl hover:shadow-[#5046e5]/30"
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
