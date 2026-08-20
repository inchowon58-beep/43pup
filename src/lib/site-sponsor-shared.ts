import { SITE } from "./site";

export type SponsorStatus = "RECRUITING" | "ACTIVE";

export type SiteSponsor = {
  id: number;
  status: SponsorStatus;
  sponsor_name: string;
  phone_number: string;
  link_url: string;
  homepage_url: string;
  recruiting_notice: string;
  rental_price: string;
  highlight_points: string[];
};

export const GLOBAL_SPONSOR_TAG = "global-sponsor";

export const DEFAULT_SPONSOR: SiteSponsor = {
  id: 1,
  status: "RECRUITING",
  sponsor_name: "",
  phone_number: "",
  link_url: SITE.kakaoOpenChatUrl,
  homepage_url: "",
  recruiting_notice: "전국 메인쿤 분양 입점 제휴 · 사이트 임대 모집 중",
  rental_price: "30만원",
  highlight_points: [
    "분양 중인 아이 사진 공개",
    "가족형 메인쿤",
    "전국 상담 가능",
    "방문·예약 진행 가능",
    "입양 준비 안내",
  ],
};

export function phoneToTel(_phone: string): string {
  const digits = _phone.replace(/\D/g, "");
  return digits ? `tel:${digits}` : SITE.kakaoOpenChatUrl;
}

export function isKakaoLink(url: string) {
  return /open\.kakao\.com|kakao\.com/i.test(url);
}

export function sponsorKakaoUrl(sponsor: SiteSponsor): string {
  const url = (sponsor.link_url || "").trim();
  if (url && isKakaoLink(url)) return url;
  return "";
}

export function sponsorHomepageUrl(sponsor: SiteSponsor): string {
  const home = (sponsor.homepage_url || "").trim();
  if (home) return home;
  const url = (sponsor.link_url || "").trim();
  if (url && !isKakaoLink(url)) return url;
  return "";
}
