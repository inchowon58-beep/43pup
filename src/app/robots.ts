import type { MetadataRoute } from "next";
import { publicOrigin } from "@/lib/public-url";
import { hugdaySiteFromRequest } from "@/lib/hugday-host";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await hugdaySiteFromRequest();
  const origin = site?.siteUrl || (await publicOrigin());
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
