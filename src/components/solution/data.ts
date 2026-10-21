import type { Metadata } from "next";

/**
 * Typed content for the six solution pages (/platform, /solutions/*, /who-we-serve/*).
 * Copy and ordering come from the design build's Solution component (PAGES / COMPARE);
 * `metaDescription` is kept from the previous pages because the build only defines titles.
 */

export type SolutionImageKey =
  | "carry-management"
  | "vesting-timeline"
  | "gp-portal"
  | "award-document"
  | "co-invest"
  | "comp-reporting";

export type SolutionImage = { src: string; width: number; height: number };

/** The build's asset names mapped onto the (byte-identical) files already in /public/images. */
export const solutionImages: Record<SolutionImageKey, SolutionImage> = {
  "carry-management": { src: "/images/carry-plan-team.png", width: 688, height: 260 },
  "vesting-timeline": { src: "/images/vesting-timeline.png", width: 312, height: 260 },
  "gp-portal": { src: "/images/total-compensation.png", width: 312, height: 260 },
  "award-document": { src: "/images/award-document.png", width: 312, height: 260 },
  "co-invest": { src: "/images/co-invest-card.png", width: 312, height: 260 },
  "comp-reporting": { src: "/images/employee-portal.png", width: 312, height: 722 },
};

export type SolutionFeature = {
  title: string;
  body: string;
  image: SolutionImageKey;
  alt: string;
};

export type SolutionPageData = {
  /** Used to namespace element ids. */
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  sub: string;
  featuresTitle?: string;
  features?: SolutionFeature[];
  listTitle: string;
  listItems: string[];
  tagsTitle?: string;
  tags?: string[];
  /** Spreadsheet-vs-Navable table (carried-interest page only). */
  comparison?: boolean;
};

export type SolutionPageKey =
  | "carried-interest"
  | "co-invest"
  | "compensation"
  | "private-equity"
  | "venture-capital"
  | "real-estate";

