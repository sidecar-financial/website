"use client";

export default function TrustBadges() {
  // Placeholder logos - these would be replaced with actual client logos
  const logos = [
    { name: "137 Ventures", placeholder: "137 VENTURES" },
    { name: "LaSalle", placeholder: "LaSalle" },
    { name: "Locust Point", placeholder: "LOCUST POINT" },
    { name: "Riverside", placeholder: "Riverside" },
    { name: "JLL", placeholder: "JLL" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-12">
          Trusted by Firms Managing Over{" "}
          <span className="text-[#5046e5]">$150 Bn AUM</span>.
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="text-gray-400 text-xl font-semibold tracking-wide hover:text-gray-600 transition-colors"
            >
              {logo.placeholder}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
