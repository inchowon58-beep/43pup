/** 아가두들 — 골든두들·버니두들 분양 사이트 공통 설정 */

export const SITE = {
  name: "아가두들",
  brand: "아가두들",
  brandEn: "Aga Doodle",
  farm: "골든두들분양",
  title: "골든두들분양",
  tagline: "포근한 곱슬 코트와 다정한 성품의 두들 아가를 가정에 맞게 안내합니다",
  taglineEn: "Aga Doodle · 아가두들",
  description:
    "골든두들분양, 버니두들분양, 골든두들분양가, 골든두들키우기, 골든두들성격, 골든두들입양, 골든두들무료분양, 골든두들크기 — 아가두들에서 건강하고 다정한 두들 아가를 만나보세요.",
  keywords: [
    "골든두들분양",
    "버니두들분양",
    "골든두들분양가",
    "골든두들키우기",
    "골든두들성격",
    "골든두들입양",
    "골든두들무료분양",
    "골든두들크기",
    "아가두들",
    "골든두들",
    "버니두들",
  ],
  kakaoOpenChatUrl: "https://open.kakao.com/o/sxelLqJi",
  logo: "https://image.cattery.co.kr/doodle/08.webp",
  ogImage: "https://image.cattery.co.kr/doodle/08.webp",
  imageBase: "https://image.cattery.co.kr/doodle",
  imageCount: 40,
  location: "대한민국 전국",
  address: "전국 분양 상담 · 카카오톡 오픈채팅",
  areaServed: "대한민국 전국",
  domain: "doodle.agapet.co.kr",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://doodle.agapet.co.kr",
  infocsUrl: "https://www.infocs.co.kr/",
  naverSiteVerification: "c936af3e38c4bccb5f92e817fc7a35d6c13fdb35",
  themeColor: "#2f5d50",
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
