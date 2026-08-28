"use client";

import { useMemo, useState, type FormEvent } from "react";
import type { HugdayKind, HugdaySite } from "@/lib/hugday-sites";
import { hugdayCover } from "@/lib/hugday-images";
import HugdayPhoto from "./HugdayPhoto";

const INFO_CARDS = [
  {
    kicker: "시세 · 성향",
    title: "견종별 분양가 시세와 성향 가이드",
    body: "금액을 표기하지 않습니다. 포함 항목과 기질·관리량을 먼저 맞춰, 급하게 결정하지 않도록 안내합니다.",
  },
  {
    kicker: "허위 매물",
    title: "무료 분양의 함정과 필수 체크리스트",
    body: "무료·급처분 문구만 강조되면 건강 기록과 서류를 따로 확인하세요. 각 품종 페이지에 확인 항목을 적습니다.",
  },
  {
    kicker: "입양 전 교육",
    title: "건강한 반려동물 맞이하기",
    body: "첫 주 적응, 코트 관리, 집 동선. 사진 다음으로 생활이 맞는지부터 안내합니다.",
  },
  {
    kicker: "제휴 비교",
    title: "품종별 제휴처를 한눈에",
    body: "견종·묘종·보호소마다 사이트가 다릅니다. 입점된 연락처만 해당 페이지에 표시됩니다.",
  },
];

type Props = { sites: HugdaySite[] };

const KIND_LABEL: Record<HugdayKind, string> = {
  dog: "견종",
  cat: "묘종",
  shelter: "보호소",
};

export default function HugdayPortalHome({ sites }: Props) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<"all" | HugdayKind>("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return sites.filter((s) => {
      if (kind !== "all" && s.kind !== kind) return false;
      if (!needle) return true;
      const hay = `${s.name} ${s.keyword} ${s.title} ${s.tag} ${s.folder}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [sites, q, kind]);

  const dogs = filtered.filter((s) => s.kind === "dog");
  const cats = filtered.filter((s) => s.kind === "cat");
  const shelters = filtered.filter((s) => s.kind === "shelter");

  function onSearch(e: FormEvent) {
    e.preventDefault();
    document.getElementById("hub-sites")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="portal">
      <header className="portal-nav">
        <div className="portal-nav-inner">
          <div>
            <p className="portal-logo">포옹데이</p>
            <p className="portal-logo-sub">정직한 분양 정보 포털</p>
          </div>
          <nav className="portal-nav-links">
            <a href="#hub-info">가이드</a>
            <a href="#hub-sites">제휴처</a>
            <a href="#partnership">입점 안내</a>
          </nav>
        </div>
      </header>

      <section className="portal-hero">
        <p className="portal-kicker">POONG DAY · INFORMATION PORTAL</p>
        <h1>허위 매물 없는 투명한 반려동물 정보 플랫폼, 포옹데이</h1>
        <p className="portal-hero-sub">
          견종별 맞춤 가이드부터 엄선된 제휴 업체까지 한눈에 비교하세요.
        </p>
        <form className="portal-search" onSubmit={onSearch} role="search">
          <label className="sr-only" htmlFor="portal-q">
            견종·묘종 검색
          </label>
          <input
            id="portal-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="견종·묘종·보호소 이름을 입력하세요"
            autoComplete="off"
          />
          <button type="submit">검색</button>
        </form>
        <div className="portal-chips">
          {(
            [
              ["all", "전체"],
              ["dog", "견종"],
              ["cat", "묘종"],
              ["shelter", "보호소"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={kind === id ? "is-on" : ""}
              onClick={() => {
                setKind(id);
                document.getElementById("hub-sites")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="portal-section" id="hub-info">
        <div className="portal-wrap">
          <p className="portal-kicker">WHY POONG DAY</p>
          <h2>머물며 비교해야 하는 이유</h2>
          <div className="portal-info-grid">
            {INFO_CARDS.map((c) => (
              <article key={c.title} className="portal-info-card">
                <p>{c.kicker}</p>
                <h3>{c.title}</h3>
                <p className="portal-info-body">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="portal-section portal-section--hub" id="hub-sites">
        <div className="portal-wrap">
          <p className="portal-kicker">PARTNER HUB</p>
          <h2>품종별 제휴처 허브</h2>
          <p className="portal-lead">
            견종·묘종·보호소마다 사이트가 다릅니다. 입점 후 연락처가 해당 페이지에만 표시되며, 광고비는 1/n로
            나눠 안내합니다.
          </p>
          <a className="portal-cta" href="#hub-sites">
            우리 견종·묘종 제휴처 보러가기
          </a>
          <SiteBlock title="견종 사이트" kicker={KIND_LABEL.dog} sites={dogs} />
          <SiteBlock title="묘종 사이트" kicker={KIND_LABEL.cat} sites={cats} />
          <SiteBlock title="보호소 사이트" kicker={KIND_LABEL.shelter} sites={shelters} />
          {filtered.length === 0 ? (
            <p className="portal-empty">검색 결과가 없습니다. 견종·묘종 이름만 입력해 보세요.</p>
          ) : null}
        </div>
      </section>

      <section className="portal-section" id="partnership">
        <div className="portal-wrap">
          <div className="portal-partner">
            <p className="portal-kicker">FOR PARTNERS</p>
            <h2>광고비는 줄이고 효과는 높이는 1/n 파트너십에 합류하세요.</h2>
            <p>
              같은 품종 사이트에 입점한 업체 수만큼 비용을 나눕니다. 한 곳이 입점하면 전액, 두 곳이면 1/2, 세
              곳이면 1/3입니다. 허브가 아니라 해당 견종·묘종 페이지에만 연락처가 노출됩니다.
            </p>
            <ul className="portal-sim">
              <li>
                <strong>1곳</strong>
                <span>비용 1/1</span>
              </li>
              <li>
                <strong>2곳</strong>
                <span>비용 1/2</span>
              </li>
              <li>
                <strong>3곳</strong>
                <span>비용 1/3</span>
              </li>
            </ul>
            <a className="portal-cta portal-cta--light" href="/admin">
              입점 안내 및 비용 시뮬레이션 보기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function SiteBlock({
  title,
  kicker,
  sites,
}: {
  title: string;
  kicker: string;
  sites: HugdaySite[];
}) {
  if (!sites.length) return null;
  return (
    <div className="portal-block">
      <div className="portal-block-head">
        <h3>
          {title}
          <span>{sites.length}</span>
        </h3>
        <p>{kicker} 전용 사이트 · 1/n 정산 가이드</p>
      </div>
      <div className="portal-grid">
        {sites.map((s) => (
          <a key={s.slug} href={s.siteUrl} className="portal-card" aria-label={s.title}>
            <div className="portal-card-media">
              <HugdayPhoto src={hugdayCover(s.folder)} alt={s.title} sizes="33vw" />
            </div>
            <div className="portal-card-body">
              <span className="portal-badge">{KIND_LABEL[s.kind]}</span>
              <h4>{s.name}</h4>
              <p>{s.tag}</p>
              <span className="portal-card-meta">입점 시 1/n 정산 · 해당 페이지에만 연락처 표시</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
