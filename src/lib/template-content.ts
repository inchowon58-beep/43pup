import { SITE, KAKAO_CTA_HINT } from "./site";
import { pickImages } from "./images";
import type { SeoPage } from "./seo-pages";
import { slugifyKeyword } from "./seo-pages";
import { extractKeywordTheme, extractRegionFromKeyword } from "./region-parse";
import { getSubRegionNames } from "./sub-region-map";
import { getNearbyStationNames } from "./subway-map";

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
  "{kw} | 메종드두들 골든두들분양",
  "{kw}, 골든두들분양가와 키우기 안내",
  "버니두들분양까지 비교하는 {kw}",
];

const METAS = [
  "{kw}에서 골든두들분양·버니두들분양을 고르는 안내입니다. 골든두들성격·골든두들크기·분양가를 정리했습니다. 문의 0505-464-1004.",
  "골든두들입양 전 확인할 점입니다. {kw} 골든두들키우기, 무료분양 광고 주의점, 사진 상담. 단가는 상담에서 안내합니다.",
  "{kw} 안내 — 골든두들분양과 버니두들분양을 비교해 보세요. 메종드두들 갤러리에서 아이 사진을 먼저 보세요.",
];

const H1S = [
  "{kw}, 골든두들분양 안내",
  "{kw}에서 고르는 골든두들입양",
  "골든두들크기까지 맞춰 보는 {kw}",
];

const HERO_SUB = [
  "골든두들분양·버니두들분양 사진을 보고 조건을 정해 보세요",
  "골든두들성격, 골든두들크기, 키우기 포인트를 먼저 확인",
  "골든두들분양가와 포함 항목은 상담에서 맞춰 드립니다",
];

const INTRO_H2 = [
  "{kw}, 골든두들분양 전에",
  "골든두들키우기를 생각하며 보는 {kw}",
  "{kw}와 함께 보는 버니두들분양",
];

const FLOW_H2 = [
  "골든두들입양은 이렇게 이어집니다",
  "{kw}에서 아이를 만나는 순서",
  "사진 · 상담 · 방문 · 집으로",
];

const TRUST_H2 = [
  "{kw} 골든두들분양가가 달라지는 이유",
  "골든두들크기와 확인할 항목",
  "{kw}, 골든두들무료분양 광고를 볼 때",
];

const NEXT_H2 = [
  "{kw} 분양 상담을 여는 방법",
  "마음에 남는 아이를 물어보는 {kw}",
  "{kw}에서 입양을 이어 가는 법",
];

