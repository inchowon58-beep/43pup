/** 포옹데이 공통 설정 */

export const SITE = {
  name: "포옹데이",
  brand: "포옹데이",
  brandEn: "POONG DAY",
  farm: "분양 안내",
  title: "포옹데이",
  tagline: "견종·묘종마다 다른 노트를 펼칩니다",
  taglineEn: "A note for each breed",
  description:
    "포옹데이는 모든 견종·묘종 안내와 함께 보호소, 카페, 장례식장, 애견호텔, 유치원 등 반려동물 관련 정보를 제공하는 포털입니다.",
  keywords: ["포옹데이", "강아지분양", "고양이분양", "견종", "묘종", "보호소"],
  kakaoOpenChatUrl: "",
  logo: "https://image.cattery.co.kr/malamute/01.webp",
  ogImage: "https://image.cattery.co.kr/malamute/01.webp",
  imageBase: "https://image.cattery.co.kr/malamute",
  imageCount: 45,
  location: "대한민국 전국",
  address: "전국 분양 상담",
  areaServed: "대한민국 전국",
  domain: "puppytimes.co.kr",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://puppytimes.co.kr",
  infocsUrl: "https://www.infocs.co.kr/",
  naverSiteVerification: "",
  themeColor: "#7a3e2e",
} as const;

/** 포옹데이 운영사 — 푸터용. 채널 나열은 하지 않고 한 줄로 정리합니다. */
export const OPERATOR = {
  name: "주식회사 인포씨에스",
  ceo: "조춘원",
  address: "경기 부천시 길주로 246",
  since: "2017",
  url: "https://www.infocs.co.kr/",
  urlLabel: "www.infocs.co.kr",
  line: "광고·마케팅 전문. 검색·콘텐츠·영상 광고와 사이트 임대·자동화 구축.",
  hint: "임대 가능 사이트와 비용 안내는 인포씨에스에서 확인하실 수 있습니다.",
} as const;

export const KEYWORD_INQUIRY = "상담 문의";
export const CTA_RENTAL = "사이트 임대 · 제휴 문의";
export const CTA_KAKAO = "카카오톡 상담하기";
export const CTA_GALLERY = "품종 사진 보기";
export const CTA_YOUTUBE = "안내 영상 보기";
export const CTA_YOUTUBE_HEADING = "포옹데이 안내 영상";
export const KAKAO_CTA_HINT = "등록된 연락처 또는 공식 안내 사이트로 문의하세요.";
