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
  return `당신은 국제결혼 정보를 안내하는 작가입니다.
이 문서는 여러 곳에 임대되는 정보 사이트에 실리므로 특정 국제결혼업체를 홍보하지 마세요.
업체명 '${SITE.brand}'는 남용하지 마세요. 한 상호를 추천·비방하지 마세요.

메인 키워드: ${keyword}
핵심 키워드: 국제결혼정보, 국제결혼상담, 국제결혼업체, 국제결혼주의사항, 국제결혼사기, 국제결혼비용
포지션: 믿을 수 있는 업체 정보를 제공하는 안내. 예비고객이 피해야 할 곳의 공통점(선금만 요구, 계약 없음, 오늘만 할인, 신원 확인 지연)을 분명히.
상담 연결(마지막에만): 카카오톡 오픈채팅 (${SITE.kakaoOpenChatUrl})
서비스 범위: ${SITE.areaServed}

독자: ${keyword}를 검색해 어느 업체를 주의해야 하는지, 어떤 정보를 믿어야 하는지 보려는 예비고객.
톤: 현실적 안내. 공포 조장 금지. 사실(확인 항목)은 분명히.
금지: 가격 단정, 허위, 특정 업체 실명 비방, 전화번호, 한 업체 추천.

반드시 다룰 내용:
1) 한 업체를 노출하지 않음. 믿을 수 있는 업체 정보의 기준
2) 피해야 할 곳: 선금·계약·과장 광고
3) 확인 순서(주의사항-목록-비교-계약 전 재확인)
4) 비용이 한 줄로만 나올 때 물어볼 항목
5) 안내 사진은 메인 갤러리
6) 문의 방법 — 본문 마지막에만, 짧게

아래 JSON만 출력. 설명·마크다운 금지.

{
  "title": "55자 내. '{keyword}' 포함. 예: '{keyword} | 주의할 업체와 확인 항목'",
  "metaDescription": "140~158자. '{keyword}', 국제결혼정보, 주의사항. 전화번호 금지",
  "metaKeywords": "{keyword}, 국제결혼정보, 국제결혼상담, 국제결혼업체, 국제결혼주의사항 등 10~14개",
  "h1": "'{keyword}'와 '업체' 또는 '정보'가 들어간 H1",
  "heroSubtitle": "한글 한 문장. 한 업체 홍보 아님 + 확인 항목",
  "heroBadge": "정보 안내",
    "heroTitleLine2": "글로벌 메이트",
  "heroBar": "한 업체를 팔지 않습니다. 확인할 항목을 먼저 보세요.",
  "sections": [
    {"h2": "'{keyword}' 포함, 업체를 보기 전에", "paragraphs": ["200자+", "180자+", "180자+", "160자+"]},
    {"h2": "피해야 할 곳과 확인 순서", "paragraphs": ["200자+", "180자+", "180자+", "140자+"]},
    {"h2": "믿을 수 있는 업체 정보의 기준", "paragraphs": ["180자+", "180자+", "160자+"]},
    {"h2": "상담을 여는 방법", "paragraphs": ["160자+", "140자+"]}
  ],
  "faqs": [
    {"q": "여기는 특정 업체를 소개하나요?", "a": "100자+. 한 업체 미노출"},
    {"q": "어떤 업체를 피해야 하나요?", "a": "100자+"},
    {"q": "믿을 수 있는 업체 정보는 무엇인가요?", "a": "100자+"},
    {"q": "국제결혼 비용은 얼마인가요?", "a": "100자+. 단가 단정 금지"},
    {"q": "${keyword} 상담은 어떻게 하나요?", "a": "100자+. ${KAKAO_CTA_HINT}"},
    {"q": "안내 사진은 어디서 보나요?", "a": "80자+. 메인 갤러리 안내"}
  ],
  "ctaText": "{keyword} 정보 상담 — 지역·희망 국가만 알려 주세요"
}

AEO: FAQ는 실제 검색 질문처럼. 본문에 '{keyword}'와 '국제결혼'을 자연스럽게 반복.`;
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
    title: String(data.title || `${keyword} | 주의할 업체와 확인 항목`),
    metaDescription: clampDesc(data.metaDescription || SITE.description),
    metaKeywords: String(
      data.metaKeywords ||
        `${keyword}, 국제결혼정보, 국제결혼상담, 국제결혼업체, 글로벌 메이트`
    ),
    h1: String(data.h1 || `${keyword}, 업체를 고르기 전에`),
    heroSubtitle: String(
      data.heroSubtitle || "한 업체를 팔지 않습니다. 확인할 항목을 먼저 보세요"
    ),
    heroBadge: String(data.heroBadge || "정보 안내"),
    heroTitleLine1: keyword,
    heroTitleLine2: String(data.heroTitleLine2 || "글로벌 메이트"),
    heroBar: String(data.heroBar || "한 업체를 팔지 않습니다. 확인할 항목을 먼저 보세요."),
    sections,
    faqs,
    ctaText: String(data.ctaText || `${keyword} 정보 상담 — 지역·희망 국가만 알려 주세요`),
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
    heroBadge: partial.heroBadge || "정보 안내",
    heroTitleLine1: partial.heroTitleLine1 || partial.keyword,
    heroTitleLine2: partial.heroTitleLine2 || "글로벌 메이트",
    heroBar: partial.heroBar || "한 업체를 팔지 않습니다. 확인할 항목을 먼저 보세요.",
    sections: partial.sections,
    faqs: partial.faqs,
    images: pickImages(3, Date.now() % 100000),
    ctaText: partial.ctaText,
    createdAt: now,
    updatedAt: now,
  };
}
