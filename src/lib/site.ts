/** 한국국제결혼협회 — 국제결혼정보 사이트 공통 설정 */

export const SITE = {
  name: "한국국제결혼협회",
  brand: "한국국제결혼협회",
  brandEn: "Global Wedding",
  farm: "국제결혼정보",
  title: "국제결혼정보",
  tagline: "믿을 수 있는 국제결혼 업체 정보를 제공하는 안내 사이트입니다",
  taglineEn: "Korea International Marriage Association",
  description:
    "국제결혼정보, 국제결혼상담, 국제결혼업체, 국제결혼주의사항 — 어떤 곳을 믿고, 어떤 곳을 피해야 하는지 예비고객이 먼저 확인할 현실적인 정보를 안내합니다.",
  keywords: [
    "국제결혼",
    "국제결혼정보",
    "국제결혼상담",
    "국제결혼업체",
    "국제결혼주의사항",
    "국제결혼사기",
    "국제결혼비용",
    "국제결혼절차",
    "한국국제결혼협회",
    "국제결혼안내",
  ],
  kakaoOpenChatUrl: "https://open.kakao.com/o/sxelLqJi",
  logo: "https://image.cattery.co.kr/weding/04.webp",
  ogImage: "https://image.cattery.co.kr/weding/04.webp",
  imageBase: "https://image.cattery.co.kr/weding",
  imageCount: 10,
  location: "대한민국 전국",
  address: "전국 국제결혼 정보 상담 · 카카오톡 오픈채팅",
  areaServed: "대한민국 전국",
  domain: "www.globalwedding.co.kr",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.globalwedding.co.kr",
  infocsUrl: "https://www.infocs.co.kr/",
  naverSiteVerification: "472e317dc00753a59a382e1142f59cf19383b6d1",
  themeColor: "#5c1a2e",
} as const;

export const KEYWORD_INQUIRY =
  "국제결혼정보, 국제결혼상담, 국제결혼업체, 국제결혼주의사항 — 특정 업체 홍보가 아니라, 믿을 수 있는 업체 정보를 기준으로 상담해 드립니다.";

export const CTA_LABEL = "카카오톡 오픈채팅 상담";
export const CTA_KAKAO = "카카오톡 상담하기";
export const CTA_RENTAL = "사이트 임대 · 제휴 문의";
export const CTA_EMERGENCY = "정보 상담";
export const CTA_MEMORIAL = "안내 사진 보기";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";
export const CTA_GALLERY = "국제결혼 안내 사진보기";

/** 본문·CTA 공통 안내 문구 */
export const KAKAO_CTA_HINT = "카카오톡 오픈채팅으로 상담해 주세요.";
