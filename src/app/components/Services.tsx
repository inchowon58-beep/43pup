"use client";

import { MessageCircle } from "lucide-react";
import { CTA_KAKAO } from "@/lib/site";
import ImageSlot from "./ImageSlot";
import { useKakaoHref } from "./KakaoHrefProvider";

const SERVICES = [
  {
    title: "메인쿤 특징",
    desc: "터프트 귀, 목도리 털, 부드러운 발바닥. 개의 친근함과 고양이의 독립성을 함께 지닙니다",
    slot: 5,
    tag: "특징",
  },
  {
    title: "메인쿤 크기",
    desc: "수컷 6~12kg, 암컷 4~8kg 전후의 대형묘. 2~4년에 걸쳐 천천히 자랍니다",
    slot: 10,
    tag: "크기",
  },
  {
    title: "메인쿤 분양가",
    desc: "혈통·성별·털색·시기에 따라 달라집니다. 단가는 상담에서 포함 항목과 함께 안내합니다",
    slot: 16,
    tag: "분양가",
  },
  {
    title: "메인쿤 성격",
    desc: "사람을 잘 따르고 목소리가 낮고 깊습니다. 아이·다른 반려동물과도 지내는 편이 많습니다",
    slot: 22,
    tag: "성격",
  },
];

export default function Services() {
  const kakaoHref = useKakaoHref();
  return (
    <section id="services" className="section bg-white/55">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">MAINE COON</p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
              특징, 크기, 분양가, 성격
            </h2>
            <p className="mt-3 max-w-xl text-[var(--muted)]">
              메인쿤분양을 알아보실 때 꼭 보는 네 가지입니다. 쿤스토리 갤러리에서 아이 모습을
              먼저 확인해 보세요.
            </p>
          </div>
          {kakaoHref ? (
            <a
              href={kakaoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sky shrink-0 inline-flex items-center gap-2"
            >
              <MessageCircle size={18} />
              {CTA_KAKAO}
            </a>
          ) : null}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {SERVICES.map((item) => (
            <article key={item.title} className="group relative overflow-hidden rounded-[1.15rem]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <ImageSlot index={item.slot} fill label={item.title} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(26,46,36,0.9)_100%)]" />
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
