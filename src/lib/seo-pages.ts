import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { del, get, list, put } from "@vercel/blob";
import { migrateImageUrl } from "./images";
import { SITE } from "./site";
import { getHugdaySite } from "./hugday-sites";
import { alignSeoImages } from "./hugday-images";

export type FaqItem = { q: string; a: string };

export type SeoPage = {
  slug: string;
  keyword: string;
  title: string;
  metaDescription: string;
  metaKeywords: string;
  h1: string;
  heroSubtitle: string;
  heroBadge?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroBar?: string;
  regionSlug?: string;
  regionName?: string;
  sections: {
    h2: string;
    paragraphs: string[];
  }[];
  faqs: FaqItem[];
  images: string[];
  ctaText: string;
  createdAt: string;
  updatedAt: string;
};

export type SeoPageSummary = {
  slug: string;
  keyword: string;
  title: string;
  metaDescription: string;
  h1: string;
  createdAt: string;
  updatedAt: string;
};

export type SeoIndex = {
  slugs: string[];
  /** 목록/사이트맵용 요약 — 전체 JSON을 안 읽어도 되게 */
  entries?: SeoPageSummary[];
  updatedAt: string;
};

export const PUBLIC_PAGE_LIMIT = 100;

const DATA_DIR = path.join(process.cwd(), "public", "seo-data");
const PAGES_DIR = path.join(DATA_DIR, "pages");
const INDEX_PATH = path.join(DATA_DIR, "index.json");
const BLOB_PREFIX = "seo-data";

/** URL·Blob 조회용 한글 slug 정규화 (이중 인코딩·NFC) */
export function normalizeSeoSlug(raw: string): string {
  let s = (raw || "").trim();
  for (let i = 0; i < 2; i++) {
    try {
      const next = decodeURIComponent(s);
      if (next === s) break;
      s = next;
    } catch {
      break;
    }
  }
  try {
    s = s.normalize("NFC");
  } catch {
    /* ignore */
  }
  return s;
}

function slugLookupKeys(slug: string): string[] {
  const keys = new Set<string>();
  const add = (value: string) => {
    const t = (value || "").trim();
    if (t) keys.add(t);
  };
  add(slug);
  add(normalizeSeoSlug(slug));
  try {
    add(normalizeSeoSlug(slug).normalize("NFD"));
  } catch {
    /* ignore */
  }
  return [...keys];
}

function regionLookupKeys(regionSlug: string): string[] {
  if (!regionSlug) return [""];
  const site = getHugdaySite(regionSlug);
  const keys = new Set<string>([regionSlug]);
  if (site) {
    keys.add(site.slug);
    keys.add(site.folder);
  }
  return [...keys];
}

function summaryMatchesSite(
  summary: SeoPageSummary,
  regionSlug: string
): boolean {
  const site = getHugdaySite(regionSlug);
  if (!site) return false;
  const hay = `${summary.slug} ${summary.keyword} ${summary.title} ${summary.h1}`.toLowerCase();
  return (
    hay.includes(site.name.toLowerCase()) ||
    hay.includes(site.keyword.toLowerCase()) ||
    hay.includes(site.folder.toLowerCase())
  );
}

/** Blob pathname 용 ASCII 키 (한글 slug 불가 대응) */
export function blobPageKey(slug: string, regionSlug = ""): string {
  const s = normalizeSeoSlug(slug);
  const r = normalizeSeoSlug(regionSlug);
  const raw = r ? `${r}\n${s}` : s;
  const h = createHash("sha256").update(raw, "utf8").digest("hex").slice(0, 24);
  return `p_${h}`;
}

function blobPagePathname(slug: string, regionSlug = ""): string {
  const key = blobPageKey(slug, regionSlug);
  if (regionSlug) return `${BLOB_PREFIX}/r/${regionSlug}/pages/${key}.json`;
  return `${BLOB_PREFIX}/pages/${key}.json`;
}

function blobIndexPathname(regionSlug = ""): string {
  if (regionSlug) return `${BLOB_PREFIX}/r/${regionSlug}/index.json`;
  return `${BLOB_PREFIX}/index.json`;
}

