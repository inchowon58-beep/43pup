import { SITE, KAKAO_CTA_HINT } from "./site";

export type FaqItem = { q: string; a: string };

export const HOME_FAQS: FaqItem[] = [
  {
    q: "포옹데이는 어떤 곳인가요?",
    a: "견종·묘종·보호소마다 별도의 사이트로 분양 전 기질과 관리를 안내합니다. 한 디자인 안에서 내용만 품종에 맞게 달라집니다.",
  },
  {
    q: "분양가는 얼마인가요?",
    a: "시기와 개체에 따라 달라 페이지에 단가를 박지 않습니다. 상담에서 포함 항목부터 맞춰 드립니다.",
  },
  {
    q: "상담은 어떻게 하나요?",
    a: `입점된 사이트의 연락처로 문의하시면 됩니다. ${KAKAO_CTA_HINT}`,
  },
  {
    q: "입점대기중이면 어떻게 보이나요?",
    a: "해당 서브도메인 관리자에서 입점대기로 바꾸면 전화번호 대신 ‘입점대기중’ 안내가 노출됩니다.",
  },
];

export const EMERGENCY_HOWTO_STEPS = [
  { name: "품종 노트를 읽습니다", text: "체구·코트·기질이 집과 맞는지 이 페이지에서 먼저 확인합니다." },
  { name: "사진을 봅니다", text: "해당 견종·묘종 폴더 사진으로 분위기를 가늠합니다." },
  { name: "문의합니다", text: "전화 또는 공식 안내로 희망 시기만 알려 주셔도 됩니다." },
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
