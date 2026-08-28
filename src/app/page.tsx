import { HUGDAY_SITES } from "@/lib/hugday-sites";
import HugdayPortalHome from "./components/HugdayPortalHome";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return <HugdayPortalHome sites={HUGDAY_SITES} />;
}
