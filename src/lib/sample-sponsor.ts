import type { SiteSponsor } from "./site-sponsor-shared";

/** 입점 샘플 페이지용 ACTIVE 상태 예시 (실제 업체와 무관) */
export const SAMPLE_ACTIVE_SPONSOR: SiteSponsor = {
  id: 1,
  status: "ACTIVE",
  sponsor_name: "오케이독 엔딩장례 (샘플)",
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
export const SAMPLE_PAGE_H1 = "강남 강아지장례, 엔딩을 준비하는 순서";
export const SAMPLE_PAGE_SUBTITLE =
  "픽업·안치·화장·추모를 한 편의 엔딩처럼 장면별로 정리했습니다.";

export const SAMPLE_SECTIONS = [
  {
    h2: "강남 강아지장례, 엔딩을 열기 전에",
    paragraphs: [
      "마지막 장을 급하게 닫지 않아도 됩니다. 아이를 깨끗한 수건으로 감싸 서늘한 곳에 두고, 지역과 대략적인 크기만 알려 주시면 픽업·안치·화장 가능 시간을 장면별로 안내받을 수 있습니다.",
      "밤이든 새벽이든 24시 상담이 열리는 경우가 많습니다. 조금 더 곁에 있고 싶다면 그 시간도 엔딩 일정에 맞출 수 있습니다.",
    ],
  },
  {
    h2: "강아지장례 엔딩은 이렇게 이어집니다",
    paragraphs: [
      "상담 → 픽업 또는 방문 → 안치 → 배웅 → 화장 → 유골 수습은 한 편의 엔딩처럼 이어집니다. 비용은 체중·화장 방식·옵션·픽업 거리에 따라 달라지며, 포함 항목을 먼저 확인한 뒤에 다음 장면을 고르시면 됩니다.",
    ],
  },
] as const;
