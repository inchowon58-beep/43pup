import { GoogleGenAI } from "@google/genai";
import { SITE, KAKAO_CTA_HINT } from "./site";
import { pickImages } from "./images";
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
  return `당신은 '${SITE.name}'의 SEO·AEO·OG 웹문서 작성 전문가입니다.
업체명은 반드시 '${SITE.brand}', '${SITE.name}'만 사용하세요.

메인 키워드: ${keyword}
핵심 키워드: 강아지장례식장, 강아지장례, 반려동물장례, 24시장례, 긴급픽업
상담: 카카오톡 오픈채팅 (${SITE.kakaoOpenChatUrl})
서비스 범위: ${SITE.areaServed}

독자: 강아지가 방금 세상을 떠나 막막하고 슬픈 보호자.
톤: 공감 먼저, 그다음 지금 할 일. 위로를 남발하지 말고 담담하고 따뜻하게.
금지: 과장, 허위, 의료 단정, 영문·외래어 남용, 다른 업체명.

반드시 다룰 내용:
1) 지금 당장 할 일(아이 몸 두기, 서늘한 곳, 무리한 이동 금지, 24시 연락)
2) 강아지장례 순서(상담-픽업-안치-배웅-화장-유골·추모)
3) 비용 투명, 존중, 신뢰
4) 카카오톡으로 지금 연결하는 방법

아래 JSON만 출력. 설명·마크다운 금지.

{
  "title": "55자 내. '{keyword}' 포함. 예: '{keyword} | 지금 바로 할 일 · ${SITE.brand}'",
  "metaDescription": "140~158자. '{keyword}', '지금', '24시', 카카오톡 상담 유도. 공감 한 줄 포함",
  "metaKeywords": "{keyword}, 강아지장례식장, 강아지장례, 반려동물장례, 24시장례, 긴급픽업, 강아지죽었을때 등 10~14개",
  "h1": "'{keyword}'와 '지금' 또는 '할 일'이 들어간 H1",
  "heroSubtitle": "한글 한 문장. 공감+긴급 안내",
  "heroBadge": "지금 긴급이라면",
  "heroTitleLine2": "지금 바로 할 일",
  "heroBar": "혼자 결정하지 마세요. 24시 안내합니다.",
  "sections": [
    {"h2": "'{keyword}' 포함, 지금 당장 할 일", "paragraphs": ["200자+", "180자+", "180자+", "160자+"]},
    {"h2": "강아지장례 진행 순서", "paragraphs": ["200자+", "180자+", "180자+", "140자+"]},
    {"h2": "신뢰·비용·존중 약속", "paragraphs": ["180자+", "180자+", "160자+"]},
    {"h2": "지금 상담 연결", "paragraphs": ["160자+", "140자+"]}
  ],
  "faqs": [
    {"q": "강아지가 갑자기 세상을 떠났는데 어떻게 해야 하나요?", "a": "100자+ 구체 답변"},
    {"q": "밤이나 새벽에 아이가 떠났을 때도 픽업이 되나요?", "a": "100자+"},
    {"q": "장례 전까지 아이 몸은 어떻게 두어야 하나요?", "a": "100자+"},
    {"q": "강아지 장례 비용은 얼마인가요?", "a": "100자+"},
    {"q": "${keyword} 상담은 어떻게 하나요?", "a": "100자+. ${KAKAO_CTA_HINT}"},
    {"q": "화장 후 유골은 언제 받을 수 있나요?", "a": "80자+"}
  ],
  "ctaText": "지금 아이가 떠났다면 카카오톡 24시 상담 — ${SITE.brand}"
}

AEO: FAQ는 실제 검색 질문처럼. 본문에 '{keyword}'와 '강아지장례'를 자연스럽게 반복.`;
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
    title: String(data.title || `${keyword} | 지금 바로 할 일 · ${SITE.name}`),
    metaDescription: clampDesc(data.metaDescription || SITE.description),
    metaKeywords: String(
      data.metaKeywords ||
        `${keyword}, 강아지장례식장, 강아지장례, 24시장례, 긴급픽업, 강아지죽었을때`
    ),
    h1: String(data.h1 || `${keyword}, 지금 바로 해야 할 일`),
    heroSubtitle: String(
      data.heroSubtitle || "갑작스러운 이별 앞에서, 지금 하실 일을 차분히 안내합니다"
    ),
    heroBadge: String(data.heroBadge || "지금 긴급이라면"),
    heroTitleLine1: keyword,
    heroTitleLine2: String(data.heroTitleLine2 || "지금 바로 할 일"),
    heroBar: String(data.heroBar || "혼자 결정하지 마세요. 24시 안내합니다."),
    sections,
    faqs,
    ctaText: String(
      data.ctaText || `지금 아이가 떠났다면, 카카오톡으로 24시 상담 — ${SITE.brand}`
    ),
  };
}

export function assembleSeoPage(
  partial: Awaited<ReturnType<typeof generateWithGemini>>,
  slug?: string
): SeoPage {
  const now = new Date().toISOString();
  return {
    slug: slug || slugifyKeyword(partial.keyword),
    keyword: partial.keyword,
    title: partial.title,
    metaDescription: clampDesc(partial.metaDescription),
    metaKeywords: partial.metaKeywords,
    h1: partial.h1,
    heroSubtitle: partial.heroSubtitle,
    heroBadge: partial.heroBadge || "지금 긴급이라면",
    heroTitleLine1: partial.heroTitleLine1 || partial.keyword,
    heroTitleLine2: partial.heroTitleLine2 || "지금 바로 할 일",
    heroBar: partial.heroBar || "혼자 결정하지 마세요. 24시 안내합니다.",
    sections: partial.sections,
    faqs: partial.faqs,
    images: pickImages(3, Date.now() % 100000),
    ctaText: partial.ctaText,
    createdAt: now,
    updatedAt: now,
  };
}
