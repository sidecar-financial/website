import { Metadata } from "next";
import DemoPageContent from "@/components/demo/DemoPageContent";

export const metadata: Metadata = {
  title: "Book a Free Demo | Navable",
  description:
    "See how Navable fits your carry structure. Book a free demo and discover how to manage allocations, vesting, and participant changes in one system.",
};

export default function DemoPage() {
  return <DemoPageContent />;
}
