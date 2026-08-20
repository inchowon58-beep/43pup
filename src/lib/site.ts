/** 메종드두들 — 골든두들·버니두들 분양 사이트 공통 설정 */

export const SITE = {
  name: "메종드두들",
  brand: "메종드두들",
  brandEn: "Maison de Doodle",
  farm: "골든두들분양",
  title: "골든두들분양",
  tagline: "건강하고 온순한 두들 가족을 만나보세요",
  taglineEn: "Maison de Doodle · Golden & Bernedoodle",
  description:
    "골든두들분양, 버니두들분양, 골든두들분양가, 골든두들키우기, 골든두들성격, 골든두들입양, 골든두들무료분양, 골든두들크기 — 메종드두들에서 건강하고 온순한 두들 가족을 만나보세요.",
  keywords: [
    "골든두들분양",
    "버니두들분양",
    "골든두들분양가",
    "골든두들키우기",
    "골든두들성격",
    "골든두들입양",
    "골든두들무료분양",
    "골든두들크기",
    "메종드두들",
    "골든두들",
    "버니두들",
  ],
  kakaoOpenChatUrl: "https://open.kakao.com/o/sxelLqJi",
  logo: "https://image.cattery.co.kr/doodle/16.webp",
  ogImage: "https://image.cattery.co.kr/doodle/10.webp",
  imageBase: "https://image.cattery.co.kr/doodle",
  imageCount: 40,
  location: "대한민국 전국",
  address: "전국 분양 상담 · 카카오톡 오픈채팅",
  areaServed: "대한민국 전국",
  domain: "doodle.puppytimes.co.kr",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://doodle.puppytimes.co.kr",
  infocsUrl: "https://www.infocs.co.kr/",
} as const;

export const KEYWORD_INQUIRY =
  "골든두들분양, 버니두들분양, 골든두들분양가, 골든두들키우기, 골든두들성격, 골든두들입양, 골든두들무료분양, 골든두들크기 — 궁금하신 내용을 편하게 문의해 주세요.";

export const CTA_LABEL = "카카오톡 오픈채팅 상담";
export const CTA_KAKAO = "카카오톡 상담하기";
export const CTA_RENTAL = "사이트 임대 · 제휴 문의";
export const CTA_EMERGENCY = "분양 상담";
export const CTA_MEMORIAL = "두들 사진 보기";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";
export const CTA_GALLERY = "분양중인 골든두들 사진보기";

/** 본문·CTA 공통 안내 문구 */
export const KAKAO_CTA_HINT = "카카오톡 오픈채팅으로 상담해 주세요.";
