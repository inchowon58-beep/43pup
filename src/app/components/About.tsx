import Image from "next/image";
import { SITE } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const PROMISES = [
  {
    n: "01",
    title: "한 업체를 팔지 않습니다",
    desc: "특정 국제결혼업체를 전면에 내세우지 않습니다. 비교할 수 있는 확인 항목과 주의 신호를 먼저 안내합니다.",
  },
  {
    n: "02",
    title: "피해야 할 곳의 공통점",
    desc: "과도한 선금, 계약서 없는 진행, ‘오늘만 할인’, 통역·체류 절차를 얼버무리는 곳은 한 번 더 걸러 보세요.",
  },
  {
    n: "03",
    title: "믿을 수 있는 업체 정보",
    desc: "등록·상담 방식·비용 구성이 설명되는 곳인지가 핵심입니다. 협회는 그 기준을 정리해 드립니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative">
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_22px_50px_rgba(13,74,86,0.16)] md:aspect-[5/6]">
            <Image
              src={imageUrl(3)}
              alt={`${SITE.name} 국제결혼정보`}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div>
          <p className="section-kicker">ASSOCIATION · TRUST GUIDE</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            국제결혼,
            <br />
            먼저 확인할 것들
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 국제결혼 예비고객이 실제 부딪히는 문제를 정리하는 정보
            사이트입니다. 비용을 숨기거나 급하게 결정하도록 몰아가는 곳은 피하고, 설명이
            분명한 업체 정보를 기준으로 상담합니다.
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
