import { SITE } from "./site";

/**
 * 화면 노출 순서. 파일 번호(01~40)를 섞어 히어로·갤러리가 다르게 보이게 함.
 */
const DISPLAY_ORDER = [
  15, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 12, 8, 3, 7, 11, 19, 21, 23, 25, 27, 29, 31, 33, 35,
  37, 39, 2, 5, 6, 9, 10, 13, 17, 34, 36, 38, 40, 1, 4,
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
  const rng = mulberry32(seed ^ 0xd00d1e11);
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function galleryAlt(keywordOrIndex: string | number, index = 1): string {
  const suffixes = [
    "버니두들분양 사진",
    "골든두들분양 모습",
    "버니두들키우기 안내",
    "버니두들성격",
    "버니두들입양 사진",
  ];
  if (typeof keywordOrIndex === "number") {
    const i = keywordOrIndex;
    return `${SITE.name} ${suffixes[(i - 1) % suffixes.length]} ${i}`;
  }
  const suffix = suffixes[(index - 1) % suffixes.length];
  return `${keywordOrIndex} ${suffix} ${index}`;
}
