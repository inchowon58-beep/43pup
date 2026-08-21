import type { SiteSponsor } from "./site-sponsor-shared";

/** 입점 샘플 페이지용 ACTIVE 상태 예시 (실제 업체와 무관) */
export const SAMPLE_ACTIVE_SPONSOR: SiteSponsor = {
  id: 1,
  status: "ACTIVE",
  sponsor_name: "글로벌 메이트 정보안내 (샘플)",
  phone_number: "010-1234-5678",
  link_url: "https://open.kakao.com/o/sxelLqJi",
  homepage_url: "https://www.naver.com",
  recruiting_notice: "",
  rental_price: "30만원",
  highlight_points: [
    "확인할 업체 항목 공개",
    "주의사항 안내",
    "전국 상담 가능",
    "방문·상담 일정 안내",
    "계약 전 체크리스트",
  ],
  youtube_url: "",
  youtube_url_2: "",
  sponsor_youtube_url: "",
  sponsor_youtube_url_2: "",
  sponsor_youtube_channel: "글로벌 메이트 정보안내",
  sponsor_youtube_desc:
    "확인할 항목과 주의사항을 짧게 정리한 안내 영상입니다. 상담 전에 먼저 보시면 좋습니다.",
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
      youtube_url: current.youtube_url || "",
      youtube_url_2: current.youtube_url_2 || "",
      sponsor_youtube_url:
        current.sponsor_youtube_url || current.youtube_url || SAMPLE_ACTIVE_SPONSOR.sponsor_youtube_url,
      sponsor_youtube_url_2:
        current.sponsor_youtube_url_2 ||
        current.youtube_url_2 ||
        SAMPLE_ACTIVE_SPONSOR.sponsor_youtube_url_2,
      sponsor_youtube_channel:
        current.sponsor_youtube_channel || SAMPLE_ACTIVE_SPONSOR.sponsor_youtube_channel,
      sponsor_youtube_desc:
        current.sponsor_youtube_desc || SAMPLE_ACTIVE_SPONSOR.sponsor_youtube_desc,
    },
  };
}

export const SAMPLE_PAGE_KEYWORD = "부천국제결혼정보";
export const SAMPLE_PAGE_H1 = "부천국제결혼정보, 업체를 고르기 전에";
export const SAMPLE_PAGE_SUBTITLE =
  "한 업체를 팔지 않습니다. 확인할 항목을 먼저 보세요.";

export const SAMPLE_SECTIONS = [
  {
    h2: "부천국제결혼정보, 업체를 보기 전에",
    paragraphs: [
      "부천에서 국제결혼정보를 찾을 때 흔한 문제는 선금만 요구하거나 계약이 없는 진행입니다. 한 업체를 홍보하지 않고, 믿을 수 있는 업체 정보의 기준을 안내합니다.",
      "지역과 희망 국가만 알려 주시면 확인할 항목을 정리해 드립니다. 방문이 어려우면 카카오톡으로 목록을 받아 보세요.",
    ],
  },
  {
    h2: "피해야 할 곳과 확인 순서",
    paragraphs: [
      "오늘만 할인, 신원 확인 지연, 한 줄 견적은 보류 신호입니다. 비용은 국가·포함 범위에 따라 달라지며, 항목을 먼저 확인한 뒤에 결정하시면 됩니다.",
    ],
  },
] as const;
