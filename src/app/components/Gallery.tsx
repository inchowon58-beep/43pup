import Image from "next/image";
import { SITE } from "@/lib/site";
import { imageUrl, galleryAlt } from "@/lib/images";

const INDICES = Array.from({ length: 24 }, (_, i) => i + 1);

export default function Gallery() {
  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">DOODLE GALLERY</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            분양 중인 미니두들 · 골든두들
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand}가 소개하는 아이들입니다. 사진을 보다가 마음에 남는 아이가 있으면
            카카오톡으로 물어보세요.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-3">
          {INDICES.map((i, idx) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-[1.75rem] ${
                idx < 2 ? "aspect-[4/3] sm:col-span-1 md:col-span-2 md:aspect-[16/10]" : "aspect-square"
              }`}
            >
              <Image
                src={imageUrl(i)}
                alt={galleryAlt(i)}
                fill
                unoptimized
                className="object-cover transition duration-500 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
