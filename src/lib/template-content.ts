import { SITE } from "./site";
import type { HugdaySite } from "./hugday-sites";
import { pickHugdayImages } from "./hugday-images";
import type { SeoPage } from "./seo-pages";
import { slugifyKeyword } from "./seo-pages";
import { eulReul, euroRo } from "./korean";
import { breedSeoSections } from "./hugday-guide";

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

const TITLES = [
  "{kw} | 포옹데이",
  "{kw}, 입양 전에 알아두면 좋은 이야기",
  "기질과 집을 맞춰 보는 {kw}",
];

const METAS = [
  "{kw} 안내. 기질·관리·집 환경을 확인하고 포옹데이에서 상담하세요.",
  "{kw} 입양 전 확인할 점입니다. 분양 가격은 혈통과 외모에 따라 달라 상담에서 맞춰 드립니다.",
  "{kw} — 사진과 생활 리듬을 함께 보는 포옹데이 안내입니다.",
];

const H1S = ["{kw}", "{kw}, 들이기 전에", "{kw} 포옹데이"];

const HERO_SUB = [
  "기질·관리·집 환경을 먼저 맞춰 보세요",
  "분양 가격은 혈통과 외모에 따라 달라, 상담에서 맞춰 보세요",
  "사진만 보고 결정하지 않아도 됩니다",
];

export function generateTemplateContent(
  keyword: string,
  pageIndex = 1,
  site?: HugdaySite
): SeoPage {
  const seed = hash(`${keyword}|${pageIndex}|${SITE.brand}|hugday-v2`);
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
    `이 글은 ${kw} 키워드로 찾는 분들을 위한 안내입니다. 위쪽에는 해당 견종·묘종의 기본 내용이, 아래에는 검색하신 주제가 이어집니다.`,
  ];
  const flows = [
    `${kw} 진행은 안내 읽기 → 아래 연락처로 문의 → 아이 확인 → 입양 순입니다. 지역이 어디든 편하게 알아보시면 됩니다.`,
    `분양 가격은 아이들의 혈통과 외모, 월령에 따라 달라집니다. 지금 만날 수 있는 아이와 포함 항목은 상담에서 맞춰 보시는 것이 가장 정확합니다.`,
    `문의는 페이지 아래 연락처로 이어집니다. 희망 시기와 가족 구성만 알려 주셔도 됩니다.`,
  ];
  const trusts = [
    `${kw}에서 ${brand}가 말하는 기준은, 기질을 숨기지 않고 관리 시간을 솔직히 적는 일입니다.`,
    `한 줄 가격만 있는 안내는 포함 항목이 빠지기 쉽습니다. 성별·월령·건강 기록을 함께 물어보세요.`,
    `무료분양만 강조되면 건강·서류를 따로 확인하세요. ${kw}${as} 찾아오신 분은 이 안내부터 보시면 됩니다.`,
  ];

  const keywordSections = [
    {
      h2: fill(pick(["{kw}로 검색하셨다면", "{kw}와 집 환경", "{kw} 기질부터"], seed)),
      paragraphs: [
        pick(intros, seed),
        pick(intros, seed + 1),
        `상담에는 희망 시기와 가족 구성만 알려 주셔도 됩니다. 아래 연락처로 지역과 관계없이 편하게 문의하세요.`,
        pick(trusts, seed),
      ],
    },
    {
      h2: fill(pick(["입양은 이렇게 흘러갑니다", "{kw}에서 만나는 순서", "사진 다음의 상담"], seed + 1)),
      paragraphs: [pick(flows, seed), pick(flows, seed + 1), pick(flows, seed + 2)],
    },
    {
      h2: fill(pick(["확인할 항목", "분양 가격이 달라질 때", "{kw}를 고르기 전에"], seed + 2)),
      paragraphs: [pick(trusts, seed + 1), pick(trusts, seed + 2)],
    },
  ];

  const faqs = [
    {
      q: `${kw} 상담은 어떻게 하나요?`,
      a: `페이지 아래 연락처로 편하게 문의하시면 됩니다. 지역이 어디든 희망 시기와 가족 구성만 알려 주셔도 안내받을 수 있습니다.`,
    },
    {
      q: `분양 가격은 어떻게 알아보면 되나요?`,
      a: `아이들의 혈통과 외모, 월령에 따라 달라집니다. 지금 만날 수 있는 아이와 포함 항목은 상담을 통해 알아보시는 것이 가장 정확합니다.`,
    },
    {
      q: `포옹데이는 어떤 사이트인가요?`,
      a: `포옹데이는 모든 견종·묘종 안내와 함께 보호소, 카페, 장례식장, 애견호텔, 유치원 등 반려동물 관련 정보를 제공하는 포털입니다. 상단 포옹데이를 누르면 전체 목록이 있는 메인으로 이동합니다.`,
    },
    {
      q: `초보 보호자와 맞나요?`,
      a: `관리 시간과 집 환경이 맞으면 가능합니다. ${kw} 안내에서 코트와 운동량을 먼저 보시면 선택이 분명해집니다.`,
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
    heroBadge: site ? `${site.keyword}안내` : "분양 안내",
    heroTitleLine1: kw,
    heroTitleLine2: "포옹데이",
    heroBar: "기질·관리·집 환경을 먼저 맞춰 보세요.",
    regionSlug: site?.slug,
    regionName: site?.name,
    sections: site ? [...breedSeoSections(site), ...keywordSections] : keywordSections,
    faqs,
    images: site ? pickHugdayImages(site, 3, String(seed)) : [],
    ctaText: `${kw} 상담 — 아래 연락처로 편하게 문의하세요`,
    createdAt: now,
    updatedAt: now,
  };
}
