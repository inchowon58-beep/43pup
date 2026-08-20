import Image from "next/image";
import { SITE } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const PROMISES = [
  {
    n: "01",
    title: "버니두들분양과 골든두들분양",
    desc: "버니즈·골든리트리버와 푸들의 만남. 성격·크기·모색을 상담에서 맞춰 드립니다.",
  },
  {
    n: "02",
    title: "버니두들성격과 키우기",
    desc: "사람을 좋아하는 듬직함, 그루밍과 산책 루틴까지 입양 전에 안내합니다.",
  },
  {
    n: "03",
    title: "사진은 먼저 열어 둡니다",
    desc: "분양 중인 아이 모습을 갤러리에서 먼저 보세요. 상담은 그다음입니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative">
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_22px_50px_rgba(14,26,36,0.16)] md:aspect-[5/6]">
            <Image
              src={imageUrl(3)}
              alt={`${SITE.name} 버니두들분양`}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div>
          <p className="section-kicker">DOODLE KOREA</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            가정 리듬에 맞는
            <br />
            버니두들을 안내합니다
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 버니두들분양을 중심으로, 외모만 보지 않습니다. 버니두들성격,
            버니두들크기, 생활 환경까지 맞춰 상담합니다. 골든두들분양도 함께 비교할 수 있습니다.
          </p>
          <div className="mt-8 space-y-4">
            {PROMISES.map((p) => (
              <div
                key={p.n}
                className="rounded-r-2xl border-l-4 border-[var(--coral)] bg-white px-5 py-4"
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
