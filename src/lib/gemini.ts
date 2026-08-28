import { GoogleGenAI } from "@google/genai";
import { SITE } from "./site";
import type { HugdaySite } from "./hugday-sites";
import { pickHugdayImages } from "./hugday-images";
import type { SeoPage } from "./seo-pages";
import { slugifyKeyword } from "./seo-pages";

const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

function clampDesc(text: string, max = 158): string {
  const t = String(text || "")
    .replace(/\s+/g, " ")
    .trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

function asParagraphs(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((p) => String(p || "").trim()).filter(Boolean);
}

function buildPrompt(keyword: string): string {
  const kakaoLine = SITE.kakaoOpenChatUrl
    ? `상담 연결(마지막에만): 카카오톡 오픈채팅 (${SITE.kakaoOpenChatUrl})`
    : "상담 연결(마지막에만): 카카오 URL·전화번호는 넣지 마세요. 관리자에서 카카오를 등록한 뒤에만 연결됩니다.";
  return `당신은 견종·묘종·보호소 분양 안내문을 쓰는 작가입니다.
이 문서는 포옹데이(${SITE.brand}) 사이트에 실리므로 '{keyword}'를 중심으로 안내하세요.
다른 업체 실명 비방은 하지 마세요. 브랜드명 '${SITE.brand}'은 남용하지 말고 한두 번만 넣으세요.

메인 키워드: ${keyword}
핵심: 기질, 관리, 집 환경, 분양 가격이 달라지는 이유, 입양 순서.
전달된 키워드('${keyword}')를 제목과 본문에 그대로 쓰세요. 키워드에 없는 지역명을 새로 만들지 마세요.
${kakaoLine}
서비스 범위: ${SITE.areaServed}

독자: ${keyword}를 검색해 입양을 고르려는 보호자.
톤: 따뜻하고 전문적인 안내. 사실(기질·관리·분양가 요인)은 분명히.
금지: 가격 단정, '단가', '박지 않습니다', 허위, 의료 단정, 타사 비방, 전화번호.
분양 가격은 혈통·외모에 따라 다르다고만 말하고, 상담에서 알아보라고 안내하세요.
포옹데이는 견종·묘종 안내와 보호소·카페·장례식장·애견호텔·유치원 등 반려동물 정보를 담는 포털입니다.

반드시 다룰 내용:
1) ${keyword} 기질·관리·집 환경
2) 입양 순서(노트-상담-만남-집으로)
3) 분양가가 달라지는 항목과 무료분양 주의
4) 문의 방법 — 본문 마지막에만, 짧게

아래 JSON만 출력. 설명·마크다운 금지.

{
  "title": "55자 내. 예: '{keyword} 안심가이드 | 포옹데이'",
  "metaDescription": "140~158자. '{keyword}' 포함. 전화번호 금지",
  "metaKeywords": "{keyword}, 포옹데이, 분양, 기질, 키우기 등 8~12개",
  "h1": "'{keyword} 안심가이드' 또는 '{keyword} 완벽가이드'처럼 키워드+가이드 형식",
  "heroSubtitle": "한글 한 문장. 생성할 때마다 조금씩 다르게",
  "heroBadge": "분양 안내",
  "heroTitleLine2": "포옹데이",
  "heroBar": "기질·관리·집 환경을 먼저 맞춰 보세요.",
  "sections": [
    {"h2": "'{keyword}' 포함, 들이기 전에", "paragraphs": ["200자+", "180자+", "180자+", "160자+"]},
    {"h2": "입양 순서", "paragraphs": ["200자+", "180자+", "180자+", "140자+"]},
    {"h2": "비용이 달라지는 이유·확인할 항목", "paragraphs": ["180자+", "180자+", "160자+"]},
    {"h2": "상담을 여는 방법", "paragraphs": ["160자+", "140자+"]}
  ],
  "faqs": [
    {"q": "${keyword}은 어떤 성격인가요?", "a": "100자+ 구체 답변"},
    {"q": "초보 보호자와 맞나요?", "a": "100자+"},
    {"q": "아파트에서도 키울 수 있나요?", "a": "100자+"},
    {"q": "분양 가격은 어떻게 알아보면 되나요?", "a": "100자+. 혈통·외모·월령에 따라 다르니 상담에서 안내. '단가'나 '박지 않습니다' 표현 금지"},
    {"q": "${keyword} 상담은 어떻게 하나요?", "a": "100자+. 페이지 아래 연락처로, 지역과 관계없이 편하게 문의"},
    {"q": "사진은 어디서 보나요?", "a": "80자+"}
  ],
  "ctaText": "{keyword} 상담 — 희망 시기만 알려 주세요"
}

AEO: FAQ는 실제 검색 질문처럼. 본문에 '{keyword}'를 자연스럽게 반복.`;
}

export async function generateWithGemini(
  keyword: string,
  apiKey?: string
): Promise<
  Omit<SeoPage, "slug" | "images" | "createdAt" | "updatedAt"> & { keyword: string }
> {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY가 없습니다.");

  const ai = new GoogleGenAI({ apiKey: key });
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: buildPrompt(keyword),
    config: {
      responseMimeType: "application/json",
    },
  });
  const text = response.text ?? "";
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = (fence ? fence[1] : text).trim();
  const data = JSON.parse(jsonStr);
  const sections = Array.isArray(data.sections)
    ? data.sections.map((sec: { h2?: string; paragraphs?: unknown }) => ({
        h2: String(sec?.h2 || "").trim(),
        paragraphs: asParagraphs(sec?.paragraphs),
      })).filter((sec: { h2: string; paragraphs: string[] }) => sec.h2 && sec.paragraphs.length)
    : [];
  const faqs = Array.isArray(data.faqs)
    ? data.faqs
        .map((f: { q?: string; a?: string }) => ({
          q: String(f?.q || "").trim(),
          a: String(f?.a || "").trim(),
        }))
        .filter((f: { q: string; a: string }) => f.q && f.a)
    : [];

  return {
    keyword,
    title: String(data.title || `${keyword} | 포옹데이`),
    metaDescription: clampDesc(data.metaDescription || SITE.description),
    metaKeywords: String(
      data.metaKeywords ||
        `${keyword}, 포옹데이, 분양, 기질, 키우기`
    ),
    h1: String(data.h1 || `${keyword} | 포옹데이`),
    heroSubtitle: String(
      data.heroSubtitle || "기질·관리·집 환경을 먼저 맞춰 보세요"
    ),
    heroBadge: String(data.heroBadge || "분양 안내"),
    heroTitleLine1: keyword,
    heroTitleLine2: String(data.heroTitleLine2 || "포옹데이"),
    heroBar: String(data.heroBar || "기질·관리·집 환경을 먼저 맞춰 보세요."),
    sections,
    faqs,
    ctaText: String(data.ctaText || `${keyword} 상담 — 지역·희망 조건만 알려 주세요`),
  };
}

