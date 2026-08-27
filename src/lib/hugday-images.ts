import type { HugdaySite } from "./hugday-sites";
import { IMAGE_HOST } from "./hugday-sites";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function hugdayFolderUrls(folder: string, count = 45): string[] {
  return Array.from({ length: count }, (_, i) => `${IMAGE_HOST}/${folder}/${pad(i + 1)}.webp`);
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
  const rng = mulberry32(hashSlug(site.slug + salt) ^ 0x9e3779b9);
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
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
    hero: urls[0],
    portrait: urls[1],
    ribbon: urls.slice(2, 8),
    essay: urls[8],
    facts: urls.slice(9, 12),
    grid: urls.slice(12, 16),
  };
}
