import SolutionPage from "@/components/solution/SolutionPage";
import { solutionMetadata, solutionPages } from "@/components/solution/data";

export const metadata = solutionMetadata("real-estate");

export default function RealEstatePage() {
  return <SolutionPage page={solutionPages["real-estate"]} />;
}
