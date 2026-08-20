import { SITE, KAKAO_CTA_HINT } from "./site";

export type FaqItem = { q: string; a: string };

/** 메인·AEO용 자주 묻는 질문 — 버니두들 분양 */
export const HOME_FAQS: FaqItem[] = [
  {
    q: "버니두들분양과 골든두들분양 중 어떤 게 나을까요?",
    a: "삼색·든든한 인상을 원하시면 버니두들분양, 밝고 온화한 골든 계열을 원하시면 골든두들분양을 상담해 보세요. 가정 리듬에 맞춰 안내합니다.",
  },
  {
    q: "버니두들분양가는 어떻게 확인하나요?",
    a: "버니두들분양가는 부모견 혈통, 세대, 모색, 예상 성견 크기에 따라 달라집니다. 단가를 페이지에 단정하지 않고, 상담에서 현재 가능한 아이와 포함 혜택을 안내합니다.",
  },
  {
    q: "버니두들무료분양도 가능한가요?",
    a: "버니두들무료분양 정보는 조건이 불명확한 경우가 많습니다. 두들코리아는 건강과 사후 케어가 갖춰진 버니두들입양을 권합니다.",
  },
  {
    q: "버니두들크기는 미리 알 수 있나요?",
    a: "부모견과 세대를 기준으로 예상 버니두들크기를 안내합니다. 미니·미디엄·스탠다드에 따라 생활감이 달라 범위로 설명드리는 점이 정확합니다.",
  },
  {
    q: "초보도 버니두들키우기가 가능할까요?",
    a: "가능합니다. 그루밍과 사회화의 꾸준함이 중요합니다. 버니두들키우기 가이드와 버니두들성격에 맞는 루틴을 상담에서 안내합니다.",
  },
  {
    q: "상담은 어디로 하면 되나요?",
    a: `카카오톡 오픈채팅으로 분양·방문·사진 문의가 가능합니다. ${KAKAO_CTA_HINT}`,
  },
];

export const EMERGENCY_HOWTO_STEPS = [
  {
    name: "분양 사진을 먼저 봅니다",
    text: "갤러리에서 버니두들 모습을 확인합니다. 마음에 남는 아이가 있으면 메모해 두세요.",
  },
  {
    name: "원하는 조건을 알려 줍니다",
    text: "지역, 희망 버니두들크기·모색·성별, 아이와 함께 사는지 여부를 알려 주면 지금 만날 수 있는 아이를 안내받을 수 있습니다.",
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
    name: "버니두들 입양을 준비하는 순서",
    description:
      "분양 사진 보기, 상담, 방문, 집으로 맞이하기까지 버니두들 입양 안내.",
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
    alternateName: [SITE.brand, SITE.brandEn, "버니두들분양"],
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
    priceRange: "버니두들 분양 상담",
    keywords: SITE.keywords.join(", "),
    sameAs: [SITE.kakaoOpenChatUrl],
  };
}
