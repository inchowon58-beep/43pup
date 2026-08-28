import type { HugdaySite } from "./hugday-sites";
import { kindKo, HUB_URL, hubNavLabel } from "./hugday-sites";
import type { HugdayPage } from "./hugday-content";
import { getEncyclopedia, type BreedEncyclopedia, type GuideFact } from "./hugday-encyclopedia";
import type { SiteSponsor } from "./site-sponsor-shared";
import { phoneToTel, sponsorHomepageUrl } from "./site-sponsor-shared";
import { eulReul } from "./korean";

export type { BreedEncyclopedia, GuideFact };

export type SpecKey = "size" | "coat" | "temper" | "home";

export type PartnerCard = {
  featured: boolean;
  name: string;
  phone: string;
  home: string;
  notice: string;
};

export type WarningItem = {
  icon: "stethoscope" | "gift" | "megaphone" | "paw";
  title: string;
  body: string;
};

export type VaccineStep = {
  stage: string;
  name: string;
  detail: string;
};

export type HugdayGuide = {
  heroTitle: string;
  heroSub: string;
  kindLabel: string;
  petWord: string;
  hubUrl: string;
  hubNavLabel: string;
  meetHeading: string;
  specs: { key: SpecKey; label: string; value: string }[];
  warning: {
    kicker: string;
    title: string;
    lead: string;
    items: WarningItem[];
    closer: string;
  };
  encyclopedia: BreedEncyclopedia;
  costs: {
    intro: string[];
    priceNote: string;
    vaccines: {
      heading: string;
      lead: string;
      steps: VaccineStep[];
      extra: string;
    };
    rows: { item: string; range: string; note: string }[];
    aftercare: string;
  };
  checklist: {
    lead: string[];
    items: { title: string; body: string }[];
    promise: string;
  };
  partners: {
    count: number;
    shareLabel: string;
    shareNote: string;
    kicker: string;
    title: string;
    featuredLabel: string;
    featured: PartnerCard[];
    others: PartnerCard[];
  };
};

