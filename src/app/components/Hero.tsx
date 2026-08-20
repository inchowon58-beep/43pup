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
          alt={`${SITE.name} — 미니두들분양`}
          fill
          unoptimized
          priority
          className="object-cover object-[center_32%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(61,47,84,0.42)_0%,rgba(61,47,84,0.16)_38%,rgba(36,28,40,0.84)_100%)]" />
      </div>

      <div className="container relative flex min-h-[92svh] flex-col justify-end pb-28 pt-28 md:pb-24">
        <div className="animate-rise max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#f5d0c5]">
            {SITE.taglineEn}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-[3.4rem]">
            {SITE.brand}
            <span className="mt-4 block text-[0.42em] font-medium leading-snug tracking-normal text-white/90">
              미니두들분양 · 골든두들분양
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
            {SITE.tagline}. 분양 중인 아이 사진을 먼저 보시고, 카카오톡으로 문의해 주세요.
          </p>
          <p className="mt-4 max-w-xl text-xs leading-relaxed text-[#fbe8e1] md:text-sm">
            {KEYWORD_INQUIRY}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#gallery" className="btn-primary">
              <Camera size={18} />
              분양 사진 보기
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
