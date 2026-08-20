/** 두들코리아 — 버니두들·골든두들 분양 사이트 공통 설정 */

export const SITE = {
  name: "두들코리아",
  brand: "두들코리아",
  brandEn: "Doodle Korea",
  farm: "버니두들분양",
  title: "버니두들분양",
  tagline: "삼색의 매력과 듬직한 성품을 갖춘 버니두들을, 가정에 맞게 차분히 안내합니다",
  taglineEn: "Doodle Korea · 두들코리아",
  description:
    "버니두들분양, 골든두들분양, 버니두들분양가, 버니두들키우기, 버니두들성격, 버니두들입양, 버니두들무료분양, 버니두들크기 — 두들코리아에서 건강하고 듬직한 버니두들 가족을 만나보세요. 문의 0505-464-1004",
  keywords: [
    "버니두들분양",
    "골든두들분양",
    "버니두들분양가",
    "버니두들키우기",
    "버니두들성격",
    "버니두들입양",
    "버니두들무료분양",
    "버니두들크기",
    "두들코리아",
    "버니두들",
    "골든두들",
    "미니버니두들",
  ],
  kakaoOpenChatUrl: "https://open.kakao.com/o/sxelLqJi",
  logo: "https://image.cattery.co.kr/doodle/15.webp",
  ogImage: "https://image.cattery.co.kr/doodle/15.webp",
  imageBase: "https://image.cattery.co.kr/doodle",
  imageCount: 40,
  location: "대한민국 전국",
  address: "전국 분양 상담 · 카카오톡 오픈채팅",
  areaServed: "대한민국 전국",
  domain: "doodlekorea.puppytimes.co.kr",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://doodlekorea.puppytimes.co.kr",
  infocsUrl: "https://www.infocs.co.kr/",
  naverSiteVerification: "9cfba1c800c31d556f5926c0694d1261c7eeda5c",
  themeColor: "#0e1a24",
} as const;

export const KEYWORD_INQUIRY =
  "버니두들분양, 골든두들분양, 버니두들분양가, 버니두들키우기, 버니두들성격, 버니두들입양, 버니두들무료분양, 버니두들크기 — 편하게 문의해 주세요.";

export const CTA_LABEL = "카카오톡 오픈채팅 상담";
export const CTA_KAKAO = "카카오톡 상담하기";
export const CTA_RENTAL = "사이트 임대 · 제휴 문의";
export const CTA_EMERGENCY = "분양 상담";
export const CTA_MEMORIAL = "두들 사진 보기";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";
export const CTA_GALLERY = "분양중인 버니두들 사진보기";

/** 본문·CTA 공통 안내 문구 */
export const KAKAO_CTA_HINT = "카카오톡 오픈채팅으로 상담해 주세요.";
