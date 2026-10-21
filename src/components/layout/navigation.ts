/**
 * Single source of truth for site navigation (header + footer).
 * Keep every public page reachable from here.
 *
 * Descriptions are condensed from each page's own copy (hero / meta description).
 */

export type NavIconName =
  | "platform"
  | "waterfall"
  | "carry"
  | "compensation"
  | "co-invest"
  | "private-equity"
  | "venture-capital"
  | "real-estate"
  | "resource-hub"
  | "blog"
  | "faq"
  | "how-it-works"
  | "about"
  | "why-navable";

export type NavItem = {
  label: string;
  /**
   * Destination. Omit it for items without a page yet (see `comingSoon`):
   * those render as a plain, non-clickable "Coming soon" row.
   */
  href?: string;
  /** One short line shown under the title in the header dropdowns. */
  description: string;
  icon: NavIconName;
  /**
   * Marks a product that is announced but has no page yet. It is shown (header,
   * mobile menu, footer) as a non-link row with a "Coming soon" pill. When the
   * page exists, add its `href` and delete `comingSoon`: the item becomes a
   * normal link everywhere, with no other code changes.
   */
  comingSoon?: boolean;
};

export type NavSection = {
  id: string;
  /** Eyebrow label above the section. Omit for a single, unlabelled list. */
  label?: string;
  items: NavItem[];
};

export type NavGroup = {
  id: string;
  label: string;
  sections: NavSection[];
};

const products: NavItem[] = [
  // Waterfall is announced but not launched: /waterfall is its
  // "coming soon" waitlist page.
  {
    label: "Waterfall",
    href: "/waterfall",
    description: "Distribution waterfalls in the same system",
    icon: "waterfall",
  },
  {
    label: "Carried Interest Software",
    href: "/solutions/carried-interest-software",
    description: "Plans, allocations and vesting",
    icon: "carry",
  },
  {
    label: "Compensation Management",
    href: "/solutions/compensation-management",
    description: "Carry, cash comp and benefits, unified",
    icon: "compensation",
  },
  {
    label: "Employee Co-Invest",
    href: "/solutions/employee-co-invest",
    description: "Compliant co-invest, built for scale",
    icon: "co-invest",
  },
];

const whoWeServe: NavItem[] = [
  {
    label: "Private Equity & Private Credit",
    href: "/who-we-serve/private-equity",
    description: "Auditable carry and promote structures",
    icon: "private-equity",
  },
  {
    label: "Venture Capital",
    href: "/who-we-serve/venture-capital",
    description: "Carry and comp without spreadsheets",
    icon: "venture-capital",
  },
  {
    label: "Real Estate",
    href: "/who-we-serve/real-estate",
    description: "Carry and promote for real asset firms",
    icon: "real-estate",
  },
  // TODO: add "Fund Administrators" (/who-we-serve/fund-administrators) when that page exists.
];

const resources: NavItem[] = [
  {
    label: "Resource Hub",
    href: "/resource-hub",
    description: "Answers on carry, vesting, reporting",
    icon: "resource-hub",
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Insights on carry and compensation",
    icon: "blog",
  },
  {
    label: "FAQ",
    href: "/faq",
    description: "Common questions about Navable",
    icon: "faq",
  },
  {
    label: "How it works",
    href: "/how-it-works",
    description: "Simple setup in three steps",
    icon: "how-it-works",
  },
];

const company: NavItem[] = [
  {
    label: "About us",
    href: "/about",
    description: "Tech for alternative asset managers",
    icon: "about",
  },
  {
    label: "Why Navable",
    href: "/why-navable",
    description: "Why teams choose Navable",
    icon: "why-navable",
  },
];

/** Header dropdowns. */
export const navGroups: NavGroup[] = [
  {
    id: "solutions",
    label: "Solutions",
    sections: [
      { id: "products", label: "Products", items: products },
      { id: "who-we-serve", label: "Who we serve", items: whoWeServe },
    ],
  },
  { id: "resources", label: "Resources", sections: [{ id: "resources", items: resources }] },
  { id: "company", label: "Company", sections: [{ id: "company", items: company }] },
];

/** Where open roles are listed (external, opens in a new tab). */
export const CAREERS_URL = "https://sidecar-financial.notion.site/Join-Navable-f4471e84dce14b14884addc7fe3b37f0";

/** A footer link: any NavItem, or an external link that opens in a new tab. */
export type FooterLink = Pick<NavItem, "label" | "href" | "comingSoon"> & {
  external?: boolean;
};

/** Footer columns: Solutions and Who we serve stay separate here. */
export const footerColumns: { id: string; title: string; items: FooterLink[] }[] = [
  { id: "solutions", title: "Solutions", items: products },
  { id: "who-we-serve", title: "Who we serve", items: whoWeServe },
  { id: "resources", title: "Resources", items: resources },
  {
    id: "company",
    title: "Company",
    items: [...company, { label: "Careers", href: CAREERS_URL, external: true }],
  },
];

export const legalLinks: { label: string; href: string }[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms of Service", href: "/terms" },
];

/** All clickable items of a group, in order (used for `aria-current`). */
export function groupItems(group: NavGroup): NavItem[] {
  return group.sections.flatMap((section) => section.items).filter((item) => item.href);
}
