import Image from "next/image";
import { SITE } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const PROMISES = [
  {
    n: "01",
    title: "집에 오면 마음이 풀립니다",
    desc: "사람을 좋아하는 골든두들은 소파 옆, 아이 옆에서 자연스럽게 가족이 됩니다.",
  },
  {
    n: "02",
    title: "곱슬 털이 주는 온기",
    desc: "골드엔드리트리버와 푸들의 만남. 빠지는 털이 적고, 만지면 포근합니다.",
  },
  {
    n: "03",
    title: "사진은 숨기지 않습니다",
    desc: "분양 중인 아이 모습을 갤러리에서 먼저 보세요. 상담은 그다음입니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative">
          <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_22px_50px_rgba(224,122,61,0.18)] md:aspect-[5/6]">
            <Image
              src={imageUrl(3)}
              alt={`${SITE.name} 골든두들`}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div>
          <p className="section-kicker">WHY DOODLIAN</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            여기서 입양하면
            <br />
            좋겠다, 그 느낌
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 골든두들을 숫자로만 소개하지 않습니다. 집에 데려왔을 때의
            온기, 산책, 아이와의 눈맞춤이 먼저 보이게 사진을 열어 둡니다.
          </p>
          <div className="mt-8 space-y-4">
            {PROMISES.map((p) => (
              <div
                key={p.n}
                className="rounded-[1.2rem] border border-[var(--line)] bg-white px-5 py-4 shadow-[0_10px_28px_rgba(47,38,28,0.04)]"
              >
                <p className="text-xs font-bold tracking-[0.14em] text-[var(--coral)]">
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
