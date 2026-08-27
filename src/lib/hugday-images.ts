import type { HugdaySite } from "./hugday-sites";
import { IMAGE_HOST } from "./hugday-sites";

/** CDN 폴더별 실제 webp 장수. 없는 번호를 고르면 메인 카드가 깨집니다. */
export const FOLDER_IMAGE_COUNT: Record<string, number> = {
  abisinan: 20,
  american: 18,
  bnagal: 20,
  bosten: 5,
  british: 45,
  bunyz: 10,
  catboho: 45,
  chauchau: 5,
  coca: 10,
  coldenret: 10,
  coton: 30,
  daks: 21,
  dalma: 21,
  doberman: 5,
  dogboho: 45,
  engbuldog: 5,
  frenchi: 25,
  italian: 10,
  doodle: 40,
  maincoon: 45,
  malamute: 5,
  mcnchikin: 45,
  minipin: 10,
  neva: 45,
  norwe: 25,
  oldbig: 10,
  perisian: 10,
  pekinee: 25,
  pome: 45,
  pomsky: 45,
  ragdoll: 45,
  rusian: 15,
  samoyed: 15,
  scottish: 19,
  selti: 45,
  shichu: 21,
  shuna: 10,
  siba: 19,
  singa: 19,
  spinkix: 20,
  welshi: 15,
  wterrier: 30,
  yoki: 10,
};

export function folderImageCount(folder: string): number {
  return FOLDER_IMAGE_COUNT[folder] || 5;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function hugdayCover(folder: string): string {
  return `${IMAGE_HOST}/${folder}/01.webp`;
}

export function hugdayFolderUrls(folder: string, count?: number): string[] {
  const n = folderImageCount(folder);
  const take = Math.min(count ?? n, n);
  return Array.from({ length: take }, (_, i) => `${IMAGE_HOST}/${folder}/${pad(i + 1)}.webp`);
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h) || 1;
}

export function pickHugdayImages(site: HugdaySite, count: number, salt = ""): string[] {
  const pool = hugdayFolderUrls(site.folder);
  if (!pool.length) return [hugdayCover(site.folder)];
  const rng = mulberry32(hashSlug(site.slug + salt) ^ 0x9e3779b9);
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  if (shuffled.length >= count) return shuffled.slice(0, count);
  return Array.from({ length: count }, (_, i) => shuffled[i % shuffled.length]);
}

export type HugdayPhotos = {
  hero: string;
  portrait: string;
  ribbon: string[];
  essay: string;
  facts: string[];
  grid: string[];
};

export function hugdayPhotos(site: HugdaySite): HugdayPhotos {
  const urls = pickHugdayImages(site, 16);
  return {
    hero: hugdayCover(site.folder),
    portrait: urls[1] || urls[0],
    ribbon: urls.slice(2, 8),
    essay: urls[8] || urls[0],
    facts: urls.slice(9, 12),
    grid: urls.slice(12, 16),
  };
}
