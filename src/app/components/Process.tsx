import { SITE } from "@/lib/site";

const STEPS = [
  {
    n: "1",
    title: "사진으로 만나기",
    desc: "갤러리에서 분양 중인 골든두들 모습을 먼저 보세요.",
  },
  {
    n: "2",
    title: "상담으로 고르기",
    desc: "원하는 크기·성별·색을 알려 주시면 지금 만날 수 있는 아이를 안내합니다.",
  },
  {
    n: "3",
    title: "방문·예약",
    desc: "직접 보고 싶으시면 일정을 맞춰 드립니다. 급하셔도, 천천히여도 됩니다.",
  },
  {
    n: "4",
    title: "집으로",
    desc: "첫 사료·산책·미용 포인트를 알려 드리고, 가족이 되는 날을 엽니다.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">ADOPTION</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            입양은 이렇게 이어집니다
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            부담 없이 사진을 보고, 마음이 가면 {SITE.brand}에 물어보세요.
          </p>
        </div>

        <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-7 hidden h-px bg-[var(--line)] lg:block" />
          {STEPS.map((s) => (
            <div key={s.n} className="relative text-center lg:pt-0">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[0.55rem] bg-[var(--navy)] text-xl font-bold text-[#f3c9a3]">
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
