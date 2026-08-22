import { SITE } from "@/lib/site";

const STEPS = [
  {
    n: "1",
    title: "상담·디자인",
    desc: "두피 상태와 원하는 선을 보고 시술 범위와 횟수를 정합니다.",
  },
  {
    n: "2",
    title: "시술",
    desc: "밀도·헤어라인에 맞춰 SMP를 진행합니다. 일정은 상담에서 안내합니다.",
  },
  {
    n: "3",
    title: "사후관리",
    desc: "세안·자외선·재방문 일정을 정리해 드립니다.",
  },
  {
    n: "4",
    title: "교육 과정",
    desc: "아카데미 지원은 별도 상담으로 커리큘럼과 일정을 안내합니다.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">HOW IT GOES</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            상담은 이렇게 이어집니다
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            시술과 교육 모두 먼저 상담한 뒤 일정을 잡습니다. {SITE.brand}에 물어보세요.
          </p>
        </div>

        <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-7 hidden h-px bg-[var(--line)] lg:block" />
          {STEPS.map((s) => (
            <div key={s.n} className="relative text-center lg:pt-0">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[0.45rem] bg-[var(--navy)] text-xl font-bold text-[#e8cfc4]">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-bold text-[var(--navy)]">{s.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
