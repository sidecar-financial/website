import SolutionPage from "@/components/solution/SolutionPage";
import { solutionMetadata, solutionPages } from "@/components/solution/data";

export const metadata = solutionMetadata("venture-capital");

export default function VentureCapitalPage() {
  return <SolutionPage page={solutionPages["venture-capital"]} />;
}
