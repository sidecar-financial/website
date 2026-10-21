"use client";

import { useState, useId } from "react";

const faqs = [
  {
    question: "Do we need to use every Navable module?",
    answer:
      "No. Navable is modular, so firms can use the capabilities that fit their needs and expand into additional workflows over time.",
  },
  {
    question: "Does Navable support SSO and integrations?",
    answer:
      "Yes. Navable supports Single Sign-On (SSO) through SAML 2.0 and OAuth, and integrates with popular HR, accounting, and document management systems.",
  },
  {
    question: "Can subscription workflows accommodate different eligibility requirements?",
    answer:
      "Absolutely. Navable supports configurable eligibility rules, allowing you to set different requirements for different participant groups, fund types, or investment vehicles.",
  },
  {
    question: "Can we use our own DocuSign account?",
    answer:
      "Yes. Navable integrates with your existing DocuSign account, or you can use our built-in document signing capabilities.",
  },
  {
    question: "Does Navable support investment reporting across multiple entities or currencies?",
    answer:
      "Yes. Navable handles multi-entity structures and supports multiple currencies with real-time conversion and historical rate tracking.",
  },
  {
    question: "Can participant access be separated from administrative access?",
    answer:
      "Yes. Navable provides granular role-based access control, allowing you to define exactly what each user type can see and do within the platform.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const nextIndex = (index + 1) % faqs.length;
        document.getElementById(`faq-button-${baseId}-${nextIndex}`)?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevIndex = (index - 1 + faqs.length) % faqs.length;
        document.getElementById(`faq-button-${baseId}-${prevIndex}`)?.focus();
        break;
      case "Home":
        e.preventDefault();
        document.getElementById(`faq-button-${baseId}-0`)?.focus();
        break;
      case "End":
        e.preventDefault();
        document.getElementById(`faq-button-${baseId}-${faqs.length - 1}`)?.focus();
        break;
    }
  };

  return (
    <section className="py-24 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#5046e5] text-xs font-bold tracking-[0.2em] uppercase mb-4">
            FAQ
          </p>
          <h2 id="faq-heading" className="sr-only">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3" role="region" aria-label="Frequently asked questions">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${baseId}-${index}`;
            const panelId = `faq-panel-${baseId}-${index}`;

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white"
              >
                <h3>
                  <button
                    id={buttonId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors min-h-[56px] focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-inset"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="font-medium text-gray-900 pr-4 text-[15px]">
                      {faq.question}
                    </span>
                    {/* Plus/Minus icon */}
                    <span 
                      className="flex-shrink-0 text-gray-400 text-xl font-light w-6 h-6 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-gray-600 leading-relaxed text-[15px]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
