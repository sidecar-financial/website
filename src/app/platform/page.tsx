import { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Carried Interest Software | Navable Platform",
  description:
    "Navable's modern carried interest management platform eliminates Excel sprawl, reduces risk, and saves you hundreds of hours.",
};

const features = [
  {
    title: "Centralized Carry Plans & Allocations",
    description:
      "Bring all carry plans, waterfall rules, and allocations into one reliable environment.",
  },
  {
    title: "Structured Rules & Vesting Logic",
    description:
      "Apply vesting, forfeiture, and reallocation rules consistently across participants and vehicles.",
  },
  {
    title: "Clear Visibility for Finance & Leadership",
    description:
      "Move beyond static spreadsheets, and provide real-time insights and trusted results.",
  },
  {
    title: "Audit-Ready Trail & Reporting",
    description:
      "Every edit and calculation is traceable, producing outputs you can defend with confidence.",
  },
];

const useCases = [
  "Multiple flagship and continuation funds",
  "Deal-by-deal or tranche-by-tranche carry structures",
  "Joiners, leavers, and participant lifecycle changes",
  "Increased audit and LP reporting expectations",
];

export default function PlatformPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#f8f7ff] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#5046e5] font-semibold text-sm uppercase tracking-wide mb-4">
              Platform
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Manage <span className="text-[#5046e5]">Carry</span>
              <br />
              Purpose-Built for GP Operations.
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Navable&apos;s modern carried interest management platform eliminates 
              Excel sprawl, reduces risk, and saves you hundreds of hours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/demo" size="lg">
                Book a Free Demo
              </Button>
              <Button href="#features" variant="outline" size="lg">
                See Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Firms with over <span className="text-[#5046e5]">$150B AUM</span> use Navable
          </h2>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-[#f8f7ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              One Place to Manage Carry with Confidence
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e8e4ff] flex items-center justify-center text-[#5046e5] mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Built for GP Operational Teams Managing
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-[#f8f7ff] rounded-xl p-6 text-center border border-[#e8e4ff]"
              >
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
          <Button
            href="/demo"
            variant="secondary"
            size="lg"
          >
            Request Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
}
