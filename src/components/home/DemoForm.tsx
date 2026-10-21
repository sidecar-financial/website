"use client";

import { useState, useId } from "react";

export default function DemoForm() {
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
      // Simulate API call
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

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#f8f7ff]" id="demo" aria-labelledby="demo-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-4">
          <p className="text-[#5046e5] text-xs font-bold tracking-[0.2em] uppercase">
            Book a Demo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
          {/* Left content */}
          <div className="lg:sticky lg:top-24">
            <h2 id="demo-heading" className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-[1.15]">
              Ready to Move Carry
              <span className="text-[#5046e5] block">Beyond Spreadsheets?</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-[15px] mt-6">
              Discover how Navable can help your finance team manage complex 
              carry structures, reduce manual work, and maintain control as 
              your firm grows.
            </p>
          </div>

          {/* Right form */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl shadow-gray-900/10 border border-gray-100">
            {/* Live region for form status announcements */}
            <div 
              role="status" 
              aria-live="polite" 
              aria-atomic="true"
              className="sr-only"
            >
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank you!</h3>
                <p className="text-gray-600">We&apos;ll be in touch shortly to schedule your demo.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label
                    htmlFor={`${formId}-fullName`}
                    className="block text-sm font-semibold text-gray-900 mb-2"
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
                    } focus:border-[#5046e5] focus:ring-4 focus:ring-[#5046e5]/10 outline-none transition-all text-[15px]`}
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
                    className="block text-sm font-semibold text-gray-900 mb-2"
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
                    } focus:border-[#5046e5] focus:ring-4 focus:ring-[#5046e5]/10 outline-none transition-all text-[15px]`}
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
                    className="block text-sm font-semibold text-gray-900 mb-2"
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
                    } focus:border-[#5046e5] focus:ring-4 focus:ring-[#5046e5]/10 outline-none transition-all text-[15px]`}
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
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    What would you like to explore
                  </label>
                  <select
                    id={`${formId}-interest`}
                    name="interest"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#5046e5] focus:ring-4 focus:ring-[#5046e5]/10 outline-none transition-all text-[15px] bg-white appearance-none cursor-pointer text-gray-700"
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
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-6 py-4 min-h-[56px] text-base font-semibold text-white bg-[#5046e5] rounded-full hover:bg-[#4038c7] transition-all mt-2 shadow-lg shadow-[#5046e5]/25 hover:shadow-xl hover:shadow-[#5046e5]/30 focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Book a Free Demo
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Trust badge below form */}
            <p className="text-sm text-gray-500 text-center mt-6">
              Trusted by firms managing over $150B+ in AUM.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
