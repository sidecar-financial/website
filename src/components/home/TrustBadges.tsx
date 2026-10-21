"use client";

export default function TrustBadges() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left side - Trust message */}
          <div className="lg:max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
              Trusted by Firms Managing{" "}
              <span className="text-[#5046e5]">Over $150 Bn AUM</span>.
            </h2>
            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
              Built for established VC, PE, private credit, and real estate firms 
              managing complex incentive programs.
            </p>
          </div>
          
          {/* Right side - Logo strip */}
          <div className="flex flex-wrap items-center justify-start lg:justify-end gap-x-10 gap-y-4">
            <span className="text-gray-300 text-sm font-bold tracking-widest uppercase">137 VENTURES</span>
            <span className="text-gray-300 text-sm font-bold tracking-widest uppercase">LaSalle</span>
            <span className="text-gray-300 text-sm font-bold tracking-widest uppercase">LOCUST POINT</span>
            <span className="text-gray-300 text-sm font-bold tracking-widest uppercase">Riverside</span>
            <span className="text-gray-300 text-sm font-bold tracking-widest uppercase">JLL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
