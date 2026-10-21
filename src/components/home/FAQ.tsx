"use client";

import { useState, useId } from "react";
import { Section } from "@/components/ui/Frame";

// Answers match the approved site build; don't add capability claims (SSO protocols,
// signing, RBAC, currency handling) without confirming them with the product team.
const faqs = [
  {
    question: "Do we need to use every Navable module?",
    answer:
      "No. Navable is modular, so firms can use the capabilities that fit their needs and expand into additional workflows over time.",
  },
  {
    question: "Does Navable support SSO and integrations?",
    answer:
      "Yes. Navable supports single sign-on and connects with the systems your team already relies on. We review your integration requirements during onboarding.",
  },
  {
    question: "Can subscription workflows accommodate different eligibility requirements?",
    answer:
      "Yes. Election and subscription workflows can be configured by participant group, so eligibility can vary across employees, vehicles, and jurisdictions.",
  },
  {
    question: "Can we use our own DocuSign account?",
    answer:
      "Yes. Navable can connect to your firm's existing DocuSign account for award documents and subscription paperwork.",
  },
  {
    question: "Does Navable support investment reporting across multiple entities or currencies?",
    answer:
      "Yes. Reporting spans funds, vehicles, and entities, with built-in multi-currency support.",
  },
  {
    question: "Can participant access be separated from administrative access?",
    answer:
      "Yes. Participants see their own status, while administrators see the whole picture.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  const focusButton = (index: number) =>
    document.getElementById(`faq-button-${baseId}-${index}`)?.focus();

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusButton((index + 1) % faqs.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusButton((index - 1 + faqs.length) % faqs.length);
        break;
      case "Home":
        e.preventDefault();
        focusButton(0);
        break;
      case "End":
        e.preventDefault();
        focusButton(faqs.length - 1);
        break;
    }
  };

  return (
    <Section id="faq" labelledBy="faq-heading" noBorder>
      <div className="grid lg:grid-cols-[376px_1fr]">
        <div className="px-6 pb-6 pt-12 lg:border-r lg:border-line lg:px-12 lg:pb-0 lg:pt-[87px]">
          <h2
            id="faq-heading"
            className="text-[32px] font-semibold leading-[1.25] text-ink lg:text-[40px] lg:leading-[50px]"
          >
            FAQ
          </h2>
        </div>

        <div className="px-6 pb-16 lg:pb-24 lg:pl-[62px] lg:pr-12 lg:pt-[67px]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${baseId}-${index}`;
            const panelId = `faq-panel-${baseId}-${index}`;

            return (
              <div key={faq.question} className="border-b border-line">
                <h3>
                  <button
                    id={buttonId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`flex w-full items-center justify-between gap-6 pt-[25px] text-left transition-[padding] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${
                      isOpen ? "pb-0" : "pb-[25px]"
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="text-lg font-medium leading-6 text-ink">{faq.question}</span>
                    <span
                      className={`flex size-[26px] shrink-0 items-center justify-center rounded-full border text-ink transition-[transform,border-color,background-color] duration-300 ease-out ${
                        isOpen ? "rotate-180 border-orange bg-orange/10" : "border-line-strong"
                      }`}
                      aria-hidden="true"
                    >
                      <svg className="size-2.5" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                        {/* The vertical stroke collapses away so plus morphs into minus */}
                        <path
                          d="M5 2v6"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          style={{
                            transformBox: "fill-box",
                            transformOrigin: "center",
                            transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                            transition: "transform 300ms ease-out",
                          }}
                        />
                      </svg>
                    </span>
                  </button>
                </h3>
                {/* 0fr -> 1fr grid rows animate to the content's natural height; `inert` keeps a closed panel out of the tab order and accessibility tree. */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[520px] pb-[33px] pt-5 text-[15px] leading-[25px] text-body">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
