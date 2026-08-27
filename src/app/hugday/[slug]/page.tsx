import { notFound } from "next/navigation";
import { getHugdaySite, HUGDAY_SITES } from "@/lib/hugday-sites";
import { buildHugdayPage } from "@/lib/hugday-content";
import { getSponsorBySlug } from "@/lib/site-sponsor";
import HugdayLanding from "@/app/components/HugdayLanding";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return HUGDAY_SITES.map((s) => ({ slug: s.slug }));
}

export default async function HugdaySitePage({ params }: Props) {
  const { slug } = await params;
  const site = getHugdaySite(slug);
  if (!site) notFound();
  const page = buildHugdayPage(site);
  const sponsor = await getSponsorBySlug(site.slug);
  return <HugdayLanding page={page} site={site} sponsor={sponsor} />;
}
