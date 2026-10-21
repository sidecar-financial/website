import { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Carry Management Software for Real Estate Firms | Navable",
  description:
    "Manage carry and promote structures with accuracy, transparency, and auditability, without spreadsheet sprawl. The modern platform for modern real asset firms.",
};

const capabilities = [
  "Centralized funds, JV, and project-level carry and promote calculations",
  "Consistent rules across varied structures",
  "Track participant changes and economic adjustments over time",
  "Maintain a clear audit trail across assets, strategies, and entities",
];

const structures = [
  { title: "Real estate funds and JVs", icon: "🏢" },
  { title: "Project-level promotes", icon: "🏗️" },
  { title: "Multi-asset platforms", icon: "📊" },
  { title: "Long-duration investments with evolving economics", icon: "📈" },
];

export default function RealEstatePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#f8f7ff] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#5046e5] font-semibold text-sm uppercase tracking-wide mb-4">
              Real Estate
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Manage <span className="text-[#5046e5]">Carry</span>
              <br />
              <em>The</em> Modern Platform for Modern Real Asset Firms
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Manage carry and promote structures with accuracy, transparency, 
              and auditability, without spreadsheet sprawl.
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
            Bring Structure to Real Asset Carry with:
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
            Designed for Real Estate & Multi-Asset Complexity
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
            Request Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
}