function regionPagesDir(regionSlug: string): string {
  return path.join(DATA_DIR, "r", regionSlug, "pages");
}

function regionIndexPath(regionSlug: string): string {
  return path.join(DATA_DIR, "r", regionSlug, "index.json");
}

function normalizePage(page: SeoPage, regionHint = ""): SeoPage {
  const site = getHugdaySite(page.regionSlug || regionHint);
  let images = (page.images || []).map(migrateImageUrl).filter(Boolean);
  if (site) images = alignSeoImages(images, site, page.slug);
  return {
    ...page,
    images,
    regionSlug: page.regionSlug || site?.slug || page.regionSlug,
    regionName: page.regionName || site?.name || page.regionName,
  };
}

/** whitepark-blob 은 private 스토어 */
const BLOB_ACCESS = "private" as const;

function isVercelRuntime(): boolean {
  return Boolean(process.env.VERCEL);
}

function resolveBlobToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    return process.env.BLOB_READ_WRITE_TOKEN.trim();
  }
  for (const [key, value] of Object.entries(process.env)) {
    if (
      value?.trim() &&
      key.includes("BLOB") &&
      key.endsWith("READ_WRITE_TOKEN")
    ) {
      return value.trim();
    }
  }
  return undefined;
}

function blobTokenOpts() {
  const token = resolveBlobToken();
  return token ? { token } : {};
}

function blobOpts() {
  return {
    access: BLOB_ACCESS,
    ...blobTokenOpts(),
  };
}

function blobPutOpts() {
  return {
    ...blobOpts(),
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
  };
}

function ensureDirs() {
  try {
    if (!fs.existsSync(PAGES_DIR)) fs.mkdirSync(PAGES_DIR, { recursive: true });
  } catch {
    /* Vercel 등 읽기 전용 FS — 쓰기 시에만 실패 처리 */
  }
}

function pageToSummary(page: Pick<
  SeoPage,
  "slug" | "keyword" | "title" | "metaDescription" | "h1" | "createdAt" | "updatedAt"
>): SeoPageSummary {
  return {
    slug: page.slug,
    keyword: page.keyword || "",
    title: page.title || page.h1 || page.slug,
    metaDescription: page.metaDescription || "",
    h1: page.h1 || page.title || page.slug,
    createdAt: page.createdAt || "",
    updatedAt: page.updatedAt || page.createdAt || "",
  };
}

function stubSummary(slug: string, updatedAt = ""): SeoPageSummary {
  return {
    slug,
    keyword: "",
    title: slug,
    metaDescription: "",
    h1: slug,
    createdAt: updatedAt,
    updatedAt,
  };
}

function normalizeIndex(raw: SeoIndex): SeoIndex {
  const slugs = Array.isArray(raw.slugs) ? raw.slugs.filter(Boolean) : [];
  const updatedAt = raw.updatedAt || new Date().toISOString();
  const bySlug = new Map<string, SeoPageSummary>();
  for (const e of raw.entries || []) {
    if (e?.slug) bySlug.set(e.slug, pageToSummary(e));
  }
  const entries = slugs.map(
    (slug) => bySlug.get(slug) || stubSummary(slug, updatedAt)
  );
  return { slugs, entries, updatedAt };
}

function upsertIndexEntry(index: SeoIndex, page: SeoPage): SeoIndex {
  const summary = pageToSummary(page);
  const slugs = [page.slug, ...(index.slugs || []).filter((s) => s !== page.slug)];
  const rest = (index.entries || []).filter((e) => e.slug !== page.slug);
  return {
    slugs,
    entries: [summary, ...rest].filter((e) => slugs.includes(e.slug)),
    updatedAt: new Date().toISOString(),
  };
}

function removeIndexEntry(index: SeoIndex, slug: string): SeoIndex {
  const slugs = (index.slugs || []).filter((s) => s !== slug);
  const entries = (index.entries || []).filter((e) => e.slug !== slug);
  return {
    slugs,
    entries,
    updatedAt: new Date().toISOString(),
  };
}

