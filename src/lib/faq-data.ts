import { SITE, KAKAO_CTA_HINT } from "./site";

export type FaqItem = { q: string; a: string };

/** 메인·AEO용 자주 묻는 질문 — 메인쿤 분양 */
export const HOME_FAQS: FaqItem[] = [
  {
    q: "누가 운영·상담하나요?",
    a: "한국애견연맹 위원장이 운영하고, 고양이심사위원이 관리·상담합니다. 체형·코트·성격은 심사 기준으로 안내합니다.",
  },
  {
    q: "메인쿤은 어떤 성격인가요?",
    a: "사람을 잘 따르는 온순한 대형묘입니다. 아이·가족과 함께 지내기 좋아 첫 고양이로도 많이 찾습니다. 개체 차이는 상담에서 함께 봅니다.",
  },
  {
    q: "털 관리가 많이 필요하나요?",
    a: "장모라 정기 빗질이 필요합니다. 심사 라인의 링스 팁과 코트를 유지하려면 브러시 주기를 지켜 주시면 더 고와집니다.",
  },
  {
    q: "아파트에서도 키울 수 있나요?",
    a: "실내 생활이 가능한 경우가 많습니다. 체구가 커서 이동 공간과 캣타워를 넉넉히 두는 것이 좋습니다. 생활 패턴을 알려 주시면 맞는 아이를 안내합니다.",
  },
  {
    q: "메인쿤 분양 비용은 얼마인가요?",
    a: "혈통·세대·시기에 따라 달라집니다. 단가를 페이지에 단정하지 않고, 상담에서 범위와 포함 항목을 먼저 설명합니다.",
  },
  {
    q: "분양 중인 아이는 사진을 볼 수 있나요?",
    a: `네. 메인 갤러리에서 분양 중인 메인쿤 사진을 보실 수 있습니다. 마음에 남는 아이가 있으면 카카오톡으로 물어보세요. ${KAKAO_CTA_HINT}`,
  },
];

export const EMERGENCY_HOWTO_STEPS = [
  {
    name: "분양 사진을 먼저 봅니다",
    text: "갤러리에서 메인쿤 모습을 확인합니다. 마음에 남는 아이가 있으면 메모해 두세요.",
  },
  {
    name: "원하는 조건을 알려 줍니다",
    text: "지역, 희망 성별·코트, 아이와 함께 사는지 여부를 알려 주면 지금 만날 수 있는 아이를 안내받을 수 있습니다.",
  },
  {
    name: "심사위원 상담으로 일정을 맞춥니다",
    text: "카카오톡 오픈채팅으로 질문을 이어 가면 방문·예약 가능 시간을 맞출 수 있습니다.",
  },
  {
    name: "아이를 만나고 결정합니다",
    text: "직접 보거나 추가 사진을 받은 뒤 입양 여부를 결정합니다. 서두르지 않아도 됩니다.",
  },
  {
    name: "집으로 맞이합니다",
    text: "첫 식사·모래·브러시 포인트를 안내받은 뒤 가족이 되는 날을 엽니다.",
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
    name: "메인쿤 입양을 준비하는 순서",
    description:
      "분양 사진 보기, 심사위원 상담, 방문, 집으로 맞이하기까지 메인쿤 입양 안내.",
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
    "@type": "LocalBusiness",
    name: SITE.name,
    alternateName: [SITE.brand, SITE.brandEn, "메인쿤분양", "메인쿤분양 큰냥이네"],
    description: SITE.description,
    url: url || SITE.siteUrl,
    image: SITE.ogImage,
    ...(telephone ? { telephone } : {}),
    openingHours: "Mo-Su 00:00-23:59",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      streetAddress: SITE.address,
    },
    areaServed: SITE.areaServed,
    priceRange: "메인쿤 분양 상담",
    keywords: SITE.keywords.join(", "),
    sameAs: [SITE.kakaoOpenChatUrl],
  };
}
