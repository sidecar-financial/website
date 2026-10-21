import { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Frame";
import Button from "@/components/ui/Button";
import DemoForm from "@/components/home/DemoForm";
import { PageHero } from "@/components/ui/PageBlocks";
import { CAREERS_URL } from "@/components/layout/navigation";

export const metadata: Metadata = {
  title: "About Us | Navable",
  description:
    "Navable provides cutting-edge technology tools and services for alternative asset managers to keep up with the changing investor landscape.",
};

type Person = {
  name: string;
  photo: string;
  role: string;
  bio: string;
  /** Omit when the person has no public profile to link to. */
  linkedin?: string;
};

const team: Person[] = [
  {
    name: "Jen Anderson",
    photo: "/images/team/jen-anderson.jpg",
    role: "Co-Founder & CEO",
    linkedin: "https://www.linkedin.com/in/anderjen/",
    bio: "Jen has over 20 years of experience in financial services. She started her career on trading floors at Morgan Stanley & Bank of America Securities and then transitioned to fintechs, leading product teams and business development at Lending Club, Yapstone and Rapyd. She also spent time as a fintech investor at Citi Ventures. She has an MBA from the University of Michigan and a BS from Wake Forest University.",
  },
  {
    name: "Anna Enns",
    photo: "/images/team/anna-enns.jpg",
    role: "COO",
    bio: "Anna is a fintech executive with experience spanning over a decade in product development, strategy, operations, and compliance. She has exceptional ability to cultivate successful teams and products from the ground up. Specializing in B2B fintech solutions, her strategic product vision and customer-centered approach to product development have driven the successful launch of multiple startups.",
  },
];

const advisors: Person[] = [
  {
    name: "Ethan Kennedy",
    photo: "/images/team/ethan-kennedy.jpg",
    role: "Advisor",
    linkedin: "https://www.linkedin.com/in/ethan-kennedy-43587a1/",
    bio: "Ethan has more than two decades of experience in financial services, most of it focused on private equity co-investment and carried interest plan management. In 2019, following a 15-year tenure at the Carlyle Group, he established FaunceHammond LLC, a boutique financial advisory firm serving UHNWIs and their family offices. He began his career at KPMG LLP as a CPA and worked at AIG Investments (now PineBridge Investments) as a GP Controller.",
  },
  {
    name: "Josh Anbil",
    photo: "/images/team/josh-anbil.jpg",
    role: "Advisor",
    linkedin: "https://www.linkedin.com/in/josh-anbil-09190a3/",
    bio: "Josh is founder & CEO of Anbil Consulting, a compensation consulting firm focused exclusively on the real estate industry. He has 20+ years of experience and has completed over 1,200 compensation consulting projects for real estate companies. Previously he was President - Consulting at Ferguson Partners. Josh holds a B.S. in Finance from the University of Illinois.",
  },
  {
    name: "Michelle Brown",
    photo: "/images/team/michelle-brown.jpg",
    role: "Advisor",
    linkedin: "https://www.linkedin.com/in/michelle-brown-04314590",
    bio: "Michelle is CFO of Contrary Capital and has nearly 15 years of experience in financial services. After beginning her career at PwC, she has spent the better part of the last decade scaling finance and operations at venture capital and private equity firms including Astira Capital Partners and General Catalyst. She is a CPA in the Commonwealth of Massachusetts.",
  },
  {
    name: "Kristine Tech",
    photo: "/images/team/kristine-tech.jpg",
    role: "Advisor",
    linkedin: "https://www.linkedin.com/in/kristine-tech/",
    bio: "With over 20 years of accounting experience, Kristine brings deep knowledge of long-term incentive programs. She spent 12+ years with the Carlyle Group working on carried interest transactions and financial reporting, where she led a business transformation initiative for the carried interest group and improved the automated data flow for realized and unrealized carried interest.",
  },
  {
    name: "Leonard Speiser",
    photo: "/images/team/leonard-speiser.jpg",
    role: "Advisor",
    bio: "Leonard founded Clover, currently serving over $230B in credit card processing a year, in addition to working at Intuit, eBay, Yahoo! and Credit Suisse First Boston. Leonard founded the Corporate Venture Studio model and launched it with partner Jones Lang LaSalle.",
  },
  {
    name: "Ronnie Mongan",
    photo: "/images/team/ronnie-mongan.jpg",
    role: "Operating Advisor",
    bio: "With 20+ years in fintech, Ronnie Mongan has extensive experience in product operations and customer success. She led teams within Fiserv and Clover focused on scaling operations, managing partnership platforms and delivering technology integration programs.",
  },
];

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
        eyebrow="About Navable"
        title={
          <>
            Empowering Alternative <span className="text-orange">Asset Managers</span>
          </>
        }
        description="Navable provides cutting-edge technology tools and services for alternative asset managers to keep up with the changing investor landscape."
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
            <p className="mt-4 text-[15px] leading-[25px] text-body">
              We are passionate about providing solutions in the alternative asset space with the
              goal of expanding investment opportunities and access for all different categories of
              investors, from traditional LPs to retail investors to employees.
            </p>
          </div>
          <div className="border-t border-line bg-soft px-6 py-12 lg:border-t-0 lg:px-12 lg:py-[72px]">
            <h2 className={eyebrowClass}>
              <span aria-hidden="true" className="block size-2 bg-orange" />
              Our team
            </h2>
            <p className="mt-6 text-[15px] leading-[25px] text-body">
              Our seasoned team of financial services and technology professionals brings
              world-class resources and capabilities to alternative asset management LPs. We
              launched Navable as a purpose-built end-to-end digital platform to manage employee
              co-investment, and we see the future of investor relations in the private markets to
              include retail investors at scale.
            </p>
            <p className="mt-4 text-[15px] leading-[25px] text-body">
              Leveraging next-generation technology tools on behalf of all private market investors
              is our vision for the future, whether these investors are institutional or retail.
            </p>
          </div>
        </div>
      </Section>

      {/* Founding Team */}
      <Section label="Team" labelledBy="founding-team-heading">
        <div className="border-b border-line px-6 py-12 text-center lg:py-[72px]">
          <h2
            id="founding-team-heading"
            className="text-[28px] font-semibold leading-[1.25] text-ink lg:text-[40px] lg:leading-[50px]"
          >
            Founding Team
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
