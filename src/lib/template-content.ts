import { SITE, KAKAO_CTA_HINT } from "./site";
import { pickImages } from "./images";
import type { SeoPage } from "./seo-pages";
import { slugifyKeyword } from "./seo-pages";

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function hasBatchim(word: string): boolean {
  const ch = word[word.length - 1];
  if (!ch) return false;
  const code = ch.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
}

function eulReul(word: string): string {
  return hasBatchim(word) ? "을" : "를";
}

function euroRo(word: string): string {
  const ch = word[word.length - 1];
  if (!ch) return "로";
  const code = ch.charCodeAt(0);
  if (code >= 0xac00 && code <= 0xd7a3) {
    const jong = (code - 0xac00) % 28;
    if (jong === 0 || jong === 8) return "로";
  }
  return hasBatchim(word) ? "으로" : "로";
}

function clampDesc(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

const TITLES = [
  "{kw} | 포옹데이",
  "{kw}, 입양 전에 적는 노트",
  "기질과 집을 맞춰 보는 {kw}",
];

const METAS = [
  "{kw} 안내. 기질·관리·집 환경을 확인하고 포옹데이에서 상담하세요.",
  "{kw} 입양 전 확인할 점입니다. 분양가는 상담에서 포함 항목부터 맞춥니다.",
  "{kw} — 사진과 생활 리듬을 함께 보는 포옹데이 노트입니다.",
];

const H1S = ["{kw}", "{kw}, 들이기 전에", "{kw} 포옹데이"];

const HERO_SUB = [
  "기질·관리·집 환경을 먼저 맞춰 보세요",
  "분양가 단가보다 포함 항목을 먼저 확인",
  "사진만 보고 결정하지 않아도 됩니다",
];

export function generateTemplateContent(keyword: string, pageIndex = 1): SeoPage {
  const seed = hash(`${keyword}|${pageIndex}|${SITE.brand}|hugday-v1`);
  const kw = keyword.trim() || "분양 안내";
  const brand = SITE.brand;
  const obj = eulReul(kw);
  const as = euroRo(kw);
  const fill = (s: string) => s.replace(/\{kw\}/g, kw).replace(/\{brand\}/g, brand);

  const title = fill(pick(TITLES, seed));
  const h1 = fill(pick(H1S, seed));
  const heroSubtitle = pick(HERO_SUB, seed);

  const intros = [
    `${kw}${obj} 찾을 때 흔한 실수는 사진 속 얼굴만 보고 생활 리듬을 건너뛰는 일입니다. ${brand}는 기질과 관리부터 적습니다.`,
    `${kw}${as} 알아보실 때 체구·코트·하루 운동량이 집과 맞는지부터 보시면 상담이 짧아집니다.`,
    `이 글은 ${kw} 전용 노트입니다. 다른 견종·묘종 페이지와 문장을 나눠 두었습니다.`,
  ];
  const flows = [
    `${kw} 진행은 노트 읽기 → 문의 → 아이 확인 → 입양 순입니다. 급하게 결정하지 않아도 됩니다.`,
    `분양가는 시기·개체에 따라 달라 이 글에 단가를 박지 않습니다. 상담에서 포함 항목부터 맞춰 드립니다.`,
    `연락처는 입점 후 이 사이트에 표시됩니다. 이 페이지는 ${kw}만 다룹니다.`,
  ];
  const trusts = [
    `${kw}에서 ${brand}이 말하는 기준은, 기질을 숨기지 않고 관리 시간을 솔직히 적는 일입니다.`,
    `한 줄 가격만 있는 안내는 포함 항목이 빠지기 쉽습니다. 성별·월령·건강 기록을 함께 물어보세요.`,
    `무료분양만 강조되면 건강·서류를 따로 확인하세요. ${kw}${as} 찾아오신 분은 이 노트부터 보시면 됩니다.`,
  ];

  const sections = [
    {
      h2: fill(pick(["{kw}, 들이기 전에", "{kw}와 집 환경", "{kw} 기질부터"], seed)),
      paragraphs: [
        pick(intros, seed),
        pick(intros, seed + 1),
        `상담에는 희망 시기와 가족 구성만 알려 주셔도 됩니다. ${KAKAO_CTA_HINT}`,
        pick(trusts, seed),
      ],
    },
    {
      h2: fill(pick(["입양은 이렇게 흘러갑니다", "{kw}에서 만나는 순서", "사진 다음의 상담"], seed + 1)),
      paragraphs: [pick(flows, seed), pick(flows, seed + 1), pick(flows, seed + 2)],
    },
    {
      h2: fill(pick(["확인할 항목", "분양가가 갈릴 때", "{kw} FAQ 전에"], seed + 2)),
      paragraphs: [pick(trusts, seed + 1), pick(trusts, seed + 2)],
    },
  ];

  const faqs = [
    {
      q: `여기는 어떤 곳인가요?`,
      a: `${brand}는 견종·묘종·보호소마다 다른 사이트로 안내합니다. 이 글은 ${kw} 전용입니다.`,
    },
    {
      q: `${kw} 상담은 어떻게 하나요?`,
      a: `입점된 사이트의 연락처 또는 공식 안내로 희망 시기만 알려 주셔도 됩니다. ${KAKAO_CTA_HINT}`,
    },
    {
      q: `분양가는 얼마인가요?`,
      a: `시기와 개체에 따라 달라 단가를 박지 않습니다. ${kw} 상담에서 포함 항목부터 맞춥니다.`,
    },
    {
      q: `초보 보호자와 맞나요?`,
      a: `관리 시간과 집 환경이 맞으면 가능합니다. ${kw} 노트에서 코트·운동량을 먼저 보세요.`,
    },
  ];

  const now = new Date().toISOString();
  return {
    slug: slugifyKeyword(kw, `t${pageIndex}${seed.toString(36).slice(0, 4)}`),
    keyword: kw,
    title,
    metaDescription: clampDesc(fill(pick(METAS, seed))),
    metaKeywords: `${kw}, 포옹데이, 분양, 기질, 키우기, 입양`,
    h1,
    heroSubtitle,
    heroBadge: "분양 안내",
    heroTitleLine1: kw,
    heroTitleLine2: "포옹데이",
    heroBar: "기질·관리·집 환경을 먼저 맞춰 보세요.",
    sections,
    faqs,
    images: pickImages(3, seed),
    ctaText: `${kw} 상담 — 희망 시기만 알려 주세요`,
    createdAt: now,
    updatedAt: now,
  };
}
