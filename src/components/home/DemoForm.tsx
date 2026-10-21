"use client";

import type { ReactNode } from "react";
import { DarkSection } from "@/components/ui/Frame";
import DemoSuccess from "@/components/demo/DemoSuccess";
import { useDemoRequest } from "@/components/demo/useDemoRequest";

const fieldBase =
  "w-full h-[68px] rounded-[3px] border bg-transparent px-[26px] text-[15px] text-white placeholder:text-navy-text outline-none transition-[border-color,box-shadow] duration-200 focus:border-orange focus:shadow-[0_0_24px_-8px_rgba(245,166,29,0.55)] focus-visible:ring-1 focus-visible:ring-orange";

type DemoFormProps = {
  /** Anchor id of the section (e.g. "contact" on the About page). */
  id?: string;
  /** Vertical tab label hanging off the section. */
  label?: string;
  title?: ReactNode;
  description?: ReactNode;
};

const defaultTitle = (
  <>
    Ready to Move Carry
    <br className="hidden lg:block" /> <span className="text-orange">Beyond Spreadsheets?</span>
  </>
);

const defaultDescription = (
  <>
    Discover how <strong className="font-medium text-white">Navable can help</strong> your finance
    team manage complex carry structures, reduce manual work, and maintain control as your firm
    grows.
  </>
);

export default function DemoForm({
  id = "demo",
  label = "Book a Demo",
  title = defaultTitle,
  description = defaultDescription,
}: DemoFormProps = {}) {
  const { formData, setField, errors, isSubmitting, status, firstName, fieldId, handleSubmit } =
    useDemoRequest();
  const headingId = `${id}-heading`;

  const borderFor = (field: "fullName" | "email" | "company") =>
    errors[field] ? "border-error-dark" : "border-navy-border";

  return (
    <DarkSection id={id} label={label} labelledBy={headingId}>
      <div className="grid lg:grid-cols-[611px_1fr]">
        {/* Left content */}
        <div className="dot-grid-dark px-6 pb-10 pt-12 lg:px-12 lg:pb-12 lg:pt-[65px]">
          <h2
            id={headingId}
            className="text-[32px] font-semibold leading-[1.25] text-white lg:text-[40px] lg:leading-[50px]"
          >
            {title}
          </h2>
          <p className="mt-6 max-w-[430px] text-[15px] leading-[25px] text-navy-text">
            {description}
          </p>
        </div>

        {/* Right form */}
        <div className="px-6 pb-12 lg:px-0 lg:pb-[49px] lg:pr-12 lg:pt-[59px]">
          {status === "success" ? (
            <DemoSuccess firstName={firstName} headingLevel="h3" />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-3">
              <div>
                <label htmlFor={`${fieldId("fullName")}`} className="sr-only">
                  Full Name (required)
                </label>
                <input
                  type="text"
                  id={`${fieldId("fullName")}`}
                  name="fullName"
                  placeholder="Full Name*"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? `${fieldId("fullName")}-error` : undefined}
                  className={`${fieldBase} ${borderFor("fullName")}`}
                  value={formData.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  autoComplete="name"
                />
                {errors.fullName && (
                  <p id={`${fieldId("fullName")}-error`} className="field-error mt-1.5 text-sm text-error-dark" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={`${fieldId("email")}`} className="sr-only">
                  Work Email (required)
                </label>
                <input
                  type="email"
                  id={`${fieldId("email")}`}
                  name="email"
                  placeholder="Work Email*"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${fieldId("email")}-error` : undefined}
                  className={`${fieldBase} ${borderFor("email")}`}
                  value={formData.email}
                  onChange={(e) => setField("email", e.target.value)}
                  autoComplete="email"
                />
                {errors.email && (
                  <p id={`${fieldId("email")}-error`} className="field-error mt-1.5 text-sm text-error-dark" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={`${fieldId("company")}`} className="sr-only">
                  Company Name (required)
                </label>
                <input
                  type="text"
                  id={`${fieldId("company")}`}
                  name="company"
                  placeholder="Company Name*"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? `${fieldId("company")}-error` : undefined}
                  className={`${fieldBase} ${borderFor("company")}`}
                  value={formData.company}
                  onChange={(e) => setField("company", e.target.value)}
                  autoComplete="organization"
                />
                {errors.company && (
                  <p id={`${fieldId("company")}-error`} className="field-error mt-1.5 text-sm text-error-dark" role="alert">
                    {errors.company}
                  </p>
                )}
              </div>

              <div className="relative">
                <label htmlFor={`${fieldId("interest")}`} className="sr-only">
                  What would you like to explore
                </label>
                <select
                  id={`${fieldId("interest")}`}
                  name="interest"
                  className={`${fieldBase} cursor-pointer appearance-none border-navy-border pr-14 ${
                    formData.interest ? "text-white" : "text-navy-text"
                  }`}
                  value={formData.interest}
                  onChange={(e) => setField("interest", e.target.value)}
                >
                  <option value="" className="bg-navy text-navy-text">
                    What would you like to explore
                  </option>
                  <option value="carry" className="bg-navy text-white">Carry Management</option>
                  <option value="compensation" className="bg-navy text-white">Compensation Management</option>
                  <option value="coinvest" className="bg-navy text-white">Employee Co-Invest</option>
                  <option value="gpcommit" className="bg-navy text-white">GP Commit</option>
                  <option value="all" className="bg-navy text-white">All of the above</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-[26px] top-1/2 size-4 -translate-y-1/2 text-navy-text"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {status === "error" && (
                <p className="text-sm text-error-dark" role="alert">
                  There was an error submitting your request. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group !mt-[23px] inline-flex h-[53px] w-full items-center justify-center rounded-[4px] bg-orange text-[15px] font-medium text-ink transition-[color,background-color,box-shadow,transform] duration-200 hover:bg-orange-dark hover:shadow-[0_8px_28px_-4px_rgba(245,166,29,0.6)] active:scale-[0.985] disabled:hover:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="-ml-1 mr-3 size-5 animate-spin text-ink" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Book a Free Demo&nbsp;
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                    >
                      →
                    </span>
                  </>
                )}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-[13px] leading-5 text-navy-text">
            Trusted by firms managing over $150B+ in AUM.
          </p>
        </div>
      </div>
    </DarkSection>
  );
}
