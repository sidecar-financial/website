"use client";

const featuredTestimonial = {
  quote:
    "We switched to Navable due to data accuracy issues with our legacy provider. It's paramount that our software gets these things right.",
  author: "Director of Finance",
  company: "$4Bn AUM Venture Capital Firm",
};

const sideTestimonials = [
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
  return (
    <section className="py-24 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#a5b4fc] text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight">
            Built for Finance.
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#fbbf24] leading-tight">
            Proven in Practice.
          </h2>
        </div>

        {/* Two-column layout: Featured quote on left, grid on right */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Featured large quote - Left side */}
          <div className="bg-[#23233a] rounded-2xl p-8 lg:p-10 border border-[#2d2d4a] flex flex-col justify-between h-full">
            <div>
              <div className="text-[#fbbf24] mb-6">
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <blockquote className="text-xl lg:text-2xl font-medium text-white leading-relaxed mb-8">
                {featuredTestimonial.quote}
              </blockquote>
            </div>

            <div>
              <p className="font-semibold text-white">– {featuredTestimonial.author}</p>
              <p className="text-sm text-gray-400 mt-1">{featuredTestimonial.company}</p>
            </div>
          </div>

          {/* Three smaller quote cards - Right side in vertical stack */}
          <div className="flex flex-col gap-4">
            {sideTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#23233a] rounded-xl p-6 border border-[#2d2d4a] hover:border-[#3d3d5a] transition-colors flex-1"
              >
                <div className="flex gap-3">
                  <div className="text-[#fbbf24] flex-shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      {testimonial.quote}
                    </p>
                    <div>
                      <p className="font-medium text-white text-sm">– {testimonial.author}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
