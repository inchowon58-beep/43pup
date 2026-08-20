/** 퍼피두들 — 미니두들·골든두들 분양 사이트 공통 설정 */

export const SITE = {
  name: "퍼피두들",
  brand: "퍼피두들",
  brandEn: "Puppy Doodle",
  farm: "미니두들분양",
  title: "미니두들분양",
  tagline: "우리 집 첫 두들을 크기와 성격에 맞춰 안내합니다",
  taglineEn: "Puppy Doodle · 퍼피두들",
  description:
    "미니두들분양, 골든두들분양, 버니두들분양, 골든두들분양가, 골든두들키우기, 골든두들성격, 골든두들입양, 골든두들크기 — 퍼피두들에서 가족형 두들을 만나보세요.",
  keywords: [
    "미니두들분양",
    "골든두들분양",
    "버니두들분양",
    "골든두들분양가",
    "골든두들키우기",
    "골든두들성격",
    "골든두들입양",
    "골든두들크기",
    "퍼피두들",
    "미니두들",
    "골든두들",
  ],
  kakaoOpenChatUrl: "https://open.kakao.com/o/sxelLqJi",
  logo: "https://image.cattery.co.kr/doodle/12.webp",
  ogImage: "https://image.cattery.co.kr/doodle/12.webp",
  imageBase: "https://image.cattery.co.kr/doodle",
  imageCount: 40,
  location: "대한민국 전국",
  address: "전국 분양 상담 · 카카오톡 오픈채팅",
  areaServed: "대한민국 전국",
  domain: "doodle.puppyshop.co.kr",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://doodle.puppyshop.co.kr",
  infocsUrl: "https://www.infocs.co.kr/",
  naverSiteVerification: "b0febaf365bdf19a432abf57ac181fc2c315b43a",
  themeColor: "#3d2f54",
} as const;

export const KEYWORD_INQUIRY =
  "미니두들분양, 골든두들분양, 버니두들분양, 골든두들분양가, 골든두들키우기, 골든두들성격, 골든두들입양, 골든두들크기 — 궁금하신 내용을 편하게 문의해 주세요.";

export const CTA_LABEL = "카카오톡 오픈채팅 상담";
export const CTA_KAKAO = "카카오톡 상담하기";
export const CTA_RENTAL = "사이트 임대 · 제휴 문의";
export const CTA_EMERGENCY = "분양 상담";
export const CTA_MEMORIAL = "두들 사진 보기";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";
export const CTA_GALLERY = "분양중인 미니두들 사진보기";

/** 본문·CTA 공통 안내 문구 */
export const KAKAO_CTA_HINT = "카카오톡 오픈채팅으로 상담해 주세요.";
