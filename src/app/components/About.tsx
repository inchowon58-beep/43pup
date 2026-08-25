import { SITE } from "@/lib/site";
import ImageSlot from "./ImageSlot";

const SPECS = [
  {
    n: "A",
    title: "공간 스펙",
    desc: "대형묘라 바닥 동선이 먼저입니다. 더제이쿤은 복도 폭·소파 높이·사료량부터 맞춰 봅니다.",
  },
  {
    n: "B",
    title: "기질 스펙",
    desc: "온순하다는 한 줄로 끝내지 않습니다. 지금 만날 아이의 사람 곁 패턴을 항목으로 풀어 드립니다.",
  },
  {
    n: "C",
    title: "라인업",
    desc: "분양 중인 얼굴은 갤러리에 모아 두었습니다. 남는 아이가 있으면 그때 스펙 상담을 열면 됩니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative">
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_22px_50px_rgba(27,40,56,0.16)] md:aspect-[5/6]">
            <ImageSlot index={14} fill label={`${SITE.name} 소개`} />
          </div>
        </div>
        <div>
          <p className="section-kicker">THE J LINE</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            메인쿤분양,
            <br />
            스펙부터 맞춰 드립니다
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 외모만 나열하지 않습니다. 메인쿤크기와 성격, 키우기 루틴을 표처럼 정리해
            안내합니다.
          </p>
          <div className="mt-8 space-y-3">
            {SPECS.map((p) => (
              <div
                key={p.title}
                className="grid grid-cols-[2.2rem_1fr] gap-3 border border-[var(--line)] bg-white px-4 py-4"
              >
                <p className="text-sm font-extrabold text-[var(--coral-deep)]">{p.n}</p>
                <div>
                  <h3 className="text-lg font-bold text-[var(--navy)]">{p.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
