import SolutionPage from "@/components/solution/SolutionPage";
import { solutionMetadata, solutionPages } from "@/components/solution/data";

export const metadata = solutionMetadata("carried-interest");

export default function CarriedInterestSoftwarePage() {
  return <SolutionPage page={solutionPages["carried-interest"]} />;
}
