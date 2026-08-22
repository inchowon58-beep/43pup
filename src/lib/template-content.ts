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
  "{kw} | 두피문신 시술·교육 안내",
  "{kw}, 필릭스스칼프 상담",
  "디자인부터 보는 {kw}",
];

const METAS = [
  "{kw} 두피문신 시술과 교육을 필릭스스칼프에서 안내합니다. 디자인 상담 후 일정과 과정을 확인하세요.",
  "{kw}에서 헤어라인·정수리·밀도 보완을 알아보실 때, 시술 범위와 아카데미 과정을 함께 안내합니다.",
  "{kw} — 두피문신(SMP) 시술과 교육. 위생·디자인·사후관리를 기준으로 상담합니다.",
];

const H1S = [
  "{kw}, 시술 전에 디자인을 먼저",
  "두피문신부터 보는 {kw}",
  "{kw} 시술·교육 안내",
];

const HERO_SUB = [
  "시술과 교육을 함께 안내합니다. 디자인을 먼저 보세요",
  "헤어라인·정수리·밀도, 범위를 정한 뒤 진행합니다",
  "지역만 알려 주셔도 상담 일정을 안내합니다",
];

const INTRO_H2 = [
  "{kw}, 시술을 보기 전에",
  "{kw}에서 두피문신을 찾는 분들",
  "{kw} 시술과 교육의 차이",
];

const FLOW_H2 = [
  "{kw}에서 상담이 이어지는 순서",
  "디자인 상담 다음에 오는 {kw}",
  "시술·교육으로 이어지는 {kw}",
];

const TRUST_H2 = [
  "{kw}, 필릭스스칼프가 안내하는 기준",
  "위생과 디자인을 볼 때",
  "{kw} 비용이 한 줄로만 나올 때",
];

const NEXT_H2 = [
  "{kw} 상담을 여는 방법",
  "일정과 과정을 묻는 {kw}",
  "{kw}에서 다음 단계로 가는 법",
];

