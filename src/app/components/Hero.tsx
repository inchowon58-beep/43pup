import Image from "next/image";
import { Camera, MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO, KEYWORD_INQUIRY } from "@/lib/site";
import { imageUrl } from "@/lib/images";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[92svh] overflow-hidden">
      <div className="absolute inset-0 hero-media">
        <Image
          src={imageUrl(1)}
          alt={`${SITE.name} — 국제결혼정보`}
          fill
          unoptimized
          priority
          className="object-cover object-[center_28%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,74,86,0.48)_0%,rgba(13,74,86,0.16)_38%,rgba(8,32,38,0.9)_100%)]" />
      </div>

      <div className="container relative flex min-h-[92svh] flex-col justify-end pb-28 pt-28 md:pb-24">
        <div className="animate-rise max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#9ee3d8]">
            {SITE.taglineEn}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-[3.2rem]">
            {SITE.brand}
            <span className="mt-4 block text-[0.42em] font-medium leading-snug tracking-normal text-white/90">
              국제결혼정보 · 믿을 수 있는 업체 안내
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
            {SITE.tagline}. 한 업체를 홍보하지 않습니다. 예비고객이 먼저 알아야 할 주의점과
            확인 항목을 정리합니다.
          </p>
          <p className="mt-4 max-w-xl text-xs leading-relaxed text-[#fdeee8] md:text-sm">
            {KEYWORD_INQUIRY}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#services" className="btn-primary">
              <Camera size={18} />
              주의사항 보기
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
