/** 두들리안 — 골든두들 분양 사이트 공통 설정 */

export const SITE = {
  name: "두들리안",
  brand: "두들리안",
  farm: "골든두들 분양",
  tagline: "우리 집에 올 골든두들을, 여기서 만나세요",
  taglineEn: "Doodlian · Golden Doodle Home",
  description:
    "두들리안은 가족과 함께 살 골든두들을 소개하는 분양 안내입니다. 온순한 성격, 곱슬 털, 아이와 지내기 좋은 골든두들 사진을 보고 카카오톡으로 입양 상담을 이어 가세요.",
  keywords: [
    "골든두들",
    "골든두들분양",
    "골든두들입양",
    "골드두들",
    "두들분양",
    "골든두들키우기",
    "골든두들성격",
    "하이포알러지강아지",
    "중형견분양",
    "반려견입양",
    "골든두들가격",
  ],
  kakaoOpenChatUrl: "https://open.kakao.com/o/sxelLqJi",
  logo: "https://image.cattery.co.kr/doodle/07.webp",
  imageBase: "https://image.cattery.co.kr/doodle",
  imageCount: 40,
  location: "대한민국 전국",
  address: "전국 분양 상담 · 카카오톡 오픈채팅",
  areaServed: "대한민국 전국",
  domain: "doodle.cattery.co.kr",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://doodle.cattery.co.kr",
  infocsUrl: "https://www.infocs.co.kr/",
} as const;

export const CTA_LABEL = "카카오톡 오픈채팅 상담";
export const CTA_KAKAO = "카카오톡 상담하기";
export const CTA_RENTAL = "사이트 임대 · 제휴 문의";
export const CTA_EMERGENCY = "분양 상담";
export const CTA_MEMORIAL = "두들 사진 보기";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";
export const CTA_GALLERY = "분양중인 골든두들 사진보기";

/** 본문·CTA 공통 안내 문구 */
export const KAKAO_CTA_HINT = "카카오톡 오픈채팅으로 상담해 주세요.";
