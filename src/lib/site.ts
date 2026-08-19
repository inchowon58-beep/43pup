/** 안심강아지장례식장 — 사이트 공통 설정 */

export const SITE = {
  name: "안심강아지장례식장",
  brand: "안심강아지장례식장",
  farm: "24시 반려동물 장례",
  tagline: "갑작스러운 이별, 지금 바로 안내받으세요",
  taglineEn: "Peaceful Farewell · 24h Emergency",
  description:
    "안심강아지장례식장은 강아지가 갑자기 세상을 떠났을 때, 보호자가 지금 바로 할 일을 안내합니다. 24시 긴급 픽업부터 장례·화장·추모까지 혼자 결정하지 않도록 곁에 있겠습니다.",
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
    "강아지죽었을때",
    "반려동물추모",
  ],
  kakaoOpenChatUrl: "https://open.kakao.com/o/sxelLqJi",
  logo: "https://image.cattery.co.kr/petfuneral/01.webp",
  imageBase: "https://image.cattery.co.kr/petfuneral",
  imageCount: 17,
  location: "대한민국 전국",
  address: "전국 24시 상담 · 카카오톡 오픈채팅",
  areaServed: "대한민국 전국",
  domain: "funeral.puppytimes.co.kr",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://funeral.puppytimes.co.kr",
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