export function generateTemplateContent(keyword: string, pageIndex = 1): SeoPage {
  const seed = hash(`${keyword}|${pageIndex}|${SITE.brand}|maison-v1`);
  const kw = keyword.trim() || "골든두들분양";
  const brand = SITE.brand;
  const obj = eulReul(kw);
  const as = euroRo(kw);

  const fill = (s: string) => s.replace(/\{kw\}/g, kw).replace(/\{brand\}/g, brand);

  const title = fill(pick(TITLES, seed));
  const h1 = fill(pick(H1S, seed));
  const heroSubtitle = pick(HERO_SUB, seed);

  const sections = [
    {
      h2: fill(pick(INTRO_H2, seed)),
      paragraphs: [
        `${kw}${obj} 찾는 분들은 대부분 골든두들분양과 버니두들분양 중 어떤 아이가 맞는지부터 보고 싶어 합니다. 골든두들성격은 사람을 잘 따르고, 골든두들크기는 미니·미디엄·스탠다드로 나뉩니다.`,
        `사진을 보다가 눈이 머무는 아이가 있으면 메모해 두세요. 분양 중인 모습은 메인 갤러리에서도 이어서 보실 수 있습니다.`,
        `상담에 필요한 정보는 거주 지역, 희망 골든두들크기·성별, 아이와 함께 사는지 여부입니다. 서류가 없어도 ${kw} 안내를 받을 수 있습니다. ${KAKAO_CTA_HINT}`,
        `이 페이지는 ${kw}에서 골든두들입양 전, 성격·키우기·분양가를 정리한 안내입니다. 실제 가능 아이·골든두들분양가는 시기에 따라 달라지므로 상담에서 맞춰 보시면 됩니다.`,
      ],
    },
    {
      h2: fill(pick(FLOW_H2, seed + 1)),
      paragraphs: [
        `골든두들입양은 보통 사진 확인 → 상담 → 방문 또는 추가 사진 → 집으로 맞이하기 순입니다. ${kw}${as} 알아보신다면, 이 순서를 따라가면 부담이 줄어듭니다.`,
        `갤러리에서 아이 모습을 본 뒤, 원하는 색·성별·골든두들크기를 알려 주시면 지금 만날 수 있는 아이를 안내합니다. 급하셔도, 천천히 고르셔도 됩니다.`,
        `방문이 가능하면 일정을 맞추고, 어렵다면 전화(${SITE.phone}) 또는 카카오톡으로 사진을 더 받아 보실 수 있습니다. 결정은 보호자님의 것입니다.`,
        `집으로 올 때는 골든두들키우기 기본(사료·산책·미용)을 함께 안내합니다. ${kw}를 검색하셨다면, 사진부터 보신 뒤 상담을 여는 것을 권합니다.`,
      ],
    },
    {
      h2: fill(pick(TRUST_H2, seed + 2)),
      paragraphs: [
        `${kw} 골든두들분양가는 혈통, 세대, 골든두들크기, 시기에 따라 달라집니다. 단가를 페이지에 단정하지 않는 이유는 같은 키워드라도 아이마다 범위가 다르기 때문입니다.`,
        `상담 때 물어보면 좋은 항목은 지금 분양 가능한 아이, 성별·코트 타입, 포함 항목, 방문 가능 여부입니다. 견적 없이 결정을 재촉하지 않습니다.`,
        `골든두들무료분양 광고는 조건이 불명확한 경우가 많습니다. ${kw}${as} 검색하셨다면 건강·케어 범위를 기준으로 물어보세요.`,
      ],
    },
    {
      h2: fill(pick(NEXT_H2, seed + 3)),
      paragraphs: [
        `${kw} 상담 시에는 지역과 희망 조건만 알려 주셔도 됩니다. 전화 ${SITE.phone}, 카카오톡 오픈채팅 또는 사이트 하단 문의로 접수할 수 있습니다. ${KAKAO_CTA_HINT}`,
        `사진을 더 보고 싶으시면 메인 갤러리의 ‘분양중인 골든두들 사진보기’로 이동해 주세요. 골든두들분양·버니두들분양 중 마음이 가는 아이가 있으면 바로 물어보시면 됩니다.`,
      ],
    },
  ];

  const faqs = [
    {
      q: `골든두들은 어떤 성격인가요?`,
      a: `사람을 잘 따르고 온순한 편입니다. ${kw}로 찾으시는 분들은 아이·가족과 함께 지낼 반려견을 원하는 경우가 많습니다. 개체 차이는 상담에서 안내합니다.`,
    },
    {
      q: `털이 많이 빠지나요?`,
      a: `푸들 믹스라 빠지는 털이 비교적 적은 편입니다. 곱슬 코트는 빗질·미용 주기를 지키면 더 포근하게 유지됩니다.`,
    },
    {
      q: `아파트에서도 키울 수 있나요?`,
      a: `중형견으로 실내 생활이 가능한 경우가 많습니다. 산책과 사람과의 시간이 중요하니, 생활 패턴을 알려 주시면 ${kw} 기준으로 맞는 아이를 안내합니다.`,
    },
    {
      q: `골든두들 분양 비용은 얼마인가요?`,
      a: `크기·혈통·시기에 따라 달라집니다. ${kw} 이용 전에는 포함 항목과 범위를 상담에서 확인하는 것이 좋습니다. 단가를 단정하지 않습니다.`,
    },
    {
      q: `${kw} 상담은 어떻게 하나요?`,
      a: `카카오톡 오픈채팅 또는 사이트 하단 문의로 접수합니다. 지역·희망 크기만 알려 주시면 ${kw} 기준으로 안내받을 수 있습니다. ${KAKAO_CTA_HINT}`,
    },
    {
      q: `분양 중인 아이는 사진을 볼 수 있나요?`,
      a: `네. 메인 두들갤러리에서 분양 중인 골든두들 사진을 보실 수 있습니다. 글 중간에 있는 사진보기 버튼으로도 바로 이동할 수 있습니다.`,
    },
  ];

  const tweak = seed % 3;
  if (tweak === 1) {
    sections[0].paragraphs[0] = sections[0].paragraphs[0].replace(
      "중형견으로 알려져 있습니다",
      "가족 반려견으로 많이 찾습니다"
    );
  } else if (tweak === 2) {
    sections[2].paragraphs[0] = sections[2].paragraphs[0].replace(
      "달라집니다",
      "달라질 수 있습니다"
    );
  }

  const now = new Date().toISOString();
  const region = extractRegionFromKeyword(kw);
  const theme = extractKeywordTheme(kw);
  const areas = getSubRegionNames(region, 5);
  const stations = getNearbyStationNames(region, 5);
  const geoKw = [
    ...areas.map((a) => `${a} ${theme}`),
    ...stations.map((s) => `${s} ${theme}`),
  ].join(", ");

  let metaDescription = fill(pick(METAS, seed));
  if (areas.length || stations.length) {
    const nearBits = [...areas.slice(0, 3), ...stations.slice(0, 3)].slice(0, 4).join(" · ");
    metaDescription = `${metaDescription} ${nearBits} ${theme} 안내.`;
  }

  return {
    slug: slugifyKeyword(kw, `t${pageIndex}${seed.toString(36).slice(0, 4)}`),
    keyword: kw,
    title,
    metaDescription: clampDesc(metaDescription),
    metaKeywords: `${kw}, 골든두들분양, 버니두들분양, 골든두들분양가, 골든두들키우기, 골든두들성격, 골든두들입양, 골든두들무료분양, 골든두들크기, 메종드두들${
      geoKw ? `, ${geoKw}` : ""
    }`,
    h1,
    heroSubtitle,
    heroBadge: "분양 안내",
    heroTitleLine1: kw,
    heroTitleLine2: "메종드두들",
    heroBar: "골든두들분양·버니두들분양 사진을 보고 조건을 정해 보세요.",
    sections,
    faqs,
    images: pickImages(3, seed),
    ctaText: `${kw} 분양 상담 — 지역·희망 조건만 알려 주세요`,
    createdAt: now,
    updatedAt: now,
  };
}
