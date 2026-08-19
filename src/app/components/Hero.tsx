import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { imageUrl } from "@/lib/images";

export default function Hero() {
  const heroImage = imageUrl(1);

  return (
    <section id="top" className="relative min-h-[92svh] overflow-hidden">
      <div className="absolute inset-0 hero-media">
        <Image
          src={heroImage}
          alt={`${SITE.name} — 반려동물 장례 안내`}
          fill
          unoptimized
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(61,74,122,0.55)_0%,rgba(45,42,56,0.42)_42%,rgba(201,122,146,0.38)_100%)]" />
      </div>

      <div className="container relative flex min-h-[92svh] flex-col items-center justify-center pb-28 pt-24 text-center">
        <div className="animate-rise max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/18 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] text-white backdrop-blur-sm">
            {SITE.farm} · {SITE.taglineEn}
          </p>
          <h1 className="mt-6 text-4xl font-extrabold text-white drop-shadow-[0_8px_24px_rgba(45,42,56,0.45)] sm:text-5xl md:text-6xl">
            {SITE.name}
            <span className="mt-4 block text-[0.42em] font-semibold leading-snug text-[#fceef2]">
              마지막 포옹을,
              <br />
              천천히 함께합니다
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/88 md:text-base">
            인사할 시간을 충분히 드리고, 24시 픽업부터 장례·화장·추모까지
            따뜻한 마루에서 곁을 지킵니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#process" className="btn-primary">
              <Heart size={18} />
              마지막 인사 보기
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