export function assembleSeoPage(
  partial: Awaited<ReturnType<typeof generateWithGemini>>,
  slug?: string,
  site?: HugdaySite
): SeoPage {
  const now = new Date().toISOString();
  const kw = partial.keyword;
  const h1 = /가이드/.test(partial.h1 || "") ? partial.h1 : `${kw} 안심가이드`;
  const title = /가이드/.test(partial.title || "") ? partial.title : `${h1} | 포옹데이`;
  return {
    slug: slug || slugifyKeyword(partial.keyword),
    keyword: partial.keyword,
    title,
    metaDescription: clampDesc(partial.metaDescription),
    metaKeywords: partial.metaKeywords,
    h1,
    heroSubtitle: partial.heroSubtitle,
    heroBadge: partial.heroBadge || "분양 안내",
    heroTitleLine1: partial.heroTitleLine1 || partial.keyword,
    heroTitleLine2: partial.heroTitleLine2 || "포옹데이",
    heroBar: partial.heroBar || "기질·관리·집 환경을 먼저 맞춰 보세요.",
    regionSlug: site?.slug,
    regionName: site?.name,
    sections: partial.sections,
    faqs: partial.faqs,
    images: site ? pickHugdayImages(site, 3, slug || partial.keyword) : [],
    ctaText: partial.ctaText,
    createdAt: now,
    updatedAt: now,
  };
}
