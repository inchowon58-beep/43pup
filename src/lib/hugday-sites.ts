/** 포옹데이 — 견종·묘종·보호소 43곳. 서브도메인 = {folder}pet.puppytimes.co.kr */

export type HugdayKind = "dog" | "cat" | "shelter";

export type HugdaySite = {
  name: string;
  folder: string;
  kind: HugdayKind;
  accent: string;
  accentSoft: string;
  tag: string;
  size: string;
  coat: string;
  temperament: string;
  homeNeed: string;
  keyword: string;
  title: string;
  slug: string;
  host: string;
  siteUrl: string;
  noun: string;
};

export const PARENT = "puppytimes.co.kr";
export const HUB_URL = `https://${PARENT}`;
export const BRAND = "포옹데이";
export const HUGDAY_PHONE = "0505-300-7779";
export const HUGDAY_PHONE_TEL = "tel:05053007779";
export const HUGDAY_HOME = "https://www.okdog.co.kr";
export const YT_DOG = "https://www.youtube.com/shorts/fbYtG57dN4U";
export const YT_CAT = "https://www.youtube.com/shorts/gdCh87mDhf8";
export const IMAGE_HOST = "https://image.cattery.co.kr";
export const HUGDAY_THEME = "#7a3e2e";

type Row = [
  name: string,
  folder: string,
  kind: HugdayKind,
  tag: string,
  size: string,
  coat: string,
  temperament: string,
  homeNeed: string,
  accent: string,
  accentSoft: string,
];

