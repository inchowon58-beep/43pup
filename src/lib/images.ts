import { SITE } from "./site";

/**
 * 화면 노출 순서. 이미지 주소가 들어오면 이 순서로 히어로·갤러리에 씀.
 */
const DISPLAY_ORDER = [6, 1, 9, 3, 8, 2, 10, 5, 7, 4] as const;

function fileIndex(logicalIndex: number): number {
  const len = DISPLAY_ORDER.length;
  const n = ((Math.floor(logicalIndex) - 1) % len + len) % len;
  return DISPLAY_ORDER[n] ?? 1;
}

export function imageUrl(index: number): string {
  if (!SITE.imageBase) return `placeholder:${fileIndex(index)}`;
  return `${SITE.imageBase}/${String(fileIndex(index)).padStart(2, "0")}.webp`;
}

export function isRealImage(url: string): boolean {
  return /^https?:\/\//i.test(url || "");
}

export function placeholderIndexFrom(urlOrIndex: string | number): number {
  if (typeof urlOrIndex === "number") return fileIndex(urlOrIndex);
  const m = String(urlOrIndex).match(/placeholder:(\d+)/i);
  if (m) return Number(m[1]);
  const file = String(urlOrIndex).match(/(\d{1,3})\.webp/i);
  if (file) return Number(file[1]);
  return 1;
}

function clampImageIndex(num: number): number {
  if (!Number.isFinite(num) || num < 1) return 1;
  return Math.min(SITE.imageCount, Math.max(1, Math.floor(num)));
}

export function migrateImageUrl(url: string): string {
  if (!url) return imageUrl(1);
  if (!SITE.imageBase) {
    const file = url.match(/(\d{1,3})\.webp/i);
    if (file) return `placeholder:${clampImageIndex(Number(file[1]))}`;
    return url.startsWith("placeholder:") ? url : imageUrl(1);
  }
  return url.replace(
    /https?:\/\/image\.cattery\.co\.kr\/(?:jejumilgam|dogboho|petfuneral|doodle|maincoon|weding)\/(?:new)?(\d{1,3})\.webp/gi,
    (_m, num: string) =>
      `${SITE.imageBase}/${String(clampImageIndex(Number(num))).padStart(2, "0")}.webp`
  );
}

export function allImageUrls(): string[] {
  return Array.from({ length: SITE.imageCount }, (_, i) => imageUrl(i + 1));
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickImages(count: number, seed = 42): string[] {
  const pool = allImageUrls();
  const rng = mulberry32(seed ^ 0x47e1d90c);
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function galleryAlt(keywordOrIndex: string | number, index = 1): string {
  const suffixes = [
    "두피문신 시술",
    "SMP 디자인",
    "두피문신 교육",
    "상담 안내",
    "사후관리",
  ];
  if (typeof keywordOrIndex === "number") {
    const i = keywordOrIndex;
    return `${SITE.name} ${suffixes[(i - 1) % suffixes.length]} ${i}`;
  }
  const suffix = suffixes[(index - 1) % suffixes.length];
  return `${keywordOrIndex} ${suffix} ${index}`;
}
