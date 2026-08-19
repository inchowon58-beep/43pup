import Image from "next/image";
import { SITE } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const PROMISES = [
  {
    n: "01",
    title: "마지막 장을 존중합니다",
    desc: "급하게 엔딩을 닫지 않습니다. 아이와 인사할 시간을 먼저 둡니다.",
  },
  {
    n: "02",
    title: "절차는 분명하게",
    desc: "픽업·안치·화장·추모 순서를 숨기지 않고 안내합니다. 보호자님의 호흡이 일정입니다.",
  },
  {
    n: "03",
    title: "비용은 먼저 확인",
    desc: "포함·미포함 항목을 상담에서 먼저 설명합니다. 카카오톡 오픈채팅으로 연결됩니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative">
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_22px_50px_rgba(22,20,18,0.16)] md:aspect-[5/6]">
            <Image
              src={imageUrl(3)}
              alt={`${SITE.name} 추모 공간`}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div>
          <p className="section-kicker">THE ENDING</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            이야기의 마침표를
            <br />
            함께 찍습니다
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 사랑하는 아이와의 마지막 장을 준비하는 보호자를 돕습니다.
            서두르지 않고, 엔딩이 흐려지지 않게 곁에 있겠습니다.
          </p>
          <div className="mt-8 space-y-4">
            {PROMISES.map((p) => (
              <div
                key={p.n}
                className="border-l-2 border-[var(--sky)] bg-white px-5 py-4 shadow-[0_10px_28px_rgba(22,20,18,0.04)]"
              >
                <p className="text-xs font-bold tracking-[0.14em] text-[var(--sky)]">
                  SCENE {p.n}
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
