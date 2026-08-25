import { SITE, KAKAO_CTA_HINT } from "./site";

export type FaqItem = { q: string; a: string };

/** 메인·AEO용 자주 묻는 질문 — 메인쿤분양 */
export const HOME_FAQS: FaqItem[] = [
  {
    q: "메인가드너는 어떤 곳인가요?",
    a: "메인쿤분양을 키우는 자리 기준으로 안내하는 곳입니다. 특징·크기·성격·분양가를 정리하고, 아이들 얼굴을 정원에서 먼저 보여 드립니다. 가정에 맞는 아이는 상담에서 맞춰 드립니다.",
  },
  {
    q: "메인쿤은 어떤 성격인가요?",
    a: "사람 곁에 머물고, 낮고 깊은 소리로 말하듯 웁니다. 아이·다른 반려동물과 지내는 개체가 많습니다. 개체 차는 있어, 지금 만날 아이 기질을 상담에서 안내합니다.",
  },
  {
    q: "메인쿤 크기는 어느 정도인가요?",
    a: "수컷 성체 6~12kg, 암컷 4~8kg 전후의 대형묘입니다. 2~4년에 걸쳐 천천히 자라므로, 지금 아기 모습이 아니라 성체 크기를 기준으로 공간을 보시면 됩니다.",
  },
  {
    q: "메인쿤 분양가는 얼마인가요?",
    a: "혈통·성별·털색·시기에 따라 폭이 있습니다. 페이지에 단가를 박지 않고, 상담에서 범위와 포함 항목을 먼저 맞춥니다.",
  },
  {
    q: "분양 중인 아이는 사진을 볼 수 있나요?",
    a: "네. 메인 갤러리에서 분양 중인 메인쿤 사진을 보실 수 있습니다. 얼굴이 남는 아이가 있으면 이어서 물어보시면 됩니다.",
  },
  {
    q: "상담은 어떻게 하나요?",
    a: `관리자에서 카카오톡을 등록한 뒤 오픈채팅으로 이어집니다. ${KAKAO_CTA_HINT}`,
  },
];

export const EMERGENCY_HOWTO_STEPS = [
  {
    name: "아이 얼굴을 먼저 봅니다",
    text: "갤러리에서 메인쿤 모습을 확인합니다. 기억에 남는 아이가 있으면 메모해 두세요.",
  },
  {
    name: "집 이야기를 합니다",
    text: "지역, 희망 크기·성별, 아이와 함께 사는지 여부를 알려 주면 지금 만날 수 있는 아이를 안내받을 수 있습니다.",
  },
  {
    name: "일정을 맞춥니다",
    text: "등록된 카카오톡으로 질문을 이어 가면 방문·예약 가능 시간을 맞출 수 있습니다.",
  },
  {
    name: "만나고 결정합니다",
    text: "직접 보거나 추가 사진을 받은 뒤 입양 여부를 정합니다. 서두르지 않아도 됩니다.",
  },
  {
    name: "생활 안내를 받습니다",
    text: "첫 사료·빗질·화장실 포인트를 안내받은 뒤 집으로 모십니다.",
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
    name: "메인쿤분양을 진행하는 순서",
    description: "사진, 상담, 방문, 키우기 안내까지 메인가드너 메인쿤분양.",
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
  const sameAs = [SITE.kakaoOpenChatUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "PetStore",
    name: SITE.name,
    alternateName: [SITE.brand, SITE.brandEn, "메인쿤분양", "메인가드너"],
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
    priceRange: "메인쿤분양 상담",
    keywords: SITE.keywords.join(", "),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
