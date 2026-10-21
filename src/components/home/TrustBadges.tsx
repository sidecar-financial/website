"use client";

export default function TrustBadges() {
  const logos = [
    "137 VENTURES",
    "LASALLE",
    "LOCUST POINT",
    "RIVERSIDE",
    "JLL",
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left side - Trust message */}
          <div className="lg:max-w-md flex-shrink-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
              Trusted by Firms Managing{" "}
              <span className="text-[#5046e5]">Over $150 Bn AUM</span>.
            </h2>
            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
              Built for established VC, PE, private credit, and real estate firms 
              managing complex incentive programs.
            </p>
          </div>
          
          {/* Right side - Logo strip in single row */}
          <div className="flex items-center justify-start lg:justify-end gap-8 lg:gap-12 overflow-x-auto">
            {logos.map((logo) => (
              <span 
                key={logo}
                className="text-gray-400 text-xs font-bold tracking-[0.15em] uppercase whitespace-nowrap"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
