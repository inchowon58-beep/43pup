import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isHugdaySlug } from "@/lib/hugday-sites";

function firstSubdomain(host: string): string {
  const h = host.split(":")[0].toLowerCase();
  const parts = h.split(".");
  if (parts.length < 3) return "";
  return parts[0] || "";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";
  const sub = firstSubdomain(host);
  const hug = isHugdaySlug(sub) ? sub : "";

  const requestHeaders = new Headers(request.headers);
  let dest = pathname.length > 1 && pathname.endsWith("/") ? pathname.replace(/\/+$/, "") || "/" : pathname;

  const passThrough =
    dest.startsWith("/admin") || dest.startsWith("/api") || dest.startsWith("/_next");
  const isGuide = dest === "/guide" || dest.startsWith("/guide/");

  if (hug && (isGuide || passThrough)) {
    requestHeaders.set("x-hugday-slug", hug);
    requestHeaders.set("x-pathname", dest);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (hug && !passThrough) {
    dest = `/hugday/${hug}`;
    const url = request.nextUrl.clone();
    url.pathname = dest;
    requestHeaders.set("x-hugday-slug", hug);
    requestHeaders.set("x-pathname", dest);
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = dest;
    requestHeaders.set("x-pathname", dest);
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  requestHeaders.set("x-pathname", dest);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