function hashFolder(folder: string): number {
  let h = 0;
  for (let i = 0; i < folder.length; i++) h = (h * 31 + folder.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function heroTitleFor(site: HugdaySite): string {
  const name = site.name;
  const tails =
    site.kind === "shelter"
      ? ["완벽 가이드 & 안심입양 절차", "완벽 가이드 & 안심입양 방법", "성공적인 입양법"]
      : site.kind === "cat"
        ? [
            "완벽 가이드 & 안심분양 방법",
            "완벽 가이드 & 안심입양 절차",
            "완벽 가이드 & 안심입양 방법",
            "성공적인 입양법",
          ]
        : [
            "완벽 가이드 & 안심분양 방법",
            "완벽 가이드 & 안심입양 절차",
            "완벽 가이드 & 안심입양 방법",
            "성공적인 분양법",
          ];
  return `${name} ${tails[hashFolder(site.folder) % tails.length]}`;
}

function petWord(site: HugdaySite): string {
  if (site.kind === "cat") return "고양이";
  if (site.kind === "shelter") return site.noun;
  return "강아지";
}

function breedWord(site: HugdaySite): string {
  if (site.kind === "cat") return "묘종";
  if (site.kind === "shelter") return "아이";
  return "견종";
}

function sizeBand(site: HugdaySite): "s" | "m" | "l" {
  if (site.kind === "cat") return site.size.includes("대형") ? "l" : "m";
  if (site.size.includes("대형")) return "l";
  if (site.size.includes("초소형") || site.size.includes("소형")) return "s";
  return "m";
}

function dogVaccines(): VaccineStep[] {
  return [
    { stage: "1차", name: "종합백신", detail: "보통 생후 6~8주에 맞춰, 전염이 쉬운 시기를 넘기기 위한 첫 접종입니다." },
    { stage: "2차", name: "종합백신", detail: "1차 뒤 2~4주 간격. 면역이 아직 완전히 서지 않은 시기라 외출은 조심합니다." },
    { stage: "3차", name: "종합백신", detail: "같은 간격으로 이어집니다. 병원마다 포함된 항원이 조금 다를 수 있습니다." },
    { stage: "4차", name: "종합백신", detail: "기초 접종을 한 번 더 보강하는 단계입니다." },
    { stage: "5차", name: "종합백신", detail: "어린 강아지 기초 접종이 마무리되는 때로 보는 경우가 많습니다." },
    { stage: "별도", name: "광견병", detail: "종합백신과 따로 맞춰야 하는 접종입니다. 시기·지역 규정은 병원에서 확인하세요." },
    { stage: "확인", name: "항체가 검사", detail: "접종이 몸에 잘 자리 잡았는지 보는 검사입니다. 모든 병원이 필수로 하진 않지만, 처음 키우실 때는 마음이 놓이는 단계입니다." },
  ];
}

function catVaccines(): VaccineStep[] {
  return [
    { stage: "1차", name: "종합백신", detail: "보통 생후 8주 전후. 범백·허피스·칼리시처럼 전염이 빠른 병을 막는 시작입니다." },
    { stage: "2차", name: "종합백신", detail: "1차 뒤 3~4주. 실내묘라도 이 시기의 접종은 빼기 어렵습니다." },
    { stage: "3차", name: "종합백신", detail: "기초 면역을 마무리하는 단계로 안내하는 병원이 많습니다." },
    { stage: "별도", name: "광견병", detail: "실내 생활이어도 권하는 병원이 있습니다. 이사·이동을 생각하면 미리 맞춰 두는 편이 마음이 놓입니다." },
    { stage: "확인", name: "항체가 검사", detail: "접종이 몸에 잘 자리 잡았는지 확인하는 단계입니다. 병원 안내에 따라 진행하시면 됩니다." },
  ];
}

function shelterVaccines(site: HugdaySite): VaccineStep[] {
  const who = site.noun === "고양이" ? "고양이" : "강아지";
  return [
    { stage: "확인", name: "이미 맞은 접종", detail: `보호소마다 ${who}가 맞은 차수가 다릅니다. 기록지를 사진으로 받아 주치의에게 보여 주세요.` },
    { stage: "이어서", name: "부족한 차수", detail: "1차만 맞은 아이도, 광견병까지 끝난 아이도 있습니다. 빈칸을 추측하지 말고 병원에서 일정을 이어 주세요." },
    { stage: "별도", name: "항체가·재검", detail: "단체 생활을 한 아이는 접종표만으로 안심하기 어렵습니다. 항체가 검사와 기본 혈액 검사가 첫 방문의 핵심인 경우가 많습니다." },
  ];
}

function costRows(site: HugdaySite): HugdayGuide["costs"]["rows"] {
  if (site.kind === "shelter") {
    return [
      { item: "입양 책임비", range: "기관마다 다름", note: "중성화·백신·칩이 포함된 경우도 있고, 그렇지 않은 경우도 있습니다. 포함 항목을 글로 받아 두세요." },
      { item: "입양 직후 검진", range: "5~20만 원 전후", note: "보호소 기록과 별도로, 우리 집 주치의가 한 번 더 보는 것이 안전합니다." },
      { item: "초기 용품", range: "10~40만 원 전후", note: "잠자리, 화장실, 이동장, 보호소에서 먹던 사료를 이어 먹을 분량." },
      { item: "예상하지 못한 치료", range: "아이마다 다름", note: "병력이 분명하지 않으면 첫 달이 가장 클 수 있습니다." },
    ];
  }
  if (site.kind === "cat") {
    return [
      { item: "초기 용품", range: "15~50만 원 전후", note: "화장실, 모래, 캣타워, 캐리어, 급식기, 숨숨집." },
      { item: "접종·검진 이어서", range: "10~25만 원 전후", note: "1~3차 종합백신, 광견병, 항체가 확인. 병원·시기에 따라 폭이 있습니다." },
      { item: "중성화", range: "15~45만 원 전후", note: "성별·체중·병원, 그리고 함께하는 검사에 따라 달라집니다." },
      { item: "한 해 사료·모래", range: "30~90만 원 전후", note: "습식 비중과 모래 종류에 따라 꽤 벌어집니다." },
    ];
  }
  const band = sizeBand(site);
  const food = band === "l" ? "60~150만 원 전후" : band === "s" ? "25~70만 원 전후" : "40~100만 원 전후";
  const surg = band === "l" ? "25~70만 원 전후" : "15~45만 원 전후";
  const gear = band === "l" ? "25~70만 원 전후" : "15~45만 원 전후";
  return [
    { item: "초기 용품", range: gear, note: "이동장, 식기, 목줄·하네스, 잠자리, 배변 패드. 체구가 클수록 준비물이 커집니다." },
    { item: "접종·검진 이어서", range: "10~30만 원 전후", note: "1~5차 종합백신, 광견병, 항체가 확인. 이미 맞은 차수만큼은 빠질 수 있습니다." },
    { item: "중성화", range: surg, note: "체중과 병원, 마취 전 검사 포함 여부에 따라 달라집니다." },
    { item: "한 해 사료", range: food, note: "체구가 클수록 매달 나가는 금액이 눈에 띄게 커집니다." },
  ];
}

function warningFor(site: HugdaySite): HugdayGuide["warning"] {
  if (site.kind === "shelter") {
    return {
      kicker: "꼭 읽어 주세요",
      title: "무료라는 말과, 실제로 준비할 마음",
      lead: "보호소의 입양은 품종 매장에서 말하는 ‘무료 분양’과 결이 다릅니다. 그래도 데려오는 순간부터 검진과 적응 비용은 보호자의 몫입니다. 공짜라는 안도감만 들고 오시면 아이도, 가정도 힘들어질 수 있습니다.",
      items: [
        {
          icon: "stethoscope",
          title: "기록이 비어 있으면 첫 달이 커집니다",
          body: "접종표·혈액·기생충 기록이 분명하지 않은 즉시 인도는 피하세요. 보호소에서 본 모습과 우리 집 주치의가 보는 모습은 다를 수 있습니다.",
        },
        {
          icon: "gift",
          title: "책임비가 낮아도 이후 병원비는 별개입니다",
          body: "중성화와 백신이 포함됐다는 말도 서류로 남기세요. ‘이미 다 맞았다’는 말만으로 추가 접종을 건너뛰지 않는 것이 안전합니다.",
        },
        {
          icon: "megaphone",
          title: "품종견 무료 광고와 섞어 읽지 마세요",
          body: "어린 순종을 공짜로 내거는 광고와, 사연 있는 아이를 맡기는 보호소는 같은 문장이 아닙니다. 이 페이지는 후자를 위한 안내입니다.",
        },
        {
          icon: "paw",
          title: "속도는 아이가 정합니다",
          body: "숨는 아이와 손을 기다리는 아이를 같은 속도로 보지 마세요. 첫 삼 일은 조용한 방 하나가 가장 비싼 준비물입니다.",
        },
      ],
      closer:
        "제대로 된 기록이 없는 곳에서 급하게 데려오면, 가족의 행복을 위해 맞이한 일이 처음부터 치료와 걱정으로 기억될 수 있습니다. 천천히, 기록을 보고, 속도를 맞춰 주세요.",
    };
  }

  const young = site.kind === "cat" ? "어린 품종묘" : "어린 품종견";
  const mix = site.kind === "cat" ? "코숏·파양묘" : "믹스견·파양견";

  return {
    kicker: "꼭 읽어 주세요",
    title: "무료 분양의 함정과 허위·과장 광고 주의보",
    lead: "겉으로는 무료분양만 크게 내걸고, 방문하게 만드는 광고가 많습니다. 막상 매장에 가면 조건이 바뀌는 식입니다. 포옹데이는 그 차이를 먼저 말씀드립니다.",
    items: [
      {
        icon: "stethoscope",
        title: "병원 메디컬을 숨긴 무료분양",
        body: "광고에는 무료분양만 강조하고, 방문해서야 병원 메디컬 가입을 조건으로 내거는 곳이 있습니다. 가입을 거절하면 분양 자체가 어려워지는 구조라면, 처음부터 그 비용을 숨긴 안내입니다.",
      },
      {
        icon: "gift",
        title: "이벤트와 사은품으로 매장을 찾게 만드는 말",
        body: "다양한 이벤트를 지급하는 것처럼 보이게 해 놓고, 실제로는 방문만을 목적으로 하는 안내가 있습니다. 사은품 목록이 분양 조건보다 크게 적혀 있다면 한 번 더 멈추세요.",
      },
      {
        icon: "megaphone",
        title: "겉은 무료, 속은 방문 유도 광고",
        body: "무료분양을 이야기하면서 고객을 매장으로 부르는 것이 목적인 업체가 적지 않습니다. 그런 곳을 걸러 내는 일이, 아이를 지키는 첫 번째 확인입니다.",
      },
      {
        icon: "paw",
        title: `${young}의 무료분양은 사실상 없습니다`,
        body: `무료분양이 가능한 경우는 실질적으로 ${mix}처럼 사연이 있는 아이들인 경우가 많습니다. ${young}${eulReul(young)} 공짜로 내거는 글은 허위·과장일 가능성이 높으니 특히 주의해 주세요.`,
      },
    ],
    closer:
      "한 번 입양하면 십 년 넘게 함께하는 가족을 만나는 일입니다. 겉만 번지르르한 무료·이벤트 문구에 발걸음을 맡기지 마세요.",
  };
}

function isDefaultWaitNotice(text: string): boolean {
  return /입점대기중/.test(text) && /제휴/.test(text);
}

export function partnersFromSponsor(sponsor: SiteSponsor | null): HugdayGuide["partners"] {
  const phone = sponsor?.status === "ACTIVE" ? sponsor.phone_number.trim() : "";
  const home = sponsor?.status === "ACTIVE" ? sponsorHomepageUrl(sponsor) : "";
  const name = sponsor?.status === "ACTIVE" ? sponsor.sponsor_name.trim() : "";
  const rawNotice = sponsor?.recruiting_notice?.trim() || "";
  const has = Boolean(name && (phone || home));
  const card: PartnerCard | null = has
    ? {
        featured: true,
        name,
        phone,
        home,
        notice: isDefaultWaitNotice(rawNotice) ? "" : rawNotice,
      }
    : null;
  const featured = card ? [card] : [];
  const count = featured.length;
  return {
    count,
    shareLabel: "",
    shareNote: count === 0 ? "" : "지금 이 업체를 통해 알아보시면 좋습니다.",
    kicker: "안심파워",
    title: "",
    featuredLabel: "추천 안심파워",
    featured,
    others: [],
  };
}

export function buildHugdayGuide(site: HugdaySite, page: HugdayPage, sponsor: SiteSponsor | null): HugdayGuide {
  const enc = getEncyclopedia(site);
  const name = site.name;
  const who = petWord(site);
  const breed = breedWord(site);

  const vaccineSteps =
    site.kind === "shelter" ? shelterVaccines(site) : site.kind === "cat" ? catVaccines() : dogVaccines();

  const obj = eulReul(name);
  const vaccineLead =
    site.kind === "shelter"
      ? `보호소에서 이미 맞은 접종이 있어도, 우리 집 병원에서 차수와 항체를 한 번 더 확인하는 것이 안전합니다. ‘다 맞았다’는 말보다 기록지가 먼저입니다.`
      : site.kind === "cat"
        ? `${name}${obj} 집으로 맞이한 뒤에도 접종이 남아 있는 경우가 많습니다. 아래에 적어 둔 순서는 초보 보호자가 병원 안내를 따라가기 쉽도록 풀어 적은 것입니다.`
        : `${name} 강아지를 처음 키우실 때 가장 헷갈리는 부분이 접종입니다. 1차부터 5차, 그리고 광견병까지 — 무엇이 들어가는지 순서대로 적어 두었습니다.`;

  const partners = partnersFromSponsor(sponsor);
  partners.title = `${site.keyword} 지금 알아보면 좋은 곳`;

  return {
    heroTitle: heroTitleFor(site),
    heroSub: `${name}${obj} 처음 맞이하려는 분들께, 가격보다 먼저 전하고 싶은 이야기가 있습니다. 기질과 관리, 숨은 조건 없는 안내를 한곳에 모았습니다. 새로운 가족을 들이는 일은 설렘만큼 책임이 따릅니다.`,
    kindLabel: kindKo(site),
    petWord: who,
    hubUrl: HUB_URL,
    hubNavLabel: hubNavLabel(site),
    meetHeading: `${name}${obj} 처음 맞이한다면`,
    specs: [
      { key: "size", label: "체구", value: site.size },
      { key: "coat", label: "코트", value: site.coat },
      { key: "temper", label: "기질", value: site.temperament },
      { key: "home", label: "집 환경", value: site.homeNeed },
    ],
    warning: warningFor(site),
    encyclopedia: enc,
    costs: {
      intro:
        site.kind === "shelter"
          ? [
              `${name}의 아이들은 분양 시세가 아니라, 지금 이 아이의 기록과 적응 속도로 만납니다. 책임비는 기관마다 다르고, 그 금액보다 이후 병원비가 클 수 있습니다.`,
              "직접 방문하시거나 전화로, 포함되어 있는 접종·중성화·칩부터 확인해 주세요.",
            ]
          : [
              `${name} ${breed}의 분양 가격은 혈통과 외모, 월령에 따라 폭이 있습니다. 같은 품종이라도 그 순간 매장에 어떤 아이가 있는지는 글만으로 알 수 없습니다.`,
              "직접 방문하시거나 전화로 상담하시는 일이, 지금 만날 수 있는 아이를 확인하는 가장 정확한 방법입니다.",
            ],
      priceNote:
        site.kind === "shelter"
          ? "책임비와 포함 항목은 기관·시기에 따라 다릅니다. 방문이나 전화로 기록을 함께 확인해 주세요."
          : "분양 가격은 아이들의 혈통과 외모에 따라 달라지므로, 상담을 통해 알아보시는 것이 가장 좋습니다.",
      vaccines: {
        heading: site.kind === "shelter" ? "입양 후 접종, 이렇게 이어 주세요" : "예방접종이 포함하는 것들",
        lead: vaccineLead,
        steps: vaccineSteps,
        extra:
          site.kind === "cat"
            ? "접종이 끝난 뒤에는 항체가 검사로 ‘몸에 잘 자리 잡았는지’를 확인하는 병원이 있습니다. 심장사상충·내외부 기생충 예방은 접종 일정과 별도로 이어집니다."
            : site.kind === "shelter"
              ? "심장사상충·내외부 기생충·피부 검진은 접종 차수와 별개입니다. 단체 생활을 한 아이일수록 첫 방문에서 함께 봐 달라고 말씀해 주세요."
              : "5차 이후에도 항체가 검사로 접종이 몸에 잘 자리 잡았는지 확인하는 경우가 있습니다. 코로나·켄넬코프, 심장사상충과 내외부 기생충 예방은 종합백신과 별도 일정입니다.",
      },
      rows: costRows(site),
      aftercare:
        `검증되지 않은 곳에서 ${who}를 데려오면, 처음 치료비가 생각보다 크게 나갈 수 있습니다. 가족의 행복을 위해 맞이한 일이 처음부터 슬픔으로 기억되지 않도록, 기록과 업력을 함께 봐 주세요.`,
    },
    checklist: {
      lead:
        site.kind === "shelter"
          ? [
              `한 번 입양하면 십 년 넘게 함께하는 가족을 만나는 일입니다. 책임비가 낮다고 급하게 정하면, ${name}의 아이와 가정이 함께 힘들어질 수 있습니다.`,
              "제대로 확인하지 않고 데려오면 초기 병원비는 물론, 아픈 아이로 인한 마음의 상처까지 남을 수 있습니다. 실패하는 입양이 되지 않도록, 아래를 천천히 봐 주세요.",
            ]
          : [
              `한 번 입양하면 십 년 넘게 함께하는 가족을 만나는 일입니다. ${name}의 분양 비용만 보고 아이를 고르는 일은, 무척 잘못된 선택이 될 수 있습니다.`,
              "오히려 제대로 확인하지 않고 데려오면 초기 병원비는 물론, 아픈 아이로 인한 마음의 상처까지 남을 수 있습니다. 실패하는 입양이 되지 않도록, 아래를 천천히 봐 주세요.",
            ],
      items: [
        {
          title: "얼마나 오래 자리를 지켜 온 곳인지",
          body:
            site.kind === "shelter"
              ? "업력만으로 모든 것이 증명되지는 않습니다. 다만 기록과 사후 안내를 얼마나 차분히 주는지가, 신뢰를 가늠하는 조건이 될 수 있습니다."
              : "업력만으로 모든 것이 증명되지는 않습니다. 다만 사후 관리와 책임을 가늠하는 하나의 조건이 될 수 있습니다. 문의했을 때 건강 기록과 부모·환경을 차분히 설명해 주는지를 함께 보세요.",
        },
        site.kind === "shelter"
          ? {
              title: "건강 기록과 첫 주 적응을 글로 받아 두었는지",
              body: "접종·기생충·전염병 기록이 분명하지 않으면 일정을 미루는 편이 맞습니다. 공짜라는 안도감만으로 속도를 내지 마세요.",
            }
          : {
              title: "무료·이벤트 문구에 발걸음이 이끌리지 않는지",
              body: "메디컬 가입이나 사은품을 조건으로 숨긴 안내는 아이보다 방문을 목적으로 하는 경우가 많습니다. 광고 문장과 상담에서 듣는 조건이 같은지 확인해 주세요.",
            },
        {
          title: "초기 용품·접종·중성화까지 계산해 보았는지",
          body: `${who}를 키우는 비용은 데려오는 순간에 끝나지 않습니다. 잠자리와 이동장, 남은 접종, 중성화, 그리고 예상하지 못한 검진까지 마음의 자리를 만들어 두세요.`,
        },
        ...page.notes.map((n) => ({ title: n.title, body: n.body })),
      ],
      promise: `입양은 십 년의 약속입니다. ${name}의 가격만이 아니라, 이 아이와 우리가 오래 건강할 수 있는지를 기준으로 정해 주세요.`,
    },
    partners,
  };
}

export function isStoredBreedDump(h2: string): boolean {
  return /처음 맞이한다면|유전·건강|챙길|무료 분양의 함정|허위·과장/.test(h2);
}

export function breedSeoBrief(site: HugdaySite): { heading: string; paragraphs: string[] } {
  const enc = getEncyclopedia(site);
  const obj = eulReul(site.name);
  return {
    heading: `${site.name}${obj} 처음 맞이한다면`,
    paragraphs: [enc.origin, ...enc.paragraphs.slice(0, 2), enc.beginner].filter(Boolean),
  };
}

export { phoneToTel };
