import type { Metadata } from "next";
import Link from "next/link";
import { listPublicPageSummaries, pagePath, PUBLIC_PAGE_LIMIT } from "@/lib/seo-pages";
import { SITE } from "@/lib/site";
import { publicPageUrl } from "@/lib/public-url";
import { hugdaySiteFromRequest } from "@/lib/hugday-host";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const url = await publicPageUrl("/guide");
  const site = await hugdaySiteFromRequest();
  if (site) {
    return {
      title: `${site.keyword} 안내`,
      description: `${site.title} 안내글`,
      keywords: [site.keyword, site.name],
      alternates: { canonical: url },
    };
  }
  return {
    title: "분양 안내",
    description: `${SITE.name} 견종·묘종 안내`,
    alternates: { canonical: url },
  };
}

const PAGE_SIZE = 25;
type Props = { searchParams: Promise<{ page?: string }> };

export default async function GuideIndexPage({ searchParams }: Props) {
  const sp = await searchParams;
  const pageNum = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const hostSite = await hugdaySiteFromRequest();
  const all = await listPublicPageSummaries(
    hostSite ? 5000 : PUBLIC_PAGE_LIMIT,
    hostSite?.slug || ""
  );
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE) || 1);
  const current = Math.min(pageNum, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const slice = all.slice(start, start + PAGE_SIZE);

  return (
    <div className="hug-root">
      <div className="hug-guide">
        <p className="hug-eyebrow">ARCHIVE</p>
        <h1>{hostSite ? `${hostSite.keyword} 안내` : "분양 안내"}</h1>
        <p className="hug-lead">
          {hostSite ? `${hostSite.title} 키워드별 노트 ${total}건` : `${total}건`}
        </p>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "2rem" }}>
          {slice.length === 0 && <li className="hug-lead">등록된 안내글이 없습니다.</li>}
          {slice.map((p) => (
            <li key={p.slug} style={{ borderTop: "1px solid var(--line)", padding: "1.1rem 0" }}>
              <Link href={pagePath(p.slug)}>
                <div className="hug-eyebrow">{p.keyword}</div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", margin: "0.2rem 0" }}>
                  {p.h1}
                </h2>
                <p className="hug-lead" style={{ fontSize: "0.95rem" }}>
                  {p.metaDescription}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <footer className="hug-foot">
        <p className="hug-wordmark">포옹데이</p>
        <p className="hug-foot-en">POONG DAY · ARCHIVE</p>
      </footer>
    </div>
  );
}
