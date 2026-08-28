import type { CSSProperties, ComponentType } from "react";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Gift,
  Heart,
  HeartPulse,
  Home,
  Leaf,
  Megaphone,
  PawPrint,
  Phone,
  Ruler,
  ShieldAlert,
  Stethoscope,
  Syringe,
  Wind,
} from "lucide-react";
import type { HugdayPage } from "@/lib/hugday-content";
import type { HugdaySite } from "@/lib/hugday-sites";
import { hugdayPhotos } from "@/lib/hugday-images";
import type { SiteSponsor } from "@/lib/site-sponsor-shared";
import { phoneToTel, youtubeVideoId, youtubeEmbedUrl, sponsorYoutubeUrl } from "@/lib/site-sponsor-shared";
import { buildHugdayGuide, type SpecKey, type WarningItem } from "@/lib/hugday-guide";
import HugdayPhoto from "./HugdayPhoto";

const SPEC_ICON: Record<SpecKey, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  size: Ruler,
  coat: Wind,
  temper: Heart,
  home: Home,
};

const WARN_ICON: Record<WarningItem["icon"], ComponentType<{ size?: number; strokeWidth?: number }>> = {
  stethoscope: Stethoscope,
  gift: Gift,
  megaphone: Megaphone,
  paw: PawPrint,
};

