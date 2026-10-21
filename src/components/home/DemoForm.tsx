"use client";

import { useState } from "react";
import Button from "../ui/Button";

export default function DemoForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    interest: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section className="py-20 bg-white" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <p className="text-[#5046e5] font-semibold text-sm uppercase tracking-wide mb-4">
              Book a Demo
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Ready to Move Carry
              <br />
              <span className="text-[#5046e5]">Beyond Spreadsheets?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Discover how Navable can help your finance team manage complex 
              carry structures, reduce manual work, and maintain control as 
              your firm grows.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 text-[#5046e5] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Trusted by firms managing over $150B+ in AUM.
            </div>
          </div>

          {/* Right form */}
          <div className="bg-[#f8f7ff] rounded-2xl p-8">
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
