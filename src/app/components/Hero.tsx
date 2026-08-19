import Image from "next/image";
import { Clapperboard, MessageCircle } from "lucide-react";
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,20,18,0.35)_0%,rgba(22,20,18,0.55)_48%,rgba(22,20,18,0.88)_100%)]" />
      </div>

      <div className="container relative flex min-h-[92svh] flex-col justify-end pb-28 pt-28 md:pb-24">
        <div className="animate-rise max-w-xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-[#c4a35a]">
            {SITE.taglineEn}
          </p>
          <div className="mt-4 h-px w-16 bg-[#c4a35a]" />
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#f3eee6] sm:text-5xl md:text-[3.4rem]">
            {SITE.name}
            <span className="mt-4 block text-[0.42em] font-medium leading-snug tracking-normal text-[#f3eee6]/78">
              한 편의 엔딩을,
              <br />
              함께 준비합니다
            </span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#f3eee6]/72 md:text-base">
            이야기의 마지막 장을 서두르지 않습니다. 24시 픽업부터 장례·화장·추모까지
            엔딩을 차분히 이어 갑니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#process" className="btn-primary">
              <Clapperboard size={18} />
              엔딩 순서 보기
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
