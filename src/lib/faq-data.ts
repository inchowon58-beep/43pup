import { SITE, KAKAO_CTA_HINT } from "./site";

export type FaqItem = { q: string; a: string };

/** 메인·AEO용 자주 묻는 질문 — 두피문신 */
export const HOME_FAQS: FaqItem[] = [
  {
    q: "필릭스스칼프는 어떤 곳인가요?",
    a: "두피문신(SMP) 시술과 아카데미 교육을 함께 운영하는 스튜디오입니다. 본점 시술과 교육 과정을 상담에서 안내합니다.",
  },
  {
    q: "두피문신 시술은 어떻게 진행되나요?",
    a: "두피 상태와 원하는 선을 보고 범위를 정한 뒤 시술합니다. 헤어라인·정수리·밀도 보완 등 부위에 따라 횟수가 달라질 수 있습니다.",
  },
  {
    q: "두피문신 교육도 하나요?",
    a: "합니다. 필릭스스칼프 아카데미 본점·평택점에서 SMP 기술·디자인·위생을 교육합니다. 커리큘럼과 일정은 상담에서 안내합니다.",
  },
  {
    q: "시술 비용은 얼마인가요?",
    a: "부위·밀도·횟수에 따라 달라집니다. 한 줄로 단정하지 않고, 상담에서 범위를 본 뒤 안내합니다.",
  },
  {
    q: "시술 후 관리는 어떻게 하나요?",
    a: "세안·자외선·재방문 일정을 정리해 드립니다. 시술 직후 주의사항은 상담과 안내문에서 함께 받으실 수 있습니다.",
  },
  {
    q: "상담은 어떻게 하나요?",
    a: `시술 부위나 교육 과정만 알려 주셔도 됩니다. 카카오톡 오픈채팅 또는 사이트 하단 문의로 접수합니다. ${KAKAO_CTA_HINT}`,
  },
];

export const EMERGENCY_HOWTO_STEPS = [
  {
    name: "두피 상태와 원하는 선을 정리합니다",
    text: "헤어라인·정수리·밀도 중 어디를 보고 싶은지 메모해 두면 상담이 빨라집니다.",
  },
  {
    name: "디자인 상담을 받습니다",
    text: "얼굴형과 기존 모발을 보고 시술 범위와 횟수를 정합니다.",
  },
  {
    name: "시술 또는 교육 일정을 잡습니다",
    text: "본점 시술과 아카데미 과정 중 필요한 쪽을 선택합니다.",
  },
  {
    name: "사후관리를 따릅니다",
    text: "세안·자외선·재방문 일정을 안내받은 대로 진행합니다.",
  },
  {
    name: "궁금한 점은 다시 묻습니다",
    text: "카카오톡 오픈채팅으로 시술·교육 일정을 이어서 안내받을 수 있습니다.",
  },
] as const;

export function faqJsonLd(faqs: FaqItem[] = HOME_FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function howToJsonLd(pageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "두피문신 상담을 진행하는 순서",
    description:
      "디자인 상담, 시술 또는 교육 일정, 사후관리까지 필릭스스칼프 안내.",
    inLanguage: "ko-KR",
    totalTime: "PT2H",
    url: pageUrl || SITE.siteUrl,
    step: EMERGENCY_HOWTO_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function orgJsonLd(url?: string, telephone?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: SITE.name,
    alternateName: [SITE.brand, SITE.brandEn, "두피문신", "필릭스스칼프"],
    description: SITE.description,
    url: url || SITE.siteUrl,
    ...(SITE.ogImage ? { image: SITE.ogImage } : {}),
    ...(telephone ? { telephone } : {}),
    openingHours: "Mo-Su 10:00-20:00",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      streetAddress: SITE.address,
    },
    areaServed: SITE.areaServed,
    priceRange: "두피문신 시술 · 교육 상담",
    keywords: SITE.keywords.join(", "),
    sameAs: [SITE.kakaoOpenChatUrl],
  };
}
