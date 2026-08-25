import type { SiteSponsor } from "./site-sponsor-shared";

/** 입점 샘플 페이지용 ACTIVE 상태 예시 (실제 업체와 무관) */
export const SAMPLE_ACTIVE_SPONSOR: SiteSponsor = {
  id: 1,
  status: "ACTIVE",
  sponsor_name: "메인가드너 분양안내 (샘플)",
  phone_number: "010-1234-5678",
  link_url: "",
  homepage_url: "https://www.naver.com",
  recruiting_notice: "",
  rental_price: "30만원",
  highlight_points: [
    "메인쿤분양 상담",
    "메인쿤크기·성격 안내",
    "메인쿤분양가 안내",
    "방문·상담 일정",
    "입양 후 키우기 안내",
  ],
  youtube_url: "",
  youtube_url_2: "",
  sponsor_youtube_url: "",
  sponsor_youtube_url_2: "",
  sponsor_youtube_channel: "메인가드너 분양안내",
  sponsor_youtube_desc:
    "메인쿤 특징과 분양 상담 과정을 짧게 정리한 안내 영상입니다. 상담 전에 먼저 보시면 좋습니다.",
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

export const SAMPLE_PAGE_KEYWORD = "수원메인쿤분양";
export const SAMPLE_PAGE_H1 = "수원메인쿤분양, 크기와 성격을 먼저";
export const SAMPLE_PAGE_SUBTITLE =
  "메인쿤분양 상담을 안내합니다. 특징과 키우기를 먼저 보세요.";

export const SAMPLE_SECTIONS = [
  {
    h2: "수원메인쿤분양, 상담을 보기 전에",
    paragraphs: [
      "수원에서 메인쿤분양을 찾을 때 흔한 질문은 크기와 분양가입니다. 메인가드너는 품종 특징과 키우는 자리 준비를 함께 안내합니다.",
      "원하시는 성별·일정만 알려 주시면 상담을 정리해 드립니다. 방문이 어려우면 문의로 먼저 물어보세요.",
    ],
  },
  {
    h2: "분양 상담과 진행 순서",
    paragraphs: [
      "상담은 메인쿤 특징, 성체 크기, 분양가 안내, 입양 후 키우기 순으로 진행합니다. 비용은 혈통·성별에 따라 달라지며, 상담에서 맞춰 보시면 됩니다.",
    ],
  },
] as const;
