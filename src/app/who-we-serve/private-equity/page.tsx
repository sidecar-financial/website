import SolutionPage from "@/components/solution/SolutionPage";
import { solutionMetadata, solutionPages } from "@/components/solution/data";

export const metadata = solutionMetadata("private-equity");

export default function PrivateEquityPage() {
  return <SolutionPage page={solutionPages["private-equity"]} />;
}
