import Image from "next/image";
import { SITE } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const PROMISES = [
  {
    n: "01",
    title: "24시 긴급 대응",
    desc: "갑작스러운 이별 앞에서도 혼자 두지 않습니다. 아이 몸 두기부터 픽업까지, 지금 할 일을 안내합니다.",
  },
  {
    n: "02",
    title: "존중받는 장례",
    desc: "반려견 한 생을 존중하는 장례 절차를 투명하게 안내합니다. 보호자님의 마음을 최우선으로 합니다.",
  },
  {
    n: "03",
    title: "투명한 상담",
    desc: "비용·절차·일정을 숨기지 않습니다. 카카오톡 오픈채팅으로 솔직하고 차분한 안내를 드립니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative">
          <div className="absolute -left-3 -top-3 hidden h-24 w-24 border-l-2 border-t-2 border-[var(--coral)] md:block" />
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_18px_44px_rgba(42,36,31,0.14)] md:aspect-[5/6]">
            <Image
              src={imageUrl(8)}
              alt={`${SITE.name} 추모 공간`}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div>
          <p className="section-kicker">OUR PROMISE</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            마지막까지,
            <br />
            곁에 있겠습니다
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 강아지가 갑자기 세상을 떠났을 때, 보호자가 지금 바로 할 일을
            안내합니다. 슬픔을 재촉하지 않고, 존중받는 마지막 배웅이 되도록 곁에 있겠습니다.
          </p>
          <div className="mt-8 space-y-4">
            {PROMISES.map((p) => (
              <div
                key={p.n}
                className="border-l-[3px] border-[var(--coral)] bg-[#fffcf7] py-4 pl-5 pr-4"
              >
                <p className="text-xs font-bold tracking-wide text-[var(--coral)]">
                  약속 {p.n}
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
