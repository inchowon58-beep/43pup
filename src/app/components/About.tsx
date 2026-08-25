import { SITE } from "@/lib/site";
import ImageSlot from "./ImageSlot";

const BEDS = [
  {
    n: "자리 1",
    title: "공간이 자랄 자리인가",
    desc: "메인쿤은 바닥을 길게 쓰는 대형묘입니다. 메인가드너는 복도와 볕이 드는 자리부터 맞춰 봅니다.",
  },
  {
    n: "자리 2",
    title: "기질이 자랄 자리인가",
    desc: "온순하다는 한 줄로 끝내지 않습니다. 지금 만날 아이가 사람 곁에서 어떻게 쉬는지를 풀어 드립니다.",
  },
  {
    n: "자리 3",
    title: "얼굴을 먼저 고르기",
    desc: "분양 중인 모습은 정원 갤러리에 모아 두었습니다. 남는 아이가 있으면 그때 상담하면 됩니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative">
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_22px_50px_rgba(61,90,69,0.16)] md:aspect-[5/6]">
            <ImageSlot index={3} fill label={`${SITE.name} 소개`} />
          </div>
        </div>
        <div>
          <p className="section-kicker">MAIN GARDNER</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            메인쿤분양,
            <br />
            키우는 자리를 가꿔 드립니다
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 외모만 보여 드리지 않습니다. 메인쿤크기와 성격, 키우기 하루를 집 안 동선에
            심어 안내합니다.
          </p>
          <div className="mt-8 space-y-4">
            {BEDS.map((p) => (
              <div
                key={p.title}
                className="rounded-[var(--radius)] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(61,90,69,0.06)]"
              >
                <p className="text-xs font-bold tracking-[0.12em] text-[var(--coral-deep)]">
                  {p.n}
                </p>
                <h3 className="mt-1 text-lg font-bold text-[var(--navy)]">{p.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
