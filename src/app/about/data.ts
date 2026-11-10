export type Person = {
  name: string;
  photo: string;
  role: string;
  bio: string;
  /** Omit when the person has no public profile to link to. */
  linkedin?: string;
};

/** Intro paragraph under the "Our team" eyebrow. */
export const TEAM_INTRO =
  "Our team of financial services and technology professionals launched Navable as an end-to-end digital platform for automating some of the most complex internal financial workflows at private funds, including carried interest, employee co-investment, and compensation.";

export const LEADERSHIP_HEADING = "Leadership";

/**
 * Names, titles and bios are copied verbatim from the live About page
 * (https://www.navable.com/about-us), including its original punctuation and wording.
 */
export const team: Person[] = [
  {
    name: "Jen Anderson",
    photo: "/images/team/jen-anderson.jpg",
    role: "Co-Founder & CEO",
    linkedin: "https://www.linkedin.com/in/anderjen/",
    bio: "Jen has over 20 years of experience in financial services. She started her career on trading floors at Morgan Stanley & Bank of America securities and then transitioned to Fintechs, leading product teams and business development at Lending Club, Yapstone and Rapyd. She also spent time as a Fintech investor at Citi Ventures. She has a MBA from the University of Michigan and a BS from Wake Forest University.",
  },
  {
    name: "Anna Enns",
    photo: "/images/team/anna-enns.jpg",
    role: "COO",
    linkedin: "https://www.linkedin.com/in/anna-enns",
    bio: "Anna is a Fintech executive with experience spanning over a decade in product development, strategy, operations, and compliance. She has exceptional ability to cultivate successful teams and products from the ground up. Specializing in B2B Fintech solutions, her strategic product vision and customer centered approach to product development have driven the successful launch of multiple startups.",
  },
];

export const advisors: Person[] = [
  {
    name: "Ethan Kennedy",
    photo: "/images/team/ethan-kennedy.jpg",
    role: "Advisor",
    linkedin: "https://www.linkedin.com/in/ethan-kennedy-43587a1/",
    bio: "Ethan has more than two decades of experience in the financial services industry, a majority of which was focused on private equity co-investment and carried interest plan management. In 2019, following a 15-year tenure at the Carlyle Group, Ethan established FaunceHammond LLC, a boutique financial advisory firm that caters services to UHNWIs and their family offices. Ethan began his career at KPMG LLP as a CPA in the assurance and tax practices, and worked at AIG Investments (rebranded PineBridge Investments) as a GP Controller. He is a graduate of Virginia Polytechnic Institute and State University with a degree in Accounting and Information Systems",
  },
  {
    name: "Josh Anbil",
    photo: "/images/team/josh-anbil.jpg",
    role: "Advisor",
    linkedin: "https://www.linkedin.com/in/josh-anbil-09190a3/",
    bio: "Josh is founder & CEO of Anbil Consulting, a compensation consulting firm focused exclusively on the real estate industry. Josh has 20+ years of experience and has completed over 1,200 compensation consulting projects for real estate companies. Prior to founding Anbil Consulting, Josh was President - Consulting at Ferguson Partners. Josh holds a B.S. in Finance from the University of Illinois.",
  },
  {
    name: "Michelle Brown",
    photo: "/images/team/michelle-brown.jpg",
    role: "Advisor",
    linkedin: "https://www.linkedin.com/in/michelle-brown-04314590",
    bio: "Michelle is CFO of Contrary Capital and has nearly 15 years of experience in financial services. After beginning her career at PwC, she has spent the better part of the last decade working to scale finance and operations at venture capital and private equity firms including Astira Capital Partners, and General Catalyst. Michelle holds a BS in Finance and MS in Accountancy from Wake Forest University. She is a CPA in the Commonwealth of Massachusetts.",
  },
  {
    name: "Kristine Tech",
    photo: "/images/team/kristine-tech.jpg",
    role: "Advisor",
    linkedin: "https://www.linkedin.com/in/kristine-tech/",
    bio: "With over 20 years of accounting experience Kristine brings a deep knowledge of Long-Term Incentives programs. She spent 12+ years with the Carlyle Group working on carried interest transactions and financial reporting. During her time at the Carlyle Group she led a Business Transformation initiative for the carried interest functional group to optimize business operations including organizational, process and technology solutions, and improved the automated data flow process for realized and unrealized carried interest.",
  },
  {
    name: "Leonard Speiser",
    photo: "/images/team/leonard-speiser.jpg",
    role: "Advisor",
    linkedin: "https://www.linkedin.com/in/leonardspeiser",
    bio: "Leonard founded Clover, currently serving over $230B in credit card processing a year, in addition to working at Intuit, eBay, Yahoo! and Credit Suisse First Boston. Leonard founded the Corporate Venture Studio model and launched it two years ago with partner Jones Lang LaSalle.",
  },
  {
    name: "Ronnie Mongan",
    photo: "/images/team/ronnie-mongan.jpg",
    role: "Operating Advisor",
    linkedin: "https://www.linkedin.com/in/ronnie-mongan",
    bio: "With 20+ years in Fintech, Ronnie Mongan has extensive experience in product operations and customer success. She led teams within Fiserv and Clover focused on scaling operations, managing partnership platforms and delivering technology integration programs.",
  },
];

/** Firms where members of the team previously worked (shown as a logo strip under Leadership). */
export const TEAM_EXPERIENCE_LABEL = "Our team has worked at";

export const teamExperienceLogos = [
  { name: "Morgan Stanley", src: "/images/logos/morgan-stanley.svg", width: 1332, height: 191, className: "w-[160px]" },
  { name: "Citi", src: "/images/logos/citi.svg", width: 300, height: 195, className: "w-[56px]" },
  { name: "Carlyle Group", src: "/images/logos/carlyle-group.svg", width: 317, height: 45, className: "w-[170px]" },
  { name: "KPMG", src: "/images/logos/kpmg.svg", width: 81, height: 32, className: "w-[88px]" },
  { name: "PwC", src: "/images/logos/pwc.svg", width: 359, height: 174, className: "w-[72px]" },
  { name: "General Catalyst", src: "/images/logos/general-catalyst.svg", width: 3885, height: 563, className: "w-[170px]" },
];
