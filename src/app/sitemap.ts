import type { MetadataRoute } from "next";
import { listPageSummaries } from "@/lib/seo-pages";
import { publicOrigin } from "@/lib/public-url";
import { hugdaySiteFromRequest } from "@/lib/hugday-host";
import { HUGDAY_SITES } from "@/lib/hugday-sites";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await hugdaySiteFromRequest();
  if (site) {
    const pages = await listPageSummaries(site.slug);
    const now = new Date();
    return [
      { url: site.siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
      { url: `${site.siteUrl}/guide`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
      ...pages.map((p) => ({
        url: `${site.siteUrl}/guide/${encodeURIComponent(p.slug)}`,
        lastModified: new Date(p.updatedAt || p.createdAt || now),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ];
  }

  const base = await publicOrigin();
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...HUGDAY_SITES.map((s) => ({
      url: s.siteUrl,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
