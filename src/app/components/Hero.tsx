"use client";

import { Camera, MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO, KEYWORD_INQUIRY } from "@/lib/site";
import ImageSlot from "./ImageSlot";
import { useKakaoHref } from "./KakaoHrefProvider";

export default function Hero() {
  const kakaoHref = useKakaoHref();
  return (
    <section id="top" className="relative min-h-[92svh] overflow-hidden">
      <div className="absolute inset-0 hero-media">
        <ImageSlot index={18} fill priority label={`${SITE.name} 메인쿤분양`} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,48,86,0.5)_0%,rgba(36,48,86,0.08)_40%,rgba(18,22,36,0.92)_100%)]" />
      </div>

      <div className="container relative flex min-h-[92svh] flex-col justify-end pb-28 pt-28 md:pb-24">
        <div className="animate-rise max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#f4ead0]">
            {SITE.taglineEn}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-[3.2rem]">
            {SITE.name}
            <span className="mt-4 block text-[0.42em] font-medium leading-snug tracking-normal text-white/90">
              진열된 얼굴의 크기 · 기질 · 분양가
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
            {SITE.tagline} 갤러리에서 얼굴을 고르신 뒤,{" "}
            {kakaoHref ? "카카오톡으로 이어 주세요." : "맞을 것 같으면 상담으로 이어 주세요."}
          </p>
          <p className="mt-4 max-w-xl text-xs leading-relaxed text-[#f4ead0] md:text-sm">
            {KEYWORD_INQUIRY}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#gallery" className="btn-primary">
              <Camera size={18} />
              진열 사진 보기
            </a>
            {kakaoHref ? (
              <a
                href={kakaoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <MessageCircle size={18} />
                {CTA_KAKAO}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
