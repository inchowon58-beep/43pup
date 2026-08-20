import type { SiteSponsor } from "./site-sponsor-shared";

/** 입점 샘플 페이지용 ACTIVE 상태 예시 (실제 업체와 무관) */
export const SAMPLE_ACTIVE_SPONSOR: SiteSponsor = {
  id: 1,
  status: "ACTIVE",
  sponsor_name: "큰냥이네 메인쿤 (샘플)",
  phone_number: "010-1234-5678",
  link_url: "https://open.kakao.com/o/sxelLqJi",
  homepage_url: "https://www.naver.com",
  recruiting_notice: "",
  rental_price: "30만원",
  highlight_points: [
    "분양 중인 아이 사진 공개",
    "가족형 메인쿤",
    "전국 상담 가능",
    "방문·예약 진행 가능",
    "입양 준비 안내",
  ],
};

/** 관리자 설정(rental_price 등)을 반영한 샘플 스폰서 쌍 */
export function buildSampleSponsors(current: SiteSponsor): {
  recruiting: SiteSponsor;
  active: SiteSponsor;
} {
  return {
    recruiting: {
      ...current,
      status: "RECRUITING",
    },
    active: {
      ...SAMPLE_ACTIVE_SPONSOR,
      rental_price: current.rental_price || SAMPLE_ACTIVE_SPONSOR.rental_price,
      highlight_points:
        current.highlight_points?.length > 0
          ? current.highlight_points
          : SAMPLE_ACTIVE_SPONSOR.highlight_points,
      link_url: SAMPLE_ACTIVE_SPONSOR.link_url,
      homepage_url: SAMPLE_ACTIVE_SPONSOR.homepage_url,
    },
  };
}

export const SAMPLE_PAGE_KEYWORD = "강남 메인쿤분양";
export const SAMPLE_PAGE_H1 = "강남 메인쿤분양, 큰냥이네 안내";
export const SAMPLE_PAGE_SUBTITLE =
  "메인쿤분양 사진을 보고 성격을 정해 보세요.";

export const SAMPLE_SECTIONS = [
  {
    h2: "강남 메인쿤분양, 집을 고르기 전에",
    paragraphs: [
      "사진을 보다가 눈이 머무는 아이가 있으면 그 마음을 메모해 두세요. 온순한 대형묘 메인쿤을 강남에서도 상담으로 안내받을 수 있습니다.",
      "원하는 성별·코트만 알려 주시면 지금 만날 수 있는 아이를 안내합니다. 방문이 어려우면 카카오톡으로 사진을 더 받아 보세요.",
    ],
  },
  {
    h2: "메인쿤 입양은 이렇게 이어집니다",
    paragraphs: [
      "사진 확인 → 상담 → 방문 또는 추가 사진 → 집으로 맞이하기 순입니다. 비용은 혈통·세대·시기에 따라 달라지며, 포함 항목을 먼저 확인한 뒤에 결정하시면 됩니다.",
    ],
  },
] as const;
