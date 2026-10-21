"use client";

import { useState } from "react";

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

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#5046e5] text-xs font-bold tracking-[0.2em] uppercase mb-4">
            FAQ
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-4 text-[15px]">
                  {faq.question}
                </span>
                {/* Plus/Minus icon */}
                <span className="flex-shrink-0 text-gray-400 text-xl font-light">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${
                openIndex === index ? 'max-h-48' : 'max-h-0'
              }`}>
                <div className="px-6 pb-5 pt-0">
                  <p className="text-gray-600 leading-relaxed text-[15px]">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
