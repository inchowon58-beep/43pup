import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { HUGDAY_SITES } from "@/lib/hugday-sites";
import { getCatteryNaverMap, saveCatteryNaverMap } from "@/lib/cattery-meta";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const metas = await getCatteryNaverMap();
  return NextResponse.json({
    items: HUGDAY_SITES.map((r) => ({
      name: r.name,
      slug: r.slug,
      host: r.host,
      siteUrl: r.siteUrl,
      keyword: r.keyword,
      title: r.title,
      naver: metas[r.slug] || "",
    })),
  });
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await req.json().catch(() => ({}));
  const raw = body?.metas && typeof body.metas === "object" ? body.metas : {};
  const saved = await saveCatteryNaverMap(raw);
  return NextResponse.json({ ok: true, saved: Object.keys(saved).length });
}