const ROWS: Row[] = [
  ["아비시니안", "abisinan", "cat", "티킹 털의 활동묘", "중형", "짧은 티킹 코트", "호기심이 많고 사람 옆을 잘 따라다닙니다", "높은 스크래처와 놀이 시간이 필요합니다", "#b85c38", "#f3e0d4"],
  ["아메리칸숏헤어", "american", "cat", "균형 잡힌 가정묘", "중형", "짧은 밀도 있는 털", "온순하고 아이와도 잘 지냅니다", "기본 화장실·급식 자리만 안정되면 됩니다", "#4f6f8f", "#dde6ef"],
  ["뱅갈고양이", "bnagal", "cat", "표범 무늬의 운동묘", "중형", "윤기 있는 스팟 코트", "에너지가 높아 놀이를 자주 원합니다", "넓은 캣타워와 하루 놀이 루틴이 필요합니다", "#c46a1a", "#f6e4cc"],
  ["보스턴테리어", "bosten", "dog", "도시형 컴패니언", "소형", "짧은 매끄러운 털", "밝고 사람 곁을 좋아합니다", "짧은 산책과 실내 놀이면 충분합니다", "#3d4a6b", "#dfe3ee"],
  ["브리티쉬숏헤어", "british", "cat", "둥근 얼굴의 침착묘", "중형~대형", "밀도 높은 단모", "차분하고 관찰을 즐깁니다", "시원한 자리와 무리하지 않는 놀이가 맞습니다", "#6b7c8f", "#e4eaef"],
  ["버니즈마운틴독", "bunyz", "dog", "산악 대형견", "대형", "긴 삼중모", "온화하고 가족과 잘 맞습니다", "시원한 공간과 매일 긴 산책이 필요합니다", "#4a3b32", "#e8dfd6"],
  ["고양이보호소", "catboho", "shelter", "고양이 임시 보호", "다양", "개체마다 다름", "구조 후 안정을 먼저 찾습니다", "조용한 방과 천천히 다가가는 시간이 필요합니다", "#3f6b5a", "#dce8e2"],
  ["차우차우", "chauchau", "dog", "사자 갈기의 독립견", "중형", "풍성한 더블코트", "신중하고 자기 영역을 지킵니다", "이른 사회화와 시원한 그늘이 중요합니다", "#8b4518", "#f0ddd0"],
  ["코카스파니엘", "coca", "dog", "늘어진 귀의 사냥개", "중형", "결이 있는 장모", "다정하고 사람 기분을 잘 읽습니다", "귀 관리와 매일 산책이 필요합니다", "#9a6232", "#f1e2d0"],
  ["골든리트리버", "coldenret", "dog", "금색 리트리버", "대형", "물결 중장모", "사교적이고 학습을 즐깁니다", "운동량과 빗질이 꾸준히 필요합니다", "#c49a3a", "#f6ecd4"],
  ["꼬똥드툴레아", "coton", "dog", "솜털 소형견", "소형", "면화 같은 장모", "밝고 무릎 위에서 잘 쉽니다", "매일 빗질과 짧은 산책이 맞습니다", "#8a6b8f", "#efe4f2"],
  ["닥스훈트", "daks", "dog", "짧은 다리 사냥개", "소형", "단모·장모·와이어", "고집과 애교가 함께 있습니다", "허리 부담을 줄인 계단·소파 관리가 필요합니다", "#7a4b2e", "#ecdccf"],
  ["달마시안", "dalma", "dog", "점박이 마차견", "중형", "짧은 점박이 코트", "지구력이 높고 활동적입니다", "긴 운동과 청각 관리가 필요합니다", "#2c2c2c", "#ececec"],
  ["도베르만", "doberman", "dog", "슬림한 가드독", "대형", "짧은 광택 코트", "충성심이 강하고 훈련 반응이 빠릅니다", "충분한 운동과 일관된 리더십이 필요합니다", "#5c1f24", "#eddde0"],
  ["강아지보호소", "dogboho", "shelter", "강아지 임시 보호", "다양", "개체마다 다름", "구조 후 신뢰를 천천히 쌓습니다", "산책 루틴과 안정된 잠자리가 먼저입니다", "#4d6a4a", "#dde8db"],
  ["잉글리쉬불독", "engbuldog", "dog", "주름 많은 불독", "중형", "짧은 부드러운 털", "느긋하고 실내 생활을 잘합니다", "더위 관리와 주름 청결이 핵심입니다", "#6e5344", "#ebe0d8"],
  ["프렌치불독", "frenchi", "dog", "박쥐 귀 컴패니언", "소형", "짧은 코트", "유머러스하고 사람 곁을 지킵니다", "호흡·더위 관리가 특히 중요합니다", "#5b4a6b", "#e8e0ef"],
  ["이탈리안그레이하운드", "italian", "dog", "슬렌더 사이드독", "소형", "짧은 실키 코트", "예민하고 따뜻한 무릎을 좋아합니다", "보온과 부드러운 바닥이 필요합니다", "#6a5a4a", "#ebe4dc"],
  ["골든두들", "doodle", "dog", "골든×푸들 믹스", "중형", "웨이브·컬 코트", "명랑하고 사람 중심입니다", "빗질과 지적 놀이가 함께 필요합니다", "#b8883a", "#f4e8d0"],
  ["메인쿤", "maincoon", "cat", "큰 체구의 숲고양이", "대형묘", "방수성 장모", "온순하고 물놀이를 즐기기도 합니다", "넓은 동선과 높은 전망대가 필요합니다", "#3e5c4a", "#dce8e1"],
  ["말라뮤트", "malamute", "dog", "북극 썰매개", "대형", "밀도 높은 더블코트", "힘 있고 독립적이며 가족과 유대가 깊습니다", "시원한 환경과 힘쓰는 운동이 필요합니다", "#7a3e2e", "#f0d8d0"],
  ["먼치킨", "mcnchikin", "cat", "짧은 다리 고양이", "소형~중형", "단모 또는 장모", "장난기가 많고 낮게 달립니다", "낮은 가구와 관절을 배려한 동선이 필요합니다", "#c47a6a", "#f6e4de"],
  ["미니핀", "minipin", "dog", "작은 핀셔", "초소형", "짧은 광택 코트", "경계심이 있고 또렷한 성격입니다", "보온과 짧은 산책, 사회화가 필요합니다", "#8b2e2e", "#f0d6d6"],
  ["네바마스커레이드", "neva", "cat", "네바의 포인트 묘", "중형~대형", "세미롱헤어", "온화하고 목소리가 부드럽습니다", "빗질과 시원한 휴식 공간이 필요합니다", "#7b8aa3", "#e4e8f0"],
  ["노르웨이숲고양이", "norwe", "cat", "북유럽 숲고양이", "대형묘", "방한 장모", "독립적이면서도 신뢰를 줍니다", "높은 나무형 스크래처가 잘 맞습니다", "#4a6754", "#dce6df"],
  ["올드잉글리쉬쉽독", "oldbig", "dog", "털로 덮인 목양견", "대형", "셔깃 장모", "온순하고 아이와 잘 지냅니다", "매일 빗질과 시원한 그늘이 필요합니다", "#5a6570", "#e2e6ea"],
  ["페르시안", "perisian", "cat", "납작한 얼굴의 장모묘", "중형", "풍성 장모", "조용하고 무릎 위에서 잘 쉽니다", "매일 빗질과 눈 주위 관리가 필요합니다", "#c4a0b0", "#f4e8ee"],
  ["페키니즈", "pekinee", "dog", "사자 얼굴 소형견", "소형", "풍성 장모", "자존심이 있고 보호자와 밀착합니다", "더위·호흡·눈 관리가 필요합니다", "#a07050", "#f0e4d8"],
  ["포메라니안", "pome", "dog", "폭신한 소형 스피츠", "초소형", "풍성 더블코트", "또렷하고 경계 짖음이 있을 수 있습니다", "빗질과 사회화, 무릎 보호가 필요합니다", "#d4a0a0", "#f8ecec"],
  ["폼스키", "pomsky", "dog", "포메×허스키 믹스", "소형~중형", "스피츠형 더블코트", "활달하고 하울링을 할 수 있습니다", "운동과 빗질, 시원한 잠자리가 필요합니다", "#6a7b8c", "#e2e8ee"],
  ["랙돌", "ragdoll", "cat", "안기면 힘이 빠지는 묘", "대형묘", "실키 세미롱", "유순하고 안기는 것을 잘 견딥니다", "부드러운 바닥과 낮은 점프대가 맞습니다", "#b8a0c4", "#efe8f4"],
  ["러시안블루", "rusian", "cat", "은빛 블루 코트", "중형", "짧은 이중모", "수줍고 한 사람을 잘 따릅니다", "조용한 환경과 숨숨집이 필요합니다", "#6a7c8c", "#e2e8ee"],
  ["사모예드", "samoyed", "dog", "미소 짓는 흰 썰매개", "중형~대형", "흰 더블코트", "사교적이고 혼자 두면 짖을 수 있습니다", "시원함과 매일 빗질·운동이 필요합니다", "#cfc8bc", "#f4f0e8"],
  ["스코티쉬폴드", "scottish", "cat", "접힌 귀의 둥근 묘", "중형", "단모 또는 장모", "조용하고 특이한 자세로 쉽니다", "관절을 배려한 낮은 동선이 필요합니다", "#8a7a6a", "#ece6de"],
  ["셔틀랜드쉽독", "selti", "dog", "작은 콜리", "소형~중형", "풍성 장모", "영리하고 목양 본능이 있습니다", "빗질과 지능 놀이, 매일 산책이 필요합니다", "#6b4a32", "#eadfd4"],
  ["시츄", "shichu", "dog", "사자 같은 얼굴의 소형견", "소형", "실키 장모", "온화하고 실내 생활을 잘합니다", "눈·얼굴 털 관리가 매일 필요합니다", "#c4a070", "#f4eadc"],
  ["슈나우저", "shuna", "dog", "수염 난 테리어", "소형~중형", "와이어 코트", "또렷하고 집 안을 잘 지킵니다", "미용과 짧은 산책, 훈련이 필요합니다", "#5a5a52", "#e4e4de"],
  ["시바이누", "siba", "dog", "일본의 중형 스피츠", "중형", "짧은 더블코트", "독립적이고 자기 주장이 있습니다", "확실한 산책 예절과 사회화가 필요합니다", "#c45c28", "#f4ddd0"],
  ["싱가푸라", "singa", "cat", "작은 체구의 티킹묘", "소형", "짧은 세피아 티킹", "사람을 잘 따라다니며 목소리가 큽니다", "높은 전망대와 놀이 시간이 필요합니다", "#b88858", "#f2e6d6"],
  ["스핑크스고양이", "spinkix", "cat", "털 없는 온기묘", "중형", "거의 없는 코트", "사람을 꼭 붙고 체온을 나눕니다", "보온·피부 관리·자외선 차단이 필요합니다", "#c47858", "#f4e0d4"],
  ["웰시코기", "welshi", "dog", "짧은 다리 목양견", "중형", "짧은 더블코트", "명랑하고 목양 습성이 남아 있습니다", "허리 관리와 체중·산책이 핵심입니다", "#c47a28", "#f4e4cc"],
  ["화이트테리어", "wterrier", "dog", "흰 털의 소형 테리어", "소형", "짧거나 와이어", "또렷하고 사냥 본능이 있습니다", "사회화와 짧은 훈련 게임이 필요합니다", "#8a8a82", "#ecece6"],
  ["요크셔테리어", "yoki", "dog", "실크 장모 소형 테리어", "초소형", "실키 장모", "용기 있고 보호자 곁을 지킵니다", "얼굴 털·이빨 관리와 보온이 필요합니다", "#6b4a2a", "#eadcca"],
];

