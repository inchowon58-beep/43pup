import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/site";
import { publicOrigin } from "@/lib/public-url";
import { faqJsonLd, howToJsonLd, orgJsonLd } from "@/lib/faq-data";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SponsorStickyFooter from "./components/SponsorStickyFooter";
import SponsorFooterGate from "./components/SponsorFooterGate";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const origin = await publicOrigin();
  return {
    metadataBase: new URL(origin),
    title: {
      default: `${SITE.name} | 마지막 포옹을 위한 반려동물 장례`,
      template: `%s | ${SITE.brand}`,
    },
    description: SITE.description,
    keywords: [...SITE.keywords],
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    publisher: SITE.name,
    alternates: { canonical: origin },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: origin,
      siteName: SITE.name,
      title: `${SITE.name} | 마지막 포옹을 위한 반려동물 장례`,
      description: SITE.description,
      images: [
        {
          url: SITE.logo,
          width: 1200,
          height: 630,
          alt: `${SITE.name} — 마지막 포옹을 위한 반려동물 장례`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE.name} | 마지막 포옹을 위한 반려동물 장례`,
      description: SITE.description,
      images: [SITE.logo],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    },
    other: {
      "msapplication-TileColor": "#3d4a7a",
      "naver-site-verification": "50323c9e6b08b108c5f780596873f92731d1deb1",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#3d4a7a",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const origin = await publicOrigin();
  const org = orgJsonLd(origin);
  const faq = faqJsonLd();
  const howTo = howToJsonLd(origin);
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="50323c9e6b08b108c5f780596873f92731d1deb1" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://image.cattery.co.kr" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE.name} RSS`}
          href="/rss.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE.name} Feed`}
          href="/feed"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <SponsorFooterGate>
          <SponsorStickyFooter />
        </SponsorFooterGate>
      </body>
    </html>
  );
}
