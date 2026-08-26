import {
  CATTERY_HOME,
  CATTERY_PHONE,
  CATTERY_PHONE_TEL,
  type CatteryRegion,
} from "@/lib/cattery-regions";
import type { CatteryPage } from "@/lib/cattery-content";

export default function CatteryLanding({
  page,
  region,
}: {
  page: CatteryPage;
  region: CatteryRegion;
}) {
  const telLabel = CATTERY_PHONE;
  return (
    <div className="cattery-root">
      <header className="cattery-header">
        <div className="cattery-wrap cattery-header-inner">
          <div>
            <p className="cattery-kicker">CATTERY</p>
            <p className="cattery-brand">{region.keyword}</p>
          </div>
          <a className="cattery-btn-yellow" href={CATTERY_HOME} target="_blank" rel="noopener noreferrer">
            캐터리 본점 바로가기
          </a>
        </div>
      </header>

      <section className="cattery-hero">
        <div className="cattery-wrap">
          <p className="cattery-badge">{region.sido}</p>
          <h1>{page.h1}</h1>
          <p className="cattery-lead">{page.intro[0]}</p>
          <div className="cattery-hero-actions">
            <a className="cattery-btn-green" href={CATTERY_PHONE_TEL}>
              전화 상담 {telLabel}
            </a>
            <a className="cattery-btn-ghost" href={CATTERY_HOME} target="_blank" rel="noopener noreferrer">
              공식홈페이지 방문하기
            </a>
          </div>
        </div>
      </section>

      <section className="cattery-wrap cattery-grid">
        {page.highlights.map((item, i) => (
          <article key={item} className="cattery-card">
            <h2>{item}</h2>
            <p>
              {i === 0
                ? `${region.name} ${region.keyword} 상담에서 가장 먼저 확인하는 항목입니다.`
                : i === 1
                  ? `${region.sido} ${region.name} 기준으로 입양 전 점검을 안내합니다.`
                  : i === 2
                    ? `${region.keyword} 이후 초기 적응은 ${region.name} 집 구조에 맞춰 설명합니다.`
                    : `캐터리 본점과 ${region.name} 지역 안내를 함께 보시면 됩니다.`}
            </p>
          </article>
        ))}
      </section>

      <section className="cattery-wrap cattery-prose">
        {page.intro.slice(1).map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </section>

      <section className="cattery-band">
        <div className="cattery-wrap cattery-prose">
          <h2>{page.health.h2}</h2>
          {page.health.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="cattery-wrap cattery-prose">
        <h2>{page.flow.h2}</h2>
        {page.flow.paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </section>

      <section className="cattery-wrap cattery-prose">
        <h2>{page.local.h2}</h2>
        {page.local.paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </section>

      <section className="cattery-wrap">
        <h2 className="cattery-faq-title">{region.keyword} 자주 묻는 질문</h2>
        <div className="cattery-faq">
          {page.faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
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
        <a
          className="cattery-sticky-home"
          href={CATTERY_HOME}
          target="_blank"
          rel="noopener noreferrer"
        >
          공식홈페이지 방문하기
        </a>
      </div>
    </div>
  );
}
