import Image from "next/image";
import type { SeoPage } from "@/lib/seo-pages";
import { galleryAlt } from "@/lib/images";

type Props = {
  page: SeoPage;
  imageSrc: string;
};

export default function GuideHeroThumb({ page, imageSrc }: Props) {
  const badge = page.heroBadge || "정보 안내";
  const line1 = page.heroTitleLine1 || page.keyword;
  const line2 = page.heroTitleLine2 || "한국국제결혼협회";
  const bar =
    page.heroBar || page.heroSubtitle || "한 업체를 팔지 않습니다. 확인할 항목을 먼저 보세요";

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[720px] overflow-hidden rounded-[0.9rem] shadow-[0_18px_44px_rgba(92,26,46,0.22)] ring-1 ring-[#c9a07a]/35">
      <Image
        src={imageSrc}
        alt={galleryAlt(page.keyword, 1)}
        fill
        priority
        unoptimized
        className="object-cover"
        sizes="(max-width:768px) 100vw, 720px"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(92,26,46,0.12)_0%,rgba(42,18,24,0.62)_100%)]" />

      <div className="absolute inset-0 flex flex-col items-start justify-end px-7 pb-8 text-left md:px-10 md:pb-10">
        <span className="rounded-full bg-white/92 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-[var(--coral-deep)] md:text-xs">
          {badge}
        </span>

        <h1 className="mt-4 max-w-[16ch] text-[clamp(1.7rem,6vw,2.9rem)] font-bold leading-[1.25] text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.4)]">
          <span className="block">{line1}</span>
          <span className="mt-1 block text-[#e8c9a0]">{line2}</span>
        </h1>

        <p className="mt-5 max-w-md rounded-2xl bg-black/25 px-4 py-3 text-[0.8rem] font-medium leading-snug text-white/92 md:text-[0.95rem]">
          {bar}
        </p>
      </div>
    </div>
  );
}
