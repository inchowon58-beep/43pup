import type { CSSProperties } from "react";
import { ArrowUpRight, Phone, ShieldAlert, CheckCircle2 } from "lucide-react";
import type { HugdayPage } from "@/lib/hugday-content";
import type { HugdaySite } from "@/lib/hugday-sites";
import { hugdayPhotos } from "@/lib/hugday-images";
import type { SiteSponsor } from "@/lib/site-sponsor-shared";
import { phoneToTel, youtubeVideoId, youtubeEmbedUrl, sponsorYoutubeUrl } from "@/lib/site-sponsor-shared";
import { buildHugdayGuide } from "@/lib/hugday-guide";
import HugdayPhoto from "./HugdayPhoto";

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
      className="guide-root bg-[#f4f1ea] text-[#152033]"
      style={
        {
          "--hug-accent": site.accent,
          "--hug-soft": site.accentSoft,
        } as CSSProperties
      }
    >
      <header className="border-b border-[#16325c]/12 bg-white">
        <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] items-end justify-between py-4">
          <div>
            <p className="text-lg font-extrabold tracking-tight text-[#16325c]">포옹데이</p>
            <p className="mt-0.5 text-[0.7rem] tracking-[0.14em] text-[#5b6778]">{guide.kindLabel}</p>
          </div>
          <a href="#partners" className="text-sm font-bold text-[#2b6cb0]">
            제휴처 보기
          </a>
        </div>
      </header>

      <section className="mx-auto grid w-[min(1120px,calc(100%-2rem))] gap-8 py-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div className="relative min-h-[280px] overflow-hidden rounded-2xl bg-[#10203a] md:min-h-[420px]">
          <HugdayPhoto src={photos.hero} alt={`${site.name} 대표`} priority sizes="55vw" />
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-[#2b6cb0]">{site.tag}</p>
          <h1 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] font-extrabold leading-tight tracking-tight text-[#16325c]">
            {guide.heroTitle}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#3a4454]">{guide.heroSub}</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {guide.specs.map((s) => (
              <li key={s.label} className="rounded-xl border border-[#16325c]/10 bg-white px-4 py-3">
                <span className="block text-[0.7rem] font-bold tracking-wide text-[#2b6cb0]">{s.label}</span>
                <span className="mt-1 block text-sm leading-relaxed">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-amber-50 py-12">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
          <div className="rounded-2xl border-l-4 border-amber-500 bg-white p-6 shadow-[0_8px_24px_rgba(22,50,92,0.06)] md:p-8">
            <p className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-amber-800">
              <ShieldAlert size={16} />
              핵심 경고
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#16325c]">{guide.warning.title}</h2>
            <p className="mt-3 leading-relaxed text-[#3a4454]">{guide.warning.lead}</p>
            <ul className="mt-5 grid gap-3">
              {guide.warning.bullets.map((b) => (
                <li key={b.slice(0, 24)} className="rounded-xl bg-amber-50/80 px-4 py-3 text-sm leading-relaxed text-[#3a322c]">
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-amber-200 pt-4 text-sm font-semibold leading-relaxed text-amber-950">
              {guide.warning.closer}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid w-[min(1120px,calc(100%-2rem))] gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[240px] overflow-hidden rounded-2xl bg-[#e8e0d4]">
            <HugdayPhoto src={photos.essay} alt={`${site.name} 생활`} sizes="45vw" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#2b6cb0]">품종 백과</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#16325c]">
              {site.name} 상세 안내
            </h2>
            <p className="mt-2 text-sm text-[#5b6778]">{enc.origin}</p>
            <div className="mt-4 space-y-4">
              {enc.paragraphs.map((p) => (
                <p key={p.slice(0, 28)} className="leading-relaxed text-[#3a4454]">
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-6 rounded-xl border border-[#16325c]/10 bg-white px-4 py-3 text-sm leading-relaxed">
              {enc.beginner}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 grid w-[min(1120px,calc(100%-2rem))] gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-[#16325c]/10 bg-white p-6">
            <h3 className="text-lg font-extrabold text-[#16325c]">주의할 유전·건강</h3>
            <dl className="mt-4 space-y-4">
              {enc.genetics.map((g) => (
                <div key={g.name}>
                  <dt className="text-sm font-bold text-[#2b6cb0]">{g.name}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[#3a4454]">{g.detail}</dd>
                </div>
              ))}
            </dl>
          </article>
          <article className="rounded-2xl border border-[#16325c]/10 bg-white p-6">
            <h3 className="text-lg font-extrabold text-[#16325c]">초보 보호자 관리 팁</h3>
            <dl className="mt-4 space-y-4">
              {enc.care.map((g) => (
                <div key={g.name}>
                  <dt className="text-sm font-bold text-[#2b6cb0]">{g.name}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[#3a4454]">{g.detail}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
          <p className="text-xs font-bold tracking-[0.16em] text-[#2b6cb0]">비용 안내</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#16325c]">분양가의 진실과 양육 비용</h2>
          {guide.costs.intro.map((p) => (
            <p key={p.slice(0, 20)} className="mt-3 leading-relaxed text-[#3a4454]">
              {p}
            </p>
          ))}
          <div className="mt-6 overflow-x-auto rounded-2xl border border-[#16325c]/10">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-[#16325c] text-white">
                <tr>
                  <th className="px-4 py-3 font-bold">항목</th>
                  <th className="px-4 py-3 font-bold">대략 범위</th>
                  <th className="px-4 py-3 font-bold">메모</th>
                </tr>
              </thead>
              <tbody>
                {guide.costs.rows.map((r) => (
                  <tr key={r.item} className="border-t border-[#16325c]/10 even:bg-[#f7f4ec]">
                    <td className="px-4 py-3 font-semibold">{r.item}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{r.range}</td>
                    <td className="px-4 py-3 leading-relaxed text-[#5b6778]">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 rounded-xl border-l-4 border-red-400 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-950">
            {guide.costs.aftercare}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
          <p className="text-xs font-bold tracking-[0.16em] text-[#2b6cb0]">체크리스트</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#16325c]">성공적인 입양을 위한 확인</h2>
          {guide.checklist.tenure.map((p) => (
            <p key={p.slice(0, 20)} className="mt-3 leading-relaxed text-[#3a4454]">
              {p}
            </p>
          ))}
          <ul className="mt-6 grid gap-3">
            {guide.checklist.items.map((item) => (
              <li key={item.slice(0, 32)} className="flex gap-3 rounded-xl border border-[#16325c]/10 bg-white px-4 py-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#2b6cb0]" size={18} />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-semibold leading-relaxed text-[#16325c]">{guide.checklist.promise}</p>
        </div>
      </section>

      {photos.grid.length ? (
        <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-8" aria-label="사진">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {photos.grid.map((src, i) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <HugdayPhoto src={src} alt={`${site.name} ${i + 1}`} sizes="25vw" />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section id="partners" className="bg-[#16325c] py-12 text-white">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
          <p className="text-xs font-bold tracking-[0.16em] text-[#8bb4e8]">안심 제휴</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight">이 품종 페이지 제휴처</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-white/80">{partners.shareNote}</p>
          <p className="mt-2 text-sm text-white/60">
            참여 {partners.count}곳 · 비용 구조 {partners.shareLabel}
          </p>

          {partners.featured.length ? (
            <div className="mt-8 grid gap-4">
              {partners.featured.map((c) => (
                <article key={c.name} className="rounded-2xl border border-white/20 bg-white p-6 text-[#152033]">
                  <p className="text-xs font-bold tracking-[0.14em] text-[#2b6cb0]">추천 제휴처</p>
                  <h3 className="mt-1 text-xl font-extrabold">{c.name}</h3>
                  {c.notice ? <p className="mt-2 text-sm leading-relaxed text-[#5b6778]">{c.notice}</p> : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.phone ? (
                      <a className="inline-flex items-center gap-2 rounded-lg bg-[#16325c] px-4 py-2.5 text-sm font-bold text-white" href={phoneToTel(c.phone)}>
                        <Phone size={16} />
                        {c.phone}
                      </a>
                    ) : null}
                    {c.home ? (
                      <a
                        className="inline-flex items-center gap-2 rounded-lg border border-[#16325c] px-4 py-2.5 text-sm font-bold"
                        href={c.home}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        공식 안내
                        <ArrowUpRight size={16} />
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-2xl border border-white/20 bg-white/5 px-5 py-4 text-sm leading-relaxed text-white/85">
              {waiting ? "입점대기중 · 제휴 문의는 관리자 페이지에서 이어집니다." : "현재 이 품종에 공개된 제휴처가 없습니다."}
            </p>
          )}

          {partners.others.length ? (
            <div className="mt-6 grid gap-3">
              <p className="text-sm font-bold text-white/70">기타 입점 업체</p>
              {partners.others.map((c) => (
                <article key={c.name} className="rounded-xl border border-white/15 bg-white/5 px-5 py-4">
                  <h3 className="font-extrabold">{c.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.phone ? (
                      <a className="text-sm font-bold underline" href={phoneToTel(c.phone)}>
                        {c.phone}
                      </a>
                    ) : null}
                    {c.home ? (
                      <a className="text-sm font-bold underline" href={c.home} target="_blank" rel="noopener noreferrer">
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
        <section className="py-12">
          <div className="mx-auto w-[min(800px,calc(100%-2rem))]">
            <h2 className="text-xl font-extrabold text-[#16325c]">{site.name} 안내 영상</h2>
            <div className="relative mt-4 aspect-video overflow-hidden rounded-2xl bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={youtubeEmbedUrl(yt)}
                title={`${site.name} 영상`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-12">
        <div className="mx-auto w-[min(800px,calc(100%-2rem))]">
          <p className="text-xs font-bold tracking-[0.16em] text-[#2b6cb0]">Q&A</p>
          <h2 className="mt-2 text-2xl font-extrabold text-[#16325c]">자주 묻는 말</h2>
          <div className="mt-6 space-y-2">
            {page.faqs.map((f) => (
              <details key={f.q} className="rounded-xl border border-[#16325c]/10 bg-white px-4 py-3">
                <summary className="cursor-pointer list-none font-bold text-[#16325c]">{f.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-[#3a4454]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#16325c]/10 py-10 text-center">
        <p className="font-extrabold text-[#16325c]">포옹데이</p>
        <p className="mt-1 text-sm text-[#5b6778]">
          {site.title}
          {waiting ? " · 입점대기중" : ""}
        </p>
      </footer>
    </div>
  );
}
