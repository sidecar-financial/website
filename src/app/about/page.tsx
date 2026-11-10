import { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Frame";
import Button from "@/components/ui/Button";
import DemoForm from "@/components/home/DemoForm";
import { PageHero } from "@/components/ui/PageBlocks";
import { CAREERS_URL } from "@/components/layout/navigation";
import {
  LEADERSHIP_HEADING,
  TEAM_EXPERIENCE_LABEL,
  TEAM_INTRO,
  advisors,
  team,
  teamExperienceLogos,
} from "./data";

export const metadata: Metadata = {
  title: "About Us | Navable",
  description:
    "Navable provides cutting-edge tools and services for finance, HR and operations teams to keep up with evolving needs.",
};

const investors = [
  { name: "JLL Spark", src: "/images/logos/jll-spark.png", width: 240, height: 53, className: "w-[140px]" },
  { name: "H3", src: "/images/logos/h3.png", width: 100, height: 100, className: "w-[56px]" },
];

const eyebrowClass =
  "flex items-center gap-2.5 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-subtle";

function LinkedInLink({ name, href }: { name: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn (opens in new tab)`}
      className="group mt-auto inline-flex min-h-[44px] items-center self-start rounded-sm pt-4 text-sm font-medium text-ink underline decoration-orange decoration-2 underline-offset-[5px] transition-all hover:decoration-4"
    >
      LinkedIn
      <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        ↗
      </span>
    </a>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            About Navable: <span className="text-orange">Empowering the Private Fund Ecosystem</span>
          </>
        }
        description="Navable provides cutting-edge tools and services for finance, HR and operations teams to keep up with evolving needs."
      >
        <Button href="#contact" variant="secondary" size="lg">
          Contact us&nbsp;
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
          >
            →
          </span>
        </Button>
      </PageHero>

      {/* Who we are / Our team */}
      <Section label="Who We Are" labelledBy="who-we-are-heading">
        <div className="grid lg:grid-cols-2">
          <div className="px-6 py-12 lg:border-r lg:border-line lg:px-12 lg:py-[72px]">
            <h2
              id="who-we-are-heading"
              className="text-[28px] font-semibold leading-[1.25] text-ink lg:text-[40px] lg:leading-[50px]"
            >
              Who We Are
            </h2>
            <p className="mt-6 text-[17px] leading-[27px] text-ink">
              We are an experienced team of professionals with deep expertise spanning Wall Street
              and Silicon Valley.
            </p>
          </div>
          <div className="border-t border-line bg-soft px-6 py-12 lg:border-t-0 lg:px-12 lg:py-[72px]">
            <h2 className={eyebrowClass}>
              <span aria-hidden="true" className="block size-2 bg-orange" />
              Our team
            </h2>
            <p className="mt-6 text-[15px] leading-[25px] text-body">{TEAM_INTRO}</p>
          </div>
        </div>
      </Section>

      {/* Leadership */}
      <Section label="Team" labelledBy="leadership-heading">
        <div className="border-b border-line px-6 py-12 text-center lg:py-[72px]">
          <h2
            id="leadership-heading"
            className="text-[28px] font-semibold leading-[1.25] text-ink lg:text-[40px] lg:leading-[50px]"
          >
            {LEADERSHIP_HEADING}
          </h2>
        </div>
        <ul className="grid md:grid-cols-2">
          {team.map((member) => (
            <li
              key={member.name}
              className="flex flex-col border-b border-line px-6 py-10 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:px-12 lg:py-12"
            >
              <Image
                src={member.photo}
                alt={`Portrait of ${member.name}`}
                width={160}
                height={160}
                className="w-24 h-24 rounded-full object-cover bg-line mb-4"
                unoptimized
              />
              <h3 className="text-xl font-medium leading-7 text-ink">{member.name}</h3>
              <p className="mb-4 flex items-center gap-2.5 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-subtle">
                <span aria-hidden="true" className="block size-2 bg-orange" />
                {member.role}
              </p>
              <p className="text-sm leading-[25px] text-body">{member.bio}</p>
              {member.linkedin && <LinkedInLink name={member.name} href={member.linkedin} />}
            </li>
          ))}
        </ul>
      </Section>

      {/* Where the team has worked */}
      <Section labelledBy="team-experience-heading">
        <div className="grid lg:grid-cols-[393px_1fr]">
          <div className="flex items-center px-6 py-10 lg:px-12 lg:py-0">
            <h2 id="team-experience-heading" className="text-[22px] font-medium leading-7 text-ink">
              {TEAM_EXPERIENCE_LABEL}
            </h2>
          </div>
          <ul
            aria-label="Firms where our team has worked"
            className="grid grid-cols-2 gap-px border-t border-line bg-line sm:grid-cols-3 lg:border-l lg:border-t-0"
          >
            {teamExperienceLogos.map((logo) => (
              <li
                key={logo.name}
                className="flex min-h-[104px] items-center justify-center bg-white px-4 py-7 lg:min-h-[120px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={`h-auto max-w-full grayscale ${logo.className}`}
                  unoptimized
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Advisors */}
      <Section label="Advisors" labelledBy="advisors-heading">
        <div className="border-b border-line px-6 py-12 text-center lg:py-[72px]">
          <h2
            id="advisors-heading"
            className="text-[28px] font-semibold leading-[1.25] text-ink lg:text-[40px] lg:leading-[50px]"
          >
            Our Advisors
          </h2>
        </div>
        <ul className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
          {advisors.map((advisor) => (
            <li key={advisor.name} className="flex flex-col bg-white px-6 py-8 lg:px-8">
              <Image
                src={advisor.photo}
                alt={`Portrait of ${advisor.name}`}
                width={128}
                height={128}
                className="w-16 h-16 rounded-full object-cover bg-line mb-3"
                unoptimized
              />
              <h3 className="text-lg font-medium leading-6 text-ink">{advisor.name}</h3>
              <p className="mb-3 mt-2 flex items-center gap-2.5 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-subtle">
                <span aria-hidden="true" className="block size-2 bg-orange" />
                {advisor.role}
              </p>
              <p className="text-sm leading-[25px] text-body">{advisor.bio}</p>
              {advisor.linkedin && <LinkedInLink name={advisor.name} href={advisor.linkedin} />}
            </li>
          ))}
        </ul>
      </Section>

      {/* Investors */}
      <Section labelledBy="investors-heading">
        <div className="grid lg:grid-cols-[393px_1fr]">
          <div className="flex items-center px-6 py-10 lg:px-12 lg:py-0">
            <h2 id="investors-heading" className="text-[22px] font-medium leading-7 text-ink">
              Our Investors
            </h2>
          </div>
          <ul
            aria-label="Investors"
            className="grid min-h-[160px] grid-cols-2 border-t border-line lg:border-l lg:border-t-0"
          >
            {investors.map((investor) => (
              <li
                key={investor.name}
                className="flex items-center justify-center border-l border-line px-6 py-8 first:border-l-0"
              >
                <Image
                  src={investor.src}
                  alt={investor.name}
                  width={investor.width}
                  height={investor.height}
                  className={`h-auto max-w-full grayscale ${investor.className}`}
                  unoptimized
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Join us */}
      <Section labelledBy="join-heading">
        <div className="grid items-end gap-8 px-6 py-14 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-[80px]">
          <div>
            <p className={eyebrowClass}>
              <span aria-hidden="true" className="block size-2 bg-orange" />
              Be a part of the change
            </p>
            <h2
              id="join-heading"
              className="mt-5 text-[32px] font-semibold leading-[1.25] text-ink lg:text-[40px] lg:leading-[50px]"
            >
              Want to Join Us?
            </h2>
          </div>
          <div>
            <p className="max-w-[520px] text-[15px] leading-[25px] text-body">
              Navable is on a mission to streamline operations for alternative asset managers and
              their investors. If you are interested in this space and want to take your career to
              the next level, reach out!
            </p>
            <Button href={CAREERS_URL} external variant="secondary" size="lg" className="mt-6">
              See our openings&nbsp;
              <span aria-hidden="true">↗</span>
            </Button>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <DemoForm
        id="contact"
        label="Contact"
        title={
          <>
            Have Questions? <span className="text-orange">We Have Answers.</span>
          </>
        }
        description="Get in touch with our expert team for a demo or any inquiries."
      />
    </>
  );
}
