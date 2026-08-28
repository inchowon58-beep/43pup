import type { HugdaySite } from "./hugday-sites";
import { kindKo } from "./hugday-sites";
import type { HugdayPage } from "./hugday-content";
import { getEncyclopedia, type BreedEncyclopedia, type GuideFact } from "./hugday-encyclopedia";
import type { SiteSponsor } from "./site-sponsor-shared";
import { phoneToTel, sponsorHomepageUrl } from "./site-sponsor-shared";

export type { BreedEncyclopedia, GuideFact };

export type PartnerCard = {
  featured: boolean;
  name: string;
  phone: string;
  home: string;
  notice: string;
};

export type HugdayGuide = {
  heroTitle: string;
  heroSub: string;
  kindLabel: string;
  specs: { label: string; value: string }[];
  warning: {
    title: string;
    lead: string;
    bullets: string[];
    closer: string;
  };
  encyclopedia: BreedEncyclopedia;
  costs: {
    intro: string[];
    rows: { item: string; range: string; note: string }[];
    aftercare: string;
  };
  checklist: {
    tenure: string[];
    items: string[];
    promise: string;
  };
  partners: {
    count: number;
    shareLabel: string;
    shareNote: string;
    featured: PartnerCard[];
    others: PartnerCard[];
  };
};

function sizeBand(site: HugdaySite): "s" | "m" | "l" {
  if (site.kind === "cat") return site.size.includes("대형") ? "l" : "m";
  if (site.size.includes("대형")) return "l";
  if (site.size.includes("초소형") || site.size.includes("소형")) return "s";
  return "m";
}

function costRows(site: HugdaySite): HugdayGuide["costs"]["rows"] {
  if (site.kind === "shelter") {
    return [
      { item: "입양 책임비", range: "기관마다 다름", note: "중성화·백신·칩이 포함된 경우가 많습니다." },
      { item: "입양 직후 검진", range: "5~20만 원", note: "보호소 기록과 별도로 주치의 확인이 안전합니다." },
      { item: "초기 용품", range: "10~40만 원", note: "방·화장실·이동장·사료 전환분." },
      { item: "예상 밖 치료", range: "변동", note: "미상 병력이 있으면 첫 달이 가장 큽니다." },
    ];
  }
  if (site.kind === "cat") {
    return [
      { item: "초기 용품", range: "15~50만 원", note: "화장실·타워·캐리어·급식기." },
      { item: "추가 접종·검진", range: "10~25만 원", note: "항체가·추가 샷은 시기마다 다릅니다." },
      { item: "중성화", range: "15~45만 원", note: "병원·성별·체중에 따라 다릅니다." },
      { item: "연간 사료·모래", range: "30~90만 원", note: "습식 비중과 모래 종류에 따라 벌어집니다." },
    ];
  }
  const band = sizeBand(site);
  const food = band === "l" ? "60~150만 원" : band === "s" ? "25~70만 원" : "40~100만 원";
  const surg = band === "l" ? "25~70만 원" : "15~45만 원";
  return [
    { item: "초기 용품", range: band === "l" ? "25~70만 원" : "15~45만 원", note: "이동장·식기·목줄·방·배변." },
    { item: "추가 접종·검진", range: "10~30만 원", note: "기본 샷 이후 항체가·추가 항목." },
    { item: "중성화", range: surg, note: "체중·병원·합병증 여부에 따라 다릅니다." },
    { item: "연간 사료", range: food, note: "체구가 클수록 고정비가 커집니다." },
  ];
}