async function streamToText(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  const total = chunks.reduce((n, c) => n + c.length, 0);
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    merged.set(c, offset);
    offset += c.length;
  }
  return new TextDecoder("utf-8").decode(merged);
}

async function readBlobText(pathname: string): Promise<string | null> {
  const opts = blobOpts();
  try {
    const result = await get(pathname, opts);
    if (result?.stream) {
      return await streamToText(result.stream);
    }
  } catch (e) {
    console.error("[seo-pages] blob get failed", pathname, e);
  }

  try {
    const { blobs } = await list({
      prefix: pathname,
      ...blobTokenOpts(),
    });
    const match =
      blobs.find((b) => b.pathname === pathname) ||
      blobs.find((b) => b.pathname.endsWith(`/${path.basename(pathname)}`));
    if (!match) return null;
    const viaGet = await get(match.url, opts);
    if (viaGet?.stream) return await streamToText(viaGet.stream);
  } catch (e) {
    console.error("[seo-pages] blob list/get failed", pathname, e);
  }
  return null;
}

async function writeBlobText(pathname: string, content: string): Promise<void> {
  await put(pathname, content, blobPutOpts());
}

function readIndexFs(regionSlug = ""): SeoIndex {
  try {
    const p = regionSlug ? regionIndexPath(regionSlug) : INDEX_PATH;
    if (!fs.existsSync(p)) {
      return { slugs: [], entries: [], updatedAt: new Date().toISOString() };
    }
    return normalizeIndex(JSON.parse(fs.readFileSync(p, "utf-8")) as SeoIndex);
  } catch {
    return { slugs: [], entries: [], updatedAt: new Date().toISOString() };
  }
}

function writeIndexFs(index: SeoIndex, regionSlug = "") {
  if (regionSlug) {
    const dir = path.dirname(regionIndexPath(regionSlug));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(regionIndexPath(regionSlug), JSON.stringify(index, null, 2), "utf-8");
    return;
  }
  ensureDirs();
  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2), "utf-8");
}

function readPageFs(slug: string, regionSlug = ""): SeoPage | null {
  const slugs = slugLookupKeys(slug);
  const regions = regionLookupKeys(regionSlug);
  for (const region of regions) {
    const dir = region ? regionPagesDir(region) : PAGES_DIR;
    for (const key of slugs) {
      const file = path.join(dir, `${key}.json`);
      if (!fs.existsSync(file)) continue;
      try {
        return normalizePage(JSON.parse(fs.readFileSync(file, "utf-8")) as SeoPage, regionSlug);
      } catch {
        /* try next */
      }
    }
  }
  if (regionSlug) {
    for (const key of slugs) {
      const file = path.join(PAGES_DIR, `${key}.json`);
      if (!fs.existsSync(file)) continue;
      try {
        return normalizePage(JSON.parse(fs.readFileSync(file, "utf-8")) as SeoPage, regionSlug);
      } catch {
        /* try next */
      }
    }
  }
  return null;
}

export async function readIndex(regionSlug = ""): Promise<SeoIndex> {
  // Blob은 토큰이 있을 때만 시도 (Vercel에서 토큰 없이 get 호출 시 예외)
  if (resolveBlobToken()) {
    const blobRaw = await readBlobText(blobIndexPathname(regionSlug));
    if (blobRaw) {
      try {
        return normalizeIndex(JSON.parse(blobRaw) as SeoIndex);
      } catch {
        /* fall through */
      }
    }
  }
  return readIndexFs(regionSlug);
}

