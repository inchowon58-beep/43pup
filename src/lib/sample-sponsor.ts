import type { SiteSponsor } from "./site-sponsor-shared";

/** 입점 샘플 페이지용 ACTIVE 상태 예시 (실제 업체와 무관) */
export const SAMPLE_ACTIVE_SPONSOR: SiteSponsor = {
  id: 1,
  status: "ACTIVE",
  sponsor_name: "오케이독 포옹장례 (샘플)",
  phone_number: "010-1234-5678",
  link_url: "https://open.kakao.com/o/sxelLqJi",
  homepage_url: "https://www.naver.com",
  recruiting_notice: "",
  rental_price: "30만원",
  highlight_points: [
    "24시 긴급 픽업 가능",
    "개별 추모 가능",
    "전국 상담 가능",
    "예약 진행 가능",
    "화장·추모 안내",
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

export const SAMPLE_PAGE_KEYWORD = "강남 강아지장례";
export const SAMPLE_PAGE_H1 = "강남 강아지장례 안내 — 절차와 준비";
export const SAMPLE_PAGE_SUBTITLE =
  "픽업·안치·화장·추모 순서와 비용이 달라지는 항목을 정리했습니다.";

export const SAMPLE_SECTIONS = [
  {
    h2: "강남 강아지장례를 찾을 때 먼저 알면 좋은 점",
    paragraphs: [
      "아이를 깨끗한 수건으로 감싸 서늘한 곳에 두고, 지역과 대략적인 크기만 알려 주시면 픽업·안치·화장 가능 시간을 안내받을 수 있습니다. 서류나 사전 예약이 없어도 상담이 가능합니다.",
      "밤이든 새벽이든 24시 픽업 상담이 열리는 경우가 많습니다. 방문이 가능하면 식장으로 직접 모시는 방식도 있습니다.",
    ],
  },
  {
    h2: "강아지장례는 보통 이렇게 진행됩니다",
    paragraphs: [
      "상담 → 픽업 또는 방문 → 안치 → 배웅 시간 → 화장 → 유골 수습 순입니다. 비용은 체중·화장 방식·옵션·픽업 거리에 따라 달라지며, 포함 항목을 먼저 확인한 뒤에 진행하는 것이 좋습니다.",
    ],
  },
] as const;
