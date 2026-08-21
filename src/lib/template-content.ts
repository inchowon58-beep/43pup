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
  "{kw} | 주의할 업체와 확인 항목",
  "{kw}, 믿을 수 있는 업체 정보 안내",
  "피해야 할 곳부터 정리하는 {kw}",
];

const METAS = [
  "{kw}에서 어떤 업체를 주의해야 하는지, 믿을 수 있는 업체 정보는 어떻게 보는지 정리합니다. 한 업체를 홍보하지 않습니다.",
  "{kw} 예비고객이 실제 부딪히는 선금·계약·과장 광고 문제를 안내합니다. 확인 항목을 들고 상담하세요.",
  "{kw} — 오늘만 할인, 계약 없는 선금, 신원 확인 지연은 보류 신호입니다. 협회가 확인 목록을 제공합니다.",
];

const H1S = [
  "{kw}, 업체를 고르기 전에",
  "주의할 곳부터 보는 {kw}",
  "{kw} 믿을 수 있는 업체 정보",
];

const HERO_SUB = [
  "한 업체를 팔지 않습니다. 확인할 항목을 먼저 보세요",
  "선금·계약·신원 확인이 빠지면 보류하세요",
  "지역만 알려 주셔도 확인 목록을 안내합니다",
];

const INTRO_H2 = [
  "{kw}, 업체를 보기 전에",
  "예비고객이 먼저 겪는 {kw} 문제",
  "{kw}에서 피해야 할 공통점",
];

const FLOW_H2 = [
  "{kw}에서 정보를 확인하는 순서",
  "선금 전에 봐야 할 {kw} 항목",
  "비교·결정으로 이어지는 {kw}",
];

const TRUST_H2 = [
  "{kw}, 믿을 수 있는 업체 정보의 기준",
  "과장 광고와 한 줄 견적을 볼 때",
  "{kw} 비용이 한 줄로만 나올 때",
];

const NEXT_H2 = [
  "{kw} 상담을 여는 방법",
  "확인 목록을 들고 묻는 {kw}",
  "{kw}에서 다음 단계로 가는 법",
];

