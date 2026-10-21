import type { Metadata } from "next";
import DemoForm from "@/components/home/DemoForm";
import {
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  JobsSection,
  ProblemSection,
  SpotlightsSection,
  WhereItFitsSection,
  WhoSection,
} from "@/components/waterfall/WaterfallSections";

const TITLE = "Waterfall: distribution waterfall engine | Navable";
const DESCRIPTION =
  "The provable waterfall engine fund administrators run and auditors can recalculate.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.navable.com/waterfall",
    siteName: "Navable",
    type: "website",
  },
};

export default function WaterfallPage() {
  return (
    <>
      <HeroSection />
      <JobsSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <SpotlightsSection />
      <WhoSection />
      <WhereItFitsSection />

      <DemoForm
        id="contact"
        label="Book a walkthrough"
        title={
          <>
            Book a <span className="text-orange">walkthrough.</span>
          </>
        }
        description="Bring a fund you already run. We'll calculate it alongside your spreadsheet and hand your auditor the workbook."
        submitLabel="Book a walkthrough"
        showTrust={false}
      >
        <p className="mt-7">
          <a
            href="#trace"
            className="inline-flex h-12 items-center rounded-md border border-[#4A4677] px-[18px] text-[15px] font-medium text-white transition-colors hover:border-white"
          >
            See how a number is traced
          </a>
        </p>
      </DemoForm>
    </>
  );
}
