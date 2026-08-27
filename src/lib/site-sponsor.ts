import fs from "fs";
import path from "path";
import { get, put } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import {
  DEFAULT_SPONSOR,
  GLOBAL_SPONSOR_TAG,
  type SiteSponsor,
} from "./site-sponsor-shared";
import { hugdaySlugFromRequest } from "./hugday-host";
import {
  HUGDAY_HOME,
  HUGDAY_PHONE,
  YT_DOG,
  getHugdaySite,
  youtubeFor,
} from "./hugday-sites";

export type { SponsorStatus, SiteSponsor } from "./site-sponsor-shared";
export { DEFAULT_SPONSOR, GLOBAL_SPONSOR_TAG, phoneToTel } from "./site-sponsor-shared";

const BLOB_ACCESS = "private" as const;

function isVercelRuntime(): boolean {
  return Boolean(process.env.VERCEL);
}

function resolveBlobToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    return process.env.BLOB_READ_WRITE_TOKEN.trim();
  }
  for (const [key, value] of Object.entries(process.env)) {
    if (value?.trim() && key.includes("BLOB") && key.endsWith("READ_WRITE_TOKEN")) {
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
  return { access: BLOB_ACCESS, ...blobTokenOpts() };
}

function blobPutOpts() {
  return {
    ...blobOpts(),
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
  };
}

export function defaultHugdaySponsor(slug = ""): SiteSponsor {
  const site = getHugdaySite(slug);
  const yt = site ? youtubeFor(site) : YT_DOG;
  const name = site ? `${site.keyword} 포옹데이` : "포옹데이";
  return {
    id: 1,
    status: "ACTIVE",
    sponsor_name: name,
    phone_number: HUGDAY_PHONE,
    link_url: "",
    homepage_url: HUGDAY_HOME,
    recruiting_notice: "입점대기중 · 제휴·임대 문의",
    rental_price: "30만원",
    highlight_points: site
      ? [
          `${site.name} 상담`,
          site.size,
          site.coat,
          "입양 전 확인 항목",
          "적응 안내",
        ]
      : DEFAULT_SPONSOR.highlight_points,
    youtube_url: yt,
    youtube_url_2: "",
    sponsor_youtube_url: yt,
    sponsor_youtube_url_2: "",
    sponsor_youtube_channel: name,
    sponsor_youtube_desc: `${name} 안내 영상`,
  };
}

function blobPath(slug: string): string {
  return slug ? `hugday-data/r/${slug}/sponsor.json` : "hugday-data/hub-sponsor.json";
}

function fsPath(slug: string): string {
  if (slug) {
    return path.join(process.cwd(), "public", "hugday-data", "r", slug, "sponsor.json");
  }
  return path.join(process.cwd(), "public", "hugday-data", "hub-sponsor.json");
}

function normalize(raw: Partial<SiteSponsor>, slug = ""): SiteSponsor {
  const base = defaultHugdaySponsor(slug);
  const points = Array.isArray(raw.highlight_points)
    ? raw.highlight_points
        .map((v) => String(v || "").trim())
        .filter(Boolean)
        .slice(0, 5)
    : base.highlight_points;
  const rawLink = (raw.link_url || "").trim();
  const rawHome = (raw.homepage_url || "").trim();
  const linkIsKakao = /open\.kakao\.com|kakao\.com/i.test(rawLink);
  const isActive = raw.status !== "RECRUITING";
  const kakaoLink = linkIsKakao ? rawLink : "";
  return {
    id: 1,
    status: isActive ? "ACTIVE" : "RECRUITING",
    sponsor_name: (raw.sponsor_name || base.sponsor_name).trim(),
    phone_number: (raw.phone_number || base.phone_number).trim(),
    link_url: kakaoLink,
    homepage_url: rawHome || (!linkIsKakao && rawLink ? rawLink : base.homepage_url),
    recruiting_notice: (raw.recruiting_notice || base.recruiting_notice).trim(),
    rental_price: (raw.rental_price || base.rental_price).trim(),
    highlight_points: points.length ? points : base.highlight_points,
    youtube_url: (raw.youtube_url || base.youtube_url).trim(),
    youtube_url_2: (raw.youtube_url_2 || "").trim(),
    sponsor_youtube_url: (raw.sponsor_youtube_url || base.sponsor_youtube_url).trim(),
    sponsor_youtube_url_2: (raw.sponsor_youtube_url_2 || "").trim(),
    sponsor_youtube_channel: (raw.sponsor_youtube_channel || base.sponsor_youtube_channel).trim(),
    sponsor_youtube_desc: (raw.sponsor_youtube_desc || base.sponsor_youtube_desc).trim(),
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

async function readBlobText(slug: string): Promise<string | null> {
  try {
    const result = await get(blobPath(slug), blobOpts());
    if (result?.stream) return await streamToText(result.stream);
  } catch {
    /* missing */
  }
  return null;
}

function readFs(slug: string): SiteSponsor | null {
  try {
    const p = fsPath(slug);
    if (!fs.existsSync(p)) return null;
    return normalize(JSON.parse(fs.readFileSync(p, "utf-8")) as SiteSponsor, slug);
  } catch {
    return null;
  }
}

function writeFs(slug: string, data: SiteSponsor) {
  const p = fsPath(slug);
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf-8");
}

export async function readSiteSponsorRaw(slug = ""): Promise<SiteSponsor> {
  if (resolveBlobToken()) {
    const blobRaw = await readBlobText(slug);
    if (blobRaw) {
      try {
        return normalize(JSON.parse(blobRaw) as SiteSponsor, slug);
      } catch {
        /* fall through */
      }
    }
  }
  return readFs(slug) || defaultHugdaySponsor(slug);
}

export async function getSponsorBySlug(slug: string): Promise<SiteSponsor> {
  return readSiteSponsorRaw(slug);
}

export async function getGlobalSponsor(): Promise<SiteSponsor> {
  const slug = await hugdaySlugFromRequest();
  return cachedRead(slug || "hub");
}

const cachedRead = unstable_cache(
  async (key: string) => readSiteSponsorRaw(key === "hub" ? "" : key),
  ["hugday-site-sponsor"],
  { tags: [GLOBAL_SPONSOR_TAG], revalidate: 3600 }
);

export async function saveGlobalSponsor(
  input: Omit<SiteSponsor, "id">
): Promise<SiteSponsor> {
  const slug = await hugdaySlugFromRequest();
  return saveSponsorForSlug(slug, input);
}

export async function saveSponsorForSlug(
  slug: string,
  input: Omit<SiteSponsor, "id">
): Promise<SiteSponsor> {
  const data = normalize({ ...input, id: 1 }, slug);
  const content = JSON.stringify(data, null, 2);

  if (isVercelRuntime() || resolveBlobToken()) {
    try {
      await put(blobPath(slug), content, blobPutOpts());
    } catch (e) {
      if (isVercelRuntime()) {
        throw new Error(
          `Vercel Blob 저장 실패(sponsor). (${e instanceof Error ? e.message : e})`
        );
      }
    }
  }

  try {
    writeFs(slug, data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (isVercelRuntime() || /EROFS|read-only/i.test(msg)) {
      if (!resolveBlobToken()) {
        throw new Error("배포 환경은 파일 쓰기가 불가합니다. Vercel Blob 토큰을 설정하세요.");
      }
    } else {
      throw e;
    }
  }

  return data;
}
