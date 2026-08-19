import Image from "next/image";
import { ArrowDown, MessageCircle } from "lucide-react";
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
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(42,36,31,0.78)_0%,rgba(53,84,69,0.45)_48%,rgba(42,36,31,0.25)_100%)]" />
      </div>

      <div className="container relative flex min-h-[92svh] flex-col justify-end pb-28 pt-28 md:justify-center md:pb-20 md:pt-24">
        <div className="animate-rise max-w-xl border-l-[3px] border-[var(--coral)] bg-[rgba(248,244,236,0.94)] px-6 py-8 shadow-[0_20px_50px_rgba(42,36,31,0.22)] backdrop-blur-sm md:px-8 md:py-10">
          <p className="text-xs font-semibold tracking-[0.16em] text-[var(--coral)]">
            {SITE.farm} · {SITE.taglineEn}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[var(--navy)] sm:text-4xl md:text-5xl">
            {SITE.name}
            <span className="mt-3 block text-[0.48em] font-semibold leading-snug text-[var(--muted)]">
              지금 아이가 떠났다면,
              <br />
              혼자 결정하지 마세요
            </span>
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-[var(--muted)] md:text-base">
            24시 긴급 픽업부터 장례·화장·추모까지. 갑작스러운 이별 앞에서
            보호자가 바로 해야 할 일을 차분히 안내합니다.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#process" className="btn-primary">
              지금 할 일 보기
              <ArrowDown size={18} />
            </a>
            <a
              href={SITE.kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[0.4rem] border border-[var(--sky-deep)] px-5 py-3 font-semibold text-[var(--sky-deep)]"
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
