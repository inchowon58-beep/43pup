/** 큰냥이네 — 메인쿤분양 사이트 공통 설정 */

export const SITE = {
  name: "큰냥이네",
  brand: "큰냥이네",
  brandEn: "Keunnyangi",
  farm: "메인쿤분양",
  title: "메인쿤분양",
  tagline: "한국애견연맹 위원장이 운영하고, 고양이심사위원이 관리·상담합니다",
  taglineEn: "Keunnyangi · 메인쿤분양 큰냥이네",
  description:
    "메인쿤분양, 메인쿤입양, 메인쿤키우기, 메인쿤가격, 메인쿤성격, 메인쿤크기, 메인쿤분양가 — 한국애견연맹 위원장이 운영하고 고양이심사위원이 상담하는 큰냥이네에서 만나보세요.",
  keywords: [
    "메인쿤분양",
    "메인쿤입양",
    "메인쿤키우기",
    "메인쿤가격",
    "메인쿤성격",
    "메인쿤크기",
    "메인쿤분양가",
    "큰냥이네",
    "한국애견연맹",
    "고양이심사위원",
    "메인쿤고양이",
    "대형묘분양",
  ],
  kakaoOpenChatUrl: "https://open.kakao.com/o/sxelLqJi",
  logo: "https://image.cattery.co.kr/maincoon/16.webp",
  ogImage: "https://image.cattery.co.kr/maincoon/16.webp",
  imageBase: "https://image.cattery.co.kr/maincoon",
  imageCount: 59,
  location: "대한민국 전국",
  address: "전국 분양 상담 · 카카오톡 오픈채팅",
  areaServed: "대한민국 전국",
  domain: "maincoon.puppytimes.co.kr",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://maincoon.puppytimes.co.kr",
  infocsUrl: "https://www.infocs.co.kr/",
  naverSiteVerification: "7c85e2e3f669ad151d528ac2a6856877231a7655",
  themeColor: "#152238",
} as const;

export const KEYWORD_INQUIRY =
  "메인쿤분양, 메인쿤입양, 메인쿤키우기, 메인쿤가격, 메인쿤성격, 메인쿤크기, 메인쿤분양가 — 심사위원 상담으로 편하게 문의해 주세요.";

export const CTA_LABEL = "카카오톡 오픈채팅 상담";
export const CTA_KAKAO = "카카오톡 상담하기";
export const CTA_RENTAL = "사이트 임대 · 제휴 문의";
export const CTA_EMERGENCY = "분양 상담";
export const CTA_MEMORIAL = "메인쿤 사진 보기";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";
export const CTA_GALLERY = "분양중인 메인쿤 사진보기";

/** 본문·CTA 공통 안내 문구 */
export const KAKAO_CTA_HINT = "카카오톡 오픈채팅으로 상담해 주세요.";
