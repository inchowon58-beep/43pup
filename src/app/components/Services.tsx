import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const SERVICES = [
  {
    title: "피해야 할 업체",
    desc: "선금만 요구하고 계약·환불이 불분명한 곳. 상대 신원 확인을 미루는 곳",
    image: imageUrl(5),
    tag: "주의",
  },
  {
    title: "믿을 곳의 기준",
    desc: "상담 기록이 남고, 비용 항목이 나뉘며, 통역·체류 절차를 단계별로 설명하는 곳",
    image: imageUrl(2),
    tag: "기준",
  },
  {
    title: "예비고객이 묻는 것",
    desc: "만남 횟수, 중개자 없이 대화할 시간, 위약금, 사후 지원 범위를 미리 적어 두세요",
    image: imageUrl(7),
    tag: "질문",
  },
  {
    title: "정보 상담",
    desc: "지역·희망 국가만 알려 주시면 확인해야 할 항목을 정리해 드립니다",
    image: imageUrl(9),
    tag: "안내",
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-white/55">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">WHAT TO CHECK</p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
              어떤 곳을 믿고, 어떤 곳을 피할까요
            </h2>
            <p className="mt-3 max-w-xl text-[var(--muted)]">
              국제결혼은 만남 전에 이미 갈림길이 있습니다. 광고 문구보다 계약·신원·절차가
              설명되는지를 먼저 보세요. 협회는 그 확인 목록을 제공합니다.
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
            <article key={item.title} className="group relative overflow-hidden rounded-[0.9rem]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.title} — ${SITE.name}`}
                  fill
                  unoptimized
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(26,39,68,0.9)_100%)]" />
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
