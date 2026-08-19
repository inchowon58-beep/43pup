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
  return `당신은 반려동물 장례 정보 가이드 작성자입니다.
이 문서는 여러 장례식장에 임대되는 사이트에 실리므로, 특정 업체 홍보·브랜드 감성 카피로 쓰지 마세요.
업체명 '${SITE.brand}'는 남용하지 마세요. 본문은 정보 위주입니다.

메인 키워드: ${keyword}
핵심 키워드: 강아지장례식장, 강아지장례, 반려동물장례, 24시장례, 긴급픽업
상담 연결(마지막에만): 카카오톡 오픈채팅 (${SITE.kakaoOpenChatUrl})
서비스 범위: ${SITE.areaServed}

독자: ${keyword}를 검색해 절차·비용·준비를 확인하려는 보호자.
톤: 백과사전·안내문. 담담하고 사실 중심. 과장된 위로·광고 문장 금지.
금지: 가격 단정, 허위, 의료 단정, 타사 비방, 영문 남용, 다른 업체명, '마지막 포옹'·'따뜻한 마루' 같은 브랜드 슬로건.

반드시 다룰 내용:
1) 아이 몸 두기(수건, 서늘한 곳, 밀봉·무리 이동 금지)와 상담에 필요한 정보(지역·체중)
2) 강아지장례 순서(상담-픽업/방문-안치-배웅-화장-유골·추모)
3) 비용이 달라지는 항목(체중, 화장 방식, 옵션, 픽업 거리)과 물어볼 점
4) 문의 방법 — 본문 마지막에만, 짧게

아래 JSON만 출력. 설명·마크다운 금지.

{
  "title": "55자 내. '{keyword}' 포함. 예: '{keyword} | 절차·비용·준비 안내'",
  "metaDescription": "140~158자. '{keyword}', 절차·비용 또는 준비, 24시. 광고 문구 없이 정보 요약",
  "metaKeywords": "{keyword}, 강아지장례식장, 강아지장례, 반려동물장례, 24시장례, 긴급픽업, 강아지죽었을때 등 10~14개",
  "h1": "'{keyword}'와 '안내' 또는 '절차' 또는 '준비'가 들어간 H1",
  "heroSubtitle": "한글 한 문장. 정보 요약(절차·비용·준비)",
  "heroBadge": "절차 안내",
  "heroTitleLine2": "절차 · 비용 · 준비",
  "heroBar": "픽업·안치·화장·추모 순서를 정리했습니다.",
  "sections": [
    {"h2": "'{keyword}' 포함, 먼저 알면 좋은 점", "paragraphs": ["200자+", "180자+", "180자+", "160자+"]},
    {"h2": "강아지장례 진행 순서", "paragraphs": ["200자+", "180자+", "180자+", "140자+"]},
    {"h2": "비용이 달라지는 이유·확인할 항목", "paragraphs": ["180자+", "180자+", "160자+"]},
    {"h2": "상담 시 준비하면 좋은 정보", "paragraphs": ["160자+", "140자+"]}
  ],
  "faqs": [
    {"q": "강아지가 세상을 떠났을 때 바로 장례를 해야 하나요?", "a": "100자+ 구체 답변"},
    {"q": "밤이나 새벽에 아이가 떠났을 때도 픽업이 되나요?", "a": "100자+"},
    {"q": "장례 전까지 아이 몸은 어떻게 두어야 하나요?", "a": "100자+"},
    {"q": "강아지 장례 비용은 얼마인가요?", "a": "100자+. 단가 단정 금지"},
    {"q": "${keyword} 상담은 어떻게 하나요?", "a": "100자+. ${KAKAO_CTA_HINT}"},
    {"q": "화장 후 유골은 언제 받을 수 있나요?", "a": "80자+"}
  ],
  "ctaText": "{keyword} 상담 — 지역·체중만 알려 주세요"
}

AEO: FAQ는 실제 검색 질문처럼. 본문에 '{keyword}'와 '강아지장례'를 자연스럽게 반복. 브랜드 슬로건 반복 금지.`;
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
    title: String(data.title || `${keyword} | 절차·비용·준비 안내`),
    metaDescription: clampDesc(data.metaDescription || SITE.description),
    metaKeywords: String(
      data.metaKeywords ||
        `${keyword}, 강아지장례식장, 강아지장례, 24시장례, 긴급픽업, 강아지죽었을때`
    ),
    h1: String(data.h1 || `${keyword} 안내 — 절차와 준비`),
    heroSubtitle: String(
      data.heroSubtitle || "픽업·안치·화장·추모 순서를 정보로 정리했습니다"
    ),
    heroBadge: String(data.heroBadge || "절차 안내"),
    heroTitleLine1: keyword,
    heroTitleLine2: String(data.heroTitleLine2 || "절차 · 비용 · 준비"),
    heroBar: String(data.heroBar || "픽업·안치·화장·추모 순서를 정리했습니다."),
    sections,
    faqs,
    ctaText: String(data.ctaText || `${keyword} 상담 — 지역·체중만 알려 주세요`),
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
    heroBadge: partial.heroBadge || "절차 안내",
    heroTitleLine1: partial.heroTitleLine1 || partial.keyword,
    heroTitleLine2: partial.heroTitleLine2 || "절차 · 비용 · 준비",
    heroBar: partial.heroBar || "픽업·안치·화장·추모 순서를 정리했습니다.",
    sections: partial.sections,
    faqs: partial.faqs,
    images: pickImages(3, Date.now() % 100000),
    ctaText: partial.ctaText,
    createdAt: now,
    updatedAt: now,
  };
}
