"use client";

export default function TrustBadges() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Trusted by Firms Managing{" "}
          <span className="text-[#5046e5]">Over $150 Bn AUM</span>.
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          <span className="text-gray-300 text-lg font-semibold tracking-wide">137 VENTURES</span>
          <span className="text-gray-300 text-lg font-semibold tracking-wide">LaSalle</span>
          <span className="text-gray-300 text-lg font-semibold tracking-wide">LOCUST POINT</span>
          <span className="text-gray-300 text-lg font-semibold tracking-wide">Riverside</span>
          <span className="text-gray-300 text-lg font-semibold tracking-wide">JLL</span>
        </div>
      </div>
    </section>
  );
}
