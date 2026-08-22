/** 두피문신 필릭스스칼프 — SMP 시술·교육 사이트 공통 설정 */

export const SITE = {
  name: "두피문신 필릭스스칼프",
  brand: "필릭스스칼프",
  brandEn: "FELIX SCALP",
  farm: "두피문신",
  title: "두피문신",
  tagline: "두피문신(SMP) 시술과 교육을 함께하는 필릭스스칼프입니다",
  taglineEn: "SMP Studio & Academy",
  description:
    "두피문신, SMP, 두피문신교육 — 필릭스스칼프에서 시술 상담과 아카데미 교육을 안내합니다. 위생·디자인·사후관리를 기준으로 상담합니다.",
  keywords: [
    "두피문신",
    "SMP",
    "두피문신교육",
    "필릭스스칼프",
    "스칼프문신",
    "두피문신학원",
    "SMP학원",
    "두피문신시술",
    "두피문신상담",
    "두피문신후기",
  ],
  kakaoOpenChatUrl: "https://open.kakao.com/o/sxelLqJi",
  logo: "https://image.cattery.co.kr/smp/01.webp",
  ogImage: "https://image.cattery.co.kr/smp/01.webp",
  imageBase: "https://image.cattery.co.kr/smp",
  imageCount: 31,
  location: "대한민국 전국",
  address: "필릭스스칼프 본점 · 아카데미 · 카카오톡 오픈채팅",
  areaServed: "대한민국 전국",
  domain: "smp.infocs.co.kr",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://smp.infocs.co.kr",
  infocsUrl: "https://www.infocs.co.kr/",
  naverSiteVerification: "8213044c21e67a7afccc3d4450aa57d5c9a810d5",
  themeColor: "#2a201c",
} as const;

export const KEYWORD_INQUIRY =
  "두피문신 시술, 디자인 상담, 두피문신 교육 — 시술과 아카데미를 함께 운영합니다. 카카오톡으로 일정과 과정을 안내해 드립니다.";

export const CTA_LABEL = "카카오톡 오픈채팅 상담";
export const CTA_KAKAO = "카카오톡 상담하기";
export const CTA_RENTAL = "사이트 임대 · 제휴 문의";
export const CTA_EMERGENCY = "시술 상담";
export const CTA_MEMORIAL = "시술 사진 보기";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";
export const CTA_GALLERY = "두피문신 시술 사진보기";
export const CTA_YOUTUBE = "유튜브에서 시청하기";
export const CTA_YOUTUBE_HEADING = "두피문신 관련 유튜브 시청하기";

/** 본문·CTA 공통 안내 문구 */
export const KAKAO_CTA_HINT = "카카오톡 오픈채팅으로 상담해 주세요.";
