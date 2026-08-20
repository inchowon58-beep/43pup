import Image from "next/image";
import { SITE } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const PROMISES = [
  {
    n: "01",
    title: "메인쿤분양과 대형묘 입양",
    desc: "넉넉한 체구와 온순한 성격. 집 공간·생활 패턴에 맞춰 상담해 드립니다.",
  },
  {
    n: "02",
    title: "메인쿤성격과 키우기",
    desc: "사람을 잘 따르는 대형묘입니다. 장모 빗질·식사 루틴까지 입양 전에 안내합니다.",
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
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_22px_50px_rgba(31,58,46,0.16)] md:aspect-[5/6]">
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
          <p className="section-kicker">KUNINE MAINE COON</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            첫 메인쿤을
            <br />
            집과 성격에 맞게 안내합니다
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 메인쿤분양을 외모만으로 소개하지 않습니다.
            희망 크기, 생활 환경, 함께 지낼 가족까지 맞춰 상담합니다.
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
