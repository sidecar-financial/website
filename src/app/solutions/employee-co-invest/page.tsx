import SolutionPage from "@/components/solution/SolutionPage";
import { solutionMetadata, solutionPages } from "@/components/solution/data";

export const metadata = solutionMetadata("co-invest");

export default function EmployeeCoInvestPage() {
  return <SolutionPage page={solutionPages["co-invest"]} />;
}
