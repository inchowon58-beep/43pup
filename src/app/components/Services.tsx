import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const SERVICES = [
  {
    title: "온순한 대형묘",
    desc: "사람을 따르는 메인쿤, 아이·가족과 지내기 좋은 성격",
    image: imageUrl(5),
    tag: "성격",
  },
  {
    title: "링스 팁 장모",
    desc: "귀 끝 털과 풍성한 코트. 빗질 주기를 지키면 더 고와집니다",
    image: imageUrl(10),
    tag: "외모",
  },
  {
    title: "분양 상담",
    desc: "성별·코트·성격을 알려 주시면 지금 만날 수 있는 아이를 안내",
    image: imageUrl(13),
    tag: "상담",
  },
  {
    title: "입양 준비",
    desc: "첫 식사, 모래, 브러시까지 집으로 오기 전 체크리스트",
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
            <p className="section-kicker">FAMILY MAINE COON</p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
              메인쿤분양, 집을 고르는 이유
            </h2>
            <p className="mt-3 max-w-xl text-[var(--muted)]">
              대형묘 크기와 메인쿤성격·키우기까지 비교해 보실 수 있습니다.
              사진을 보다 보면 맞는 아이가 먼저 보입니다.
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
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(31,58,46,0.82)_100%)]" />
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
