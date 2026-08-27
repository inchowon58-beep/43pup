import type { CSSProperties } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import type { HugdayPage } from "@/lib/hugday-content";
import type { HugdaySite } from "@/lib/hugday-sites";
import { kindKo, kindLabel } from "@/lib/hugday-sites";
import { hugdayPhotos } from "@/lib/hugday-images";
import type { SiteSponsor } from "@/lib/site-sponsor-shared";
import { phoneToTel, sponsorHomepageUrl, youtubeVideoId, youtubeEmbedUrl } from "@/lib/site-sponsor-shared";
import { sponsorYoutubeUrl } from "@/lib/site-sponsor-shared";
import HugdayPhoto from "./HugdayPhoto";

export default function HugdayLanding({
  page,
  site,
  sponsor,
}: {
  page: HugdayPage;
  site: HugdaySite;
  sponsor: SiteSponsor;
}) {
  const photos = hugdayPhotos(site);
  const waiting = sponsor.status === "RECRUITING";
  const phone = sponsor.phone_number.trim();
  const home = sponsorHomepageUrl(sponsor);
  const yt = youtubeVideoId(sponsorYoutubeUrl(sponsor, 1));

  return (
    <div
      className="hug-root"
      style={
        {
          "--hug-accent": site.accent,
          "--hug-soft": site.accentSoft,
        } as CSSProperties
      }
    >
      <header className="hug-nav">
        <div className="hug-nav-inner">
          <div>
            <p className="hug-wordmark">포옹데이</p>
            <p className="hug-nav-sub">{kindKo(site)}</p>
          </div>
          <p className="hug-nav-kind">{kindLabel(site)}</p>
        </div>
      </header>

      <section className="hug-hero">
        <div className="hug-hero-visual">
          <HugdayPhoto src={photos.hero} alt={`${page.h1} 대표`} priority sizes="60vw" />
          <span className="hug-hero-index">01 — {site.name}</span>
        </div>
        <div className="hug-hero-panel">
          <p className="hug-eyebrow">{site.tag}</p>
          <h1>{page.h1}</h1>
          <p className="hug-lead">{page.lead}</p>
          <ul className="hug-spec">
            <li>
              <span>체구</span>
              {site.size}
            </li>
            <li>
              <span>코트</span>
              {site.coat}
            </li>
            <li>
              <span>기질</span>
              {site.temperament}
            </li>
          </ul>
          <div className="hug-hero-cta">
            {waiting ? (
              <span className="hug-chip-wait">입점대기중</span>
            ) : (
              <>
                {phone ? (
                  <a className="hug-btn-solid" href={phoneToTel(phone)}>
                    <Phone size={16} />
                    {phone}
                  </a>
                ) : null}
                {home ? (
                  <a className="hug-btn-line" href={home} target="_blank" rel="noopener noreferrer">
                    공식 안내
                    <ArrowUpRight size={16} />
                  </a>
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="hug-ribbon" aria-label="사진 띠">
        {photos.ribbon.map((src, i) => (
          <div key={src} className="hug-ribbon-item">
            <HugdayPhoto src={src} alt={`${site.name} ${i + 2}`} sizes="240px" />
          </div>
        ))}
      </section>

      <section className="hug-essay">
        <div className="hug-essay-photo">
          <HugdayPhoto src={photos.essay} alt={`${site.name} 생활`} sizes="50vw" />
        </div>
        <div className="hug-essay-copy">
          <p className="hug-eyebrow">FIELD NOTE</p>
          <h2>
            {site.name}
            <br />
            한 장을 넘기며
          </h2>
          {page.essay.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="hug-notes">
        <p className="hug-eyebrow">CHECK</p>
        <h2>입양 전에 적는 네 줄</h2>
        <div className="hug-notes-grid">
          {page.notes.map((n, i) => (
            <article key={n.title} className="hug-note">
              <div className="hug-note-media">
                <HugdayPhoto src={photos.facts[i] || photos.hero} alt={n.title} sizes="40vw" />
              </div>
              <p className="hug-note-n">{String(i + 1).padStart(2, "0")}</p>
              <h3>{n.title}</h3>
              <p>{n.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="hug-flow">
        <p className="hug-eyebrow">SEQUENCE</p>
        <h2>진행 순서</h2>
        <ol className="hug-flow-list">
          {page.flow.map((s) => (
            <li key={s.n}>
              <span>{s.n}</span>
              <div>
                <strong>{s.title}</strong>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {yt ? (
        <section className="hug-video">
          <p className="hug-eyebrow">WATCH</p>
          <h2>{waiting ? "입점대기중 안내 영상" : `${site.name} 안내 영상`}</h2>
          <div className="hug-video-frame">
            <iframe
              src={youtubeEmbedUrl(yt)}
              title={`${site.name} 영상`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      ) : null}

      {photos.grid.length ? (
        <section className="hug-mosaic" aria-label="사진 노트">
          <p className="hug-eyebrow">FRAMES</p>
          <h2>{site.name} 사진 노트</h2>
          <div className="hug-mosaic-grid">
            {photos.grid.map((src, i) => (
              <div key={src} className="hug-mosaic-item">
                <HugdayPhoto src={src} alt={`${site.name} 프레임 ${i + 1}`} sizes="40vw" />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="hug-faq">
        <p className="hug-eyebrow">Q&A</p>
        <h2>자주 묻는 말</h2>
        <dl>
          {page.faqs.map((f) => (
            <div key={f.q} className="hug-faq-item">
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="hug-foot">
        <p className="hug-wordmark">포옹데이</p>
        <p className="hug-foot-en">POONG DAY · {kindLabel(site)}</p>
        <p>
          {site.title}
          {waiting ? " · 입점대기중" : phone ? ` · ${phone}` : ""}
        </p>
      </footer>
    </div>
  );
}
