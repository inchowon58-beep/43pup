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
  return `당신은 반려동물 장례 안내문을 쓰는 작가입니다.
이 문서는 여러 장례식장에 임대되는 사이트에 실리므로 특정 업체 홍보는 하지 마세요.
업체명 '${SITE.brand}'는 남용하지 마세요.

메인 키워드: ${keyword}
핵심 키워드: 강아지장례식장, 강아지장례, 반려동물장례, 24시장례, 긴급픽업
상담 연결(마지막에만): 카카오톡 오픈채팅 (${SITE.kakaoOpenChatUrl})
서비스 범위: ${SITE.areaServed}

독자: ${keyword}를 검색해 마지막 장을 준비하려는 보호자.
톤: 한 편의 엔딩·크레딧처럼. 사실(절차·비용 요인)은 분명히, 문장은 장면처럼 이어 가세요.
금지: 가격 단정, 허위, 의료 단정, 타사 비방, '마지막 포옹'·'따뜻한 마루'·백과사전 나열 톤.

반드시 다룰 내용:
1) 아이 몸 두기(수건, 서늘한 곳)와 상담에 필요한 정보(지역·체중)
2) 강아지장례 순서(상담-픽업/방문-안치-배웅-화장-유골·추모)
3) 비용이 달라지는 항목과 물어볼 점
4) 문의 방법 — 본문 마지막에만, 짧게

아래 JSON만 출력. 설명·마크다운 금지.

{
  "title": "55자 내. '{keyword}' 포함. 예: '{keyword} | 한 편의 엔딩을 준비하며'",
  "metaDescription": "140~158자. '{keyword}', 엔딩 또는 마지막 장, 절차. 카카오톡은 한 번만",
  "metaKeywords": "{keyword}, 강아지장례식장, 강아지장례, 반려동물장례, 24시장례, 긴급픽업, 강아지죽었을때 등 10~14개",
  "h1": "'{keyword}'와 '엔딩' 또는 '마지막 장'이 들어간 H1",
  "heroSubtitle": "한글 한 문장. 엔딩·장면 비유 + 절차 요약",
  "heroBadge": "엔딩 안내",
  "heroTitleLine2": "한 편의 엔딩",
  "heroBar": "픽업·안치·화장·추모를 장면별로 정리했습니다.",
  "sections": [
    {"h2": "'{keyword}' 포함, 엔딩을 열기 전에", "paragraphs": ["200자+", "180자+", "180자+", "160자+"]},
    {"h2": "강아지장례 장면별 순서", "paragraphs": ["200자+", "180자+", "180자+", "140자+"]},
    {"h2": "비용이 달라지는 이유·확인할 항목", "paragraphs": ["180자+", "180자+", "160자+"]},
    {"h2": "다음 장면을 여는 상담", "paragraphs": ["160자+", "140자+"]}
  ],
  "faqs": [
    {"q": "강아지가 세상을 떠났을 때 바로 장례를 해야 하나요?", "a": "100자+ 구체 답변"},
    {"q": "밤이나 새벽에 아이가 떠났을 때도 픽업이 되나요?", "a": "100자+"},
    {"q": "장례 전까지 아이 몸은 어떻게 두어야 하나요?", "a": "100자+"},
    {"q": "강아지 장례 비용은 얼마인가요?", "a": "100자+. 단가 단정 금지"},
    {"q": "${keyword} 상담은 어떻게 하나요?", "a": "100자+. ${KAKAO_CTA_HINT}"},
    {"q": "화장 후 유골은 언제 받을 수 있나요?", "a": "80자+"}
  ],
  "ctaText": "{keyword} 엔딩 상담 — 지역·체중만 알려 주세요"
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
    title: String(data.title || `${keyword} | 한 편의 엔딩을 준비하며`),
    metaDescription: clampDesc(data.metaDescription || SITE.description),
    metaKeywords: String(
      data.metaKeywords ||
        `${keyword}, 강아지장례식장, 강아지장례, 24시장례, 긴급픽업, 강아지죽었을때`
    ),
    h1: String(data.h1 || `${keyword}, 엔딩을 준비하는 순서`),
    heroSubtitle: String(
      data.heroSubtitle || "픽업·안치·화장·추모를 엔딩의 장면으로 정리했습니다"
    ),
    heroBadge: String(data.heroBadge || "엔딩 안내"),
    heroTitleLine1: keyword,
    heroTitleLine2: String(data.heroTitleLine2 || "한 편의 엔딩"),
    heroBar: String(data.heroBar || "픽업·안치·화장·추모를 장면별로 정리했습니다."),
    sections,
    faqs,
    ctaText: String(data.ctaText || `${keyword} 엔딩 상담 — 지역·체중만 알려 주세요`),
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
    heroBadge: partial.heroBadge || "엔딩 안내",
    heroTitleLine1: partial.heroTitleLine1 || partial.keyword,
    heroTitleLine2: partial.heroTitleLine2 || "한 편의 엔딩",
    heroBar: partial.heroBar || "픽업·안치·화장·추모를 장면별로 정리했습니다.",
    sections: partial.sections,
    faqs: partial.faqs,
    images: pickImages(3, Date.now() % 100000),
    ctaText: partial.ctaText,
    createdAt: now,
    updatedAt: now,
  };
}