function toSite(row: Row): HugdaySite {
  const [name, folder, kind, tag, size, coat, temperament, homeNeed, accent, accentSoft] = row;
  const slug = `${folder}pet`;
  const keyword = kind === "shelter" ? name : `${name}분양`;
  return {
    name,
    folder,
    kind,
    tag,
    size,
    coat,
    temperament,
    homeNeed,
    accent,
    accentSoft,
    keyword,
    title: `${keyword} ${BRAND}`,
    slug,
    host: `${slug}.${PARENT}`,
    siteUrl: `https://${slug}.${PARENT}`,
    noun: kind === "cat" ? "고양이" : kind === "shelter" ? (name.includes("고양이") ? "고양이" : "강아지") : "강아지",
  };
}

export const HUGDAY_SITES: HugdaySite[] = ROWS.map(toSite);

export const HUGDAY_DOGS = HUGDAY_SITES.filter((s) => s.kind === "dog");
export const HUGDAY_CATS = HUGDAY_SITES.filter((s) => s.kind === "cat");
export const HUGDAY_SHELTERS = HUGDAY_SITES.filter((s) => s.kind === "shelter");

export const HUGDAY_SLUGS = new Set(HUGDAY_SITES.map((s) => s.slug));

const BY_SLUG = new Map(HUGDAY_SITES.map((s) => [s.slug, s]));
const BY_FOLDER = new Map(HUGDAY_SITES.map((s) => [s.folder, s]));

export function getHugdaySite(slug: string): HugdaySite | undefined {
  const key = (slug || "").toLowerCase().trim();
  return BY_SLUG.get(key) || BY_FOLDER.get(key);
}

export function isHugdaySlug(slug: string): boolean {
  return Boolean(getHugdaySite(slug));
}

export function youtubeFor(site: HugdaySite): string {
  if (site.kind === "cat") return YT_CAT;
  if (site.kind === "shelter" && site.noun === "고양이") return YT_CAT;
  return YT_DOG;
}

export function kindLabel(site: HugdaySite): string {
  if (site.kind === "cat") return "CATTERY NOTE";
  if (site.kind === "shelter") return "SHELTER NOTE";
  return "KENNEL NOTE";
}

export function kindKo(site: HugdaySite): string {
  return `${site.keyword}안내`;
}
