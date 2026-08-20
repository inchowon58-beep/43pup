/** 쿠니네 — 메인쿤분양 사이트 공통 설정 */

export const SITE = {
  name: "쿠니네",
  brand: "쿠니네",
  brandEn: "Kunine",
  farm: "메인쿤분양",
  title: "메인쿤분양",
  tagline: "우리 집 첫 메인쿤을 성격과 크기에 맞춰 안내합니다",
  taglineEn: "Kunine · 메인쿤분양 쿠니네",
  description:
    "메인쿤분양, 메인쿤입양, 메인쿤키우기, 메인쿤가격, 메인쿤성격, 메인쿤크기, 메인쿤분양가 — 쿠니네에서 대형묘 메인쿤을 만나보세요.",
  keywords: [
    "메인쿤분양",
    "메인쿤입양",
    "메인쿤키우기",
    "메인쿤가격",
    "메인쿤성격",
    "메인쿤크기",
    "메인쿤분양가",
    "쿠니네",
    "메인쿤고양이",
    "대형묘분양",
  ],
  kakaoOpenChatUrl: "https://open.kakao.com/o/sxelLqJi",
  logo: "https://image.cattery.co.kr/maincoon/46.webp",
  ogImage: "https://image.cattery.co.kr/maincoon/46.webp",
  imageBase: "https://image.cattery.co.kr/maincoon",
  imageCount: 59,
  location: "대한민국 전국",
  address: "전국 분양 상담 · 카카오톡 오픈채팅",
  areaServed: "대한민국 전국",
  domain: "maincoon.eanimal.kr",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://maincoon.eanimal.kr",
  infocsUrl: "https://www.infocs.co.kr/",
  naverSiteVerification: "44457c221d1f7fb0f08f68f34c71f4f91cecee8a",
  themeColor: "#1f3a2e",
} as const;

export const KEYWORD_INQUIRY =
  "메인쿤분양, 메인쿤입양, 메인쿤키우기, 메인쿤가격, 메인쿤성격, 메인쿤크기, 메인쿤분양가 — 궁금하신 내용을 편하게 문의해 주세요.";

export const CTA_LABEL = "카카오톡 오픈채팅 상담";
export const CTA_KAKAO = "카카오톡 상담하기";
export const CTA_RENTAL = "사이트 임대 · 제휴 문의";
export const CTA_EMERGENCY = "분양 상담";
export const CTA_MEMORIAL = "메인쿤 사진 보기";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";
export const CTA_GALLERY = "분양중인 메인쿤 사진보기";

/** 본문·CTA 공통 안내 문구 */
export const KAKAO_CTA_HINT = "카카오톡 오픈채팅으로 상담해 주세요.";
