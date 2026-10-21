import { Section, SectionHeader } from "@/components/ui/Frame";

const iconProps = {
  className: "size-12",
  viewBox: "0 0 28 28",
  fill: "none",
  "aria-hidden": true,
} as const;

const outcomes = [
  {
    title: "More Senior Capacity",
    description: "Spend less time checking, reconciling, and maintaining carry.",
    icon: (
      <svg {...iconProps}>
        <circle cx="14" cy="14" r="11.5" stroke="#1b1b3d" strokeWidth="1.25" />
        <path d="M14 7.5V14l4.25 3" stroke="#1b1b3d" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2.5a11.5 11.5 0 0 1 11.5 11.5" stroke="#f5a61d" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Easier Reviews & Year-End",
    description: "Keep history and documents easy to trace for year-end review.",
    icon: (
      <svg {...iconProps}>
        <path d="M8 3.5h9.5L22 8v13.5a1.5 1.5 0 0 1-1.5 1.5h-12.5A1.5 1.5 0 0 1 6.5 21.5v-16A2 2 0 0 1 8 3.5Z" stroke="#1b1b3d" strokeWidth="1.25" strokeLinejoin="round" />
        <path d="M10 10h6M10 13h8M10 16h4" stroke="#1b1b3d" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M3.5 7v16.5a1.5 1.5 0 0 0 1.5 1.5h13" stroke="#1b1b3d" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 19.5l2.25 2.25L21.5 17.5" stroke="#f5a61d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "More Capacity as You Grow",
    description: "Manage more funds and participants without adding admin work.",
    icon: (
      <svg {...iconProps}>
        <path d="M14 3l10.5 5.5L14 14 3.5 8.5 14 3Z" stroke="#f5a61d" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3.5 13l10.5 5.5L24.5 13" stroke="#1b1b3d" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.5 17.5L14 23l10.5-5.5" stroke="#1b1b3d" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Outcomes() {
  return (
    <Section label="Outcomes" labelledBy="outcomes-heading">
      <SectionHeader
        id="outcomes-heading"
        indent="wide"
        topPadding="lg:pt-[54px]"
        title={
          <>
            What Changes for
            <br className="hidden lg:block" /> Your Finance, HR and
            <br className="hidden lg:block" /> Operations Teams
          </>
        }
        description="The value of better carry infrastructure isn't more software. It's less senior attention spent keeping the process under control."
      />

      <ul className="grid lg:grid-cols-3">
        {outcomes.map((outcome) => (
          <li
            key={outcome.title}
            className="border-b border-line px-6 pb-10 pt-10 last:border-b-0 lg:border-b-0 lg:border-r lg:px-8 lg:pb-[46px] lg:pt-[45px] lg:last:border-r-0"
          >
            {outcome.icon}
            <h3 className="mt-8 text-base font-medium leading-6 text-ink">{outcome.title}</h3>
            <p className="mt-2 max-w-[300px] text-sm leading-[25px] text-muted">{outcome.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
