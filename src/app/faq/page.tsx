"use client";

import { useId, useState } from "react";
import Button from "@/components/ui/Button";
import { Section } from "@/components/ui/Frame";
import { PageHero } from "@/components/ui/PageBlocks";

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
  const baseId = useId();
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="border-b border-line">
      <h3>
        <button
          id={buttonId}
          className={`flex w-full items-center justify-between gap-6 pt-[25px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${
            isOpen ? "pb-0" : "pb-[25px]"
          }`}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className="text-lg font-medium leading-6 text-ink">{question}</span>
          <span
            className="flex size-[26px] shrink-0 items-center justify-center rounded-full border border-line-strong text-ink"
            aria-hidden="true"
          >
            <svg className="size-2.5" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              {!isOpen && <path d="M5 2v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />}
            </svg>
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
        <p className="max-w-[620px] pb-[33px] pt-5 text-[15px] leading-[25px] text-body">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Frequently Asked <span className="text-orange">Questions</span>
          </>
        }
        description="Find answers to common questions about Navable, our platform, and how we can help your firm."
      />

      {/* FAQ List */}
      <Section label="FAQ" labelledBy="faq-list-heading">
        <h2 id="faq-list-heading" className="sr-only">
          Common questions
        </h2>
        <div className="px-6 pb-16 pt-8 lg:px-[62px] lg:pb-24 lg:pt-12">
          <div className="mx-auto max-w-[820px] border-t border-line">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Still have questions */}
      <Section labelledBy="questions-heading">
        <div className="px-6 py-14 text-center lg:py-[82px]">
          <h2
            id="questions-heading"
            className="text-[32px] font-semibold leading-[1.25] text-ink lg:text-[40px] lg:leading-[50px]"
          >
            Still have questions?
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-[25px] text-body">
            Our team is happy to walk you through the platform and answer any questions specific to your
            situation.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/demo" size="lg">
              Book a Demo
            </Button>
            <Button href="mailto:hello@navable.com" variant="secondary" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
