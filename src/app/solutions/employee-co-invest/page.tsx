import { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Employee Co-Invest Software | Navable",
  description:
    "Employee co-invest programs, built for scale. Provide consistent, compliant framework that your team and your LPs can trust.",
};

const features = [
  {
    title: "End-to-End Employee Co-Invest Workflow",
    description:
      "Digitize elections, capital allocation, distributions, and performance tracking across vehicles.",
  },
  {
    title: "Customizable Investor Portal",
    description:
      "Quarterly metrics, K1s and subdocs all in one place with built-in multi-currency support.",
  },
  {
    title: "Aligned Transparency for All Participants",
    description:
      "Participants see their status; administrators see the whole picture.",
  },
  {
    title: "Scalable Participant Management",
    description:
      "Onboard and manage employees consistently, with secure records and compliance support.",
  },
];

const useCases = [
  "Are scaling offerings across their organization and funds",
  "Balance many participants and multiple election cycles",
  "Need reliable capital tracking and a digital first process",
  "Have global employees or cross-jurisdiction considerations",
];

export default function EmployeeCoInvestPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#f8f7ff] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#5046e5] font-semibold text-sm uppercase tracking-wide mb-4">
              Employee Co-Invest
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Manage <span className="text-[#5046e5]">Carry</span>
              <br />
              Employee co-invest programs. Built for scale.
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Provide consistent, compliant framework that your team and your LPs can trust.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/demo" size="lg">
                Book a Free Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            One Place to Manage With Confidence
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#f8f7ff] rounded-2xl p-8 border border-[#e8e4ff]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e8e4ff] flex items-center justify-center text-[#5046e5] mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-[#f8f7ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Built for Firms and GPs that:
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="flex items-start bg-white rounded-xl p-6 border border-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-[#5046e5] text-white flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#5046e5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Get Setup in Under Three Weeks
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Our expert team provides white glove service, ensuring you have a 
            smooth and speedy onboarding process.
          </p>
          <Button href="/demo" variant="secondary" size="lg">
            Request Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
}
