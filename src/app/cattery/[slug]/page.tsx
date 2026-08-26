import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CATTERY_HOME,
  CATTERY_PHONE,
  CATTERY_REGIONS,
  CATTERY_THEME,
  getCatteryRegion,
} from "@/lib/cattery-regions";
import { buildCatteryPage } from "@/lib/cattery-content";
import { getCatteryNaverMeta } from "@/lib/cattery-meta";
import { requestHost } from "@/lib/cattery-host";
import { catteryPhotos } from "@/lib/cattery-images";
import CatteryLanding from "@/app/components/CatteryLanding";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATTERY_REGIONS.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const region = getCatteryRegion(slug);
  if (!region) return {};
  const page = buildCatteryPage(region, CATTERY_REGIONS);
  const photos = catteryPhotos(region.slug);
  const naver = await getCatteryNaverMeta(region.slug);
  const host = await requestHost();
  const onOwnHost = host === region.host;
  return {
    metadataBase: new URL(region.siteUrl),
    title: { absolute: region.title },
    description: page.metaDescription,
    keywords: page.metaKeywords.split(", ").filter(Boolean),
    alternates: { canonical: region.siteUrl },
    robots: onOwnHost
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: region.siteUrl,
      siteName: region.title,
      title: region.title,
      description: page.metaDescription,
      images: [{ url: photos.hero, width: 1200, height: 630, alt: region.title }],
    },
    other: {
      "msapplication-TileColor": CATTERY_THEME,
      ...(naver ? { "naver-site-verification": naver } : {}),
    },
  };
}

export default async function CatteryRegionPage({ params }: Props) {
  const { slug } = await params;
  const region = getCatteryRegion(slug);
  if (!region) notFound();
  const page = buildCatteryPage(region, CATTERY_REGIONS);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PetStore",
    name: region.title,
    description: page.metaDescription,
    url: region.siteUrl,
    telephone: CATTERY_PHONE,
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressRegion: region.sido,
      addressLocality: region.name,
      streetAddress: region.address,
    },
    areaServed: region.sido,
    image: catteryPhotos(region.slug).hero,
    sameAs: [CATTERY_HOME],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <CatteryLanding page={page} region={region} />
    </>
  );
}
