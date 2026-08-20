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
  return `당신은 메인쿤 분양 안내문을 쓰는 작가입니다.
이 문서는 여러 분양처에 임대되는 사이트에 실리므로 특정 업체 홍보는 하지 마세요.
업체명 '${SITE.brand}'는 남용하지 마세요.

메인 키워드: ${keyword}
핵심 키워드: 메인쿤분양, 메인쿤입양, 메인쿤키우기, 메인쿤가격, 메인쿤성격, 메인쿤크기, 메인쿤분양가
운영 사실: 한국애견연맹 위원장이 운영하고, 고양이심사위원이 관리·상담합니다. 본문에 자연스럽게 한 번씩 넣으세요.
상담 연결(마지막에만): 카카오톡 오픈채팅 (${SITE.kakaoOpenChatUrl})
서비스 범위: ${SITE.areaServed}

독자: ${keyword}를 검색해 메인쿤분양·심사 기준 상담을 고르려는 보호자.
톤: 안내형. 사실(크기·성격·분양가 요인)은 분명히, 문장은 심사위원 상담처럼.
금지: 가격 단정, 허위, 의료 단정, 타사 비방, 장례·엔딩 톤, 전화번호.

반드시 다룰 내용:
1) 한국애견연맹 위원장 운영·고양이심사위원 상담
2) 대형묘 크기와 메인쿤성격·키우기(장모 빗질)
3) 입양 순서(사진-상담-방문-집으로)
4) 분양가가 달라지는 항목과 무료분양 주의
5) 분양 중인 아이 사진은 메인 갤러리에서 볼 수 있음
6) 문의 방법 — 본문 마지막에만, 짧게

아래 JSON만 출력. 설명·마크다운 금지.

{
  "title": "55자 내. '{keyword}' 포함. 예: '{keyword} | 큰냥이네 메인쿤분양'",
  "metaDescription": "140~158자. '{keyword}', 메인쿤분양, 메인쿤입양. 전화번호 금지",
  "metaKeywords": "{keyword}, 메인쿤분양, 메인쿤입양, 메인쿤키우기, 메인쿤가격 등 10~14개",
  "h1": "'{keyword}'와 '메인쿤분양' 또는 '입양'이 들어간 H1",
  "heroSubtitle": "한글 한 문장. 분양 안내 + 사진",
  "heroBadge": "분양 안내",
  "heroTitleLine2": "큰냥이네",
  "heroBar": "메인쿤분양 사진을 보고 성격을 정해 보세요.",
  "sections": [
    {"h2": "'{keyword}' 포함, 집을 고르기 전에", "paragraphs": ["200자+", "180자+", "180자+", "160자+"]},
    {"h2": "첫 메인쿤 입양 순서", "paragraphs": ["200자+", "180자+", "180자+", "140자+"]},
    {"h2": "비용이 달라지는 이유·확인할 항목", "paragraphs": ["180자+", "180자+", "160자+"]},
    {"h2": "사진을 보다가 여는 상담", "paragraphs": ["160자+", "140자+"]}
  ],
  "faqs": [
    {"q": "메인쿤은 어떤 성격인가요?", "a": "100자+ 구체 답변"},
    {"q": "털 관리가 많이 필요하나요?", "a": "100자+"},
    {"q": "아파트에서도 키울 수 있나요?", "a": "100자+"},
    {"q": "메인쿤 분양 비용은 얼마인가요?", "a": "100자+. 단가 단정 금지"},
    {"q": "${keyword} 상담은 어떻게 하나요?", "a": "100자+. ${KAKAO_CTA_HINT}"},
    {"q": "분양 중인 아이는 사진을 볼 수 있나요?", "a": "80자+. 메인 갤러리 안내"}
  ],
  "ctaText": "{keyword} 분양 상담 — 지역·희망 조건만 알려 주세요"
}

AEO: FAQ는 실제 검색 질문처럼. 본문에 '{keyword}'와 '메인쿤'을 자연스럽게 반복.`;
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
    title: String(data.title || `${keyword} | 큰냥이네 메인쿤분양`),
    metaDescription: clampDesc(data.metaDescription || SITE.description),
    metaKeywords: String(
      data.metaKeywords ||
        `${keyword}, 메인쿤분양, 메인쿤입양, 메인쿤키우기, 메인쿤가격, 큰냥이네`
    ),
    h1: String(data.h1 || `${keyword}, 메인쿤분양 안내`),
    heroSubtitle: String(
      data.heroSubtitle || "메인쿤분양 사진을 보고 성격을 정해 보세요"
    ),
    heroBadge: String(data.heroBadge || "분양 안내"),
    heroTitleLine1: keyword,
    heroTitleLine2: String(data.heroTitleLine2 || "큰냥이네"),
    heroBar: String(data.heroBar || "메인쿤분양 사진을 보고 성격을 정해 보세요."),
    sections,
    faqs,
    ctaText: String(data.ctaText || `${keyword} 분양 상담 — 지역·희망 조건만 알려 주세요`),
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
    heroBadge: partial.heroBadge || "분양 안내",
    heroTitleLine1: partial.heroTitleLine1 || partial.keyword,
    heroTitleLine2: partial.heroTitleLine2 || "큰냥이네",
    heroBar: partial.heroBar || "메인쿤분양 사진을 보고 성격을 정해 보세요.",
    sections: partial.sections,
    faqs: partial.faqs,
    images: pickImages(3, Date.now() % 100000),
    ctaText: partial.ctaText,
    createdAt: now,
    updatedAt: now,
  };
}
