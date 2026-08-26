import { Camera, ExternalLink, Phone } from "lucide-react";
import {
  CATTERY_HOME,
  CATTERY_PHONE,
  CATTERY_PHONE_TEL,
  type CatteryRegion,
} from "@/lib/cattery-regions";
import type { CatteryPage } from "@/lib/cattery-content";
import { catteryPhotos } from "@/lib/cattery-images";
import CatteryPhoto from "./CatteryPhoto";

const HIGHLIGHT_COPY = [
  (city: string, kw: string) => `${city} ${kw} 상담에서 가장 먼저 확인하는 항목입니다.`,
  (city: string, kw: string, sido: string) => `${sido} ${city} 기준으로 ${kw} 입양 전 점검을 안내합니다.`,
  (city: string, kw: string) => `${kw} 이후 초기 적응은 ${city} 집 구조에 맞춰 설명합니다.`,
  (city: string) => `캐터리 본점과 ${city} 지역 안내를 함께 보시면 됩니다.`,
] as const;

const FLOW_STEPS: { n: string; title: string; desc: (city: string, kw: string) => string }[] = [
  { n: "01", title: "이 페이지에서 확인", desc: (_city, kw) => `${kw} 기본 안내와 아이들 사진을 먼저 둘러보세요.` },
  { n: "02", title: "전화로 일정 문의", desc: (city) => `${city} 거주와 희망 품종만 알려 주셔도 상담이 시작됩니다.` },
  { n: "03", title: "아이 확인", desc: () => "사진·일정은 본점 안내에 따라 확인합니다. 급하게 정하지 않아도 됩니다." },
  { n: "04", title: "입양·적응", desc: (city) => `${city} 집으로 모신 뒤 사료·화장실·첫 주를 함께 짚어 드립니다.` },
];

