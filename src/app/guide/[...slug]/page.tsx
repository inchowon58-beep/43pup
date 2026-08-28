import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listPageSummaries, readPage, normalizeSeoSlug, pagePath } from "@/lib/seo-pages";
import { isRealImage } from "@/lib/images";
import { faqJsonLd } from "@/lib/faq-data";
import { getPublicSponsor } from "@/lib/site-sponsor";
import { hugdaySiteFromRequest } from "@/lib/hugday-host";
import { absoluteUrl, publicOrigin } from "@/lib/public-url";
import { buildHugdayPage } from "@/lib/hugday-content";
import { getHugdaySite } from "@/lib/hugday-sites";
import HugdayLanding from "@/app/components/HugdayLanding";

type Props = { params: Promise<{ slug: string[] }> };

function paramSlug(raw: string[] | undefined): string {
  return normalizeSeoSlug((raw || []).join("/"));
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  const pages = await listPageSummaries();
  return pages.map((p) => ({ slug: [p.slug] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = paramSlug(raw);
  const hostSite = await hugdaySiteFromRequest();
  const page = await readPage(slug, hostSite?.slug || "");
  if (!page) return { title: "페이지 없음" };
  const origin = await publicOrigin();
  const url = absoluteUrl(origin, pagePath(page.slug));
  const ogImage = page.images.find((u) => isRealImage(u)) || page.images[0];
  return {
    title: page.title,
    description: page.metaDescription,
    keywords: page.metaKeywords.split(",").map((s) => s.trim()).filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url,
      type: "article",
      locale: "ko_KR",
      images: ogImage ? [{ url: ogImage, alt: page.h1 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug: raw } = await params;
  const slug = paramSlug(raw);
  const hostSite = await hugdaySiteFromRequest();
  const page = await readPage(slug, hostSite?.slug || "");
  if (!page) notFound();
  const site = hostSite || getHugdaySite(page.regionSlug || "") || getHugdaySite(page.regionName || "");
  if (!site) notFound();

  const origin = await publicOrigin();
  const pageUrl = absoluteUrl(origin, pagePath(page.slug));
  const sponsor = await getPublicSponsor();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: origin },
      {
        "@type": "ListItem",
        position: 2,
        name: `${site.keyword}안내`,
        item: absoluteUrl(origin, "/guide"),
      },
      { "@type": "ListItem", position: 3, name: page.h1, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(page.faqs)) }}
      />
      <HugdayLanding
        page={buildHugdayPage(site)}
        site={site}
        sponsor={sponsor}
        seo={{
          keyword: page.keyword,
          heroTitle: page.h1,
          heroSub: page.heroSubtitle || page.metaDescription,
          sections: page.sections,
          faqs: page.faqs,
        }}
      />
    </>
  );
}
