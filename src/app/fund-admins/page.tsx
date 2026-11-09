import SolutionPage from "@/components/solution/SolutionPage";
import { solutionMetadata, solutionPages } from "@/components/solution/data";

export const metadata = solutionMetadata("fund-admins");

// Lives at /fund-admins (not under /who-we-serve) so the legacy navable.com URL keeps working.
export default function FundAdminsPage() {
  return <SolutionPage page={solutionPages["fund-admins"]} />;
}
