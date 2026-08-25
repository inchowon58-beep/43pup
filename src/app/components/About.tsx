import { SITE } from "@/lib/site";
import ImageSlot from "./ImageSlot";

const PROMISES = [
  {
    n: "Q.",
    title: "우리 집에 맞을까?",
    desc: "대형묘라 바닥 면적·사료량·빗질이 다릅니다. 메인스테이는 생활 패턴을 듣고 아이와 집을 맞춰 봅니다.",
  },
  {
    n: "Q.",
    title: "성격은 어떻게 알아보지?",
    desc: "온순하다는 말만 반복하지 않습니다. 지금 만날 수 있는 아이의 기질을 구체적으로 풀어 드립니다.",
  },
  {
    n: "Q.",
    title: "사진은 어디서 보나?",
    desc: "분양 중인 모습은 갤러리에 모아 두었습니다. 얼굴이 남는 아이가 있으면 그때 상담하면 됩니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative">
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_22px_50px_rgba(30,36,51,0.16)] md:aspect-[5/6]">
            <ImageSlot index={6} fill label={`${SITE.name} 소개`} />
          </div>
        </div>
        <div>
          <p className="section-kicker">MAIN STAY</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            메인쿤분양,
            <br />
            집 기준으로 풀어 드립니다
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 외모 소개로 끝내지 않습니다. 메인쿤크기와 성격, 키우기 리듬까지 집 생활에
            대입해 안내합니다.
          </p>
          <div className="mt-8 space-y-4">
            {PROMISES.map((p) => (
              <div
                key={p.title}
                className="border-l-[4px] border-[var(--coral)] bg-white px-5 py-4"
              >
                <p className="text-xs font-bold tracking-[0.14em] text-[var(--coral-deep)]">
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
