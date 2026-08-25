/** 메인쿤분양 쿤하우스 — 메인쿤 분양 사이트 공통 설정 */

export const SITE = {
  name: "메인쿤분양 쿤하우스",
  brand: "쿤하우스",
  brandEn: "COON HOUSE",
  farm: "메인쿤분양",
  title: "메인쿤분양 쿤하우스",
  tagline: "큰 고양이를 한집에 들이기 전에, 크기와 기질부터 열어 드리는 쿤하우스입니다",
  taglineEn: "Maine Coon · Coon House",
  description:
    "메인쿤분양, 메인쿤분양가, 메인쿤크기, 메인쿤성격, 메인쿤키우기 — 쿤하우스에서 아이 사진과 함께 살기 포인트를 보고 상담하세요. 분양가는 혈통·성별에 따라 안내합니다.",
  keywords: [
    "메인쿤분양",
    "메인쿤분양가",
    "메인쿤크기",
    "메인쿤성격",
    "메인쿤키우기",
    "메인쿤입양",
    "메인쿤무료분양",
    "메인쿤특징",
    "쿤하우스",
    "메인쿤",
  ],
  kakaoOpenChatUrl: "",
  logo: "https://image.cattery.co.kr/maincoon/21.webp",
  ogImage: "https://image.cattery.co.kr/maincoon/21.webp",
  imageBase: "https://image.cattery.co.kr/maincoon",
  imageCount: 40,
  location: "대한민국 전국",
  address: "전국 분양 상담 · 관리자에서 등록한 카카오톡",
  areaServed: "대한민국 전국",
  domain: "maincoon.infocs.co.kr",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://maincoon.infocs.co.kr",
  infocsUrl: "https://www.infocs.co.kr/",
  naverSiteVerification: "a3af4ea1427aa1c2d70e79290c57f4e0cc360b68",
  themeColor: "#4a2c32",
} as const;

export const KEYWORD_INQUIRY =
  "메인쿤분양 · 분양가 · 크기 · 성격 · 키우기 — 한집에 맞을지부터 맞춰 안내합니다.";

export const CTA_LABEL = "카카오톡 오픈채팅 상담";
export const CTA_KAKAO = "카카오톡 상담하기";
export const CTA_RENTAL = "사이트 임대 · 제휴 문의";
export const CTA_EMERGENCY = "분양 상담";
export const CTA_MEMORIAL = "메인쿤 사진 보기";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";
export const CTA_GALLERY = "분양중인 메인쿤 사진보기";
export const CTA_YOUTUBE = "유튜브에서 시청하기";
export const CTA_YOUTUBE_HEADING = "메인쿤 관련 유튜브 시청하기";

/** 본문·CTA 공통 안내 문구 */
export const KAKAO_CTA_HINT =
  "카카오톡 상담은 관리자에서 오픈채팅을 등록한 뒤에만 연결됩니다.";
