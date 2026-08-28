import { SITE } from "./site";
import type { HugdaySite } from "./hugday-sites";
import { hubNavLabel } from "./hugday-sites";
import { pickHugdayImages } from "./hugday-images";
import type { SeoPage } from "./seo-pages";
import { slugifyKeyword } from "./seo-pages";
import { eulReul, euroRo, eunNeun } from "./korean";

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function clampDesc(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

const TITLE_TAILS = ["안심가이드", "완벽가이드", "안심파워 가이드", "입양 전 가이드", "보호자 가이드"];

const METAS = [
  "{kw} 안내. 기질·관리·집 환경을 확인하고 포옹데이에서 상담하세요.",
  "{kw}을 알아보실 때 혈통과 외모에 따른 차이는 상담에서 맞춰 보세요.",
  "{kw} — 입양 전에 보면 좋은 생활 리듬과 확인 항목을 정리했습니다.",
  "{kw} 검색 후 바로 결정하지 않으셔도 됩니다. 기질과 관리부터 안내합니다.",
];

const HERO_SUB = [
  "기질·관리·집 환경을 먼저 맞춰 보세요.",
  "분양 가격은 혈통과 외모에 따라 달라, 상담에서 맞춰 보세요.",
  "사진만 보고 결정하지 않아도 됩니다. 생활이 맞는지가 먼저입니다.",
  "아래 연락처로 지역과 관계없이 편하게 문의하실 수 있습니다.",
];

export function generateTemplateContent(
  keyword: string,
  pageIndex = 1,
  site?: HugdaySite
): SeoPage {
  const seed = hash(`${keyword}|${pageIndex}|${SITE.brand}|hugday-v3`);
  const kw = keyword.trim() || "분양 안내";
  const brand = SITE.brand;
  const obj = eulReul(kw);
  const as = euroRo(kw);
  const fill = (s: string) =>
    s.replace(/\{kw\}/g, kw).replace(/\{brand\}/g, brand).replace(/\{name\}/g, site?.name || kw);

  const tail = pick(TITLE_TAILS, seed);
  const h1 = `${kw} ${tail}`;
  const title = `${h1} | ${brand}`;
  const heroSubtitle = fill(pick(HERO_SUB, seed + pageIndex));

  const name = site?.name || "";
  const homeNeed = site?.homeNeed || "집 환경이 맞는지 먼저 보시면 됩니다.";
  const temper = site?.temperament || "기질을 사진만으로 단정하지 마세요.";
  const coat = site?.coat || "털 관리";

  const intros = [
    `${kw}${obj} 찾으실 때 흔한 실수는 예쁜 사진만 보고 하루 관리량을 건너뛰는 일입니다. ${name ? `${name}은 ` : ""}${temper} ${homeNeed}`,
    `${kw}${as} 알아보러 오셨다면, ${coat} 손질과 산책·놀이 시간이 생활과 맞는지부터 그려 보세요. 상담이 훨씬 짧아집니다.`,
    `${kw}는 한 번의 만남으로 끝나지 않습니다. 십 년 넘게 함께할 가족을 고르는 일이라, 무료·이벤트 문구보다 기록과 업력을 먼저 보시는 편이 안전합니다.`,
    `이 글은 ${kw}로 검색하신 분을 위한 안내입니다. 위쪽에는 ${name || "해당 품종"}을 처음 맞이할 때 알아두면 좋은 이야기를, 아래에는 지금 찾으신 주제를 이어서 적었습니다.`,
  ];
  const flows = [
    `${kw} 진행은 안내 읽기 → 아래 연락처로 문의 → 아이 확인 → 입양 순입니다. 지역이 어디든 편하게 알아보시면 됩니다.`,
    `지금 매장에 어떤 아이가 있는지는 글만으로 알 수 없습니다. ${kw} 상담에서 월령·건강 기록·포함 항목을 함께 맞춰 보세요.`,
    `희망 시기와 가족 구성만 알려 주셔도 됩니다. 급하게 결정하지 않는 것이 ${name || "아이"}와 보호자 모두를 위한 길입니다.`,
    `방문이 어려우시면 전화로 먼저 여쭤 보세요. ${kw}${as} 알아보는 길은 한 가지가 아닙니다.`,
  ];
  const prices = [
    `분양 가격은 아이들의 혈통과 외모, 월령에 따라 달라집니다. ${kw}도 예외가 아니니, 상담에서 지금 만날 수 있는 아이부터 안내받는 것이 가장 정확합니다.`,
    `같은 품종이라도 털색과 얼굴, 건강 기록에 따라 폭이 있습니다. 한 줄 금액만 보고 고르시면 포함 항목이 빠지기 쉽습니다.`,
    `무료분양·이벤트만 크게 적힌 안내는 조건을 숨기는 경우가 있습니다. ${kw}${as} 찾아오신 분은 메디컬 가입 여부를 꼭 물어보세요.`,
  ];
  const asks = [
    `문의는 페이지 아래 연락처로 이어집니다. ${kw} 희망 시기만 알려 주셔도 지역과 관계없이 안내받을 수 있습니다.`,
    `초보 보호자라면 ${coat}와 하루 운동량을 먼저 가늠해 보세요. ${homeNeed}`,
    `${brand}는 견종·묘종 안내와 보호소, 카페, 장례식장, 애견호텔, 유치원 등 반려동물 정보를 모으는 포털입니다. 상단 포옹데이나 ${site ? hubNavLabel(site) : "다른견종보기"}를 누르면 전체 목록으로 이동합니다.`,
  ];

  const keywordSections = [
    {
      h2: fill(pick(["{kw}로 검색하셨다면", "{kw}, 들이기 전에", "{kw}와 집 환경이 맞는지"], seed)),
      paragraphs: [pick(intros, seed), pick(intros, seed + 1), pick(intros, seed + 2)],
    },
    {
      h2: fill(pick(["{kw} 상담은 이렇게 이어집니다", "{kw}에서 만나는 순서", "사진 다음의 {kw} 상담"], seed + 1)),
      paragraphs: [pick(flows, seed), pick(flows, seed + 1), pick(flows, seed + 3)],
    },
    {
      h2: fill(pick(["{kw} 가격이 달라질 때", "{kw}를 고르기 전에 확인할 것", "혈통과 외모, 그리고 {kw}"], seed + 2)),
      paragraphs: [pick(prices, seed), pick(prices, seed + 1), pick(prices, seed + 2)],
    },
    {
      h2: fill(pick(["{kw} 문의는 편하게", "지역과 관계없이 {kw} 알아보기", "{kw} 보호자가 자주 묻는 것"], seed + 3)),
      paragraphs: [pick(asks, seed), pick(asks, seed + 1), pick(asks, seed + 2)],
    },
  ];

  const faqs = [
    {
      q: `${kw} 상담은 어떻게 하나요?`,
      a: `페이지 아래 연락처로 편하게 문의하시면 됩니다. 지역이 어디든 희망 시기와 가족 구성만 알려 주셔도 안내받을 수 있습니다.`,
    },
    {
      q: `${kw} 가격은 어떻게 알아보면 되나요?`,
      a: `아이들의 혈통과 외모, 월령에 따라 달라집니다. 지금 만날 수 있는 아이와 포함 항목은 상담을 통해 알아보시는 것이 가장 정확합니다.`,
    },
    {
      q: `${name || kw}${eunNeun(name || kw)} 초보 보호자와 맞나요?`,
      a: `${temper} ${homeNeed} 처음 키우신다면 하루 관리 시간을 먼저 그려 보시는 것이 좋습니다.`,
    },
    {
      q: `포옹데이는 어떤 사이트인가요?`,
      a: `포옹데이는 모든 견종·묘종 안내와 함께 보호소, 카페, 장례식장, 애견호텔, 유치원 등 반려동물 관련 정보를 제공하는 포털입니다. 상단 포옹데이나 ${site ? hubNavLabel(site) : "다른견종보기"}를 누르면 전체 목록이 있는 메인으로 이동합니다.`,
    },
  ];

  const now = new Date().toISOString();
  return {
    slug: slugifyKeyword(kw, `t${pageIndex}${seed.toString(36).slice(0, 4)}`),
    keyword: kw,
    title,
    metaDescription: clampDesc(fill(pick(METAS, seed + 4))),
    metaKeywords: `${kw}, ${name}, 포옹데이, 분양, 기질, 키우기, 입양, ${tail}`.replace(/, ,/g, ","),
    h1,
    heroSubtitle,
    heroBadge: site ? `${site.keyword}안내` : "분양 안내",
    heroTitleLine1: kw,
    heroTitleLine2: tail,
    heroBar: heroSubtitle,
    regionSlug: site?.slug,
    regionName: site?.name,
    sections: keywordSections,
    faqs,
    images: site ? pickHugdayImages(site, 3, String(seed)) : [],
    ctaText: `${kw} 상담 — 아래 연락처로 편하게 문의하세요`,
    createdAt: now,
    updatedAt: now,
  };
}
