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
  "{kw} | 절차·비용·준비 안내",
  "{kw} 알아보기 | 픽업·화장·추모",
  "{kw}, 보호자가 확인하면 좋은 점",
];

const METAS = [
  "{kw} 안내. 아이 몸 두기, 픽업·안치·화장 순서, 비용이 달라지는 항목을 정리했습니다. 지역·체중만 알려 주시면 상담으로 이어집니다.",
  "{kw}에서 강아지장례를 알아볼 때 확인할 점 — 준비물, 24시 픽업, 화장·유골 수습, 추모 선택. 견적은 체중·옵션에 따라 달라집니다.",
  "{kw} 정보 가이드. 갑작스러운 이별 뒤 바로 해야 할 일과 하지 않아도 되는 일을 구분해 안내합니다. 카카오톡으로 지역 상담이 가능합니다.",
];

const H1S = [
  "{kw} 안내 — 절차와 준비",
  "{kw}에서 알아보는 강아지장례",
  "{kw} 비용·순서·준비물",
];

const HERO_SUB = [
  "픽업·안치·화장·추모 순서를 정보로 정리했습니다",
  "체중·옵션에 따라 달라지는 비용 항목을 먼저 확인하세요",
  "아이 몸 두기부터 유골 수습까지, 보호자가 확인할 점",
];

const INTRO_H2 = [
  "{kw}를 찾을 때 먼저 알면 좋은 점",
  "{kw} 이용 전 아이 몸 두기와 준비",
  "{kw}, 보호자가 확인하는 기본 정보",
];

const FLOW_H2 = [
  "강아지장례는 보통 이렇게 진행됩니다",
  "{kw} 기준 장례·화장 순서",
  "픽업부터 유골 수습까지 진행 흐름",
];

const TRUST_H2 = [
  "{kw} 비용이 달라지는 이유",
  "강아지장례식장 선택 시 확인할 항목",
  "{kw}, 견적에 포함되는지 물어보면 좋은 점",
];

const NEXT_H2 = [
  "{kw} 상담 시 준비하면 좋은 정보",
  "지역·체중만 알려도 {kw} 안내가 가능합니다",
  "{kw} 문의는 어떻게 하나요",
];