export const solutionPages: Record<SolutionPageKey, SolutionPageData> = {
  "carried-interest": {
    slug: "carried-interest",
    metaTitle: "Carried Interest Software | Navable",
    metaDescription:
      "Navable's modern carried interest management platform eliminates Excel sprawl, reduces risk, and saves you hundreds of hours.",
    eyebrow: "Carried interest software",
    title: "Purpose-Built for GP Operations",
    sub: "Navable's modern carried interest management platform eliminates Excel sprawl, reduces risk, and saves you hundreds of hours.",
    featuresTitle: "One Place to Manage Carry with Confidence",
    features: [
      {
        title: "Centralized Carry Plans & Allocations",
        body: "Bring all carry plans, waterfall rules, and allocations into one reliable environment.",
        image: "carry-management",
        alt: "Carry plan allocating points to participants",
      },
      {
        title: "Structured Rules & Vesting Logic",
        body: "Apply vesting, forfeiture, and reallocation rules consistently across participants and vehicles.",
        image: "vesting-timeline",
        alt: "Vesting timeline with upcoming vest",
      },
      {
        title: "Clear Visibility for Finance & Leadership",
        body: "Move beyond static spreadsheets, and provide real-time insights and trusted results.",
        image: "gp-portal",
        alt: "Carry by fund with vesting progress",
      },
      {
        title: "Audit-Ready Trail & Reporting",
        body: "Every edit and calculation is traceable, producing outputs you can defend with confidence.",
        image: "award-document",
        alt: "Award documents with signature requirements",
      },
    ],
    listTitle: "Built for GP Operational Teams Managing",
    listItems: [
      "Multiple flagship and continuation funds",
      "Deal-by-deal or tranche-by-tranche carry structures",
      "Joiners, leavers, and participant lifecycle changes",
      "Increased audit and LP reporting expectations",
    ],
    comparison: true,
  },
  "co-invest": {
    slug: "co-invest",
    metaTitle: "Employee Co-Invest Software | Navable",
    metaDescription:
      "Employee co-invest programs, built for scale. Provide a consistent, compliant framework that your team and your LPs can trust.",
    eyebrow: "Turnkey employee co-invest",
    title: "Employee Co-Invest Programs. Built for Scale.",
    sub: "Provide a consistent, compliant framework that your team and your LPs can trust.",
    featuresTitle: "One Place to Manage With Confidence",
    features: [
      {
        title: "End-to-End Employee Co-Invest Workflow",
        body: "Digitize elections, capital allocation, distributions, and performance tracking across vehicles.",
        image: "co-invest",
        alt: "Co-invest total value and return",
      },
      {
        title: "Customizable Investor Portal",
        body: "Quarterly metrics, K-1s and subdocs all in one place with built-in multi-currency support.",
        image: "award-document",
        alt: "Investor documents with signature requirements",
      },
      {
        title: "Aligned Transparency for All Participants",
        body: "Participants see their status; administrators see the whole picture.",
        image: "gp-portal",
        alt: "Participant compensation and carry by fund",
      },
      {
        title: "Scalable Participant Management",
        body: "Onboard and manage employees consistently, with secure records and compliance support.",
        image: "carry-management",
        alt: "Participant records within a fund plan",
      },
    ],
    listTitle: "Built for Firms and GPs That:",
    listItems: [
      "Are scaling offerings across their organization and funds",
      "Balance many participants and multiple election cycles",
      "Need reliable capital tracking and a digital-first process",
      "Have global employees or cross-jurisdiction considerations",
    ],
  },
  compensation: {
    slug: "compensation",
    metaTitle: "Compensation Management Software | Navable",
    metaDescription:
      "Unify carried interest, cash compensation and benefits visibility into a consolidated, employee-facing view. Purpose-built for Finance and HR teams.",
    eyebrow: "Compensation management",
    title: "Purpose-Built for Finance and HR Teams",
    sub: "Unify carried interest, cash compensation and benefits visibility into a consolidated, employee-facing view.",
    featuresTitle: "Reduce Manual Effort. Increase Clarity.",
    features: [
      {
        title: "Unified Total Compensation View",
        body: "Bring carry, cash, and earnings history together in one branded, secure portal.",
        image: "gp-portal",
        alt: "Total compensation summary with carry by fund",
      },
      {
        title: "Replace Inquiries with Transparency",
        body: "Employees and leadership get trusted visibility, reducing ad-hoc requests to finance.",
        image: "vesting-timeline",
        alt: "Vesting timeline showing upcoming vest",
      },
      {
        title: "Firm-Wide Insights",
        body: "View firm-wide carry exposure by fund, employee level, office, or structure, helping leadership plan future awards with clarity and control.",
        image: "carry-management",
        alt: "Firm-wide participant carry overview",
      },
      {
        title: "Annual Statements",
        body: "Generate comprehensive annual statements in a single click, providing a clear, holistic view of total compensation and easy comparison across prior years.",
        image: "award-document",
        alt: "Stack of compensation documents",
      },
    ],
    listTitle: "Built for Organizational Leadership That:",
    listItems: [
      "Want a seamless compensation planning process",
      "Want to reduce manual statement production",
      "Need clear internal visibility without redundant manual work",
      "Focus on retention, transparency, and consistency",
    ],
  },
  "private-equity": {
    slug: "private-equity",
    metaTitle: "Carry Management Software for Private Equity | Navable",
    metaDescription:
      "A modern system to manage carry and promote structures with accuracy, transparency, and auditability for institutional PE & Credit firms.",
    eyebrow: "For private equity & private credit",
    title: "Purpose-Built for Institutional PE & Credit Firms",
    sub: "A modern system to manage carry and promote structures with accuracy, transparency, and auditability.",
    listTitle: "Make Carry Easier to Manage and Defend",
    listItems: [
      "Centralize carry plans, allocations, and vesting rules",
      "Manage participant changes with full historical traceability",
      "Support fund- and deal-level carry structures",
      "Produce consistent outputs trusted by finance, leadership, and auditors",
    ],
    tagsTitle: "Built for Institutional Scaling",
    tags: [
      "Flagship and continuation funds",
      "Deal-by-deal carry",
      "Project-level promotes",
      "Private credit structures",
      "Employee co-invest programs",
    ],
  },
  "venture-capital": {
    slug: "venture-capital",
    metaTitle: "Carry Management Software for Venture Capital | Navable",
    metaDescription:
      "Manage carried interest and compensation with clarity and control, without spreadsheet sprawl. Modern carry for modern VCs.",
    eyebrow: "For venture capital",
    title: "Modern Carry for Modern VCs",
    sub: "Manage carried interest and compensation with clarity and control, without spreadsheet sprawl.",
    listTitle: "VCs Evolve Quickly. So Does Navable.",
    listItems: [
      "Centralize carry plans, allocations, and vesting across funds and SPVs",
      "Track venture partner participation changes with full history",
      "Maintain consistent, auditable calculations as structures evolve",
      "Provide clear visibility into carry and compensation for leadership and employees",
    ],
    tagsTitle: "Purpose Built for VCs, Supporting:",
    tags: [
      "Multi-fund VC platforms",
      "SPVs and deal-by-deal carry",
      "Venture partners and advisors",
      "Employee co-invest programs",
    ],
  },
  "real-estate": {
    slug: "real-estate",
    metaTitle: "Carry Management Software for Real Estate Firms | Navable",
    metaDescription:
      "Manage carry and promote structures with accuracy, transparency, and auditability, without spreadsheet sprawl. The modern platform for modern real asset firms.",
    eyebrow: "For real estate & multi-asset",
    title: "The Modern Platform for Modern Real Asset Firms",
    sub: "Manage carry and promote structures with accuracy, transparency, and auditability, without spreadsheet sprawl.",
    listTitle: "Bring Structure to Real Asset Carry With:",
    listItems: [
      "Centralized fund, JV, and project-level carry and promote calculations",
      "Consistent rules across varied structures",
      "Track participant changes and economic adjustments over time",
      "Maintain a clear audit trail across assets, strategies, and entities",
    ],
    tagsTitle: "Designed for Real Estate & Multi-Asset Complexity",
    tags: [
      "Real estate funds and JVs",
      "Project-level promotes",
      "Multi-asset platforms",
      "Long-duration investments with evolving economics",
    ],
  },
};

