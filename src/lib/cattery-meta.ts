import fs from "fs";
import path from "path";
import { get, put } from "@vercel/blob";
import { revalidateTag, unstable_cache } from "next/cache";
import { HUGDAY_SLUGS } from "./hugday-sites";

export const CATTERY_META_TAG = "hugday-naver-meta";

const BLOB_PATH = "hugday-data/naver-meta.json";
const DATA_PATH = path.join(process.cwd(), "public", "hugday-data", "naver-meta.json");
const BLOB_ACCESS = "private" as const;

export type CatteryNaverMap = Record<string, string>;

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

function blobPutOpts() {
  return {
    access: BLOB_ACCESS,
    ...blobTokenOpts(),
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
  };
}

function isVercelRuntime(): boolean {
  return Boolean(process.env.VERCEL);
}

export function parseNaverMeta(raw: string): string {
  const t = (raw || "").trim();
  if (!t) return "";
  const m =
    t.match(/content\s*=\s*["']([a-zA-Z0-9]+)["']/i) ||
    t.match(/^([a-fA-F0-9]{16,})$/);
  return (m?.[1] || t.replace(/<[^>]+>/g, "").trim()).slice(0, 80);
}

function normalize(raw: unknown): CatteryNaverMap {
  const out: CatteryNaverMap = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    const slug = String(k || "").toLowerCase().trim();
    if (!HUGDAY_SLUGS.has(slug)) continue;
    const meta = parseNaverMeta(String(v || ""));
    if (meta) out[slug] = meta;
  }
  return out;
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

async function readBlobText(): Promise<string | null> {
  try {
    const result = await get(BLOB_PATH, { access: BLOB_ACCESS, ...blobTokenOpts() });
    if (result?.stream) return await streamToText(result.stream);
  } catch (e) {
    console.error("[cattery-meta] blob get failed", e);
  }
  return null;
}

function readFs(): CatteryNaverMap {
  try {
    if (!fs.existsSync(DATA_PATH)) return {};
    return normalize(JSON.parse(fs.readFileSync(DATA_PATH, "utf-8")));
  } catch {
    return {};
  }
}

function writeFs(data: CatteryNaverMap) {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function readCatteryNaverRaw(): Promise<CatteryNaverMap> {
  if (resolveBlobToken()) {
    const blobRaw = await readBlobText();
    if (blobRaw) {
      try {
        return normalize(JSON.parse(blobRaw));
      } catch {
        /* fall through */
      }
    }
  }
  return readFs();
}

const cached = unstable_cache(async () => readCatteryNaverRaw(), ["cattery-naver-meta"], {
  tags: [CATTERY_META_TAG],
  revalidate: 60,
});

export async function getCatteryNaverMap(): Promise<CatteryNaverMap> {
  return cached();
}

export async function getCatteryNaverMeta(slug: string): Promise<string> {
  const map = await getCatteryNaverMap();
  return map[slug] || "";
}

export async function getHugdayNaverMeta(slug: string): Promise<string> {
  return getCatteryNaverMeta(slug);
}

export async function saveCatteryNaverMap(input: CatteryNaverMap): Promise<CatteryNaverMap> {
  const data = normalize(input);
  const content = JSON.stringify(data, null, 2);
  if (isVercelRuntime() || resolveBlobToken()) {
    try {
      await put(BLOB_PATH, content, blobPutOpts());
    } catch (e) {
      if (isVercelRuntime()) {
        throw new Error(`Vercel Blob 저장 실패(cattery naver meta). (${e instanceof Error ? e.message : e})`);
      }
    }
  }
  try {
    writeFs(data);
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
  revalidateTag(CATTERY_META_TAG);
  return data;
}