export async function writeIndex(index: SeoIndex, regionSlug = ""): Promise<void> {
  const content = JSON.stringify(index, null, 2);
  if (isVercelRuntime() || resolveBlobToken()) {
    try {
      await writeBlobText(blobIndexPathname(regionSlug), content);
      if (!isVercelRuntime()) {
        try {
          writeIndexFs(index, regionSlug);
        } catch {
          /* optional local mirror */
        }
      }
      return;
    } catch (e) {
      if (isVercelRuntime()) {
        throw new Error(
          `Vercel Blob 저장 실패(index). private 스토어는 access:'private'이 필요합니다. (${
            e instanceof Error ? e.message : e
          })`
        );
      }
    }
  }
  try {
    writeIndexFs(index, regionSlug);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (/EROFS|read-only/i.test(msg)) {
      throw new Error(
        "배포 환경은 파일 쓰기가 불가합니다. Vercel Blob 토큰을 설정하세요."
      );
    }
    throw e;
  }
}

async function readPageFromBlob(
  slug: string,
  regionSlug = ""
): Promise<SeoPage | null> {
  const slugs = slugLookupKeys(slug);
  const regions = regionLookupKeys(regionSlug);
  for (const region of regions) {
    for (const key of slugs) {
      const hashed = await readBlobText(blobPagePathname(key, region));
      if (!hashed) continue;
      try {
        return normalizePage(JSON.parse(hashed) as SeoPage, regionSlug);
      } catch {
        /* try next */
      }
    }
  }
  for (const key of slugs) {
    const hashed = await readBlobText(blobPagePathname(key, ""));
    if (hashed) {
      try {
        return normalizePage(JSON.parse(hashed) as SeoPage, regionSlug);
      } catch {
        /* try legacy */
      }
    }
    const blobRaw = await readBlobText(`${BLOB_PREFIX}/pages/${key}.json`);
    if (blobRaw) {
      try {
        return normalizePage(JSON.parse(blobRaw) as SeoPage, regionSlug);
      } catch {
        /* try next */
      }
    }
  }
  return null;
}

export async function readPage(slug: string, regionSlug = ""): Promise<SeoPage | null> {
  if (resolveBlobToken()) {
    const fromBlob = await readPageFromBlob(slug, regionSlug);
    if (fromBlob) return fromBlob;
  }
  return readPageFs(slug, regionSlug);
}

/** 목록·홈·사이트맵용 — index.json 1회만 읽음 (전체 글 JSON 미조회) */
function summariesFromIndex(index: SeoIndex): SeoPageSummary[] {
  if (index.entries && index.entries.length > 0) {
    return [...index.entries];
  }
  if (index.slugs.length > 0) {
    return index.slugs.map((s) => stubSummary(s, index.updatedAt));
  }
  return [];
}

export async function listPageSummaries(regionSlug = ""): Promise<SeoPageSummary[]> {
  try {
    const index = await readIndex(regionSlug);
    let items = summariesFromIndex(index);

    if (regionSlug) {
      const global = await readIndex("");
      const seen = new Set(items.map((e) => e.slug));
      for (const extra of summariesFromIndex(global)) {
        if (seen.has(extra.slug) || !summaryMatchesSite(extra, regionSlug)) continue;
        seen.add(extra.slug);
        items.push(extra);
      }
    }

    if (items.length > 0) {
      return items.sort((a, b) =>
        (a.createdAt || "") < (b.createdAt || "") ? 1 : -1
      );
    }

    try {
      const dir = regionSlug ? regionPagesDir(regionSlug) : PAGES_DIR;
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
        return files
          .map((f) => readPageFs(f.replace(/\.json$/, ""), regionSlug))
          .filter((p): p is SeoPage => !!p)
          .map(pageToSummary)
          .sort((a, b) => ((a.createdAt || "") < (b.createdAt || "") ? 1 : -1));
      }
    } catch {
      /* ignore FS errors on serverless */
    }
    return [];
  } catch (e) {
    console.error("[seo-pages] listPageSummaries failed", e);
    return [];
  }
}

/** 일반 사용자 목록 노출용 — 최신 100건만 공개 */
export async function listPublicPageSummaries(
  limit = PUBLIC_PAGE_LIMIT,
  regionSlug = ""
): Promise<SeoPageSummary[]> {
  const all = await listPageSummaries(regionSlug);
  return all.slice(0, Math.max(0, limit));
}