export default function CatteryLanding({
  page,
  region,
}: {
  page: CatteryPage;
  region: CatteryRegion;
}) {
  const photos = catteryPhotos(region.slug);
  const telLabel = CATTERY_PHONE;
  const kw = region.keyword;
  const city = region.name;

  return (
    <div className="cattery-root">
      <header className="cattery-header">
        <div className="cattery-wrap cattery-header-inner">
          <div>
            <p className="cattery-kicker">CATTERY</p>
            <p className="cattery-brand">{kw}</p>
          </div>
          <a className="cattery-btn-yellow" href={CATTERY_HOME} target="_blank" rel="noopener noreferrer">
            캐터리 본점 바로가기
          </a>
        </div>
      </header>

      <section className="cattery-hero">
        <div className="cattery-hero-media">
          <CatteryPhoto src={photos.hero} alt={`${page.h1} 대표 사진`} priority sizes="100vw" />
          <div className="cattery-hero-shade" />
        </div>
        <div className="cattery-wrap cattery-hero-copy">
          <p className="cattery-badge">{region.sido}</p>
          <h1>{page.h1}</h1>
          <p className="cattery-lead">{page.intro[0]}</p>
          <div className="cattery-hero-actions">
            <a className="cattery-btn-green" href={CATTERY_PHONE_TEL}>
              <Phone size={18} />
              전화 상담 {telLabel}
            </a>
            <a className="cattery-btn-ghost" href="#gallery">
              <Camera size={18} />
              분양 사진 보기
            </a>
            <a className="cattery-btn-ghost" href={CATTERY_HOME} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} />
              공식홈페이지 방문하기
            </a>
          </div>
        </div>
      </section>

      <section className="cattery-section">
        <div className="cattery-wrap cattery-split">
          <div className="cattery-photo-frame cattery-photo-tall">
            <CatteryPhoto src={photos.about} alt={`${city} ${kw} 소개`} sizes="(max-width:768px) 100vw, 50vw" />
          </div>
          <div>
            <p className="cattery-section-kicker">ABOUT</p>
            <h2>
              {city}에서
              <br />
              {kw}을 고르는 기준
            </h2>
            {page.intro.slice(1, 3).map((p) => (
              <p key={p.slice(0, 20)} className="cattery-muted">
                {p}
              </p>
            ))}
            <div className="cattery-points">
              {page.highlights.slice(0, 3).map((item, i) => (
                <div key={item} className="cattery-point">
                  <p className="cattery-point-n">고르기 {i + 1}</p>
                  <h3>{item}</h3>
                  <p>{HIGHLIGHT_COPY[i](city, kw, region.sido)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cattery-section cattery-section-tint">
        <div className="cattery-wrap">
          <div className="cattery-section-head">
            <p className="cattery-section-kicker">ON DISPLAY</p>
            <h2>고르기 전에 보는 네 가지</h2>
            <p className="cattery-muted">{page.intro[3]}</p>
          </div>
          <div className="cattery-feature-grid">
            {page.highlights.map((item, i) => (
              <article key={item} className="cattery-feature">
                <CatteryPhoto
                  src={photos.highlights[i] || photos.hero}
                  alt={`${kw} ${item}`}
                  sizes="(max-width:768px) 50vw, 25vw"
                />
                <div className="cattery-feature-shade" />
                <span className="cattery-feature-tag">{item}</span>
                <div className="cattery-feature-copy">
                  <h3>{item}</h3>
                  <p>{HIGHLIGHT_COPY[i](city, kw, region.sido)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="cattery-section">
        <div className="cattery-wrap">
          <div className="cattery-section-head cattery-section-head-center">
            <p className="cattery-section-kicker">GALLERY</p>
            <h2>{city}에서 만나는 아이들</h2>
            <p className="cattery-muted">
              {kw} 안내용으로 네바·메인쿤 사진을 섞어 두었습니다. 실제 가능 여부는 상담에서 확인하시면 됩니다.
            </p>
          </div>
          <div className="cattery-gallery">
            {photos.featured.map((src, i) => (
              <div key={src} className="cattery-gallery-feat">
                <CatteryPhoto src={src} alt={`${kw} 진열 ${i + 1}`} sizes="(max-width:768px) 100vw, 50vw" />
              </div>
            ))}
            {photos.grid.map((src, i) => (
              <div key={src} className="cattery-gallery-cell">
                <CatteryPhoto src={src} alt={`${kw} 분양 사진 ${i + 3}`} sizes="(max-width:768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cattery-section cattery-section-tint">
        <div className="cattery-wrap cattery-split">
          <div>
            <p className="cattery-section-kicker">HEALTH</p>
            <h2>{page.health.h2}</h2>
            {page.health.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="cattery-muted">
                {p}
              </p>
            ))}
          </div>
          <div className="cattery-photo-frame cattery-photo-wide">
            <CatteryPhoto src={photos.health} alt={`${kw} 건강 안내`} sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="cattery-section">
        <div className="cattery-wrap">
          <div className="cattery-section-head cattery-section-head-center">
            <p className="cattery-section-kicker">PROCESS</p>
            <h2>{page.flow.h2}</h2>
            <p className="cattery-muted">{page.flow.paragraphs[0]}</p>
          </div>
          <div className="cattery-steps">
            {FLOW_STEPS.map((s) => (
              <div key={s.n} className="cattery-step">
                <span>{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc(city, kw)}</p>
              </div>
            ))}
          </div>
          {page.flow.paragraphs.slice(1).map((p) => (
            <p key={p.slice(0, 20)} className="cattery-muted cattery-step-note">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="cattery-section cattery-section-tint">
        <div className="cattery-wrap cattery-split cattery-split-rev">
          <div className="cattery-photo-frame cattery-photo-wide">
            <CatteryPhoto src={photos.local} alt={`${region.sido} ${city} ${kw}`} sizes="(max-width:768px) 100vw, 50vw" />
          </div>
          <div>
            <p className="cattery-section-kicker">LOCAL</p>
            <h2>{page.local.h2}</h2>
            {page.local.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="cattery-muted">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="cattery-section">
        <div className="cattery-wrap cattery-faq-wrap">
          <p className="cattery-section-kicker">FAQ</p>
          <h2 className="cattery-faq-title">{kw} 자주 묻는 질문</h2>
          <div className="cattery-faq">
            {page.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="cattery-footer">
        <div className="cattery-wrap">
          <p className="cattery-footer-name">{page.h1}</p>
          <p>{region.address}</p>
          <p>
            <a href={CATTERY_PHONE_TEL}>{telLabel}</a>
          </p>
          <p>
            <a href={CATTERY_HOME} target="_blank" rel="noopener noreferrer">
              공식홈페이지 방문하기
            </a>
          </p>
        </div>
      </footer>

      <div className="cattery-sticky">
        <a className="cattery-sticky-call" href={CATTERY_PHONE_TEL}>
          {telLabel} 전화하기
        </a>
        <a className="cattery-sticky-home" href={CATTERY_HOME} target="_blank" rel="noopener noreferrer">
          공식홈페이지 방문하기
        </a>
      </div>
    </div>
  );
}
