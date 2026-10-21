import Image from "next/image";
import Button from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Frame";

type Tile = {
  title: string;
  description: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

const tiles: Tile[] = [
  {
    title: "Carry Management",
    description:
      "Manage carry plans, allocations, vesting, distributions, and participant changes in one system, keeping data and documents linked across funds with full audit trail history.",
    image: "/images/carry-plan-team.svg",
    alt: "Carry plan builder showing fund selection and team members with total compensation, carry values and vesting details",
    width: 688,
    height: 260,
    className: "lg:col-span-2",
  },
  {
    title: "Compensation & Reporting",
    description:
      "Bring compensation, carry, GP commit, and investment data into one clear view.",
    image: "/images/employee-portal.svg",
    alt: "Participant compensation report with a salary, bonus and carry breakdown chart, benefits and forecasted carry value",
    width: 312,
    height: 722,
    className: "lg:row-span-2",
  },
  {
    title: "Employee & GP Portal",
    description:
      "Give participants direct access to carry, vesting, values, and documents.",
    image: "/images/total-compensation.svg",
    alt: "Participant portal showing total compensation and carry by fund with vesting progress",
    width: 312,
    height: 260,
  },
  {
    title: "Scenario & Firm-Wide Planning",
    description: "Model allocations, vesting, and compensation with shared data.",
    image: "/images/vesting-timeline.svg",
    alt: "Vesting timeline chart comparing the current plan with a scenario",
    width: 312,
    height: 260,
  },
  {
    title: "GP Commit & Co-Investment",
    description:
      "Manage commitments, onboarding, subscriptions, and co-invest reporting.",
    image: "/images/co-invest-card.png",
    alt: "Co-investment card showing total value and total return",
    width: 312,
    height: 260,
  },
  {
    title: "Document Lifecycle",
    description:
      "Create, send, track, sign and store documents in a single source of truth.",
    image: "/images/award-document.png",
    alt: "Award document with signature requirements and status tracking",
    width: 312,
    height: 260,
  },
];

function FeatureTile({ title, description, image, alt, width, height, className = "" }: Tile) {
  return (
    <article className={`border-b border-line bg-white px-6 pb-10 pt-10 lg:border-b-0 lg:px-8 ${className}`}>
      <Image
        src={image}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full rounded-lg"
        style={{ maxWidth: width }}
        unoptimized
      />
      <h3 className="mt-8 text-lg font-medium leading-6 text-ink">{title}</h3>
      <p className="mt-2 text-[15px] leading-[25px] text-muted">{description}</p>
    </article>
  );
}

export default function Features() {
  return (
    <Section id="features" label="Features" labelledBy="features-heading">
      <SectionHeader
        id="features-heading"
        title={
          <>
            Everything You Need to
            <br className="hidden lg:block" /> Manage Carry, Comp &amp;
            <br className="hidden lg:block" />{" "}
            <span className="text-orange">Co-Invest With Control</span>
          </>
        }
        description="Start with carry management, then extend the same system to compensation, GP commit, and employee co-investment as your firm's needs evolve."
      />

      <div className="grid lg:grid-cols-3 lg:gap-px lg:bg-line">
        {tiles.map((tile, index) => (
          <FeatureTile key={`${tile.title}-${index}`} {...tile} />
        ))}

        {/* CTA tile */}
        <div className="on-dark group relative flex min-h-[260px] flex-col justify-end gap-6 overflow-hidden bg-navy p-8 text-white">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[url('/images/cta-pattern.png')] bg-cover bg-top transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_100%,rgba(245,166,29,0.28),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div className="relative">
            <p className="text-[22px] font-semibold leading-[1.3]">See it on your own fund</p>
            <p className="mt-2 text-[15px] leading-6 text-navy-text">Validate Navable before you commit.</p>
          </div>
          <Button href="/demo" size="lg" className="relative self-start">
            Book a Free Demo
          </Button>
        </div>
      </div>
    </Section>
  );
}
