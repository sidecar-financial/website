"use client";

import { useState, useId } from "react";
import Button from "../ui/Button";

export default function DemoPageContent() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    interest: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const formId = useId();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      setFormData({ fullName: "", email: "", company: "", interest: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const demoFeatures = [
    "Manage allocations, vesting, and participant changes.",
    "Connect carry, compensation, and GP commit workflows.",
    "Configure Navable to fit your firm's carry workflows.",
  ];

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
              <h2 className="font-semibold text-gray-900 mb-4">
                In your demo, you&apos;ll see how to:
              </h2>
              <ul className="space-y-3" role="list">
                {demoFeatures.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#5046e5] mr-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
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
            {/* Live region for form status */}
            <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
              {submitStatus === "success" && "Thank you! Your demo request has been submitted successfully."}
              {submitStatus === "error" && "There was an error submitting your request. Please try again."}
            </div>

            {submitStatus === "success" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Thank you!</h2>
                <p className="text-gray-600">We&apos;ll be in touch shortly to schedule your demo.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Book a Free Demo
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label
                      htmlFor={`${formId}-fullName`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name<span aria-hidden="true">*</span>
                      <span className="sr-only"> (required)</span>
                    </label>
                    <input
                      type="text"
                      id={`${formId}-fullName`}
                      name="fullName"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? `${formId}-fullName-error` : undefined}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.fullName ? "border-red-500" : "border-gray-200"
                      } focus:border-[#5046e5] focus:ring-2 focus:ring-[#5046e5]/20 outline-none transition-all`}
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: "" });
                      }}
                      autoComplete="name"
                    />
                    {errors.fullName && (
                      <p id={`${formId}-fullName-error`} className="mt-1 text-sm text-red-600" role="alert">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-email`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Work Email<span aria-hidden="true">*</span>
                      <span className="sr-only"> (required)</span>
                    </label>
                    <input
                      type="email"
                      id={`${formId}-email`}
                      name="email"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      } focus:border-[#5046e5] focus:ring-2 focus:ring-[#5046e5]/20 outline-none transition-all`}
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p id={`${formId}-email-error`} className="mt-1 text-sm text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-company`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company Name<span aria-hidden="true">*</span>
                      <span className="sr-only"> (required)</span>
                    </label>
                    <input
                      type="text"
                      id={`${formId}-company`}
                      name="company"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? `${formId}-company-error` : undefined}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.company ? "border-red-500" : "border-gray-200"
                      } focus:border-[#5046e5] focus:ring-2 focus:ring-[#5046e5]/20 outline-none transition-all`}
                      placeholder="Your company"
                      value={formData.company}
                      onChange={(e) => {
                        setFormData({ ...formData, company: e.target.value });
                        if (errors.company) setErrors({ ...errors, company: "" });
                      }}
                      autoComplete="organization"
                    />
                    {errors.company && (
                      <p id={`${formId}-company-error`} className="mt-1 text-sm text-red-600" role="alert">
                        {errors.company}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-interest`}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      What would you like to explore?
                    </label>
                    <select
                      id={`${formId}-interest`}
                      name="interest"
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

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Book a Free Demo"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting, you agree to our{" "}
                    <a href="/privacy" className="text-[#5046e5] hover:underline focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-offset-2 rounded">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
