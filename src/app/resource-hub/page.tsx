import type { Metadata } from "next";
import ResourceIndex from "@/components/resource-hub/ResourceIndex";
import HubCta from "@/components/resource-hub/HubCta";
import { Gap, Section } from "@/components/ui/Frame";
import { articles } from "@/lib/resource-hub";

export const metadata: Metadata = {
  title: "Carried Interest & Fund Operations Resource Hub | Navable",
  description:
    "Straight answers on carried interest tracking, allocation, vesting, reporting, audit readiness and employee co-invest for private equity, venture capital and real estate firms.",
};

export default function ResourceHubPage() {
  return (
    <>
      <Section labelledBy="hub-heading" label="Resource Hub" noBorder>
        <div className="dot-grid flex flex-col items-center border-b border-line px-6 pb-14 pt-16 text-center lg:pb-[64px] lg:pt-[88px]">
          <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-subtle">
            <span aria-hidden="true" className="block size-2 bg-orange" />
            Resource Hub
          </p>
          <h1
            id="hub-heading"
            className="mt-9 max-w-[820px] text-[34px] font-semibold leading-[1.15] text-ink sm:text-[44px] lg:text-[52px] lg:leading-[60px]"
          >
            Carried Interest &amp; Fund Operations <span className="text-orange">Resource Hub</span>
          </h1>
          <p className="mt-6 max-w-[640px] text-base leading-6 text-body">
            Straight answers for Finance, Ops and HR teams on tracking carry, managing allocations and vesting,
            staying audit-ready, and running employee co-invest at scale.
          </p>
        </div>

        <ResourceIndex articles={articles} />
      </Section>
      <Gap />
      <HubCta />
    </>
  );
}