export function partnersFromSponsor(sponsor: SiteSponsor | null): HugdayGuide["partners"] {
  const phone = sponsor?.status === "ACTIVE" ? sponsor.phone_number.trim() : "";
  const home = sponsor?.status === "ACTIVE" ? sponsorHomepageUrl(sponsor) : "";
  const name = sponsor?.status === "ACTIVE" ? sponsor.sponsor_name.trim() : "";
  const has = Boolean(name && (phone || home));
  const card: PartnerCard | null = has
    ? {
        featured: true,
        name,
        phone,
        home,
        notice: sponsor?.recruiting_notice?.trim() || "",
      }
    : null;
  const featured = card ? [card] : [];
  const count = featured.length;
  const shareLabel = `1/${Math.max(1, count)}`;
  return {
    count,
    shareLabel,
    shareNote:
      count === 0
        ? "이 품종 페이지는 아직 입점 대기입니다. 입점 시 1/1 단독 노출이며, 이후 업체가 늘면 비용은 1/n로 나뉩니다."
        : count === 1
          ? "현재 1곳이 입점되어 1/1로 노출됩니다. 같은 페이지에 업체가 늘면 노출·비용이 1/2, 1/3로 나뉩니다."
          : `현재 ${count}곳이 입점되어 ${shareLabel}로 비용을 나눕니다.`,
    featured,
    others: [],
  };
}

export function buildHugdayGuide(site: HugdaySite, page: HugdayPage, sponsor: SiteSponsor | null): HugdayGuide {
  const enc = getEncyclopedia(site);
  const name = site.name;

  const warning = {
    title: "무료 분양의 함정과 허위 과장 광고 주의보",
    lead: "무료분양만 강조되면 건강·서류를 따로 확인하세요. 한 줄 가격만 있는 안내는 포함 항목이 빠지기 쉽습니다.",
    bullets: [
      "무료분양만 강조되면 건강·서류를 따로 확인하세요.",
      "인기만큼 공장식 번식과 이벤트 무료 광고도 많습니다.",
      "순종 무료분양 광고와 보호소 입양을 같은 말로 섞어 쓰는 글은 걸러 주세요.",
      "호흡 이상 개체를 정상으로 포장하는 곳은 피하세요.",
      "성별·월령·건강 기록을 함께 물어보세요.",
    ],
    closer: enc.beginner,
  };

  return {
    heroTitle: `${name} 완벽 가이드 & 안심 제휴처 비교`,
    heroSub:
      "생명을 " +
      "\uB9DE\uC774\uD558\uB294 " +
      "\uC77C, " +
      "\uAC00\uACA9\uBCF4\uB2E4 " +
      "\uC911\uC694\uD55C " +
      "\uAC00\uCE58\uC640 " +
      "\uC815\uC9C1\uD55C " +
      "\uC815\uBCF4\uB97C " +
      "\uD655\uC778\uD558\uC138\uC694.",
    kindLabel: kindKo(site),
    specs: [
      { label: "체구", value: site.size },
      { label: "코트", value: site.coat },
      { label: "기질", value: site.temperament },
      { label: "집 환경", value: site.homeNeed },
    ],
    warning,
    encyclopedia: enc,
    costs: {
      intro: [
        "한 줄 가격만 있는 안내는 포함 항목이 빠지기 쉽습니다. 성별·월령·건강 기록을 함께 물어보세요.",
        "분양가는 시기와 개체에 따라 달라 이 글에 단가를 박지 않습니다. 무조건적인 저가 비교보다는 방문·전화 상담이 중요합니다.",
      ],
      rows: costRows(site),
      aftercare: enc.care[0]?.detail || site.homeNeed,
    },
    checklist: {
      tenure: [
        "입양은 10년의 약속이지만, 가격만 보고 고르면 초기 병원비가 커질 수 있습니다.",
        "얼마나 오래된 곳인가는 사후 관리와 신뢰를 가늠하는 조건입니다.",
      ],
      items: page.notes.map((n) => `${n.title} — ${n.body}`),
      promise: "입양은 10년의 약속입니다. 가격만 강조되는 안내는 건강·서류를 따로 확인하세요.",
    },
    partners: partnersFromSponsor(sponsor),
  };
}

export { phoneToTel };

