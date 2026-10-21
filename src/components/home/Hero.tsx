import Button from "@/components/ui/Button";
import { Section } from "@/components/ui/Frame";
import TourFrame from "@/components/home/TourFrame";

export default function Hero() {
  return (
    <Section labelledBy="hero-heading" noBorder>
      {/* Headline block on the dot grid */}
      <div className="dot-grid flex flex-col items-center px-6 pb-14 pt-16 text-center lg:pb-[54px] lg:pt-[88px]">
        <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-subtle">
          <span aria-hidden="true" className="block size-2 bg-orange" />
          Software for Private Funds
        </p>

        <h1
          id="hero-heading"
          className="mt-9 text-[38px] font-semibold leading-[1.15] text-ink sm:text-[46px] lg:text-[56px] lg:leading-[64px]"
        >
          One System for Carry,
          <br />
          Commit, and Compensation
        </h1>

        <p className="mt-6 max-w-[680px] text-base leading-6 text-muted">
          Give Finance, Ops and HR teams a configurable platform to manage growing complexity with
          greater accuracy, control, and visibility, without relying on spreadsheets.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/demo" size="lg">
            Book a Free Demo
          </Button>
          <Button href="#features" variant="secondary" size="lg">
            Explore the Platform
          </Button>
        </div>
      </div>

      {/* Product tour: browser-chrome frame around the animated stage */}
      <TourFrame />
    </Section>
  );
}
