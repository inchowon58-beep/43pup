import { SITE } from "@/lib/site";
import ImageSlot from "./ImageSlot";

const PROMISES = [
  {
    n: "01",
    title: "메인쿤분양, 가정에 맞게",
    desc: "쿤스토리는 메인쿤 특징·크기·성격을 먼저 맞춰 드립니다. 사진만 보고 고르지 않아도 됩니다.",
  },
  {
    n: "02",
    title: "크기와 키우기까지",
    desc: "대형묘라 공간·빗질·사료량이 다릅니다. 입양 전에 생활 패턴을 듣고 안내합니다.",
  },
  {
    n: "03",
    title: "사진은 갤러리에",
    desc: "분양 중인 아이 모습을 먼저 보세요. 상담은 그다음입니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative">
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_22px_50px_rgba(26,46,36,0.16)] md:aspect-[5/6]">
            <ImageSlot index={2} fill label={`${SITE.name} 소개`} />
          </div>
        </div>
        <div>
          <p className="section-kicker">COON STORY</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            메인쿤분양,
            <br />
            쿤스토리가 안내합니다
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 메인쿤분양을 외모만으로 소개하지 않습니다. 메인쿤크기, 메인쿤성격,
            키우기까지 맞춰 상담합니다.
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