export function solutionMetadata(key: SolutionPageKey): Metadata {
  const page = solutionPages[key];
  return { title: page.metaTitle, description: page.metaDescription };
}

export const CUSTOMER_QUOTE = {
  quote:
    "Navable dramatically improved employee user experiences by replacing a cumbersome manual process with a relatively simple digital process in an intuitive user interface.",
  attribution: "COO, $85B AUM Global Private Equity Firm",
};

export const CUSTOMER_LOGOS = [
  { name: "Riverside", src: "/images/logos/riverside.png", width: 137, height: 56 },
  { name: "LaSalle Investment Management", src: "/images/logos/lasalle.png", width: 122, height: 39 },
  { name: "137 Ventures", src: "/images/logos/137-ventures.png", width: 144, height: 27 },
  { name: "JLL", src: "/images/logos/jll.png", width: 107, height: 55 },
];

export const TESTIMONIALS: { quote: string; attribution: string[] }[] = [
  {
    quote:
      "We switched to Navable due to data accuracy issues with our legacy provider. It's paramount that our software gets these things right.",
    attribution: ["Director of Finance", "$4Bn AUM Venture Capital Firm"],
  },
  {
    quote: "It's easy, intuitive, and seamless.",
    attribution: ["MD, Business Technology Office", "$15Bn AUM Global Private Equity Firm"],
  },
  {
    quote:
      "Probably one of the more thoughtful, comprehensive software solutions we've seen built for our industry.",
    attribution: ["CFO at The Sterling Group"],
  },
];

export const TRIAL_STEPS = [
  { title: "Share a Workbook", body: "We review your current plans, structure, and legacy data." },
  { title: "See a Working Fund", body: "We set up a working fund to test your specific use cases." },
  { title: "Validate the Fit", body: "Use your working fund in a 14-day guided trial to decide." },
];

export const COMPARE = [
  {
    area: "Source of truth",
    spreadsheets: "Multiple files, tabs, and personal versions scattered across the team",
    navable: "One centralized, audit-ready system for all carry and co-invest programs",
  },
  {
    area: "Allocations & changes",
    spreadsheets: "Broken formulas, manual overrides, and no clear history of who changed what & when",
    navable: "Structured rules, controlled workflows, and a complete audit trail for every change",
  },
  {
    area: "Scenario modeling",
    spreadsheets: 'Duplicate models for every "what-if," risking errors and version confusion',
    navable: "Run scenarios from the same source data without cloning entire workbooks",
  },
  {
    area: "Year-end & reviews",
    spreadsheets: "Time-consuming reviews across finance, HR, and leadership just to validate numbers",
    navable: "Standardized, trusted outputs that reduce review cycles and speed up decision-making",
  },
  {
    area: "Partner transparency",
    spreadsheets: "One-off statements and ad-hoc explanations that invite more questions",
    navable: "Clear, consistent views of carry and co-invest for each partner through a dedicated portal",
  },
  {
    area: "Risk & audit readiness",
    spreadsheets: "High operational risk, limited version history, and difficult audit support",
    navable: "Designed for control: versioning, approvals, and documentation built for institutional scrutiny",
  },
];
