import Image from "next/image";
import { SITE } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const PROMISES = [
  {
    n: "01",
    title: "충분히 안아 주세요",
    desc: "급하게 결정을 재촉하지 않습니다. 아이와 마지막 포옹을 나눌 시간을 먼저 드립니다.",
  },
  {
    n: "02",
    title: "따뜻한 마루에서",
    desc: "한 생을 존중하는 장례 절차를 차분히 안내합니다. 보호자님의 호흡이 곧 일정입니다.",
  },
  {
    n: "03",
    title: "솔직한 상담",
    desc: "비용·절차·일정을 숨기지 않습니다. 카카오톡 오픈채팅으로 부드럽게 안내합니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative">
          <div className="absolute -bottom-4 -right-4 hidden h-28 w-28 rounded-full bg-[var(--coral-soft)] md:block" />
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_22px_50px_rgba(61,74,122,0.16)] md:aspect-[5/6]">
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
          <p className="section-kicker">OUR PROMISE</p>
          <h2 className="mt-3 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
            작별은 서두르지 않아도
            <br />
            됩니다
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 사랑하는 아이를 떠나보내는 보호자가 충분히 안아 주고
            인사할 수 있도록 돕습니다. 따뜻한 마루에서, 마지막 길을 함께합니다.
          </p>
          <div className="mt-8 space-y-4">
            {PROMISES.map((p) => (
              <div
                key={p.n}
                className="rounded-[1.4rem] bg-white px-5 py-4 shadow-[0_10px_28px_rgba(45,42,56,0.05)] ring-1 ring-[var(--line)]"
              >
                <p className="text-xs font-bold tracking-wide text-[var(--coral-deep)]">
                  마음 {p.n}
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
