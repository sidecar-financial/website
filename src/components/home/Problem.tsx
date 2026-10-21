import type { ReactNode } from "react";
import { Section, SectionHeader } from "@/components/ui/Frame";
import NavableIllustration from "@/components/home/problem-illustrations/NavableIllustration";
import ProblemIllustrations from "@/components/home/problem-illustrations/ProblemIllustrations";
import SheetsIllustration from "@/components/home/problem-illustrations/SheetsIllustration";

const spreadsheetProblems = [
  "Carry rules depend on spreadsheets and people",
  "Participant changes force manual model rework",
  "Historical decisions have to be reconstructed",
  "Employees and GPs come back to Finance for answers",
  "More funds and participants add to admin work",
];

const navableSolutions = [
  "Plans, participants, and history live in one system",
  "Run forfeitures, dilutions, and reallocations",
  "Keep changes, records and documents connected",
  "Participants can access their own carry information directly",
  "Scale carry without needing more spreadsheets",
];

const MinusIcon = () => (
  <svg className="size-3.5 shrink-0 text-[#a9abc0]" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="5.75" stroke="currentColor" strokeWidth="1" />
    <path d="M4.5 7h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg className="size-3.5 shrink-0" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect width="14" height="14" rx="2.5" fill="#f5a61d" />
    <path d="M3.8 7.2l2.1 2.1 4.3-4.4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GridIcon = () => (
  <svg className="size-3.5 shrink-0 text-ink" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="0.75" y="0.75" width="12.5" height="12.5" rx="1" stroke="currentColor" strokeWidth="1" />
    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1" />
  </svg>
);

type ComparisonProps = {
  illustration: ReactNode;
  label: string;
  icon: React.ReactNode;
  items: string[];
  itemIcon: React.ReactNode;
  className?: string;
};

function Comparison({ illustration, label, icon, items, itemIcon, className = "" }: ComparisonProps) {
  return (
    <div className={`px-6 pb-12 pt-8 lg:px-12 lg:pb-[58px] lg:pt-[39px] ${className}`}>
      <div className="w-full max-w-[468px]">{illustration}</div>
      <h3 className="mt-7 flex items-center gap-2 font-mono text-[11px] font-bold uppercase leading-[14px] tracking-[0.08em] text-ink">
        {icon}
        {label}
      </h3>
      <ul className="mt-[30px]">
        {items.map((item) => (
          <li
            key={item}
            className="flex min-h-16 items-center gap-2.5 border-t border-line text-sm leading-5 text-muted"
          >
            {itemIcon}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Problem() {
  return (
    <Section label="The Problem" labelledBy="problem-heading">
      <SectionHeader
        id="problem-heading"
        title={
          <>
            When Growth Outpaces
            <br className="hidden lg:block" /> Excel, Change{" "}
            <span className="text-orange">
              Gets
              <br className="hidden lg:block" /> Harder to Control
            </span>
          </>
        }
        description="As carry complexity grows, spreadsheets create more risk, more manual work, and less control. Navable brings it into one system built for alternative asset firms."
      />

      <ProblemIllustrations className="grid lg:grid-cols-2">
        <Comparison
          className="border-b border-line lg:border-b-0 lg:border-r"
          illustration={<SheetsIllustration />}
          label="With Spreadsheets"
          icon={<GridIcon />}
          items={spreadsheetProblems}
          itemIcon={<MinusIcon />}
        />
        <Comparison
          illustration={<NavableIllustration />}
          label="With Navable"
          icon={<span aria-hidden="true" className="block size-3.5 bg-orange" />}
          items={navableSolutions}
          itemIcon={<CheckIcon />}
        />
      </ProblemIllustrations>
    </Section>
  );
}
