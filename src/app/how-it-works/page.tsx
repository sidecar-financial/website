import { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How It Works | Navable",
  description:
    "Learn how Navable simplifies carry, compensation, and GP commit management in three easy steps.",
};

const steps = [
  {
    number: "01",
    title: "Onboard Your Data",
    description:
      "Our team works with you to migrate your existing carry plans, participant data, and waterfall rules into Navable. We handle the heavy lifting so you can focus on your business.",
    features: [
      "White-glove data migration",
      "Historical data import",
      "Plan structure validation",
      "Participant verification",
    ],
  },
  {
    number: "02",
    title: "Configure Your Rules",
    description:
      "Set up vesting schedules, forfeiture rules, and allocation logic that match your fund documents. Our platform supports even the most complex waterfall structures.",
    features: [
      "Custom vesting schedules",
      "Flexible allocation rules",
      "Multi-fund support",
      "Deal-by-deal or whole-fund",
    ],
  },
  {
    number: "03",
    title: "Operate with Confidence",
    description:
      "Run calculations, generate reports, and manage participants with full audit trails. Real-time visibility for your finance team and leadership.",
    features: [
      "Automated calculations",
      "Audit-ready reports",
      "LP-ready statements",
      "Real-time dashboards",
    ],
  },
];

const timeline = [
  { week: "Week 1", activity: "Data collection & analysis" },
  { week: "Week 2", activity: "Platform configuration & testing" },
  { week: "Week 3", activity: "Validation & go-live" },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#f8f7ff] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#5046e5] font-semibold text-sm uppercase tracking-wide mb-4">
              How It Works
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Simple Setup.{" "}
              <span className="text-[#5046e5]">Powerful Results.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Getting started with Navable is straightforward. Our expert team
              guides you through every step, ensuring a smooth transition from
              spreadsheets to a purpose-built platform.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="text-6xl font-bold text-[#e8e4ff] mb-4">
                    {step.number}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#e8e4ff] flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-[#5046e5]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`bg-[#f8f7ff] rounded-2xl p-8 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="aspect-video bg-white rounded-lg flex items-center justify-center border border-[#e8e4ff]">
                    <span className="text-gray-400">Step {step.number} Illustration</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#f8f7ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Go Live in Under Three Weeks
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our streamlined onboarding process gets you up and running fast.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={item.week} className="relative">
                <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-[#5046e5] text-white flex items-center justify-center font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.week}</h3>
                  <p className="text-gray-600 text-sm">{item.activity}</p>
                </div>
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#e8e4ff]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#5046e5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Book a demo to see how Navable can transform your carry and
            compensation management.
          </p>
          <Button href="/demo" variant="secondary" size="lg">
            Book a Free Demo
          </Button>
        </div>
      </section>
    </div>
  );
}