export function generateTemplateContent(keyword: string, pageIndex = 1): SeoPage {
  const seed = hash(`${keyword}|${pageIndex}|${SITE.brand}|smpinfo-v1`);
  const kw = keyword.trim() || "두피문신";
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
        `${kw}${obj} 찾는 분들은 대개 시술 결과와 교육 과정 중 어디를 먼저 볼지부터 알고 싶어 합니다. ${brand}는 두피문신 시술과 아카데미를 함께 운영합니다.`,
        `${kw}${as} 알아보실 때 흔한 질문은 헤어라인 선, 정수리 밀도, 기존 모발과의 조화입니다. 선을 먼저 정한 뒤 횟수와 일정을 안내합니다.`,
        `상담에 필요한 정보는 거주 지역과 시술 부위, 또는 교육 과정입니다. 서류가 없어도 ${kw} 일정을 안내받을 수 있습니다. ${KAKAO_CTA_HINT}`,
        `이 페이지는 ${kw}에서 두피문신을 알아보기 전, 시술·교육·사후관리를 정리한 안내입니다. 실제 가능한 일정·비용은 상담에서 맞춰 보시면 됩니다.`,
      ],
    },
    {
      h2: fill(pick(FLOW_H2, seed + 1)),
      paragraphs: [
        `${kw} 상담은 보통 디자인 보기 → 범위 정하기 → 시술 또는 교육 일정 → 사후관리 순입니다. 급하게 시술부터 진행하지 않습니다.`,
        `밀도, 헤어라인, 기존 모발 상태를 본 뒤 횟수를 정합니다. ‘한 번에 끝난다’만 반복되면 질문을 더 하세요.`,
        `방문이 가능하면 본점·아카데미 일정을 확인하고, 어렵다면 카카오톡으로 먼저 물어보세요. 결정은 본인의 것입니다.`,
        `${kw}${as} 검색하셨다면, 광고 문장보다 위생·디자인·사후관리가 설명되는지를 먼저 보는 것을 권합니다.`,
      ],
    },
    {
      h2: fill(pick(TRUST_H2, seed + 2)),
      paragraphs: [
        `${kw}에서 ${brand}가 말하는 기준은, 시술 범위를 숫자로 정하고, 교육 커리큘럼을 나누며, 사후관리가 남는지를 뜻합니다.`,
        `한 줄 견적만 있는 곳은 부위·횟수가 빠지기 쉽습니다. 상담 때 물어보면 좋은 질문은 시술 부위, 예상 횟수, 교육 일정, 관리 방법입니다.`,
        `사진이 아직 준비 중이면 컬러 자리로 구성을 보여 드립니다. ${kw}${as} 찾아오신 분은 카카오톡으로 일정만 물어보셔도 됩니다.`,
      ],
    },
    {
      h2: fill(pick(NEXT_H2, seed + 3)),
      paragraphs: [
        `${kw} 상담 시에는 지역과 시술 부위, 또는 교육 과정만 알려 주셔도 됩니다. 카카오톡 오픈채팅 또는 사이트 하단 문의로 접수할 수 있습니다. ${KAKAO_CTA_HINT}`,
        `시술·교육 사진을 더 보고 싶으시면 메인 갤러리의 ‘두피문신 시술 사진보기’로 이동해 주세요. 확인이 필요한 항목이 있으면 바로 물어보시면 됩니다.`,
      ],
    },
  ];

  const faqs = [
    {
      q: `여기는 어떤 곳인가요?`,
      a: `필릭스스칼프는 두피문신 시술과 교육을 함께 하는 스튜디오입니다. ${kw}로 찾으시는 분께는 디자인 상담과 아카데미 과정을 안내합니다.`,
    },
    {
      q: `두피문신 시술은 어떻게 진행되나요?`,
      a: `두피 상태와 원하는 선을 보고 범위를 정한 뒤 시술합니다. ${kw} 상담에서 헤어라인·정수리·밀도 중 어디를 볼지 먼저 정합니다.`,
    },
    {
      q: `두피문신 교육도 하나요?`,
      a: `합니다. 아카데미 본점·평택점에서 SMP 기술·디자인·위생을 교육합니다. ${kw}로 교육만 문의하셔도 됩니다.`,
    },
    {
      q: `시술 비용은 얼마인가요?`,
      a: `부위·밀도·횟수에 따라 달라집니다. ${kw} 이용 전에는 한 줄 견적보다 범위를 먼저 보는 것이 좋습니다. 단가를 단정하지 않습니다.`,
    },
    {
      q: `${kw} 상담은 어떻게 하나요?`,
      a: `카카오톡 오픈채팅 또는 사이트 하단 문의로 접수합니다. 지역·시술 부위 또는 교육 과정만 알려 주시면 ${kw} 기준으로 일정을 안내받을 수 있습니다. ${KAKAO_CTA_HINT}`,
    },
    {
      q: `사진은 어디서 보나요?`,
      a: `메인 갤러리에서 두피문신 시술·교육 사진 자리를 보실 수 있습니다. 글 중간에 있는 사진보기 버튼으로도 바로 이동할 수 있습니다.`,
    },
  ];

  const tweak = seed % 3;
  if (tweak === 2) {
    sections[2].paragraphs[0] = sections[2].paragraphs[0].replace(
      "뜻합니다",
      "의미합니다"
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
    metaKeywords: `${kw}, 두피문신, SMP, 두피문신교육, 두피문신시술, 스칼프문신, 필릭스스칼프${
      geoKw ? `, ${geoKw}` : ""
    }`,
    h1,
    heroSubtitle,
    heroBadge: "시술 · 교육",
    heroTitleLine1: kw,
    heroTitleLine2: "필릭스스칼프",
    heroBar: "시술과 교육을 함께 안내합니다. 디자인을 먼저 보세요.",
    sections,
    faqs,
    images: pickImages(3, seed),
    ctaText: `${kw} 상담 — 시술 부위 또는 교육 과정만 알려 주세요`,
    createdAt: now,
    updatedAt: now,
  };
}
