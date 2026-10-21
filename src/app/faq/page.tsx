"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const faqs = [
  {
    question: "What is Navable?",
    answer:
      "Navable is a purpose-built platform for alternative asset managers to manage carried interest, employee co-investment programs, and total compensation. We replace error-prone spreadsheets with a centralized, auditable system.",
  },
  {
    question: "Who is Navable for?",
    answer:
      "Navable serves private equity firms, venture capital funds, real estate investment managers, and other alternative asset managers who need to manage carry plans, GP commit programs, and compensation structures.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Most clients are fully onboarded within three weeks. Our team handles data migration, plan configuration, and validation to ensure a smooth transition from your existing systems.",
  },
  {
    question: "Can Navable handle complex waterfall structures?",
    answer:
      "Yes. Navable supports deal-by-deal, whole-fund, and hybrid waterfall structures. We can model European, American, and custom waterfall arrangements with full flexibility for clawback provisions and catch-up calculations.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. Navable employs enterprise-grade security including SOC 2 Type II compliance, encryption at rest and in transit, role-based access controls, and comprehensive audit logging.",
  },
  {
    question: "Does Navable integrate with our existing systems?",
    answer:
      "Navable integrates with popular fund administration systems, HR platforms, and accounting software. We also offer a robust API for custom integrations.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We provide white-glove support including dedicated account management, training sessions for your team, and responsive technical support. Our team includes former fund operations professionals who understand your challenges.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Pricing is based on the number of fund vehicles and participants managed on the platform. Contact us for a customized quote based on your specific needs.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 flex items-center justify-between text-left"
        onClick={onToggle}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <svg
          className={`w-5 h-5 text-[#5046e5] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#f8f7ff] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#5046e5] font-semibold text-sm uppercase tracking-wide mb-4">
              FAQ
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Frequently Asked{" "}
              <span className="text-[#5046e5]">Questions</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Find answers to common questions about Navable, our platform, and
              how we can help your firm.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-gray-200 border-t border-gray-200">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20 bg-[#f8f7ff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our team is happy to walk you through the platform and answer any
            questions specific to your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/demo" size="lg">
              Book a Demo
            </Button>
            <Button href="mailto:hello@navable.com" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
