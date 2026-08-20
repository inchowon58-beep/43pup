import Image from "next/image";
import { SITE } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const PROMISES = [
  {
    n: "01",
    title: "한국애견연맹 위원장 운영",
    desc: "연맹 위원장이 운영하는 분양처입니다. 혈통과 관리 기준을 먼저 맞춰 안내합니다.",
  },
  {
    n: "02",
    title: "고양이심사위원 상담",
    desc: "코트·체형·성격을 심사 시선으로 설명합니다. 첫 대형묘라도 기준이 분명합니다.",
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
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_22px_50px_rgba(21,34,56,0.16)] md:aspect-[5/6]">
            <Image
              src={imageUrl(3)}
              alt={`${SITE.name} 메인쿤분양`}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div>
          <p className="section-kicker">KEUNNYANGI · JUDGE COUNSEL</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            심사 기준으로
            <br />
            메인쿤을 안내합니다
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 한국애견연맹 위원장이 운영하고, 고양이심사위원이 관리·상담합니다.
            외모만이 아니라 체형·코트·성격을 맞춰 안내합니다.
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
