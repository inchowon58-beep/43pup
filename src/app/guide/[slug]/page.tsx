import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listPageSummaries, readPage } from "@/lib/seo-pages";
import { isRealImage } from "@/lib/images";
import { faqJsonLd } from "@/lib/faq-data";
import { getPublicSponsor } from "@/lib/site-sponsor";
import { hugdaySiteFromRequest } from "@/lib/hugday-host";
import { absoluteUrl, publicOrigin } from "@/lib/public-url";
import {
  phoneToTel,
  sponsorHomepageUrl,
  sponsorYoutubeUrl,
  youtubeEmbedUrl,
  youtubeVideoId,
} from "@/lib/site-sponsor-shared";
import HugdayPhoto from "@/app/components/HugdayPhoto";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  const pages = await listPageSummaries();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);
  const hostSite = await hugdaySiteFromRequest();
  const page = await readPage(slug, hostSite?.slug || "");
  if (!page) return { title: "페이지 없음" };
  const origin = await publicOrigin();
  const url = absoluteUrl(origin, `/guide/${encodeURIComponent(page.slug)}`);
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
  const slug = decodeURIComponent(raw);
  const hostSite = await hugdaySiteFromRequest();
  const page = await readPage(slug, hostSite?.slug || "");
  if (!page) notFound();

  const origin = await publicOrigin();
  const pageUrl = absoluteUrl(origin, `/guide/${encodeURIComponent(page.slug)}`);
  const images = (page.images || []).slice(0, 3);
  const sponsor = await getPublicSponsor();
  const waiting = sponsor?.status === "RECRUITING";
  const phone = sponsor?.status === "ACTIVE" ? sponsor.phone_number.trim() : "";
  const home = sponsor?.status === "ACTIVE" ? sponsorHomepageUrl(sponsor) : "";
  const yt = sponsor?.status === "ACTIVE" ? youtubeVideoId(sponsorYoutubeUrl(sponsor, 1)) : null;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: origin },
      {
        "@type": "ListItem",
        position: 2,
        name: hostSite ? `${hostSite.keyword} 안내` : "안내",
        item: absoluteUrl(origin, "/guide"),
      },
      { "@type": "ListItem", position: 3, name: page.h1, item: pageUrl },
    ],
  };

  return (
    <article className="hug-root">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(page.faqs)) }}
      />
      {images[0] ? (
        <div className="hug-hero" style={{ minHeight: 380 }}>
          <div className="hug-hero-visual">
            <HugdayPhoto src={images[0]} alt={page.h1} priority sizes="60vw" />
          </div>
          <div className="hug-hero-panel">
            <p className="hug-eyebrow">{page.keyword}</p>
            <h1>{page.h1}</h1>
            <p className="hug-lead">{page.heroSubtitle || page.metaDescription}</p>
            {waiting ? (
              <span className="hug-chip-wait">입점대기중</span>
            ) : phone ? (
              <a className="hug-btn-solid" href={phoneToTel(phone)}>
                {phone}
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="hug-guide">
        <nav className="hug-eyebrow" style={{ marginBottom: "1.5rem" }}>
          <Link href="/">홈</Link>
          <span> / </span>
          <Link href="/guide">{hostSite ? `${hostSite.keyword} 안내` : "안내"}</Link>
        </nav>

        <div className="hug-guide-article">
          {page.sections.map((sec, si) => (
            <section key={sec.h2}>
              <h2>{sec.h2}</h2>
              {sec.paragraphs.map((p) => (
                <p key={p.slice(0, 20)} className="hug-lead">
                  {p}
                </p>
              ))}
              {si === 0 && images[1] ? (
                <div className="hug-essay-photo" style={{ minHeight: 280, margin: "1.5rem 0" }}>
                  <HugdayPhoto src={images[1]} alt={sec.h2} sizes="100vw" />
                </div>
              ) : null}
              {si === 1 && yt ? (
                <div className="hug-video-frame" style={{ margin: "1.5rem 0" }}>
                  <iframe
                    src={youtubeEmbedUrl(yt)}
                    title="안내 영상"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : null}
            </section>
          ))}

          {page.faqs?.length ? (
            <section className="hug-faq" style={{ padding: "2rem 0 0" }}>
              <h2>FAQ</h2>
              <dl>
                {page.faqs.map((f) => (
                  <div key={f.q} className="hug-faq-item">
                    <dt>{f.q}</dt>
                    <dd>{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {!waiting && home ? (
            <p style={{ marginTop: "2rem" }}>
              <a className="hug-btn-line" href={home} target="_blank" rel="noopener noreferrer">
                공식 안내 보기
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
