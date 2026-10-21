import SolutionPage from "@/components/solution/SolutionPage";
import { solutionMetadata, solutionPages } from "@/components/solution/data";

export const metadata = solutionMetadata("compensation");

export default function CompensationManagementPage() {
  return <SolutionPage page={solutionPages["compensation"]} />;
}
