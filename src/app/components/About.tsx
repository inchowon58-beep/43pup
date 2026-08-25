import { SITE } from "@/lib/site";
import ImageSlot from "./ImageSlot";

const ROOMS = [
  {
    n: "01",
    title: "거실에 맞을까",
    desc: "메인쿤은 바닥을 길게 쓰는 대형묘입니다. 쿤하우스는 복도·소파·사료량부터 맞춰 봅니다.",
  },
  {
    n: "02",
    title: "기질을 열어 보기",
    desc: "온순하다는 한 줄로 끝내지 않습니다. 지금 만날 아이가 사람 곁에 어떻게 있는지를 풀어 드립니다.",
  },
  {
    n: "03",
    title: "사진첩에서 고르기",
    desc: "분양 중인 얼굴은 갤러리에 모아 두었습니다. 남는 아이가 있으면 그때 문을 두드리면 됩니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative">
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_22px_50px_rgba(74,44,50,0.16)] md:aspect-[5/6]">
            <ImageSlot index={8} fill label={`${SITE.name} 소개`} />
          </div>
        </div>
        <div>
          <p className="section-kicker">COON HOUSE</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            메인쿤분양,
            <br />
            한집의 리듬으로 안내합니다
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 외모만 보여 드리지 않습니다. 메인쿤크기와 성격, 키우기 하루를 실제 집
            동선에 얹어 설명합니다.
          </p>
          <div className="mt-8 space-y-4">
            {ROOMS.map((p) => (
              <div
                key={p.title}
                className="flex gap-4 rounded-[var(--radius)] border border-[var(--line)] bg-white px-5 py-4"
              >
                <p className="mt-0.5 text-sm font-bold tracking-[0.08em] text-[var(--coral-deep)]">
                  {p.n}
                </p>
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
