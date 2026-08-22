import { SITE } from "@/lib/site";
import ImageSlot from "./ImageSlot";
import { galleryAlt } from "@/lib/images";

const INDICES = Array.from({ length: 10 }, (_, i) => i + 1);

export default function Gallery() {
  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">GALLERY</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            시술·교육 사진
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand} 시술·교육 사진 자리입니다. 이미지는 준비되는 대로 넣습니다.
            확인이 필요하시면 카카오톡으로 문의해 주세요.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-3">
          {INDICES.map((i, idx) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-[0.45rem] ${
                idx < 2 ? "aspect-[4/3] sm:col-span-1 md:col-span-2 md:aspect-[16/10]" : "aspect-square"
              }`}
            >
              <ImageSlot index={i} fill label={galleryAlt(i)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