export function generateTemplateContent(keyword: string, pageIndex = 1): SeoPage {
  const seed = hash(`${keyword}|${pageIndex}|${SITE.brand}|globalwedding-v1`);
  const kw = keyword.trim() || "국제결혼정보";
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
        `${kw}${obj} 찾는 분들은 대개 ‘어느 업체가 괜찮은지’보다, 어디를 피해야 하는지를 먼저 알고 싶어 합니다. ${brand}는 한 업체를 전면에 노출하지 않고, 믿을 수 있는 업체 정보를 고르는 기준을 안내합니다.`,
        `${kw}${as} 알아보실 때 흔한 문제는 과도한 선금, 계약서 없는 진행, ‘오늘만 할인’으로 결정을 재촉하는 말투입니다. 이 세 가지가 겹치면 한 걸음 물러서는 것이 안전합니다.`,
        `상담에 필요한 정보는 거주 지역과 희망 국가입니다. 서류가 없어도 ${kw} 확인 목록을 받을 수 있습니다. ${KAKAO_CTA_HINT}`,
        `이 페이지는 ${kw}에서 업체를 고르기 전, 주의 신호와 확인 항목을 정리한 안내입니다. 실제 가능한 일정·비용 구성은 시기에 따라 달라지므로 상담에서 맞춰 보시면 됩니다.`,
      ],
    },
    {
      h2: fill(pick(FLOW_H2, seed + 1)),
      paragraphs: [
        `${kw} 확인은 보통 주의사항 읽기 → 확인 목록 받기 → 업체 정보 비교 → 계약 전 재확인 순입니다. 급하게 입금부터 하라는 진행은 순서를 건너뛴 경우가 많습니다.`,
        `상대 신원이 문서로 남는지, 통역이 따로 있는지, 만남 횟수가 숫자로 적히는지가 핵심입니다. ‘잘해 드립니다’만 반복되면 질문을 더 하세요.`,
        `방문이 가능하면 상담 장소를 확인하고, 어렵다면 카카오톡으로 확인 항목을 먼저 받아 보세요. 결정은 예비고객의 것입니다.`,
        `${kw}${as} 검색하셨다면, 광고 배너보다 환불·위약금 조항이 있는지를 먼저 보는 것을 권합니다.`,
      ],
    },
    {
      h2: fill(pick(TRUST_H2, seed + 2)),
      paragraphs: [
        `${kw}에서 말하는 믿을 수 있는 업체 정보란, 특정 상호를 외우라는 뜻이 아닙니다. 비용이 항공·숙박·통역·서류로 나뉘고, 상담 기록이 남으며, 사후 지원 범위가 설명되는지를 뜻합니다.`,
        `한 줄 견적만 있는 곳은 숨은 항목이 생기기 쉽습니다. 상담 때 물어보면 좋은 질문은 포함/불포함, 위약금, 만남 전 환불, 통역 배정입니다.`,
        `후기 이미지만 많고 사업자·주소가 불분명하면 보류하세요. ${kw}${as} 찾아오신 분은 확인 목록을 들고 비교하시면 됩니다.`,
      ],
    },
    {
      h2: fill(pick(NEXT_H2, seed + 3)),
      paragraphs: [
        `${kw} 상담 시에는 지역과 희망 국가만 알려 주셔도 됩니다. 카카오톡 오픈채팅 또는 사이트 하단 문의로 접수할 수 있습니다. ${KAKAO_CTA_HINT}`,
        `안내 사진을 더 보고 싶으시면 메인 갤러리의 ‘국제결혼 안내 사진보기’로 이동해 주세요. 확인이 필요한 항목이 있으면 바로 물어보시면 됩니다.`,
      ],
    },
  ];

  const faqs = [
    {
      q: `여기는 특정 업체를 소개하나요?`,
      a: `아닙니다. 한 국제결혼업체를 전면에 노출하지 않습니다. ${kw}로 찾으시는 분께는 주의 신호와 믿을 수 있는 업체 정보의 기준을 안내합니다.`,
    },
    {
      q: `어떤 업체를 피해야 하나요?`,
      a: `계약 없이 선금만 요구하거나, 오늘만 할인을 반복하거나, 상대 신원·체류 절차를 얼버무리는 곳은 보류하세요. ${kw} 상담 전에 이 세 가지를 먼저 보세요.`,
    },
    {
      q: `믿을 수 있는 업체 정보는 무엇인가요?`,
      a: `비용 항목이 나뉘고, 상담 기록이 남으며, 통역·만남 횟수·위약금이 설명되는 정보입니다. 상호 하나보다 설명이 되는지가 중요합니다.`,
    },
    {
      q: `국제결혼 비용은 얼마인가요?`,
      a: `국가·프로그램·포함 범위에 따라 달라집니다. ${kw} 이용 전에는 한 줄 견적을 쪼개 물어보는 것이 좋습니다. 단가를 단정하지 않습니다.`,
    },
    {
      q: `${kw} 상담은 어떻게 하나요?`,
      a: `카카오톡 오픈채팅 또는 사이트 하단 문의로 접수합니다. 지역·희망 국가만 알려 주시면 ${kw} 기준으로 확인 목록을 안내받을 수 있습니다. ${KAKAO_CTA_HINT}`,
    },
    {
      q: `안내 사진은 어디서 보나요?`,
      a: `메인 갤러리에서 국제결혼 안내 사진을 보실 수 있습니다. 글 중간에 있는 사진보기 버튼으로도 바로 이동할 수 있습니다.`,
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
    metaKeywords: `${kw}, 국제결혼정보, 국제결혼상담, 국제결혼업체, 국제결혼주의사항, 국제결혼사기, 국제결혼비용, 한국국제결혼협회${
      geoKw ? `, ${geoKw}` : ""
    }`,
    h1,
    heroSubtitle,
    heroBadge: "정보 안내",
    heroTitleLine1: kw,
    heroTitleLine2: "한국국제결혼협회",
    heroBar: "한 업체를 팔지 않습니다. 확인할 항목을 먼저 보세요.",
    sections,
    faqs,
    images: pickImages(3, seed),
    ctaText: `${kw} 정보 상담 — 지역·희망 국가만 알려 주세요`,
    createdAt: now,
    updatedAt: now,
  };
}
