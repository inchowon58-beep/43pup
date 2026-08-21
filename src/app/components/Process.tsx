import { SITE } from "@/lib/site";

const STEPS = [
  {
    n: "1",
    title: "기본 정보 읽기",
    desc: "국제결혼 절차·비용 구성·주의 신호를 먼저 정리해 보세요.",
  },
  {
    n: "2",
    title: "피해야 할 곳 걸러 내기",
    desc: "선금만 재촉하거나 계약이 없는 진행은 보류하는 것이 안전합니다.",
  },
  {
    n: "3",
    title: "업체 정보 확인",
    desc: "지역·희망 국가를 알려 주시면 확인할 항목과 믿을 수 있는 업체 정보를 안내합니다.",
  },
  {
    n: "4",
    title: "본인이 비교·결정",
    desc: "협회는 결정을 대신하지 않습니다. 설명된 정보를 기준으로 천천히 고르시면 됩니다.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">HOW TO DECIDE</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            상담은 이렇게 이어집니다
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            급하게 계약하지 않아도 됩니다. 확인 목록을 본 뒤 {SITE.brand}에 물어보세요.
          </p>
        </div>

        <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-7 hidden h-px bg-[var(--line)] lg:block" />
          {STEPS.map((s) => (
            <div key={s.n} className="relative text-center lg:pt-0">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[0.45rem] bg-[var(--navy)] text-xl font-bold text-[#e8c9a0]">
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
