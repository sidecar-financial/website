import { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Carry Management Software for Venture Capital | Navable",
  description:
    "Manage carried interest and compensation with clarity and control, without spreadsheet sprawl. Modern carry for modern VCs.",
};

const capabilities = [
  "Centralize carry plans, allocations, and vesting across funds and SPVs",
  "Track venture partner participation changes with full history",
  "Maintain consistent, auditable calculations as structures evolve",
  "Provide clear visibility into carry and compensation for leadership and employees",
];

const structures = [
  { title: "Multi-fund VC platforms", icon: "🚀" },
  { title: "SPVs and deal-by-deal carry", icon: "📋" },
  { title: "Venture partners and advisors", icon: "🤝" },
  { title: "Employee co-invest programs", icon: "👥" },
];

export default function VentureCapitalPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#f8f7ff] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#5046e5] font-semibold text-sm uppercase tracking-wide mb-4">
              Venture Capital
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Manage <span className="text-[#5046e5]">Carry</span>
              <br />
              Modern Carry for Modern VCs
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Manage carried interest and compensation with clarity and control, 
              without spreadsheet sprawl.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/demo" size="lg">
                Book a Free Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            VCs Evolve Quickly. So Does Navable.
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="flex items-start bg-[#f8f7ff] rounded-xl p-6"
              >
                <div className="w-8 h-8 rounded-full bg-[#5046e5] text-white flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">{capability}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structures */}
      <section className="py-20 bg-[#f8f7ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Purpose Built for VCs, Supporting:
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {structures.map((structure, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{structure.icon}</div>
                <p className="text-gray-900 font-medium">{structure.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#5046e5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Experience it for free with a 14 day trial
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Our expert team provides white glove service, ensuring you have a 
            smooth and speedy onboarding process.
          </p>
          <Button href="/demo" variant="secondary" size="lg">
            Book a Demo
          </Button>
        </div>
      </section>
    </div>
  );
}
