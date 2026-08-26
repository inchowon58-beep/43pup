import type { CatteryRegion } from "./cattery-regions";
import { CATTERY_HOME, CATTERY_PHONE } from "./cattery-regions";

export type CatteryFaq = { q: string; a: string };
export type CatteryPage = {
  region: CatteryRegion;
  h1: string;
  metaDescription: string;
  metaKeywords: string;
  intro: string[];
  health: { h2: string; paragraphs: string[] };
  flow: { h2: string; paragraphs: string[] };
  local: { h2: string; paragraphs: string[] };
  faqs: CatteryFaq[];
  highlights: string[];
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], n: number): T {
  return arr[n % arr.length];
}

function neighbors(region: CatteryRegion, all: CatteryRegion[]): CatteryRegion[] {
  return all.filter((r) => r.sido === region.sido && r.slug !== region.slug).slice(0, 3);
}

export function buildCatteryPage(region: CatteryRegion, all: CatteryRegion[]): CatteryPage {
  const kw = region.keyword;
  const city = region.name;
  const seed = hash(region.slug);
  const near = neighbors(region, all);
  const nearText = near.length
    ? near.map((r) => r.keyword).join(", ")
    : `${region.sido} 인근 고양이분양`;

  const introA = [
    `${kw}을 알아보시는 보호자께, ${city}에서 아이를 고를 때 먼저 확인할 점을 정리했습니다. 캐터리 본점은 건강 기록과 성격을 상담에서 맞춰 드립니다.`,
    `${city}에서 ${kw}을 찾으실 때 흔한 질문은 품종, 분양 시기, 입양 후 관리입니다. ${region.title}은 상담 전에 기본 안내를 먼저 보여 드립니다.`,
    `${kw}은 충동으로 정하기보다, ${city} 생활 리듬과 맞는지부터 보시면 선택이 분명해집니다. 방문·문의는 본점 안내를 따라 주시면 됩니다.`,
    `${region.sido} ${city} 기준으로 ${kw} 문의가 이어집니다. 아이 얼굴과 건강 상태를 확인한 뒤, 가정 환경에 맞는 입양 순서를 안내합니다.`,
    `${kw} 검색 후 바로 결정하지 않으셔도 됩니다. ${city}에서 키울 공간, 함께 지낼 가족, 희망 품종만 알려 주셔도 상담이 시작됩니다.`,
    `${city} ${kw}은 가정 분양을 전제로 안내합니다. 무료분양 문구만 강조되는 곳은 건강·서류를 따로 확인하시는 편이 안전합니다.`,
    `${kw}을 고르실 때 외모만 보지 마시고, ${city} 집 안 동선과 화장실·급식 자리를 먼저 그려 보시면 시행착오가 줄어듭니다.`,
    `${region.title} 페이지는 ${kw} 보호자가 ${city}에서 자주 묻는 내용만 모아 두었습니다. 실제 가능 여부는 상담에서 확인하시면 됩니다.`,
  ];
  const introB = [
    `분양가는 품종·월령·시기에 따라 달라지므로 이 페이지에 단가를 박지 않습니다. ${city} 상담에서 포함 항목부터 맞춰 드립니다.`,
    `전화 ${CATTERY_PHONE}으로 ${kw} 일정을 문의하실 수 있습니다. ${city} 방문이 어려우면 본점 안내를 먼저 받아 보세요.`,
    `입양 후에는 사료·화장실·초기 적응이 한꺼번에 옵니다. ${city}에서 처음 키우시는 분은 본점 키우기 안내를 함께 받아 가시면 됩니다.`,
    `공식 안내는 ${CATTERY_HOME.replace("https://", "")}에서 이어서 보실 수 있습니다. ${kw} 상담과 본점 안내를 구분해 두었습니다.`,
    `${city} 보호자께서는 아이 유무, 다른 반려동물, 희망 털색을 알려 주시면 ${kw} 상담이 짧아집니다.`,
    `건강 검진·예방 일정은 개체마다 다릅니다. ${kw}을 ${city}에서 진행하실 때 현재 기록을 확인하고 안내합니다.`,
  ];
  const introC = [
    `이 글의 핵심 키워드는 ${kw}입니다. ${region.sido} 안에서 ${city}를 기준으로 분양 문의가 들어옵니다.`,
    `${kw}, ${city}고양이입양, ${city}캐터리 검색으로 오신 분을 위해 입양 전 체크 항목을 풀어 두었습니다.`,
    `${nearText}와 함께 검색하시는 경우도 많습니다. ${city}가 생활권이라면 이 페이지의 ${kw} 안내를 먼저 보시면 됩니다.`,
  ];

  const healthH2 = [
    `${kw}, 입양 전 건강 확인`,
    `${city}에서 보는 고양이 건강 관리`,
    `${kw} 전에 알아 두는 관리 포인트`,
  ];
  const healthP = [
    [
      `${city}에서 ${kw}을 진행할 때 가장 먼저 보는 것은 활력과 식욕, 그리고 지금까지의 관리 기록입니다. 이상 징후가 있으면 일정을 미루는 편이 낫습니다.`,
      `화장실 습관과 그루밍은 입양 첫 주에 흔히 흔들립니다. ${kw} 상담에서 ${city} 집 구조에 맞춰 화장실 자리부터 잡아 드립니다.`,
      `예방과 검진 주기는 월령에 따라 다릅니다. ${city} 보호자께서는 본점에서 안내받은 일정표를 기준으로 따라가시면 됩니다.`,
    ],
    [
      `${kw} 아이는 이동 직후 숨는 경우가 있습니다. ${city} 가정에서는 하루이틀 조용한 방을 만들어 주시는 것이 적응에 도움이 됩니다.`,
      `사료를 갑자기 바꾸면 설사가 올 수 있습니다. ${city} ${kw} 안내에서는 기존 사료를 며칠 섞어 쓰는 순서를 함께 드립니다.`,
      `발톱·귀 관리는 품종보다 개체 차가 큽니다. 상담 때 ${city}에서 직접 관리가 가능한지부터 여쭤 봅니다.`,
    ],
    [
      `${region.sido} ${city}처럼 아파트가 많은 생활권에서는 실내 배변과 스크래처 위치가 ${kw} 만족도를 가릅니다.`,
      `중성화·추가 접종 여부는 아이마다 다릅니다. ${kw} 계약 전 ${city} 상담에서 포함된 항목을 목록으로 확인하세요.`,
      `공식 본점 안내는 ${CATTERY_HOME}에서 이어서 보실 수 있습니다. ${city} 페이지는 ${kw} 지역 안내용입니다.`,
    ],
  ];

  const flowH2 = [
    `${kw} 진행 순서`,
    `${city}에서 입양까지`,
    `${kw} 상담이 흐르는 방식`,
  ];
  const flowP = [
    [
      `1단계는 이 페이지에서 ${kw} 기본 안내를 확인하는 일입니다. ${city} 생활이 맞는지 스스로 가늠해 보세요.`,
      `2단계는 ${CATTERY_PHONE} 또는 본점 문의로 희망 품종·시기를 알리는 일입니다. ${city} 방문 가능 여부도 함께 알려 주세요.`,
      `3단계는 아이 확인 후 입양입니다. 급하게 정하지 않아도 되며, ${kw}은 보호자 결정이 먼저입니다.`,
    ],
    [
      `${city}에서 ${kw}을 문의하실 때는 가족 구성과 함께 지낼 동물만 말씀해 주셔도 됩니다.`,
      `사진·영상 확인이 필요하면 본점 안내에 따라 진행합니다. ${kw} 페이지에서 단정한 재고를 약속하지는 않습니다.`,
      `입양 당일에는 이동장과 초기 사료를 준비해 주세요. ${city}까지 이동 시간이 길면 휴식 구간을 두는 것이 좋습니다.`,
    ],
  ];

  const localH2 = [
    `${city}에서 ${kw}을 찾는 이유`,
    `${region.sido} ${city} ${kw} 안내`,
    `${kw}과 ${city} 생활권`,
  ];
  const localP = [
    [
      `${city}는 ${region.sido} 생활권에서 ${kw} 문의가 꾸준한 지역입니다. 출퇴근·육아 리듬에 맞는 아이인지 상담에서 맞춰 드립니다.`,
      `인근에서 함께 검색되는 키워드는 ${nearText}입니다. 실제 거주가 ${city}라면 이 사이트 안내가 기준이 됩니다.`,
      `푸터 주소는 ${region.address}로 표기합니다. 자세한 방문 동선은 본점 상담에서 안내합니다.`,
    ],
    [
      `${kw}을 ${city} 기준으로 안내하는 이유는, 검색하신 키워드와 생활권이 같아야 입양 후 관리가 수월하기 때문입니다.`,
      `${region.sido} 다른 시·군 문의는 본점에서 권역을 나눠 안내할 수 있습니다. ${city} 거주가 확실하면 이 페이지를 즐겨 두세요.`,
      `공식 홈페이지는 ${CATTERY_HOME}입니다. ${kw} 지역 사이트와 본점 사이트를 구분해 이용해 주세요.`,
    ],
  ];

  const faqSets: CatteryFaq[][] = [
    [
      {
        q: `${kw}은 어떻게 문의하나요?`,
        a: `${CATTERY_PHONE}으로 전화하시거나 공식 홈페이지에서 본점 안내를 확인하시면 됩니다. ${city} 거주와 희망 품종만 알려 주셔도 됩니다.`,
      },
      {
        q: `${city}에서도 분양이 가능한가요?`,
        a: `가능합니다. 이 사이트는 ${kw} 안내용이며, 일정과 방문은 캐터리 본점에서 안내합니다.`,
      },
      {
        q: `분양 비용은 얼마인가요?`,
        a: `품종·월령·시기에 따라 달라져 단가를 페이지에 고정하지 않습니다. ${city} ${kw} 상담에서 포함 항목부터 안내합니다.`,
      },
      {
        q: `공식 홈페이지는 어디인가요?`,
        a: `캐터리 본점 공식 사이트는 ${CATTERY_HOME}입니다. ${kw} 지역 안내와 본점 안내를 함께 보시면 됩니다.`,
      },
    ],
    [
      {
        q: `${kw} 전에 집을 어떻게 준비하나요?`,
        a: `화장실, 숨숨집, 급식 자리를 ${city} 집 동선에 맞춰 미리 잡아 두세요. 상담에서 품종별 포인트를 추가로 안내합니다.`,
      },
      {
        q: `아이와 함께 살아도 되나요?`,
        a: `가족 구성에 따라 다릅니다. ${city} ${kw} 상담 때 아이 나이와 성격을 말씀해 주시면 맞는 아이를 안내합니다.`,
      },
      {
        q: `무료분양과 어떻게 다른가요?`,
        a: `${kw}은 건강·관리 안내가 남는 가정 분양을 기준으로 합니다. 조건만 파격적인 곳은 서류를 따로 확인하세요.`,
      },
      {
        q: `주소는 어디인가요?`,
        a: `안내용 표기는 ${region.address}입니다. 방문 상세는 본점 상담에서 안내합니다.`,
      },
    ],
  ];

  const highlights = pick(
    [
      ["가정 분양 상담", "건강 기록 확인", `${city} 생활 안내`, "본점 연계"],
      [`${kw} 상담`, "입양 전 체크", "초기 키우기 안내", "본점 바로가기"],
      ["품종·성격 안내", `${city} 권역 상담`, "전화 예약", "공식 홈 연결"],
    ],
    seed
  );

  const desc = pick(
    [
      `${kw} 전문 캐터리 본점 안내. ${city}에서 고양이 입양 전 건강·성격·과정을 확인하고 ${CATTERY_PHONE}으로 상담하세요.`,
      `${region.sido} ${city} ${kw}. 가정 분양 절차와 키우기 포인트를 정리했습니다. 공식 홈 ${CATTERY_HOME.replace("https://", "")}`,
      `${kw} · ${city}고양이입양. 단가 단정 없이 상담에서 안내합니다. ${region.address}`,
    ],
    seed + 3
  );

  return {
    region,
    h1: region.title,
    metaDescription: desc.slice(0, 158),
    metaKeywords: `${kw}, ${city}고양이입양, ${city}캐터리, 고양이분양, 캐터리본점, ${region.sido}고양이분양`,
    intro: [
      pick(introA, seed),
      pick(introB, seed + 1),
      pick(introC, seed + 2),
      `${city}에서 ${kw}을 알아보실 때 이 페이지는 ${region.sido} ${city} 생활권 기준으로 적었습니다. 같은 본점이라도 지역 안내 문장은 ${city}에 맞춰 따로 두었습니다.`,
    ],
    health: { h2: pick(healthH2, seed), paragraphs: pick(healthP, seed + 4) },
    flow: { h2: pick(flowH2, seed + 1), paragraphs: pick(flowP, seed + 5) },
    local: { h2: pick(localH2, seed + 2), paragraphs: pick(localP, seed + 6) },
    faqs: pick(faqSets, seed + 7),
    highlights,
  };
}