/** 전체 본문 필요 시(RSS 등). 비용·지연 큼 — 가급적 listPageSummaries 사용 */
export async function listPages(limit?: number): Promise<SeoPage[]> {
  const { slugs } = await readIndex();
  const take = typeof limit === "number" ? Math.max(0, limit) : slugs.length;
  const targets = slugs.slice(0, take);
  const fromIndex: SeoPage[] = [];
  for (const s of targets) {
    const p = await readPage(s);
    if (p) fromIndex.push(p);
  }
  if (fromIndex.length > 0) {
    return fromIndex.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  if (fs.existsSync(PAGES_DIR)) {
    const files = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith(".json"));
    const pages = files
      .map((f) => readPageFs(f.replace(/\.json$/, "")))
      .filter((p): p is SeoPage => !!p)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return typeof limit === "number" ? pages.slice(0, limit) : pages;
  }
  return [];
}

export async function savePage(page: SeoPage): Promise<void> {
  page.slug = normalizeSeoSlug(page.slug);
  if (page.regionSlug) page.regionSlug = normalizeSeoSlug(page.regionSlug);
  page = normalizePage(page, page.regionSlug || "");
  const content = JSON.stringify(page, null, 2);
  const region = page.regionSlug || "";
  const pagePathname = blobPagePathname(page.slug, region);

  if (isVercelRuntime()) {
    try {
      await writeBlobText(pagePathname, content);
    } catch (e) {
      throw new Error(
        `Vercel Blob 저장 실패. private Blob은 access:'private'로 저장합니다. 토큰·Redeploy를 확인하세요. (${
          e instanceof Error ? e.message : e
        })`
      );
    }
  } else {
    try {
      const dir = region ? regionPagesDir(region) : PAGES_DIR;
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, `${page.slug}.json`), content, "utf-8");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (/EROFS|read-only/i.test(msg)) {
        throw new Error(
          "파일 시스템이 읽기 전용입니다. Vercel Blob을 설정하거나 로컬에서 발행하세요."
        );
      }
      throw e;
    }
    if (resolveBlobToken()) {
      try {
        await writeBlobText(pagePathname, content);
      } catch (e) {
        console.error("[seo-pages] optional blob sync failed", e);
      }
    }
  }

  const index = upsertIndexEntry(await readIndex(region), page);
  await writeIndex(index, region);
}

export async function deletePage(slug: string, regionSlug = ""): Promise<void> {
  const key = normalizeSeoSlug(slug);
  const regions = regionLookupKeys(regionSlug);
  const paths = [
    ...regions.map((region) => blobPagePathname(key, region)),
    blobPagePathname(key, ""),
  ];

  if (isVercelRuntime() || resolveBlobToken()) {
    for (const pagePathname of [...new Set(paths)]) {
      try {
        await del(pagePathname, blobTokenOpts());
      } catch (e) {
        if (isVercelRuntime()) {
          console.error("[seo-pages] blob delete failed", pagePathname, e);
        }
      }
    }
  }

  for (const region of [...regions, ""]) {
    try {
      const dir = region ? regionPagesDir(region) : PAGES_DIR;
      const file = path.join(dir, `${key}.json`);
      if (fs.existsSync(file)) fs.unlinkSync(file);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (!/ENOENT/i.test(msg)) throw e;
    }
  }

  for (const region of [...new Set([...regions, ""])]) {
    const index = removeIndexEntry(await readIndex(region), key);
    await writeIndex(index, region);
  }
}

export function pagePublicUrl(slug: string): string {
  const base = (SITE.siteUrl || "").replace(/\/+$/, "");
  return `${base}/guide/${encodeURIComponent(slug)}`;
}

export function pagePath(slug: string): string {
  return `/guide/${normalizeSeoSlug(slug)}`;
}

/** 파일명용 slug */
export function slugifyKeyword(keyword: string, salt?: string): string {
  const base = keyword
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9가-힣\-]/g, "")
    .slice(0, 40);
  const tail =
    salt ||
    Math.random().toString(36).slice(2, 6) +
      Date.now().toString(36).slice(-4);
  return `${base || "wedding"}-${tail}`;
}
