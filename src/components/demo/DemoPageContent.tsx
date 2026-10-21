"use client";

import Button from "../ui/Button";
import { Section } from "../ui/Frame";
import { CheckBadge } from "../ui/PageBlocks";
import DemoSuccess from "./DemoSuccess";
import { useDemoRequest } from "./useDemoRequest";

const fieldBase =
  "w-full h-14 rounded-[3px] border bg-transparent px-5 text-[15px] text-white placeholder:text-navy-text outline-none transition-colors focus:border-orange focus-visible:ring-1 focus-visible:ring-orange";
const labelClass = "mb-2 block text-sm font-medium text-white";
const errorClass = "mt-1.5 text-sm text-error-dark";

export default function DemoPageContent() {
  const { formData, setField, errors, isSubmitting, status, firstName, fieldId, handleSubmit } =
    useDemoRequest();

  const demoFeatures = [
    "Manage allocations, vesting, and participant changes.",
    "Connect carry, compensation, and GP commit workflows.",
    "Configure Navable to fit your firm's carry workflows.",
  ];

  return (
    <Section labelledBy="demo-page-heading">
      <div className="grid lg:grid-cols-[1fr_1fr]">
        {/* Left content */}
        <div className="dot-grid border-b border-line px-6 pb-12 pt-14 lg:border-b-0 lg:border-r lg:px-12 lg:pb-[72px] lg:pt-[88px]">
          <div className="lg:sticky lg:top-32">
            <h1
              id="demo-page-heading"
              className="text-[34px] font-semibold leading-[1.15] text-ink sm:text-[42px] lg:text-[46px] lg:leading-[54px]"
            >
              Carry Management Software for{" "}
              <span className="text-orange">Alternative Asset Firms</span>
            </h1>
            <p className="mt-6 text-lg font-medium text-ink">
              See How Navable Fits Your Carry Structure
            </p>
            <p className="mt-4 max-w-[520px] text-[15px] leading-[25px] text-body">
              As funds and participants grow, Navable helps finance teams manage
              complex carry with greater confidence, less manual work, and reduced
              operational risk.
            </p>

            <div className="mt-10">
              <h2 className="mb-4 flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase leading-[14px] tracking-[0.08em] text-ink">
                <span aria-hidden="true" className="block size-3.5 bg-orange" />
                In your demo, you&apos;ll see how to:
              </h2>
              <ul className="space-y-3" role="list">
                {demoFeatures.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckBadge className="mt-0.5 size-5" />
                    <span className="text-[15px] leading-6 text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 border border-line bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
                Trusted by Firms Managing
              </p>
              <p className="mt-2 text-3xl font-semibold text-ink">Over $150 Bn AUM.</p>
            </div>
          </div>
        </div>

        {/* Right form (navy panel, same field treatment as the landing page demo form) */}
        <div className="on-dark bg-navy px-6 py-12 text-white lg:px-12 lg:py-[72px]">
          {status === "success" ? (
            <DemoSuccess firstName={firstName} headingLevel="h2" />
          ) : (
            <>
              <h2 className="mb-8 text-[28px] font-semibold leading-9 text-white">
                Book a <span className="text-orange">Free Demo</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor={`${fieldId("fullName")}`} className={labelClass}>
                    Full Name<span aria-hidden="true">*</span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <input
                    type="text"
                    id={`${fieldId("fullName")}`}
                    name="fullName"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? `${fieldId("fullName")}-error` : undefined}
                    className={`${fieldBase} ${errors.fullName ? "border-error-dark" : "border-navy-border"}`}
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                    autoComplete="name"
                  />
                  {errors.fullName && (
                    <p id={`${fieldId("fullName")}-error`} className={errorClass} role="alert">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={`${fieldId("email")}`} className={labelClass}>
                    Work Email<span aria-hidden="true">*</span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <input
                    type="email"
                    id={`${fieldId("email")}`}
                    name="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${fieldId("email")}-error` : undefined}
                    className={`${fieldBase} ${errors.email ? "border-error-dark" : "border-navy-border"}`}
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setField("email", e.target.value)}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p id={`${fieldId("email")}-error`} className={errorClass} role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={`${fieldId("company")}`} className={labelClass}>
                    Company Name<span aria-hidden="true">*</span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <input
                    type="text"
                    id={`${fieldId("company")}`}
                    name="company"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.company}
                    aria-describedby={errors.company ? `${fieldId("company")}-error` : undefined}
                    className={`${fieldBase} ${errors.company ? "border-error-dark" : "border-navy-border"}`}
                    placeholder="Your company"
                    value={formData.company}
                    onChange={(e) => setField("company", e.target.value)}
                    autoComplete="organization"
                  />
                  {errors.company && (
                    <p id={`${fieldId("company")}-error`} className={errorClass} role="alert">
                      {errors.company}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={`${fieldId("interest")}`} className={labelClass}>
                    What would you like to explore?
                  </label>
                  <select
                    id={`${fieldId("interest")}`}
                    name="interest"
                    className={`${fieldBase} cursor-pointer border-navy-border ${
                      formData.interest ? "text-white" : "text-navy-text"
                    }`}
                    value={formData.interest}
                    onChange={(e) => setField("interest", e.target.value)}
                  >
                    <option value="" className="bg-navy text-navy-text">Select an option</option>
                    <option value="carry" className="bg-navy text-white">Carry Management</option>
                    <option value="compensation" className="bg-navy text-white">Compensation Management</option>
                    <option value="coinvest" className="bg-navy text-white">Employee Co-Invest</option>
                    <option value="gpcommit" className="bg-navy text-white">GP Commit</option>
                    <option value="all" className="bg-navy text-white">All of the above</option>
                  </select>
                </div>

                {status === "error" && (
                  <p className={errorClass} role="alert">
                    There was an error submitting your request. Please try again.
                  </p>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Book a Free Demo"}
                </Button>

                <p className="mt-4 text-center text-[13px] leading-5 text-navy-text">
                  By submitting, you agree to our{" "}
                  <a
                    href="/privacy"
                    className="rounded-sm font-medium text-white underline decoration-orange decoration-2 underline-offset-[3px] transition-all hover:decoration-4"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
