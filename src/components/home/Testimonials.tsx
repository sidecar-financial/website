import { Section } from "@/components/ui/Frame";

const featuredTestimonial = {
  quote:
    "We switched to Navable due to data accuracy issues with our legacy provider. It's paramount that our software gets these things right.",
  attribution: ["Director of Finance", "$4Bn AUM Venture Capital Firm"],
};

const sideTestimonials = [
  {
    quote:
      "Probably one of the more thoughtful, comprehensive software solutions we've seen built for our industry.",
    attribution: ["CFO at The Sterling Group"],
  },
  {
    quote: "It's easy, intuitive, and seamless.",
    attribution: ["MD, Business Technology Office", "$15Bn AUM Global Private Equity Firm"],
  },
  {
    quote:
      "Navable dramatically simplified manual work with an intuitive digital experience.",
    attribution: ["COO, $85B AUM Global Private Equity Firm"],
  },
];

export default function Testimonials() {
  return (
    <Section label="Testimonials" labelledBy="testimonials-heading">
      <div className="px-6 py-14 lg:px-12 lg:pb-[72px] lg:pt-[100px]">
        <h2
          id="testimonials-heading"
          className="text-[32px] font-semibold leading-[1.25] text-ink lg:text-[40px] lg:leading-[50px]"
        >
          Built for Finance.
          <br /> Proven in Practice.
        </h2>
      </div>

      {/* Featured quote */}
      <figure className="bg-soft px-6 pb-14 pt-12 lg:min-h-[514px] lg:px-12 lg:pb-[100px] lg:pt-[63px]">
        <svg
          className="h-11 w-14 text-orange"
          viewBox="0 0 36 30"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 30V17.2C0 7.1 5.1 1.6 13.6 0l2.1 4.6C11.9 6 10 8.6 9.7 12.4H16V30H0Zm20 0V17.2C20 7.1 25.1 1.6 33.6 0l2.1 4.6c-3.8 1.4-5.7 4-6 7.8H36V30H20Z" />
        </svg>
        <blockquote className="mt-10 max-w-[640px] text-2xl font-semibold leading-[1.45] text-ink lg:text-[32px] lg:leading-[46px]">
          <p>{featuredTestimonial.quote}</p>
        </blockquote>
        <figcaption className="mt-8 text-[13px] leading-5 text-muted">
          {featuredTestimonial.attribution.map((line, i) => (
            <span key={line} className="block">
              {i === 0 ? "– " : ""}
              {line}
            </span>
          ))}
        </figcaption>
      </figure>

      {/* Supporting quotes */}
      <ul className="grid border-t border-line lg:grid-cols-3">
        {sideTestimonials.map((testimonial) => (
          <li
            key={testimonial.quote}
            className="border-b border-line last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <figure className="px-6 pb-8 pt-10 lg:px-8 lg:pb-[30px] lg:pt-12">
              <blockquote className="text-lg font-medium leading-[30px] text-ink lg:min-h-[120px]">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 text-[13px] leading-5 text-muted">
                {testimonial.attribution.map((line, i) => (
                  <span key={line} className="block">
                    {i === 0 ? "– " : ""}
                    {line}
                  </span>
                ))}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
