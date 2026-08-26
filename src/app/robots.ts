import type { MetadataRoute } from "next";
import { publicOrigin } from "@/lib/public-url";
import { catteryRegionFromRequest } from "@/lib/cattery-host";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const region = await catteryRegionFromRequest();
  if (region) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      sitemap: `${region.siteUrl}/sitemap.xml`,
      host: region.siteUrl,
    };
  }

  const origin = await publicOrigin();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
