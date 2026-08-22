import { MessageCircle, Scissors } from "lucide-react";
import { SITE, CTA_KAKAO, KEYWORD_INQUIRY } from "@/lib/site";
import ImageSlot from "./ImageSlot";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[92svh] overflow-hidden">
      <div className="absolute inset-0 hero-media">
        <ImageSlot index={1} fill label={`${SITE.name} 두피문신`} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,32,28,0.42)_0%,rgba(42,32,28,0.16)_38%,rgba(31,23,20,0.92)_100%)]" />
      </div>

      <div className="container relative flex min-h-[92svh] flex-col justify-end pb-28 pt-28 md:pb-24">
        <div className="animate-rise max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#e8cfc4]">
            {SITE.taglineEn}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-[3.2rem]">
            {SITE.name}
            <span className="mt-4 block text-[0.42em] font-medium leading-snug tracking-normal text-white/90">
              두피문신 시술 · SMP 교육
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
            {SITE.tagline}. 디자인 상담부터 시술, 아카데미 과정까지 한곳에서 안내합니다.
          </p>
          <p className="mt-4 max-w-xl text-xs leading-relaxed text-[#f6e4df] md:text-sm">
            {KEYWORD_INQUIRY}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#services" className="btn-primary">
              <Scissors size={18} />
              시술·교육 보기
            </a>
            <a
              href={SITE.kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <MessageCircle size={18} />
              {CTA_KAKAO}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
