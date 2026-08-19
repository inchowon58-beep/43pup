import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const SERVICES = [
  {
    title: "24시 픽업",
    desc: "인사할 시간을 드린 뒤, 야간·새벽에도 모시는 길을 안내합니다",
    image: imageUrl(5),
    tag: "픽업",
  },
  {
    title: "장례식 진행",
    desc: "존중받는 장례 절차와 추모 시간 안내",
    image: imageUrl(10),
    tag: "장례",
  },
  {
    title: "화장·유골 수습",
    desc: "화장 후 유골함 전달까지 투명하게 안내",
    image: imageUrl(13),
    tag: "화장",
  },
  {
    title: "추모·기념품",
    desc: "추모 공간, 기념품 옵션 상담",
    image: imageUrl(16),
    tag: "추모",
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-white/50">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">SERVICES</p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
              장례·화장·추모 서비스
            </h2>
            <p className="mt-3 max-w-xl text-[var(--muted)]">
              엔딩을 준비하는 장례·화장·추모까지, 전국 어디서나 상담 가능합니다.
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
            <article key={item.title} className="group relative overflow-hidden rounded-[0.4rem]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.title} — ${SITE.name}`}
                  fill
                  unoptimized
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(42,36,31,0.82)_100%)]" />
                <span className="absolute left-2 top-2 rounded-[0.3rem] bg-[var(--navy)] px-2 py-0.5 text-[0.65rem] font-bold tracking-wide text-[#c4a35a] sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
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
