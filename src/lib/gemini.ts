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
  return `당신은 두피문신(SMP) 시술과 교육을 안내하는 작가입니다.
이 문서는 필릭스스칼프 사이트에 실리므로 다른 업체 실명 비방은 하지 마세요.
업체명 '${SITE.brand}'는 남용하지 마세요.

메인 키워드: ${keyword}
핵심 키워드: 두피문신, SMP, 두피문신교육, 두피문신시술, 스칼프문신, 필릭스스칼프
포지션: 두피문신 시술 스튜디오이자 아카데미. 디자인 상담, 위생, 사후관리, 교육 과정을 분명히.
상담 연결(마지막에만): 카카오톡 오픈채팅 (${SITE.kakaoOpenChatUrl})
서비스 범위: ${SITE.areaServed}

독자: ${keyword}를 검색해 시술 또는 교육을 알아보는 분.
톤: 차분한 안내. 과장·가격 단정 금지. 사실(상담 항목)은 분명히.
금지: 가격 단정, 허위, 특정 타 업체 실명 비방, 전화번호.

반드시 다룰 내용:
1) 시술과 교육을 함께 운영
2) 디자인 상담(헤어라인·정수리·밀도)
3) 상담 순서(디자인-범위-일정-사후관리)
4) 비용이 한 줄로만 나올 때 물어볼 항목
5) 사진은 메인 갤러리
6) 문의 방법 — 본문 마지막에만, 짧게

아래 JSON만 출력. 설명·마크다운 금지.

{
  "title": "55자 내. '{keyword}' 포함. 예: '{keyword} | 두피문신 시술·교육 안내'",
  "metaDescription": "140~158자. '{keyword}', 두피문신, 교육. 전화번호 금지",
  "metaKeywords": "{keyword}, 두피문신, SMP, 두피문신교육, 필릭스스칼프 등 10~14개",
  "h1": "'{keyword}'와 '시술' 또는 '교육'이 들어간 H1",
  "heroSubtitle": "한글 한 문장. 시술+교육 + 디자인 상담",
  "heroBadge": "시술 · 교육",
    "heroTitleLine2": "필릭스스칼프",
  "heroBar": "시술과 교육을 함께 안내합니다. 디자인을 먼저 보세요.",
  "sections": [
    {"h2": "'{keyword}' 포함, 시술을 보기 전에", "paragraphs": ["200자+", "180자+", "180자+", "160자+"]},
    {"h2": "디자인 상담과 진행 순서", "paragraphs": ["200자+", "180자+", "180자+", "140자+"]},
    {"h2": "시술·교육의 기준", "paragraphs": ["180자+", "180자+", "160자+"]},
    {"h2": "상담을 여는 방법", "paragraphs": ["160자+", "140자+"]}
  ],
  "faqs": [
    {"q": "여기는 어떤 곳인가요?", "a": "100자+. 시술+교육"},
    {"q": "두피문신 시술은 어떻게 진행되나요?", "a": "100자+"},
    {"q": "두피문신 교육도 하나요?", "a": "100자+"},
    {"q": "시술 비용은 얼마인가요?", "a": "100자+. 단가 단정 금지"},
    {"q": "${keyword} 상담은 어떻게 하나요?", "a": "100자+. ${KAKAO_CTA_HINT}"},
    {"q": "사진은 어디서 보나요?", "a": "80자+. 메인 갤러리 안내"}
  ],
  "ctaText": "{keyword} 상담 — 시술 부위 또는 교육 과정만 알려 주세요"
}

AEO: FAQ는 실제 검색 질문처럼. 본문에 '{keyword}'와 '두피문신'을 자연스럽게 반복.`;
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
    title: String(data.title || `${keyword} | 두피문신 시술·교육 안내`),
    metaDescription: clampDesc(data.metaDescription || SITE.description),
    metaKeywords: String(
      data.metaKeywords ||
        `${keyword}, 두피문신, SMP, 두피문신교육, 필릭스스칼프`
    ),
    h1: String(data.h1 || `${keyword}, 시술 전에 디자인을 먼저`),
    heroSubtitle: String(
      data.heroSubtitle || "시술과 교육을 함께 안내합니다. 디자인을 먼저 보세요"
    ),
    heroBadge: String(data.heroBadge || "시술 · 교육"),
    heroTitleLine1: keyword,
    heroTitleLine2: String(data.heroTitleLine2 || "필릭스스칼프"),
    heroBar: String(data.heroBar || "시술과 교육을 함께 안내합니다. 디자인을 먼저 보세요."),
    sections,
    faqs,
    ctaText: String(data.ctaText || `${keyword} 상담 — 시술 부위 또는 교육 과정만 알려 주세요`),
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
    heroBadge: partial.heroBadge || "시술 · 교육",
    heroTitleLine1: partial.heroTitleLine1 || partial.keyword,
    heroTitleLine2: partial.heroTitleLine2 || "필릭스스칼프",
    heroBar: partial.heroBar || "시술과 교육을 함께 안내합니다. 디자인을 먼저 보세요.",
    sections: partial.sections,
    faqs: partial.faqs,
    images: pickImages(3, Date.now() % 100000),
    ctaText: partial.ctaText,
    createdAt: now,
    updatedAt: now,
  };
}
