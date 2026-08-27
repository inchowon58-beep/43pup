import { headers } from "next/headers";
import { getHugdaySite, isHugdaySlug } from "./hugday-sites";

function firstSubdomain(host: string): string {
  const h = host.split(":")[0].toLowerCase();
  const parts = h.split(".");
  if (parts.length < 3) return "";
  return parts[0] || "";
}

export async function hugdaySlugFromRequest(): Promise<string> {
  try {
    const h = await headers();
    const fromMw = (h.get("x-hugday-slug") || "").toLowerCase().trim();
    if (fromMw && isHugdaySlug(fromMw)) return fromMw;
    const pathname = h.get("x-pathname") || "";
    const m = pathname.match(/^\/hugday\/([a-z0-9]+)/i);
    if (m && isHugdaySlug(m[1])) return m[1].toLowerCase();
    const host = (h.get("x-forwarded-host") || h.get("host") || "")
      .split(",")[0]
      .trim();
    const sub = firstSubdomain(host);
    if (isHugdaySlug(sub)) return sub;
  } catch {
    /* static */
  }
  return "";
}

export async function hugdaySiteFromRequest() {
  const slug = await hugdaySlugFromRequest();
  return slug ? getHugdaySite(slug) : undefined;
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
