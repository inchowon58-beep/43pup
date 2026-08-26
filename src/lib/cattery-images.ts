const NEVA_COUNT = 45;
const MAINCOON_COUNT = 45;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function folderUrls(folder: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `https://image.cattery.co.kr/${folder}/${pad(i + 1)}.webp`);
}

const POOL = [...folderUrls("neva", NEVA_COUNT), ...folderUrls("maincoon", MAINCOON_COUNT)];

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

export function pickCatteryImages(slug: string, count: number): string[] {
  const rng = mulberry32(hashSlug(slug) ^ 0x51c3a90b);
  const shuffled = [...POOL];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export type CatteryPhotos = {
  hero: string;
  about: string;
  highlights: string[];
  featured: string[];
  grid: string[];
  health: string;
  local: string;
};

export function catteryPhotos(slug: string): CatteryPhotos {
  const urls = pickCatteryImages(slug, 18);
  return {
    hero: urls[0],
    about: urls[1],
    highlights: urls.slice(2, 6),
    featured: urls.slice(6, 8),
    grid: urls.slice(8, 16),
    health: urls[16],
    local: urls[17],
  };
}
