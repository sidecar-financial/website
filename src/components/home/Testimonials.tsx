"use client";

import { useState } from "react";

const testimonials = [
  {
    quote:
      "We switched to Navable due to data accuracy issues with our legacy provider. It's paramount that our software gets these things right.",
    author: "Director of Finance",
    company: "$4Bn AUM Venture Capital Firm",
  },
  {
    quote:
      "Probably one of the more thoughtful, comprehensive software solutions we've seen built for our industry.",
    author: "CFO",
    company: "The Sterling Group",
  },
  {
    quote: "It's easy, intuitive, and seamless.",
    author: "MD, Business Technology Office",
    company: "$15Bn AUM Global Private Equity Firm",
  },
  {
    quote:
      "Navable dramatically simplified manual work with an intuitive digital experience.",
    author: "COO",
    company: "$85B AUM Global Private Equity Firm",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 bg-[#5046e5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#c4c0ff] font-semibold text-sm uppercase tracking-wide mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Built for Finance.
            <br />
            Proven in Practice.
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="text-center">
              <svg
                className="w-12 h-12 text-white/30 mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote className="text-2xl sm:text-3xl font-medium text-white leading-relaxed mb-8">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </blockquote>

              <div className="text-white/80">
                <p className="font-semibold">– {testimonials[activeIndex].author}</p>
                <p className="text-sm mt-1">{testimonials[activeIndex].company}</p>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center space-x-3 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex
                      ? "bg-white scale-110"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
