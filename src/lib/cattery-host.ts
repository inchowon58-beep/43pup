import { headers } from "next/headers";
import { getCatteryRegion, isCatterySlug } from "./cattery-regions";

function firstSubdomain(host: string): string {
  const h = host.split(":")[0].toLowerCase();
  const parts = h.split(".");
  if (parts.length < 3) return "";
  return parts[0] || "";
}

export async function catterySlugFromRequest(): Promise<string> {
  try {
    const h = await headers();
    const fromMw = (h.get("x-cattery-slug") || "").toLowerCase().trim();
    if (fromMw && isCatterySlug(fromMw)) return fromMw;
    const pathname = h.get("x-pathname") || "";
    const m = pathname.match(/^\/cattery\/([a-z0-9]+)/i);
    if (m && isCatterySlug(m[1])) return m[1].toLowerCase();
    const host = (h.get("x-forwarded-host") || h.get("host") || "")
      .split(",")[0]
      .trim();
    const sub = firstSubdomain(host);
    if (isCatterySlug(sub)) return sub;
  } catch {
    /* static */
  }
  return "";
}

export async function catteryRegionFromRequest() {
  const slug = await catterySlugFromRequest();
  return slug ? getCatteryRegion(slug) : undefined;
}

export async function requestHost(): Promise<string> {
  try {
    const h = await headers();
    return (h.get("x-forwarded-host") || h.get("host") || "")
      .split(",")[0]
      .trim()
      .toLowerCase()
      .split(":")[0];
  } catch {
    return "";
  }
}
