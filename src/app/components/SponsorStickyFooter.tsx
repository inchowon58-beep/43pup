import { getPublicSponsor } from "@/lib/site-sponsor";
import SponsorStickyFooterBar from "./SponsorStickyFooterBar";

export default async function SponsorStickyFooter() {
  const sponsor = await getPublicSponsor();
  if (!sponsor) return null;
  if (sponsor.status === "ACTIVE") {
    const has =
      Boolean(sponsor.phone_number?.trim()) ||
      Boolean(sponsor.homepage_url?.trim()) ||
      Boolean(sponsor.link_url?.trim());
    if (!has) return null;
  }
  return <SponsorStickyFooterBar sponsor={sponsor} />;
}
