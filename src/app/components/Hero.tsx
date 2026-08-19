import Image from "next/image";
import { Camera, MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";

export default function Hero() {
  const heroImage = `${SITE.imageBase}/22.webp`;

  return (
    <section id="top" className="relative min-h-[92svh] overflow-hidden">
      <div className="absolute inset-0 hero-media">
        <Image
          src={heroImage}
          alt={`${SITE.name} — 골든두들 분양`}
          fill
          unoptimized
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(47,38,28,0.62)_0%,rgba(47,38,28,0.28)_48%,rgba(47,38,28,0.08)_100%)]" />
      </div>

      <div className="container relative flex min-h-[92svh] flex-col justify-end pb-28 pt-28 md:justify-center md:pb-24">
        <div className="animate-rise max-w-xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#f4d3b0]">
            {SITE.taglineEn}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-[3.4rem]">
            {SITE.name}
            <span className="mt-4 block text-[0.42em] font-medium leading-snug tracking-normal text-white/90">
              우리 집에 올
              <br />
              골든두들을 만나세요
            </span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/82 md:text-base">
            곱슬 털, 온순한 눈, 아이와 잘 지내는 성격. 분양 중인 골든두들 사진을 먼저
            보시고, 마음이 가는 아이를 카카오톡으로 물어보세요.
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
