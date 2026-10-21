import { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Why Navable | Modern Carried Interest Management",
  description:
    "Discover why leading alternative asset managers choose Navable for carry, compensation, and GP commit management.",
};

const benefits = [
  {
    title: "Purpose-Built for Alternative Assets",
    description:
      "Unlike generic tools, Navable is designed specifically for PE, VC, and real estate fund operations.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Eliminate Excel Risk",
    description:
      "Move beyond error-prone spreadsheets with a centralized, auditable platform.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Save Hundreds of Hours",
    description:
      "Automate complex calculations and reporting that used to take days or weeks.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "White-Glove Onboarding",
    description:
      "Our expert team ensures smooth implementation in under three weeks.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "$150B+", label: "AUM on Platform" },
  { value: "100+", label: "Fund Vehicles" },
  { value: "99.9%", label: "Calculation Accuracy" },
  { value: "3 weeks", label: "Average Onboarding" },
];

export default function WhyNavablePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#f8f7ff] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#5046e5] font-semibold text-sm uppercase tracking-wide mb-4">
              Why Navable
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              The Modern Way to{" "}
              <span className="text-[#5046e5]">Manage Carry</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Leading alternative asset managers choose Navable to eliminate
              spreadsheet chaos and bring confidence to their carry, compensation,
              and GP commit operations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/demo" size="lg">
                Book a Free Demo
              </Button>
              <Button href="/platform" variant="outline" size="lg">
                Explore Platform
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#5046e5]">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#f8f7ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Built Different. Built Better.
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Navable was created by industry veterans who understand the unique
              challenges of alternative asset management.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e8e4ff] flex items-center justify-center text-[#5046e5] mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#5046e5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join the leading alternative asset managers who trust Navable for
            their carry and compensation management.
          </p>
          <Button href="/demo" variant="secondary" size="lg">
            Schedule a Demo
          </Button>
        </div>
      </section>
    </div>
  );
}
