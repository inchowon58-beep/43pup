/** 엔딩포유 — 사이트 공통 설정 */

export const SITE = {
  name: "엔딩포유",
  brand: "엔딩포유",
  farm: "24시 반려동물 장례",
  tagline: "한 편의 엔딩을, 함께 준비합니다",
  taglineEn: "Ending For You · 24h Care",
  description:
    "엔딩포유는 사랑하는 아이와의 이야기를 존중하며 마지막 장을 준비하는 반려동물 장례 안내입니다. 24시 픽업부터 장례·화장·추모까지 엔딩을 차분히 이어 갑니다.",
  keywords: [
    "강아지장례식장",
    "강아지장례",
    "반려동물장례",
    "반려동물화장",
    "애견장례식장",
    "펫장례",
    "강아지화장",
    "반려견장례",
    "24시장례",
    "긴급픽업",
    "반려동물추모",
  ],
  kakaoOpenChatUrl: "https://open.kakao.com/o/sxelLqJi",
  logo: "https://image.cattery.co.kr/petfuneral/07.webp",
  imageBase: "https://image.cattery.co.kr/petfuneral",
  imageCount: 17,
  location: "대한민국 전국",
  address: "전국 24시 상담 · 카카오톡 오픈채팅",
  areaServed: "대한민국 전국",
  domain: "rein.cattery.co.kr",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://rein.cattery.co.kr",
  infocsUrl: "https://www.infocs.co.kr/",
} as const;

export const CTA_LABEL = "카카오톡 오픈채팅 상담";
export const CTA_KAKAO = "카카오톡 상담하기";
export const CTA_RENTAL = "사이트 임대 · 제휴 문의";
export const CTA_EMERGENCY = "긴급 상담";
export const CTA_MEMORIAL = "화장·추모 안내";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";

/** 본문·CTA 공통 안내 문구 */
export const KAKAO_CTA_HINT = "카카오톡 오픈채팅으로 상담해 주세요.";
