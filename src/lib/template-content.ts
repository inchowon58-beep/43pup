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
  "{kw} | 지금 바로 할 일 · {brand}",
  "{kw} 24시 긴급안내 | {brand}",
  "지금 아이가 떠났다면 | {kw}",
];

const METAS = [
  "아이가 갑자기 세상을 떠났다면 혼자 결정하지 마세요. {kw} 24시 긴급 픽업·안치·화장 절차를 {brand}가 보호자의 마음으로 안내합니다. 카카오톡으로 지금 상담하세요.",
  "{kw} — 갑작스러운 이별 앞에서 지금 하실 일을 차분히 알려 드립니다. 24시 픽업부터 장례·화장·추모까지 {brand}가 곁에 있습니다. 오픈채팅 상담.",
  "지금 이 순간이 막막하시다면 {kw} 상담이 도움이 됩니다. {brand}는 긴급 픽업, 존중받는 장례, 투명한 절차를 24시 안내합니다. 카카오톡으로 연결하세요.",
];

const H1S = [
  "{kw}, 지금 바로 해야 할 일",
  "아이가 떠났다면 — {kw} 긴급 안내",
  "{kw}에서 보호자가 먼저 확인할 점",
];

const HERO_SUB = [
  "갑작스러운 이별 앞에서, 지금 하실 일을 차분히 안내합니다",
  "혼자 결정하지 마세요. 24시 긴급 상담이 열려 있습니다",
  "슬픈 마음 그대로, 다음 절차만 함께 정리해 드립니다",
];

const INTRO_H2 = [
  "{kw}, 지금 이 순간 보호자님이 하실 일",
  "아이가 갑자기 떠났을 때 {kw}에서 먼저 할 일",
  "{kw} 긴급 상황, 혼자 결정하지 마세요",
];

const FLOW_H2 = [
  "갑작스러운 이별 후 강아지장례는 이렇게 진행됩니다",
  "{kw} 강아지장례 순서 — 픽업부터 추모까지",
  "지금 연락하시면 이어지는 장례·화장 절차",
];

const TRUST_H2 = [
  "{brand}가 {kw}에서 지키는 약속",
  "힘든 순간에 신뢰를 드리는 {kw} 안내",
  "{kw}, 비용과 절차를 숨기지 않습니다",
];

const NEXT_H2 = [
  "{kw} 상담, 지금 바로 연결하는 방법",
  "오픈채팅으로 {kw} 긴급 상담하기",
  "{kw}에서 다음 한 걸음을 내딛는 법",
];

