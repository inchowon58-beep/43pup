import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { publicOrigin } from "@/lib/public-url";
import { faqJsonLd, howToJsonLd, orgJsonLd } from "@/lib/faq-data";
import { getPublicSponsor } from "@/lib/site-sponsor";
import { publicKakaoUrl } from "@/lib/site-sponsor-shared";
import { hugdaySiteFromRequest } from "@/lib/hugday-host";
import { buildHugdayPage } from "@/lib/hugday-content";
import { hugdayCover } from "@/lib/hugday-images";
import { HUGDAY_THEME } from "@/lib/hugday-sites";
import { getHugdayNaverMeta } from "@/lib/hugday-meta";
import SponsorStickyFooter from "./components/SponsorStickyFooter";
import SponsorFooterGate from "./components/SponsorFooterGate";
import HugdayAdminFooter from "./components/HugdayAdminFooter";
import { KakaoHrefProvider } from "./components/KakaoHrefProvider";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: HUGDAY_THEME,
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const site = await hugdaySiteFromRequest();
  if (site) {
    const page = buildHugdayPage(site);
    const naver = await getHugdayNaverMeta(site.slug);
    const og = hugdayCover(site.folder);
    return {
      metadataBase: new URL(site.siteUrl),
      title: { absolute: site.title },
      description: page.metaDescription,
      keywords: page.metaKeywords.split(",").map((s) => s.trim()),
      alternates: { canonical: site.siteUrl },
      openGraph: {
        type: "website",
        locale: "ko_KR",
        url: site.siteUrl,
        siteName: site.title,
        title: site.title,
        description: page.metaDescription,
        images: [{ url: og, alt: site.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: site.title,
        description: page.metaDescription,
        images: [og],
      },
      other: {
        "msapplication-TileColor": site.accent,
        ...(naver ? { "naver-site-verification": naver } : {}),
      },
    };
  }

  const origin = await publicOrigin();
  return {
    metadataBase: new URL(origin),
    title: { default: `${SITE.title} · 견종·묘종 노트`, template: `%s | ${SITE.brand}` },
    description: SITE.description,
    keywords: [...SITE.keywords],
    authors: [{ name: SITE.brand }],
    creator: SITE.brand,
    publisher: SITE.brand,
    alternates: { canonical: origin },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: origin,
      siteName: SITE.brand,
      title: SITE.title,
      description: SITE.description,
      images: [{ url: SITE.ogImage, alt: SITE.brand }],
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const site = await hugdaySiteFromRequest();
  const sponsor = await getPublicSponsor();
  const kakaoHref = publicKakaoUrl(sponsor);
  const phone =
    sponsor?.status === "ACTIVE" && sponsor.phone_number.trim()
      ? sponsor.phone_number.trim()
      : undefined;
  const origin = site?.siteUrl || (await publicOrigin());
  const org = orgJsonLd(origin, phone, site?.title);
  const naver = site ? await getHugdayNaverMeta(site.slug) : "";

  return (
    <html lang="ko">
      <head>
        {naver ? <meta name="naver-site-verification" content={naver} /> : null}
        <link rel="preconnect" href="https://image.cattery.co.kr" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(site ? buildHugdayPage(site).faqs : undefined)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd(origin)) }}
        />
      </head>
      <body className="hug-mode">
        <KakaoHrefProvider href={kakaoHref}>
          {children}
          <SponsorFooterGate>
            <SponsorStickyFooter />
            <HugdayAdminFooter />
          </SponsorFooterGate>
        </KakaoHrefProvider>
      </body>
    </html>
  );
}

