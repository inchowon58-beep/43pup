import type { HugdaySite } from "./hugday-sites";
import { BRAND, HUGDAY_HOME, HUGDAY_PHONE } from "./hugday-sites";

export type HugdayFaq = { q: string; a: string };
export type HugdayPage = {
  site: HugdaySite;
  h1: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  lead: string;
  essay: string[];
  notes: { title: string; body: string }[];
  flow: { n: string; title: string; body: string }[];
  faqs: HugdayFaq[];
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], n: number): T {
  return arr[n % arr.length];
}

export function buildHugdayPage(site: HugdaySite): HugdayPage {
  const kw = site.keyword;
  const name = site.name;
  const seed = hash(site.slug);
  const isShelter = site.kind === "shelter";
  const noun = site.noun;

  const leadPool = isShelter
    ? [
        `${name}에서 아이를 만날 때는 품종 자랑보다, 지금 이 아이가 안정을 찾았는지부터 봅니다. ${BRAND}는 ${noun} 보호 과정을 천천히 풀어 안내합니다.`,
        `${kw}를 찾으셨다면 급하게 데려가기보다, 임시 보호 중 성격과 건강 기록을 먼저 맞춰 보세요. ${BRAND} ${name} 페이지입니다.`,
        `${name} 안내는 구조 이후의 첫 주가 핵심입니다. 숨는 아이, 사람 손을 기다리는 아이 — 개체마다 속도가 다릅니다.`,
      ]
    : [
        `${kw}을 고를 때 ${name}의 ${site.tag}다운 기질이 집과 맞는지부터 보세요. ${BRAND}는 외모만 보여 주지 않고 생활 리듬을 함께 적습니다.`,
        `${name}은 ${site.size}, ${site.coat}입니다. ${site.temperament} ${BRAND} ${kw} 안내입니다.`,
        `${kw} 검색 후 바로 결정하지 않으셔도 됩니다. ${name}의 ${site.homeNeed} — 이 한 줄이 맞으면 상담이 짧아집니다.`,
      ];

  const essayPool = isShelter
    ? [
        [
          `${name} 아이들은 한 품종으로 묶이지 않습니다. 들어온 사연, 월령, 사람 손을 견디는 속도가 제각각이라 이 페이지는 ‘지금 이 아이’를 보는 법을 적습니다.`,
          `입양 전날까지 보호소 일정은 바뀔 수 있습니다. ${BRAND}는 단정을 피하고, 상담에서 건강 기록과 성격을 맞춰 드립니다.`,
          `집으로 오신 뒤 첫 삼 일은 조용한 방이 먼저입니다. ${noun}이 숨었다가 천천히 얼굴을 내미는 시간을 ${name} 안내에서 함께 짚습니다.`,
          `후원·입양 문의는 ${HUGDAY_PHONE} 또는 공식 안내 ${HUGDAY_HOME.replace("https://", "")}에서 이어집니다. 이 사이트는 ${kw} 전용 페이지입니다.`,
        ],
        [
          `${name}에서는 품종 자랑보다 안정이 먼저입니다. 숨는 아이와 손을 기다리는 아이를 같은 속도로 보지 않습니다.`,
          `${BRAND} ${kw} 안내는 임시 보호 중 메모를 상담에 연결합니다. 하루만 보고 성격을 단정하지 않습니다.`,
          `새 집은 냄새가 낯섭니다. 화장실과 잠자리를 처음 삼 일 동안 옮기지 않는 것이 ${name}에서 자주 드리는 말입니다.`,
          `문의는 ${HUGDAY_PHONE}. 본점 안내는 ${HUGDAY_HOME.replace("https://", "")} 입니다.`,
        ],
      ]
    : [
        [
          `${name}을 ${kw}로 찾으실 때 흔한 오해는 ‘사진 속 얼굴이 곧 성체’라는 점입니다. ${site.size}로 자라며 ${site.coat} 관리량이 집마다 달라집니다.`,
          `${site.temperament} 그래서 처음 일주일은 산책·화장실·잠자리만 고정해 주시는 편이 안전합니다. ${BRAND}는 그 순서를 ${name} 기준으로 풀어 둡니다.`,
          `${site.homeNeed} 이 조건이 빠지면 예쁘게 보여도 생활이 힘듭니다. ${kw} 상담에서는 공간·가족 구성부터 물어봅니다.`,
          `분양가는 시기·개체에 따라 달라 이 글에 단가를 박지 않습니다. 전화 ${HUGDAY_PHONE}, 본점 안내는 ${HUGDAY_HOME.replace("https://", "")} 입니다.`,
        ],
        [
          `${name}은 ${site.tag}입니다. ${kw}를 고를 때 외모 다음으로 ${site.coat} 관리 시간을 적어 보시면 선택이 분명해집니다.`,
          `${site.temperament} 처음 보는 날의 인상만으로 단정하지 않습니다. ${BRAND}는 ${name} 생활 리듬을 노트처럼 적습니다.`,
          `${site.homeNeed} 이 한 줄이 집과 맞으면 상담이 짧아집니다.`,
          `${kw} 일정은 ${HUGDAY_PHONE} 또는 ${HUGDAY_HOME.replace("https://", "")}에서 이어집니다. 이 사이트는 ${name} 전용입니다.`,
        ],
        [
          `${BRAND} ${site.title} 페이지입니다. ${name}의 ${site.size} 체구와 ${site.coat}를 집 동선에 대입해 보시면 됩니다.`,
          `${site.temperament} 그래서 놀이·산책·휴식 비율이 집마다 다릅니다. 이 노트는 ${name} 기준으로만 적었습니다.`,
          `${site.homeNeed} 빠지면 예쁜 사진과 실제 생활이 어긋납니다.`,
          `상담 전화 ${HUGDAY_PHONE}. 공식 안내 ${HUGDAY_HOME.replace("https://", "")}.`,
        ],
      ];
  const essay = pick(essayPool, seed);

  const notes = isShelter
    ? [
        { title: "건강 기록", body: `${name}에서 보는 첫 항목은 예방·검진 기록입니다. 이상 징후가 있으면 일정을 미루는 쪽이 맞습니다.` },
        { title: "성격 관찰", body: `사람 손, 다른 ${noun}, 소리에 대한 반응은 하루만 봐서는 모릅니다. ${BRAND}는 보호 중 메모를 상담에 연결합니다.` },
        { title: "첫 주 적응", body: `새 집은 냄새가 낯섭니다. ${name} 입양 뒤에는 숨숨집과 화장실 위치를 바꾸지 않는 것이 좋습니다.` },
        { title: "이후 관리", body: `입양 후에도 사료 전환은 천천히. ${kw} 안내에서 초기 체크리스트를 드립니다.` },
      ]
    : [
        { title: "체구·성장", body: `${name}은 ${site.size}입니다. 성체 크기를 집 동선에 대입해 보시면 ${kw} 선택이 분명해집니다.` },
        { title: "털·관리", body: `${site.coat}. 미용 주기와 빗질 시간은 보호자 생활과 맞춰야 합니다.` },
        { title: "기질", body: `${site.temperament} 처음 보는 날의 인상만으로 단정하지 않습니다.` },
        { title: "집 환경", body: `${site.homeNeed} ${BRAND} ${kw} 상담의 출발점입니다.` },
      ];

  const flow = [
    { n: "01", title: "이 페이지에서 보기", body: `${kw} 사진과 ${name} 노트를 먼저 훑어 보세요.` },
    { n: "02", title: "생활이 맞는지", body: `${site.homeNeed} 한 줄에 동의하면 상담이 수월합니다.` },
    { n: "03", title: "문의", body: `${HUGDAY_PHONE} 또는 본점 안내로 희망 시기만 알려 주셔도 됩니다.` },
    { n: "04", title: "만남·이후", body: `아이 확인 후 일정은 서두르지 않습니다. ${BRAND}는 적응 안내를 함께 드립니다.` },
  ];

  const faqs: HugdayFaq[] = [
    {
      q: `${kw} 상담은 어떻게 하나요?`,
      a: `전화 ${HUGDAY_PHONE}으로 ${name} 희망 시기와 가족 구성만 알려 주셔도 됩니다. 공식 안내는 ${HUGDAY_HOME} 입니다.`,
    },
    {
      q: `${name}은 초보 보호자와 맞나요?`,
      a: isShelter
        ? `개체마다 다릅니다. ${name}에서는 성격 메모를 보고 속도를 맞춰 드립니다.`
        : `${site.temperament} ${site.homeNeed} 초보라면 관리 시간을 먼저 가늠해 보세요.`,
    },
    {
      q: `분양가를 이 페이지에 적어 두었나요?`,
      a: `적지 않습니다. 시기와 개체에 따라 달라 ${kw} 상담에서 포함 항목부터 맞춰 드립니다.`,
    },
    {
      q: `${BRAND}는 어떤 사이트인가요?`,
      a: `${site.title} — ${name} 전용 안내 사이트입니다. 다른 견종·묘종 사이트와 내용이 다릅니다.`,
    },
  ];

  const metaDescription = isShelter
    ? `${kw} ${BRAND}. ${name}에서 ${noun} 입양 전 건강·성격·첫 주를 안내합니다. 상담 ${HUGDAY_PHONE}.`
    : `${kw} ${BRAND}. ${name}은 ${site.size}·${site.coat}. ${site.temperament} 입양 전 확인 항목을 정리했습니다.`;

  return {
    site,
    h1: site.title,
    metaDescription: metaDescription.slice(0, 158),
    metaKeywords: `${kw}, ${name}, ${name}${noun === "고양이" ? "고양이" : ""}, ${BRAND}, ${site.tag}`,
    ogTitle: site.title,
    lead: pick(leadPool, seed),
    essay,
    notes,
    flow,
    faqs,
  };
}
