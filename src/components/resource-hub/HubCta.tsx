import Button from "@/components/ui/Button";
import { DarkSection } from "@/components/ui/Frame";

/** Navy call-to-action band shared by the hub index and article pages. */
export default function HubCta() {
  return (
    <DarkSection labelledBy="hub-cta-heading">
      <div className="dot-grid-dark flex flex-col items-start gap-8 px-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-[63px]">
        <div className="max-w-[560px]">
          <h2
            id="hub-cta-heading"
            className="text-[32px] font-semibold leading-[1.25] text-white lg:text-[40px] lg:leading-[50px]"
          >
            Ready to Move Carry <span className="text-orange">Beyond Spreadsheets?</span>
          </h2>
          <p className="mt-5 text-[15px] leading-[25px] text-navy-text">
            See how Navable brings carry, commit, and compensation into one audit-ready system.
          </p>
        </div>
        <Button href="/demo" size="lg">
          Book a Free Demo
        </Button>
      </div>
    </DarkSection>
  );
}
