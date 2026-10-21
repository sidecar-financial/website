import type { Metadata } from "next";
import Link from "next/link";
import WaitlistForm from "@/components/waterfall/WaitlistForm";
import WaterfallAnimation from "@/components/waterfall/WaterfallAnimation";
import { Section } from "@/components/ui/Frame";

export const metadata: Metadata = {
  title: "Waterfall (Coming Soon) | Navable",
  description: "Navable Waterfall is coming soon. Join the waitlist for early access.",
  openGraph: {
    title: "Waterfall (Coming Soon) | Navable",
    description: "Navable Waterfall is coming soon. Join the waitlist for early access.",
    url: "https://www.navable.com/solutions/waterfall",
    siteName: "Navable",
    type: "website",
  },
};

export default function WaterfallPage() {
  return (
    <Section labelledBy="waterfall-hero" noBorder>
      <div className="dot-grid flex flex-col items-center border-b border-line px-5 py-[clamp(72px,11vw,144px)] text-center sm:px-8 lg:px-12">
        <p className="flex items-center gap-2.5 rounded-md border border-[#F2D29A] bg-[#FFF8EB] px-3 py-2 font-mono text-xs uppercase leading-none tracking-[0.12em] text-[#7A4A00]">
          <span aria-hidden="true" className="block size-[7px] bg-orange" />
          Coming soon
        </p>
        <h1
          id="waterfall-hero"
          className="mt-7 text-[clamp(44px,6.4vw,76px)] font-semibold leading-none tracking-[-0.035em] text-ink"
        >
          Navable <span className="text-orange">Waterfall</span>
        </h1>
        <p className="mt-6 max-w-[560px] text-[clamp(16px,1.4vw,18px)] leading-[1.55] text-body">
          Distribution waterfalls are coming to the same platform you use for carry, commit, and
          compensation. Join the waitlist and we&apos;ll let you know when early access opens.
        </p>

        <WaitlistForm />

        <p className="mt-10 text-[15px] text-body">
          Managing carry today?{" "}
          <Link href="/solutions/carried-interest-software" className="font-medium text-[#4C46A3] underline-offset-2 hover:text-ink hover:underline">
            See Carried Interest Software →
          </Link>
        </p>

        <figure className="mt-16 w-full max-w-[960px] overflow-hidden rounded-xl border border-[#DCDBE6] bg-white py-2 shadow-[0_30px_60px_-30px_rgba(31,28,58,0.35)]">
          <WaterfallAnimation />
        </figure>
      </div>
    </Section>
  );
}
