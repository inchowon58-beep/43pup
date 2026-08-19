import Image from "next/image";
import type { SeoPage } from "@/lib/seo-pages";
import { galleryAlt } from "@/lib/images";

type Props = {
  page: SeoPage;
  imageSrc: string;
};

export default function GuideHeroThumb({ page, imageSrc }: Props) {
  const badge = page.heroBadge || "절차 안내";
  const line1 = page.heroTitleLine1 || page.keyword;
  const line2 = page.heroTitleLine2 || "절차 · 비용 · 준비";
  const bar = page.heroBar || page.heroSubtitle || "픽업·안치·화장·추모 순서를 정리했습니다";

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[720px] overflow-hidden rounded-[2rem] shadow-[0_18px_44px_rgba(61,74,122,0.28)] ring-1 ring-white/40">
      <Image
        src={imageSrc}
        alt={galleryAlt(page.keyword, 1)}
        fill
        priority
        unoptimized
        className="object-cover"
        sizes="(max-width:768px) 100vw, 720px"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(61,74,122,0.18)_0%,rgba(45,42,56,0.62)_100%)]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span className="rounded-full bg-[var(--coral)] px-4 py-1.5 text-[0.7rem] font-semibold tracking-wide text-white shadow-md md:text-xs">
          {badge}
        </span>

        <h1 className="mt-5 max-w-[16ch] text-[clamp(1.85rem,6.5vw,3.15rem)] font-extrabold leading-[1.25] text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)]">
          <span className="block">{line1}</span>
          <span className="mt-1 block text-[#fceef2] drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)]">
            {line2}
          </span>
        </h1>

        <p className="mt-6 max-w-md rounded-full bg-[rgba(61,74,122,0.62)] px-5 py-2.5 text-[0.8rem] font-medium leading-snug text-white md:text-[0.95rem]">
          {bar}
        </p>
      </div>
    </div>
  );
}
