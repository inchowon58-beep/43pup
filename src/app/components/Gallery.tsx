import Image from "next/image";
import { SITE } from "@/lib/site";
import { imageUrl, galleryAlt } from "@/lib/images";

const INDICES = [3, 5, 7, 10, 12, 13, 15, 1];

export default function Gallery() {
  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">MEMORIAL</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            따뜻한 마루의 공간
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand}가 안내하는 장례·추모 공간의 분위기입니다.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {INDICES.map((i, idx) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl ${
                idx < 2 ? "aspect-[4/3] md:col-span-2" : "aspect-square"
              }`}
            >
              <Image
                src={imageUrl(i)}
                alt={galleryAlt(i)}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