export default function HugdayLanding({
  page,
  site,
  sponsor,
}: {
  page: HugdayPage;
  site: HugdaySite;
  sponsor: SiteSponsor | null;
}) {
  const photos = hugdayPhotos(site);
  const guide = buildHugdayGuide(site, page, sponsor);
  const { encyclopedia: enc, partners } = guide;
  const waiting = sponsor?.status === "RECRUITING";
  const yt = sponsor?.status === "ACTIVE" ? youtubeVideoId(sponsorYoutubeUrl(sponsor, 1)) : null;

  return (
    <div
      className="guide-root"
      style={
        {
          "--hug-accent": site.accent,
          "--hug-soft": site.accentSoft,
        } as CSSProperties
      }
    >
      <header className="guide-head">
        <div className="guide-wrap guide-head-inner">
          <div>
            <p className="guide-brand">포옹데이</p>
            <p className="guide-kicker">{guide.kindLabel}</p>
          </div>
          <a href="#partners" className="guide-head-link">
            제휴처 보기
          </a>
        </div>
      </header>

      <section className="guide-wrap guide-hero">
        <div className="guide-hero-photo">
          <HugdayPhoto src={photos.hero} alt={`${site.name} 대표`} priority sizes="55vw" />
        </div>
        <div>
          <p className="guide-kicker">{site.tag}</p>
          <h1 className="guide-h1">{guide.heroTitle}</h1>
          <p className="guide-lead">{guide.heroSub}</p>
          <ul className="guide-specs">
            {guide.specs.map((s) => {
              const Icon = SPEC_ICON[s.key];
              return (
                <li key={s.key} className="guide-spec">
                  <span className="guide-spec-icon" aria-hidden>
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="guide-spec-label">{s.label}</span>
                    <span className="guide-spec-value">{s.value}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="guide-warn-band">
        <div className="guide-wrap">
          <div className="guide-warn">
            <p className="guide-warn-kicker">
              <ShieldAlert size={18} strokeWidth={2} />
              {guide.warning.kicker}
            </p>
            <h2 className="guide-h2 guide-warn-title">{guide.warning.title}</h2>
            <p className="guide-warn-lead">{guide.warning.lead}</p>
            <ul className="guide-warn-grid">
              {guide.warning.items.map((item) => {
                const Icon = WARN_ICON[item.icon];
                return (
                  <li key={item.title} className="guide-warn-card">
                    <span className="guide-warn-icon" aria-hidden>
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </li>
                );
              })}
            </ul>
            <p className="guide-warn-closer">{guide.warning.closer}</p>
          </div>
        </div>
      </section>

      <section className="guide-wrap guide-ency">
        <div className="guide-ency-photo">
          <HugdayPhoto src={photos.essay} alt={`${site.name} 생활`} sizes="45vw" />
        </div>
        <div>
          <p className="guide-kicker">
            <BookOpen size={14} strokeWidth={2} />
            품종 백과
          </p>
          <h2 className="guide-h2">
            {site.name}을 처음 맞이한다면
          </h2>
          <p className="guide-origin">{enc.origin}</p>
          <div className="guide-prose">
            {enc.paragraphs.map((p) => (
              <p key={p.slice(0, 28)}>{p}</p>
            ))}
          </div>
          <p className="guide-beginner">{enc.beginner}</p>
        </div>
      </section>

      <div className="guide-wrap guide-facts">
        <article className="guide-fact">
          <h3>
            <HeartPulse size={18} strokeWidth={1.75} />
            주의할 유전·건강
          </h3>
          <dl>
            {enc.genetics.map((g) => (
              <div key={g.name}>
                <dt>{g.name}</dt>
                <dd>{g.detail}</dd>
              </div>
            ))}
          </dl>
        </article>
        <article className="guide-fact">
          <h3>
            <Leaf size={18} strokeWidth={1.75} />
            초보 보호자가 챙길 일상
          </h3>
          <dl>
            {enc.care.map((g) => (
              <div key={g.name}>
                <dt>{g.name}</dt>
                <dd>{g.detail}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>

      <section className="guide-cost-band">
        <div className="guide-wrap">
          <p className="guide-kicker">함께 살며 들어가는 비용</p>
          <h2 className="guide-h2">분양 비용의 이야기와 양육 준비</h2>
          {guide.costs.intro.map((p) => (
            <p key={p.slice(0, 20)} className="guide-lead-block">
              {p}
            </p>
          ))}
          <p className="guide-price-note">{guide.costs.priceNote}</p>

          <div className="guide-vax">
            <p className="guide-vax-kicker">
              <Syringe size={16} strokeWidth={2} />
              {guide.costs.vaccines.heading}
            </p>
            <p className="guide-vax-lead">{guide.costs.vaccines.lead}</p>
            <ol className="guide-vax-list">
              {guide.costs.vaccines.steps.map((step) => (
                <li key={`${step.stage}-${step.name}`}>
                  <span className="guide-vax-stage">{step.stage}</span>
                  <span>
                    <strong>{step.name}</strong>
                    <span>{step.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="guide-vax-extra">{guide.costs.vaccines.extra}</p>
          </div>

          <div className="guide-table-wrap">
            <table className="guide-table">
              <thead>
                <tr>
                  <th>준비 항목</th>
                  <th>참고 범위</th>
                  <th>이렇게 보시면 됩니다</th>
                </tr>
              </thead>
              <tbody>
                {guide.costs.rows.map((r) => (
                  <tr key={r.item}>
                    <td>{r.item}</td>
                    <td>{r.range}</td>
                    <td>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="guide-aftercare">{guide.costs.aftercare}</p>
        </div>
      </section>

      <section className="guide-wrap guide-check">
        <p className="guide-kicker">필수 체크리스트</p>
        <h2 className="guide-h2">성공하는 입양을 위해 확인할 것</h2>
        {guide.checklist.lead.map((p) => (
          <p key={p.slice(0, 20)} className="guide-lead-block">
            {p}
          </p>
        ))}
        <ul className="guide-check-list">
          {guide.checklist.items.map((item) => (
            <li key={item.title}>
              <CheckCircle2 className="guide-check-mark" size={20} strokeWidth={1.75} />
              <span>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="guide-promise">{guide.checklist.promise}</p>
      </section>

      {photos.grid.length ? (
        <section className="guide-wrap guide-photos" aria-label="사진">
          {photos.grid.map((src, i) => (
            <div key={src} className="guide-photos-cell">
              <HugdayPhoto src={src} alt={`${site.name} ${i + 1}`} sizes="25vw" />
            </div>
          ))}
        </section>
      ) : null}

      <section id="partners" className="guide-partners">
        <div className="guide-wrap">
          <p className="guide-partners-kicker">안심 제휴</p>
          <h2 className="guide-h2 guide-partners-title">이 품종 페이지 제휴처</h2>
          <p className="guide-partners-note">{partners.shareNote}</p>
          {partners.count ? (
            <p className="guide-partners-count">
              참여 {partners.count}곳 · {partners.shareLabel}
            </p>
          ) : null}

          {partners.featured.length ? (
            <div className="guide-partner-featured">
              {partners.featured.map((c) => (
                <article key={c.name}>
                  <p>추천 제휴처</p>
                  <h3>{c.name}</h3>
                  {c.notice ? <p className="guide-partner-notice">{c.notice}</p> : null}
                  <div className="guide-partner-actions">
                    {c.phone ? (
                      <a className="guide-btn-fill" href={phoneToTel(c.phone)}>
                        <Phone size={16} />
                        {c.phone}
                      </a>
                    ) : null}
                    {c.home ? (
                      <a className="guide-btn-line" href={c.home} target="_blank" rel="noopener noreferrer">
                        공식 안내
                        <ArrowUpRight size={16} />
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="guide-partners-empty">
              {waiting ? "입점대기중 · 제휴 문의는 관리자 페이지에서 이어집니다." : "현재 이 품종에 공개된 제휴처가 없습니다."}
            </p>
          )}

          {partners.others.length ? (
            <div className="guide-partner-others">
              <p>그 밖의 입점 안내</p>
              {partners.others.map((c) => (
                <article key={c.name}>
                  <h3>{c.name}</h3>
                  <div>
                    {c.phone ? <a href={phoneToTel(c.phone)}>{c.phone}</a> : null}
                    {c.home ? (
                      <a href={c.home} target="_blank" rel="noopener noreferrer">
                        홈페이지
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {yt ? (
        <section className="guide-wrap guide-video">
          <h2 className="guide-h2">{site.name} 안내 영상</h2>
          <div className="guide-video-frame">
            <iframe
              src={youtubeEmbedUrl(yt)}
              title={`${site.name} 영상`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      ) : null}

      <section className="guide-wrap guide-faq">
        <p className="guide-kicker">Q&A</p>
        <h2 className="guide-h2">자주 묻는 말</h2>
        <div className="guide-faq-list">
          {page.faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="guide-foot">
        <p>포옹데이</p>
        <p>
          {site.title}
          {waiting ? " · 입점대기중" : ""}
        </p>
      </footer>
    </div>
  );
}
