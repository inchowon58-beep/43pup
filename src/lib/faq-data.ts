import { SITE, KAKAO_CTA_HINT } from "./site";

export type FaqItem = { q: string; a: string };

/** 메인·AEO용 자주 묻는 질문 — 국제결혼정보 */
export const HOME_FAQS: FaqItem[] = [
  {
    q: "여기는 특정 국제결혼업체를 소개하나요?",
    a: "아닙니다. 한 업체를 전면에 노출하지 않습니다. 확인할 항목과 피해야 할 유형을 정리하고, 믿을 수 있는 업체 정보를 기준으로 상담합니다.",
  },
  {
    q: "어떤 업체를 피해야 하나요?",
    a: "계약서 없이 선금만 요구하거나, ‘오늘만 할인’으로 결정을 재촉하거나, 상대 신원·체류 절차를 얼버무리는 곳은 보류하는 것이 안전합니다.",
  },
  {
    q: "믿을 수 있는 곳은 어떻게 보나요?",
    a: "비용이 항목별로 나뉘는지, 상담 기록이 남는지, 통역·만남 횟수·위약금이 설명되는지를 먼저 보세요. 설명이 짧을수록 리스크가 큽니다.",
  },
  {
    q: "국제결혼 비용은 얼마인가요?",
    a: "국가·프로그램·포함 범위에 따라 달라집니다. 한 줄 견적만 있는 곳은 항공·숙박·통역·서류 대행을 따로 물어보는 것이 좋습니다. 단가를 페이지에 단정하지 않습니다.",
  },
  {
    q: "허위 후기·소문은 어떻게 걸러 내나요?",
    a: "SNS 후기만 믿거나, 통장 이체만 요구하고 사업자·주소가 불분명한 곳은 위험 신호가 됩니다. 확인 목록을 들고 상담하시면 됩니다.",
  },
  {
    q: "상담은 어떻게 하나요?",
    a: `지역과 희망 국가만 알려 주셔도 됩니다. 카카오톡 오픈채팅 또는 사이트 하단 문의로 접수합니다. ${KAKAO_CTA_HINT}`,
  },
];

export const EMERGENCY_HOWTO_STEPS = [
  {
    name: "기본 정보와 주의 신호를 읽습니다",
    text: "선금·계약·신원 확인이 빠지는 유형을 먼저 알아 둡니다.",
  },
  {
    name: "지역·희망 국가를 정리합니다",
    text: "거주 지역과 알아보고 싶은 국가를 메모해 두면 확인 항목이 구체화됩니다.",
  },
  {
    name: "업체 정보를 기준으로 상담합니다",
    text: "카카오톡 오픈채팅으로 확인할 목록과 믿을 수 있는 업체 정보 안내를 받습니다.",
  },
  {
    name: "계약 전 항목을 다시 봅니다",
    text: "위약금, 환불, 만남 횟수, 통역, 사후 지원이 문서로 있는지 확인합니다.",
  },
  {
    name: "본인이 비교한 뒤 결정합니다",
    text: "협회는 결정을 대신하지 않습니다. 설명이 되는 정보를 기준으로 천천히 고르시면 됩니다.",
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
    name: "국제결혼 정보를 확인하는 순서",
    description:
      "주의사항 확인, 업체 정보 상담, 계약 전 항목 점검까지 국제결혼 예비고객 안내.",
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
    alternateName: [SITE.brand, SITE.brandEn, "국제결혼정보", "글로벌 메이트"],
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
    priceRange: "국제결혼 정보 상담",
    keywords: SITE.keywords.join(", "),
    sameAs: [SITE.kakaoOpenChatUrl],
  };
}