export function generateTemplateContent(keyword: string, pageIndex = 1): SeoPage {
  const seed = hash(`${keyword}|${pageIndex}|${SITE.brand}|emergency-v2`);
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
        `지금 아이가 숨을 거두었다면, 보호자님의 마음이 무너지는 것이 당연합니다. ${kw}${obj} 찾으시는 대부분의 보호자님도 같은 밤에, 같은 막막함으로 문을 두드립니다. ${brand}는 그 마음을 재촉하지 않습니다. 먼저 아이 곁에서 잠시 숨을 고르셔도 됩니다.`,
        `당장 하실 일은 생각보다 단순합니다. 아이를 깨끗한 수건이나 담요로 감싸 서늘한 곳에 두세요. 비닐로 완전히 밀봉하거나 급하게 옮기려 하지 않으셔도 됩니다. 아이 몸과 함께 계시는 동안 ${brand}가 픽업·안치·화장 일정을 대신 정리해 드립니다.`,
        `밤이든 새벽이든, 주말이든 상관없습니다. 카카오톡 오픈채팅으로 거주 지역과 “지금 아이가 떠났다”는 상황만 알려 주시면 ${kw} 기준으로 가장 빠른 다음 절차를 안내합니다. ${KAKAO_CTA_HINT}`,
        `서류가 없어도, 평소 장례를 알아보지 않으셨어도 괜찮습니다. 갑작스러운 이별은 준비할 겨를이 없습니다. ${brand}는 그 점을 전제로 상담합니다. 아이 이름, 대략적인 크기, 지금 계신 위치만 말씀해 주셔도 충분합니다.`,
      ],
    },
    {
      h2: fill(pick(FLOW_H2, seed + 1)),
      paragraphs: [
        `강아지장례는 보통 상담 → 긴급 픽업 또는 방문 → 안치 → 보호자 배웅 시간 → 화장 → 유골 수습·추모 순으로 이어집니다. ${kw}${as} 검색하셨다면, 지금 필요한 것은 이 순서를 혼자 외우는 일이 아니라 첫 연락입니다. 일정은 보호자님 호흡에 맞춰 조율합니다.`,
        `픽업이 급하시면 24시 상담으로 이동 가능한 시간을 바로 맞춰 드립니다. 잠시 아이와 더 있고 싶으시면 그 마음도 존중합니다. 서두르는 장례는 나중에 후회가 남을 수 있어, ${brand}는 배웅 시간을 충분히 드리겠습니다.`,
        `화장 방식, 유골함, 추모 예절은 상담 때 선택지를 투명하게 설명합니다. 비용이 갑자기 늘어나지 않도록 포함·미포함 항목을 먼저 말씀드립니다. ${kw} 이용을 고민 중이시라면, 견적과 소요 시간을 먼저 확인하신 뒤 진행 여부를 결정하시면 됩니다.`,
        `전국에서 상담이 가능합니다. 방문이 어려우면 픽업 동선을, 직접 오고 싶으시면 일정과 준비물을 안내합니다. 결정은 언제나 보호자님의 것입니다.`,
      ],
    },
    {
      h2: fill(pick(TRUST_H2, seed + 2)),
      paragraphs: [
        `${brand}의 기준은 단순합니다. 24시 긴급 대응, 숨기지 않는 비용, 아이를 물건처럼 다루지 않는 장례입니다. ${kw}${obj} 알아보시는 지금, 그 세 가지가 지켜지는지가 가장 중요합니다.`,
        `견적 없이 진행을 재촉하지 않습니다. 상담에서 규모·체중·선택 옵션에 따른 범위를 설명하고, 보호자님이 이해하신 뒤에만 다음 단계로 갑니다. 슬플수록 설명이 더 분명해야 한다는 것이 ${brand}의 약속입니다.`,
        `이별의 자리는 조용해야 합니다. 큰 소리, 서두르는 손길, 형식적인 위로 대신 아이와 보호자님이 마지막 시간을 가질 수 있게 자리를 비워 둡니다. ${kw}${as} 오시는 분들께도 같은 태도로 안내합니다.`,
      ],
    },
    {
      h2: fill(pick(NEXT_H2, seed + 3)),
      paragraphs: [
        `지금 바로 하실 일은 카카오톡 오픈채팅으로 상황을 한 줄 보내는 것입니다. “아이가 방금 떠났다”, 지역, 연락 가능한 시간만 적어도 ${kw} 상담이 시작됩니다. 홈페이지 문의 양식을 쓰셔도 됩니다.`,
        `${brand}는 마지막까지 곁에 있겠습니다. 급하시면 지금, 조금 숨을 고르신 뒤여도 괜찮습니다. 오픈채팅은 24시 열려 있습니다.`,
      ],
    },
  ];

  const faqs = [
    {
      q: `강아지가 갑자기 세상을 떠났는데 어떻게 해야 하나요?`,
      a: `아이를 깨끗한 수건으로 감싸 서늘한 곳에 두신 뒤, 카카오톡 오픈채팅으로 지역과 상황을 알려 주세요. ${brand}가 ${kw} 기준으로 픽업·안치·화장 순서를 바로 안내합니다. 서류나 사전 예약이 없어도 상담할 수 있습니다.`,
    },
    {
      q: `밤이나 새벽에 아이가 떠났을 때도 픽업이 되나요?`,
      a: `네. 24시 긴급 픽업 상담이 가능합니다. 오픈채팅에 지금 계신 곳과 아이 크기만 적어 주시면, 가장 빠른 이동 방법을 안내드립니다. 잠시 아이와 더 있고 싶으시면 그 시간도 맞춰 드립니다.`,
    },
    {
      q: `장례 전까지 아이 몸은 어떻게 두어야 하나요?`,
      a: `깨끗한 수건이나 담요로 감싸 직사광선을 피한 서늘한 곳에 두세요. 비닐로 완전히 밀봉할 필요는 없습니다. 옮기기 어렵다면 무리하지 마시고, 상담 시 픽업을 요청하시면 됩니다.`,
    },
    {
      q: `강아지 장례 비용은 얼마인가요?`,
      a: `체중, 화장 방식, 추모 옵션에 따라 달라집니다. ${brand}는 상담 때 포함·미포함 항목을 먼저 설명하고 범위를 안내합니다. 견적 없이 진행을 재촉하지 않으니, ${kw} 이용 전 오픈채팅으로 확인해 주세요.`,
    },
    {
      q: `${kw} 상담은 어떻게 하나요?`,
      a: `카카오톡 오픈채팅 또는 사이트 하단 문의로 접수합니다. 아이 이름·대략 크기·지역·희망 시간만 알려 주시면 ${brand}가 확인 후 안내합니다. ${KAKAO_CTA_HINT}`,
    },
    {
      q: `화장 후 유골은 언제 받을 수 있나요?`,
      a: `화장이 끝나면 유골 수습과 유골함 전달까지 안내합니다. 바로 모시고 가실 수도 있고, 추모 방식을 상담하신 뒤 결정하셔도 됩니다. 일정은 보호자님께 미리 말씀드립니다.`,
    },
  ];

  const tweak = seed % 3;
  if (tweak === 1) {
    sections[0].paragraphs[0] = sections[0].paragraphs[0].replace(
      "재촉하지 않습니다",
      "재촉하지 않고, 보호자님 속도에 맞춥니다"
    );
  } else if (tweak === 2) {
    sections[2].paragraphs[0] = sections[2].paragraphs[0].replace(
      "가장 중요합니다",
      "지켜져야 안심할 수 있습니다"
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
    heroBadge: "지금 긴급이라면",
    heroTitleLine1: kw,
    heroTitleLine2: "지금 바로 할 일",
    heroBar: "혼자 결정하지 마세요. 24시 안내합니다.",
    sections,
    faqs,
    images: pickImages(3, seed),
    ctaText: `지금 아이가 떠났다면, 카카오톡으로 24시 상담 — ${brand}`,
    createdAt: now,
    updatedAt: now,
  };
}
