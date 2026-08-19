import type { SiteSponsor } from "./site-sponsor-shared";

/** 입점 샘플 페이지용 ACTIVE 상태 예시 (실제 업체와 무관) */
export const SAMPLE_ACTIVE_SPONSOR: SiteSponsor = {
  id: 1,
  status: "ACTIVE",
  sponsor_name: "오케이독 안심장례 (샘플)",
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
export const SAMPLE_PAGE_H1 = "강남 강아지장례, 지금 바로 해야 할 일";
export const SAMPLE_PAGE_SUBTITLE =
  "아이가 갑자기 떠났다면 혼자 결정하지 마세요. 24시 긴급 안내가 열려 있습니다.";

export const SAMPLE_SECTIONS = [
  {
    h2: "강남 강아지장례, 지금 이 순간 보호자님이 하실 일",
    paragraphs: [
      "지금 아이가 숨을 거두었다면 마음이 무너지는 것이 당연합니다. 아이를 깨끗한 수건으로 감싸 서늘한 곳에 두시고, 카카오톡으로 지역과 상황만 알려 주세요. 서류나 사전 예약이 없어도 상담할 수 있습니다.",
      "밤이든 새벽이든 상관없습니다. 24시 긴급 픽업부터 안치·화장·추모까지 보호자님 속도에 맞춰 안내합니다.",
    ],
  },
  {
    h2: "갑작스러운 이별 후 강아지장례 진행 순서",
    paragraphs: [
      "상담 → 픽업 또는 방문 → 안치 → 배웅 시간 → 화장 → 유골 수습 순입니다. 비용은 체중·옵션에 따라 달라지며, 포함 항목을 먼저 설명한 뒤에 진행합니다.",
    ],
  },
] as const;
