const GROUPS = [
  {
    title: "크기·성장",
    items: [
      "수컷 성체 6~12kg, 암컷 4~8kg 전후 (개체 차 있음)",
      "키 25~40cm 전후, 몸통이 길고 근육이 많습니다",
      "2~4년에 걸쳐 천천히 자라 대형묘가 됩니다",
      "공간은 캣타워·높은 길보다 바닥 면적이 여유로운 편이 맞습니다",
    ],
  },
  {
    title: "털·그루밍",
    items: [
      "방수에 가까운 이중모, 목도리와 바지털이 도드라집니다",
      "주 2~3회 빗질이면 엉킴을 줄일 수 있습니다",
      "환모기에는 빗질 횟수를 조금 늘려 주시면 됩니다",
      "목욕은 자주 하지 않아도 되며, 발톱·귀 관리는 따로 안내합니다",
    ],
  },
  {
    title: "성격·생활",
    items: [
      "사람을 잘 따르고, 낮고 깊은 목소리로 대화하듯 웁니다",
      "아이·다른 반려동물과 지내는 개체가 많습니다",
      "놀이와 사람 시간이 있으면 실내 생활이 가능합니다",
      "개체마다 차이가 있어, 지금 만날 수 있는 아이 성격을 상담에서 안내합니다",
    ],
  },
  {
    title: "분양가·입양 전",
    items: [
      "분양가는 혈통·성별·털색·시기에 따라 달라집니다",
      "페이지에 단가를 단정하지 않고, 상담에서 포함 항목을 먼저 설명합니다",
      "무료분양 문구만 강조되는 곳은 건강·서류 확인이 필요합니다",
      "쿤스토리에서는 사진·생활 환경·예산을 맞춰 본 뒤 안내합니다",
    ],
  },
];

export default function Director() {
  return (
    <section id="director" className="section bg-white/55">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">BREED GUIDE</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            메인쿤 키우기 전에
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            특징과 크기, 분양가를 한곳에 모아 두었습니다. 입양 전 확인용으로 보시면 됩니다.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {GROUPS.map((g) => (
            <div
              key={g.title}
              className="border border-[var(--line)] bg-white px-5 py-5"
            >
              <h3 className="text-sm font-bold tracking-[0.12em] text-[var(--coral-deep)]">
                {g.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-[var(--ink)]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--coral)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
