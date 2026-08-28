import { SITE } from "./site";

export type FaqItem = { q: string; a: string };

export const HOME_FAQS: FaqItem[] = [
  {
    q: "포옹데이는 어떤 곳인가요?",
    a: "포옹데이는 모든 견종·묘종 안내와 함께 보호소, 카페, 장례식장, 애견호텔, 유치원 등 반려동물 관련 정보를 제공하는 포털입니다. 상단 포옹데이나 다른견종보기·다른묘종보기를 누르면 전체 목록이 있는 메인으로 이동합니다.",
  },
  {
    q: "원하는 견종·묘종은 어디서 보나요?",
    a: "아래 사이트 목록에서 해당 견종·묘종·보호소 페이지를 열어 주세요. 한 페이지에 모든 품종을 섞어 두지 않습니다.",
  },
  {
    q: "분양 가격은 어떻게 알아보면 되나요?",
    a: "아이들의 혈통과 외모, 월령에 따라 달라집니다. 지금 만날 수 있는 아이와 포함 항목은 상담을 통해 알아보시는 것이 가장 정확합니다.",
  },
  {
    q: "상담은 어떻게 하나요?",
    a: "페이지 아래 연락처로 편하게 문의하시면 됩니다. 지역이 어디든 희망 시기만 알려 주셔도 안내받을 수 있습니다.",
  },
];

export const EMERGENCY_HOWTO_STEPS = [
  { name: "품종 노트를 읽습니다", text: "체구·코트·기질이 집과 맞는지 이 페이지에서 먼저 확인합니다." },
  { name: "사진을 봅니다", text: "해당 견종·묘종 폴더 사진으로 분위기를 가늠합니다." },
  { name: "문의합니다", text: "페이지 아래 연락처로 지역과 관계없이 편하게 문의하시면 됩니다." },
  { name: "만남 후 결정합니다", text: "서두르지 않고 아이와 기록을 확인한 뒤 정합니다." },
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
    name: "포옹데이에서 분양 안내를 보는 순서",
    description: "품종 노트, 사진, 상담, 만남.",
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

export function orgJsonLd(url?: string, telephone?: string, name?: string) {
  const sameAs = [SITE.kakaoOpenChatUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "PetStore",
    name: name || SITE.name,
    alternateName: [SITE.brand, SITE.brandEn],
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
    priceRange: "분양 상담",
    keywords: SITE.keywords.join(", "),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
