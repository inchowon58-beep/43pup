import { SITE, KAKAO_CTA_HINT } from "./site";

export type FaqItem = { q: string; a: string };

/** 메인·AEO용 자주 묻는 질문 — 골든두들 분양 */
export const HOME_FAQS: FaqItem[] = [
  {
    q: "골든두들은 어떤 성격인가요?",
    a: "사람을 잘 따르고 온순한 편입니다. 아이·노인과 함께 지내기 좋아, 가족 반려견으로 많이 찾습니다. 개체마다 차이는 있어 상담 때 지금 만날 수 있는 아이 성격을 함께 안내합니다.",
  },
  {
    q: "털이 많이 빠지나요?",
    a: "푸들 믹스라 빠지는 털이 비교적 적은 편입니다. 다만 곱슬 코트는 빗질·미용 주기를 지켜 주시면 더 포근하게 유지됩니다.",
  },
  {
    q: "아파트에서도 키울 수 있나요?",
    a: "중형견으로 실내 생활이 가능한 경우가 많습니다. 산책과 사람과의 시간이 중요하니, 생활 패턴을 알려 주시면 맞는 아이를 안내합니다.",
  },
  {
    q: "골든두들 분양 비용은 얼마인가요?",
    a: "크기·혈통·시기에 따라 달라집니다. 단가를 페이지에 단정하지 않고, 상담에서 범위와 포함 항목을 먼저 설명합니다.",
  },
  {
    q: "분양 중인 아이는 사진을 볼 수 있나요?",
    a: `네. 메인 두들갤러리에서 분양 중인 골든두들 사진을 보실 수 있습니다. 마음에 남는 아이가 있으면 카카오톡으로 물어보세요. ${KAKAO_CTA_HINT}`,
  },
  {
    q: "상담은 어디로 하면 되나요?",
    a: `카카오톡 오픈채팅으로 분양·방문·사진 문의가 가능합니다. ${KAKAO_CTA_HINT}`,
  },
];

export const EMERGENCY_HOWTO_STEPS = [
  {
    name: "분양 사진을 먼저 봅니다",
    text: "두들갤러리에서 골든두들 모습을 확인합니다. 마음에 남는 아이가 있으면 메모해 두세요.",
  },
  {
    name: "원하는 조건을 알려 줍니다",
    text: "지역, 희망 크기·성별, 아이와 함께 사는지 여부를 알려 주면 지금 만날 수 있는 아이를 안내받을 수 있습니다.",
  },
  {
    name: "상담으로 일정을 맞춥니다",
    text: "카카오톡 오픈채팅으로 질문을 이어 가면 방문·예약 가능 시간을 맞출 수 있습니다.",
  },
  {
    name: "아이를 만나고 결정합니다",
    text: "직접 보거나 추가 사진을 받은 뒤 입양 여부를 결정합니다. 서두르지 않아도 됩니다.",
  },
  {
    name: "집으로 맞이합니다",
    text: "첫 사료·산책·미용 포인트를 안내받은 뒤 가족이 되는 날을 엽니다.",
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
    name: "골든두들 입양을 준비하는 순서",
    description:
      "분양 사진 보기, 상담, 방문, 집으로 맞이하기까지 골든두들 입양 안내.",
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

export function orgJsonLd(url?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    alternateName: [SITE.brand, SITE.brandEn, "골든두들분양"],
    description: SITE.description,
    url: url || SITE.siteUrl,
    image: SITE.ogImage,
    telephone: SITE.phone,
    openingHours: "Mo-Su 00:00-23:59",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      streetAddress: SITE.address,
    },
    areaServed: SITE.areaServed,
    priceRange: "골든두들 분양 상담",
    keywords: SITE.keywords.join(", "),
    sameAs: [SITE.kakaoOpenChatUrl],
  };
}
