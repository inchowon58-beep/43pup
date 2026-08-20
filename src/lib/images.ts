import { SITE } from "./site";

/**
 * 화면 노출 순서. 파일 번호(01~40)를 섞어 히어로·갤러리가 다르게 보이게 함.
 */
const DISPLAY_ORDER = [
  12, 27, 4, 18, 35, 9, 23, 2, 30, 15, 38, 7, 21, 1, 33, 16, 40, 6, 28, 11, 36, 19, 3, 25, 13, 32,
  8, 22, 5, 29, 14, 37, 10, 24, 17, 39, 20, 34, 26, 31,
] as const;

function fileIndex(logicalIndex: number): number {
  const n = Math.max(1, Math.min(SITE.imageCount, logicalIndex));
  return DISPLAY_ORDER[n - 1] ?? n;
}

/** doodle 01.webp ~ N.webp — 논리 순서는 DISPLAY_ORDER */
export function imageUrl(index: number): string {
  return `${SITE.imageBase}/${String(fileIndex(index)).padStart(2, "0")}.webp`;
}

function clampImageIndex(num: number): number {
  if (!Number.isFinite(num) || num < 1) return 1;
  return Math.min(SITE.imageCount, Math.max(1, Math.floor(num)));
}

/** 구 CDN·잘못된 URL → doodle 01~N 로 맞춤 */
export function migrateImageUrl(url: string): string {
  return url.replace(
    /https?:\/\/image\.cattery\.co\.kr\/(?:jejumilgam|dogboho|petfuneral|doodle)\/(?:new)?(\d{1,3})\.webp/gi,
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
  const rng = mulberry32(seed ^ 0x5055d00d);
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function galleryAlt(keywordOrIndex: string | number, index = 1): string {
  const suffixes = [
    "미니두들분양 사진",
    "골든두들분양 모습",
    "가족형 두들 키우기",
    "골든두들성격",
    "미니두들입양 사진",
  ];
  if (typeof keywordOrIndex === "number") {
    const i = keywordOrIndex;
    return `${SITE.name} ${suffixes[(i - 1) % suffixes.length]} ${i}`;
  }
  const suffix = suffixes[(index - 1) % suffixes.length];
  return `${keywordOrIndex} ${suffix} ${index}`;
}
