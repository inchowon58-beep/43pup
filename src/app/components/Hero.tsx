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
        <ImageSlot index={8} fill priority label={`${SITE.name} 메인쿤분양`} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,46,36,0.42)_0%,rgba(26,46,36,0.14)_38%,rgba(18,32,26,0.9)_100%)]" />
      </div>

      <div className="container relative flex min-h-[92svh] flex-col justify-end pb-28 pt-28 md:pb-24">
        <div className="animate-rise max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#e8d7a8]">
            {SITE.taglineEn}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-[3.2rem]">
            {SITE.name}
            <span className="mt-4 block text-[0.42em] font-medium leading-snug tracking-normal text-white/90">
              메인쿤 특징 · 크기 · 분양가
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
            {SITE.tagline} 아이들 사진을 먼저 보시고,{" "}
            {kakaoHref ? "카카오톡으로 문의해 주세요." : "사진을 먼저 보신 뒤 상담해 주세요."}
          </p>
          <p className="mt-4 max-w-xl text-xs leading-relaxed text-[#f6edd8] md:text-sm">
            {KEYWORD_INQUIRY}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#gallery" className="btn-primary">
              <Camera size={18} />
              분양 사진 보기
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