export function generateTemplateContent(keyword: string, pageIndex = 1): SeoPage {
  const seed = hash(`${keyword}|${pageIndex}|${SITE.brand}|info-rental-v1`);
  const kw = keyword.trim() || "강아지장례식장";
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
        `${kw}${obj} 검색하는 보호자 대부분은, 평소 장례를 알아보지 못한 채 갑작스럽게 절차를 확인하게 됩니다. 먼저 알면 좋은 것은 ‘지금 당장 화장해야 하는지’가 아니라, 아이 몸을 어떻게 두고 어떤 정보를 준비하면 상담이 빨라지는지입니다.`,
        `아이를 깨끗한 수건이나 담요로 감싸 직사광선을 피한 서늘한 곳에 둡니다. 비닐로 완전히 밀봉하거나 무리하게 옮길 필요는 없습니다. 옮기기 어렵다면 픽업을 요청하면 되고, 잠시 곁에 더 있고 싶다면 그 시간도 일정에 반영할 수 있습니다.`,
        `상담에 필요한 정보는 단순합니다. 거주 지역, 아이 대략적인 크기(체중), 희망 시간대입니다. 서류나 사전 예약이 없어도 ${kw} 안내를 받을 수 있습니다. 밤·새벽·주말도 24시 상담이 열리는 경우가 많습니다. ${KAKAO_CTA_HINT}`,
        `이 페이지는 특정 업체를 홍보하기보다 ${kw} 이용 전에 확인할 절차와 준비물을 정리한 안내입니다. 실제 일정·이동 거리·비용은 지역과 아이 상태에 따라 달라지므로, 아래 순서를 기준으로 상담에서 맞춰 보시면 됩니다.`,
      ],
    },
    {
      h2: fill(pick(FLOW_H2, seed + 1)),
      paragraphs: [
        `강아지장례는 보통 상담 → 픽업 또는 방문 → 안치 → 배웅 시간 → 화장 → 유골 수습·추모 순입니다. ${kw}${as} 알아보신다면, 이 순서를 기준으로 소요 시간과 이동 방법을 확인하면 이후 선택이 수월합니다.`,
        `픽업은 24시 상담으로 가능한 시간을 맞추는 경우가 많습니다. 방문이 가능하면 식장으로 직접 모시는 방식도 있습니다. 아이와 조금 더 있고 싶다면 안치 전 시간을 요청할 수 있고, 급히 진행해야 한다면 그날 일정부터 확인하면 됩니다.`,
        `화장 방식, 유골함, 추모 공간은 선택 항목입니다. ${kw} 이용 전에는 기본 진행에 무엇이 포함되고, 무엇이 추가 비용인지 구분해 듣는 것이 좋습니다. 견적과 예상 소요 시간을 확인한 뒤 진행 여부를 결정하시면 됩니다.`,
        `전국 상담이 가능한 안내가 많습니다. 방문이 어려우면 픽업 동선을, 직접 오고 싶으면 준비물과 도착 시간을 확인하세요. 최종 결정은 보호자님의 것입니다.`,
      ],
    },
    {
      h2: fill(pick(TRUST_H2, seed + 2)),
      paragraphs: [
        `${kw} 비용은 보통 체중(또는 크기), 화장 방식, 유골함·추모 옵션, 픽업 거리·시간에 따라 달라집니다. 단가를 페이지에 단정하지 않는 이유는 같은 키워드라도 아이마다 범위가 다르기 때문입니다.`,
        `상담 때 물어보면 좋은 항목은 기본 포함 범위, 추가 옵션 가격, 소요 시간, 유골 수습 시점, 야간·주말 픽업 가능 여부입니다. 견적 없이 진행을 재촉하는 안내는 피하고, 이해한 뒤에 다음 단계로 가는 것이 안전합니다.`,
        `식장을 고를 때는 이동 거리뿐 아니라 안치 공간, 배웅 가능 여부, 화장 후 안내 방식도 함께 보시면 됩니다. ${kw}${as} 검색하셨다면, 이 체크리스트를 기준으로 비교하시면 됩니다.`,
      ],
    },
    {
      h2: fill(pick(NEXT_H2, seed + 3)),
      paragraphs: [
        `${kw} 상담 시에는 지역, 아이 대략 크기, 희망 시간만 알려 주셔도 됩니다. 카카오톡 오픈채팅 또는 사이트 하단 문의로 접수할 수 있습니다. ${KAKAO_CTA_HINT}`,
        `급하시면 바로, 조금 정리를 하신 뒤여도 괜찮습니다. 24시 열려 있는 상담으로 픽업·안치·화장 가능 시간을 확인하시면 됩니다.`,
      ],
    },
  ];

  const faqs = [
    {
      q: `강아지가 세상을 떠났을 때 바로 장례를 해야 하나요?`,
      a: `반드시 즉시 진행해야 하는 것은 아닙니다. 아이를 수건으로 감싸 서늘한 곳에 두고, 지역과 아이 크기를 알려 주시면 ${kw} 기준으로 픽업·안치·화장 가능 시간을 안내받을 수 있습니다. 서류나 사전 예약이 없어도 상담이 가능합니다.`,
    },
    {
      q: `밤이나 새벽에 아이가 떠났을 때도 픽업이 되나요?`,
      a: `많은 경우 24시 픽업 상담이 가능합니다. 지금 계신 곳과 아이 크기만 알려 주시면 이동 가능한 시간을 안내받을 수 있습니다. 조금 더 곁에 있고 싶다면 그 시간도 일정에 반영하면 됩니다.`,
    },
    {
      q: `장례 전까지 아이 몸은 어떻게 두어야 하나요?`,
      a: `깨끗한 수건이나 담요로 감싸 직사광선을 피한 서늘한 곳에 두세요. 비닐로 완전히 밀봉할 필요는 없습니다. 옮기기 어렵다면 무리하지 마시고, 상담 시 픽업을 요청하시면 됩니다.`,
    },
    {
      q: `강아지 장례 비용은 얼마인가요?`,
      a: `체중, 화장 방식, 추모 옵션, 픽업 거리에 따라 달라집니다. ${kw} 이용 전에는 포함·미포함 항목과 범위를 먼저 확인하는 것이 좋습니다. 단가를 단정하기보다 상담에서 견적을 받으시면 됩니다.`,
    },
    {
      q: `${kw} 상담은 어떻게 하나요?`,
      a: `카카오톡 오픈채팅 또는 사이트 하단 문의로 접수합니다. 아이 이름·대략 크기·지역·희망 시간만 알려 주시면 ${kw} 기준으로 안내받을 수 있습니다. ${KAKAO_CTA_HINT}`,
    },
    {
      q: `화장 후 유골은 언제 받을 수 있나요?`,
      a: `화장이 끝나면 유골 수습과 유골함 전달이 이어집니다. 바로 모시고 가거나, 추모 방식을 확인한 뒤 결정해도 됩니다. 수습 시점은 상담 때 미리 확인하시면 됩니다.`,
    },
  ];

  const tweak = seed % 3;
  if (tweak === 1) {
    sections[0].paragraphs[0] = sections[0].paragraphs[0].replace(
      "상담이 빨라지는지입니다",
      "상담이 정확한지입니다"
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
    metaKeywords: `${kw}, 강아지장례식장, 강아지장례, 반려동물장례, 강아지화장, 펫장례, 24시장례, 긴급픽업, 강아지죽었을때, 반려견급사${
      geoKw ? `, ${geoKw}` : ""
    }`,
    h1,
    heroSubtitle,
    heroBadge: "절차 안내",
    heroTitleLine1: kw,
    heroTitleLine2: "절차 · 비용 · 준비",
    heroBar: "픽업·안치·화장·추모 순서를 정리했습니다.",
    sections,
    faqs,
    images: pickImages(3, seed),
    ctaText: `${kw} 상담 — 지역·체중만 알려 주세요`,
    createdAt: now,
    updatedAt: now,
  };
}
