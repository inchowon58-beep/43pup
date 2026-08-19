import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const SERVICES = [
  {
    title: "가족형 성격",
    desc: "사람을 따르는 골든두들, 아이·노인과 지내기 좋은 온순함",
    image: imageUrl(5),
    tag: "성격",
  },
  {
    title: "곱슬 코트",
    desc: "빠지는 털이 비교적 적고, 만지면 부드러운 푸들 믹스 털",
    image: imageUrl(10),
    tag: "외모",
  },
  {
    title: "분양 상담",
    desc: "크기·색·성별을 알려 주시면 지금 만날 수 있는 아이를 안내",
    image: imageUrl(13),
    tag: "상담",
  },
  {
    title: "입양 준비",
    desc: "첫 산책, 사료, 미용 주기까지 집으로 오기 전 체크리스트",
    image: imageUrl(16),
    tag: "입양",
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-white/55">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">GOLDEN DOODLE</p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
              골든두들이 우리 집에 맞는 이유
            </h2>
            <p className="mt-3 max-w-xl text-[var(--muted)]">
              똑똑하고 사람을 좋아하는 중형견. 사진을 보다 보면 ‘이 아이면 좋겠다’는
              마음이 먼저 옵니다.
            </p>
          </div>
          <a
            href={SITE.kakaoOpenChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sky shrink-0 inline-flex items-center gap-2"
          >
            <MessageCircle size={18} />
            {CTA_KAKAO}
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {SERVICES.map((item) => (
            <article key={item.title} className="group relative overflow-hidden rounded-[1.4rem]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.title} — ${SITE.name}`}
                  fill
                  unoptimized
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(47,38,28,0.78)_100%)]" />
                <span className="absolute left-2 top-2 rounded-full bg-white/92 px-2 py-0.5 text-[0.65rem] font-bold text-[var(--coral-deep)] sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
                  {item.tag}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <h3 className="text-base font-bold text-white sm:text-lg">{item.title}</h3>
                  <p className="mt-1 text-xs text-white/80 sm:text-sm">{item.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
