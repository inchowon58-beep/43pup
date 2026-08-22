import { MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import ImageSlot from "./ImageSlot";

const SERVICES = [
  {
    title: "두피문신 시술",
    desc: "헤어라인·정수리·밀도 보완 등 두피 상태에 맞춰 SMP를 진행합니다",
    slot: 5,
    tag: "시술",
  },
  {
    title: "디자인 상담",
    desc: "얼굴형과 기존 모발을 보고 선을 정한 뒤 시술 범위와 일정을 안내합니다",
    slot: 9,
    tag: "상담",
  },
  {
    title: "두피문신 교육",
    desc: "아카데미에서 SMP 기술·디자인·위생을 교육합니다. 본점·평택점 과정을 안내합니다",
    slot: 10,
    tag: "교육",
  },
  {
    title: "사후관리",
    desc: "시술 후 관리 방법과 재방문 일정을 정리해 드립니다",
    slot: 11,
    tag: "관리",
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-white/55">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">SMP · EDUCATION</p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
              시술과 교육을 함께 안내합니다
            </h2>
            <p className="mt-3 max-w-xl text-[var(--muted)]">
              두피문신 시술, 디자인 상담, 아카데미 교육. 확인하고 싶은 항목을 말씀해 주시면
              일정을 안내합니다.
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
            <article key={item.title} className="group relative overflow-hidden rounded-[0.45rem]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <ImageSlot index={item.slot} fill label={item.title} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(42,32,28,0.9)_100%)]" />
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
