import { SITE } from "@/lib/site";
import ImageSlot from "./ImageSlot";

const PROMISES = [
  {
    n: "01",
    title: "시술과 교육을 함께",
    desc: "필릭스스칼프는 두피문신 시술과 아카데미 교육을 함께 운영합니다. 현장 기준으로 디자인과 위생을 안내합니다.",
  },
  {
    n: "02",
    title: "디자인 상담을 먼저",
    desc: "밀도·헤어라인·기존 모발 상태를 보고 시술 범위를 정합니다. 급하게 결정하지 않아도 됩니다.",
  },
  {
    n: "03",
    title: "위생·인증을 기준으로",
    desc: "보건·위생 교육과 SMP 기술 인증을 이수한 원장이 본점·아카데미를 운영합니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative">
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_22px_50px_rgba(42,32,28,0.16)] md:aspect-[5/6]">
            <ImageSlot index={8} fill label={`${SITE.name} 소개`} />
          </div>
        </div>
        <div>
          <p className="section-kicker">STUDIO · ACADEMY</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            두피문신,
            <br />
            시술과 교육
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 두피문신(SMP) 전문 스튜디오이자 아카데미입니다. 본점 시술과
            교육 과정을 함께 안내합니다.
          </p>
          <div className="mt-8 space-y-4">
            {PROMISES.map((p) => (
              <div
                key={p.n}
                className="border-l-[5px] border-[var(--coral)] bg-white px-5 py-4"
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
