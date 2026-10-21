import Image from "next/image";
import { Section } from "@/components/ui/Frame";

const logos = [
  { name: "Riverside", src: "/images/logos/riverside.png", width: 137, height: 56 },
  { name: "LaSalle Investment Management", src: "/images/logos/lasalle.png", width: 122, height: 39 },
  { name: "137 Ventures", src: "/images/logos/137-ventures.png", width: 144, height: 27 },
  { name: "JLL", src: "/images/logos/jll.png", width: 107, height: 55 },
];

export default function TrustBadges() {
  return (
    <Section labelledBy="trust-heading">
      <div className="grid lg:grid-cols-[393px_1fr]">
        {/* Left side - trust message */}
        <div className="flex flex-col justify-center px-6 py-10 lg:px-[30px] lg:py-0">
          <h2 id="trust-heading" className="text-lg font-medium leading-7 text-ink">
            Trusted by Firms Managing
            <br className="hidden lg:block" /> Over $150 Bn AUM.
          </h2>
          <p className="mt-2 max-w-[300px] text-sm leading-[22px] text-muted">
            Built for established VC, PE, private credit, and real estate firms managing complex
            incentive programs.
          </p>
        </div>

        {/* Right side - client logos */}
        <ul
          className="grid h-[200px] grid-cols-2 border-t border-line sm:grid-cols-4 lg:h-[282px] lg:border-t-0"
          aria-label="Trusted client companies"
        >
          {logos.map((logo) => (
            <li
              key={logo.name}
              className="flex items-center justify-center border-l border-line px-4"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-auto max-w-full"
                unoptimized
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
