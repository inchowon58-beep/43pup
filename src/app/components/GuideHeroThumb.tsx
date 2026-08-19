import Image from "next/image";
import type { SeoPage } from "@/lib/seo-pages";
import { galleryAlt } from "@/lib/images";

type Props = {
  page: SeoPage;
  imageSrc: string;
};

export default function GuideHeroThumb({ page, imageSrc }: Props) {
  const badge = page.heroBadge || "엔딩 안내";
  const line1 = page.heroTitleLine1 || page.keyword;
  const line2 = page.heroTitleLine2 || "한 편의 엔딩";
  const bar = page.heroBar || page.heroSubtitle || "픽업·안치·화장·추모를 장면별로 정리했습니다";

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[720px] overflow-hidden rounded-[0.5rem] shadow-[0_18px_44px_rgba(22,20,18,0.45)] ring-1 ring-[#c4a35a]/35">
      <Image
        src={imageSrc}
        alt={galleryAlt(page.keyword, 1)}
        fill
        priority
        unoptimized
        className="object-cover"
        sizes="(max-width:768px) 100vw, 720px"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,20,18,0.25)_0%,rgba(22,20,18,0.72)_100%)]" />

      <div className="absolute inset-0 flex flex-col items-start justify-end px-7 pb-8 text-left md:px-10 md:pb-10">
        <span className="rounded-[0.3rem] border border-[#c4a35a] px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-[#c4a35a] md:text-xs">
          {badge}
        </span>

        <h1 className="mt-4 max-w-[16ch] text-[clamp(1.7rem,6vw,2.9rem)] font-bold leading-[1.25] text-[#f3eee6] drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)]">
          <span className="block">{line1}</span>
          <span className="mt-1 block text-[#c4a35a]">{line2}</span>
        </h1>

        <p className="mt-5 max-w-md border-l-2 border-[#c4a35a] pl-4 text-[0.8rem] font-medium leading-snug text-white/88 md:text-[0.95rem]">
          {bar}
        </p>
      </div>
    </div>
  );
}
