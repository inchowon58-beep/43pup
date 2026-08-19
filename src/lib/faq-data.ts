import { SITE, KAKAO_CTA_HINT } from "./site";

export type FaqItem = { q: string; a: string };

/** 메인·AEO용 자주 묻는 질문 — 긴급 상황 중심 */
export const HOME_FAQS: FaqItem[] = [
  {
    q: "강아지가 갑자기 세상을 떠났는데 어떻게 해야 하나요?",
    a: `아이를 깨끗한 수건으로 감싸 서늘한 곳에 두신 뒤, 카카오톡 오픈채팅으로 지역과 상황을 알려 주세요. ${SITE.name}가 24시 픽업·안치·화장 순서를 바로 안내합니다. 서류나 사전 예약이 없어도 됩니다.`,
  },
  {
    q: "밤이나 새벽에 아이가 떠났을 때도 픽업이 되나요?",
    a: "네. 24시 긴급 픽업 상담이 가능합니다. 지금 계신 곳과 아이 크기만 알려 주시면 가장 빠른 이동 방법을 안내드립니다. 잠시 아이와 더 있고 싶으시면 그 시간도 맞춰 드립니다.",
  },
  {
    q: "장례 전까지 아이 몸은 어떻게 두어야 하나요?",
    a: "깨끗한 수건이나 담요로 감싸 직사광선을 피한 서늘한 곳에 두세요. 비닐로 완전히 밀봉할 필요는 없습니다. 옮기기 어렵다면 무리하지 마시고 픽업을 요청하시면 됩니다.",
  },
  {
    q: "강아지 장례 비용은 얼마인가요?",
    a: "체중, 화장 방식, 추모 옵션에 따라 달라집니다. 상담 때 포함·미포함 항목을 먼저 설명하고 범위를 안내합니다. 견적 없이 진행을 재촉하지 않습니다.",
  },
  {
    q: "화장 후 유골은 언제 받을 수 있나요?",
    a: "화장이 끝나면 유골 수습과 유골함 전달까지 안내합니다. 바로 모시고 가시거나, 추모 방식을 상담하신 뒤 결정하셔도 됩니다.",
  },
  {
    q: "상담은 어디로 하면 되나요?",
    a: `카카오톡 오픈채팅으로 24시 긴급 장례·화장·추모 상담이 가능합니다. ${KAKAO_CTA_HINT}`,
  },
];

export const EMERGENCY_HOWTO_STEPS = [
  {
    name: "아이 곁에서 잠시 숨을 고릅니다",
    text: "보호자님의 마음이 무너지는 것이 당연합니다. 급하게 결정하지 마시고, 아이 곁에서 잠시 호흡을 고르셔도 됩니다.",
  },
  {
    name: "아이를 깨끗하고 서늘하게 둡니다",
    text: "깨끗한 수건이나 담요로 감싸 직사광선을 피한 서늘한 곳에 둡니다. 비닐로 완전히 밀봉하거나 무리하게 옮기지 않아도 됩니다.",
  },
  {
    name: "24시 상담으로 픽업·일정을 안내받습니다",
    text: "카카오톡 오픈채팅으로 지역과 상황을 알리면 긴급 픽업 또는 방문 일정을 맞춰 드립니다. 밤·새벽·주말도 상담 가능합니다.",
  },
  {
    name: "보호자 속도에 맞춰 장례·화장을 진행합니다",
    text: "안치 후 배웅 시간을 드리고, 화장 방식과 비용을 투명하게 설명한 뒤 진행합니다. 결정은 언제나 보호자님의 것입니다.",
  },
  {
    name: "유골 수습과 추모로 마무리합니다",
    text: "화장 후 유골함 전달과 추모 안내까지 함께합니다. 이후 궁금한 점도 다시 문의하실 수 있습니다.",
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
    name: "강아지가 세상을 떠난 직후 보호자가 해야 할 일",
    description:
      "갑작스러운 이별 앞에서 지금 바로 할 일 — 아이 몸 두기, 24시 상담, 픽업·장례·화장·추모 순서.",
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
    alternateName: [SITE.brand, "안심강아지장례식장"],
    description: SITE.description,
    url: url || SITE.siteUrl,
    image: SITE.logo,
    openingHours: "Mo-Su 00:00-23:59",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      streetAddress: SITE.address,
    },
    areaServed: SITE.areaServed,
    priceRange: "장례·화장 상담",
    keywords: SITE.keywords.join(", "),
    sameAs: [SITE.kakaoOpenChatUrl],
  };
}
