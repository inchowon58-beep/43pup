import type { SiteSponsor } from "./site-sponsor-shared";

/** 입점 샘플 페이지용 ACTIVE 상태 예시 (실제 업체와 무관) */
export const SAMPLE_ACTIVE_SPONSOR: SiteSponsor = {
  id: 1,
  status: "ACTIVE",
  sponsor_name: "필릭스스칼프 시술안내 (샘플)",
  phone_number: "010-1234-5678",
  link_url: "https://open.kakao.com/o/sxelLqJi",
  homepage_url: "https://www.naver.com",
  recruiting_notice: "",
  rental_price: "30만원",
  highlight_points: [
    "두피문신 시술 상담",
    "디자인 상담",
    "두피문신 교육",
    "방문·상담 일정 안내",
    "사후관리 안내",
  ],
  youtube_url: "",
  youtube_url_2: "",
  sponsor_youtube_url: "",
  sponsor_youtube_url_2: "",
  sponsor_youtube_channel: "필릭스스칼프 시술안내",
  sponsor_youtube_desc:
    "두피문신 시술과 교육 과정을 짧게 정리한 안내 영상입니다. 상담 전에 먼저 보시면 좋습니다.",
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

export const SAMPLE_PAGE_KEYWORD = "부천두피문신";
export const SAMPLE_PAGE_H1 = "부천두피문신, 시술 전에 디자인을 먼저";
export const SAMPLE_PAGE_SUBTITLE =
  "시술과 교육을 함께 안내합니다. 디자인을 먼저 보세요.";

export const SAMPLE_SECTIONS = [
  {
    h2: "부천두피문신, 시술을 보기 전에",
    paragraphs: [
      "부천에서 두피문신을 찾을 때 흔한 질문은 헤어라인 선과 밀도입니다. 필릭스스칼프는 시술과 교육을 함께 안내합니다.",
      "시술 부위나 교육 과정만 알려 주시면 일정을 정리해 드립니다. 방문이 어려우면 카카오톡으로 먼저 물어보세요.",
    ],
  },
  {
    h2: "디자인 상담과 진행 순서",
    paragraphs: [
      "디자인 상담 후 범위와 횟수를 정합니다. 비용은 부위·횟수에 따라 달라지며, 상담에서 맞춰 보시면 됩니다.",
    ],
  },
] as const;
