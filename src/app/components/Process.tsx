import { SITE } from "@/lib/site";

const STEPS = [
  {
    n: "1",
    title: "아이 곁에서 연락",
    desc: "아이를 수건으로 감싸 서늘한 곳에 두세요. 카카오톡으로 지역과 상황만 알려 주시면 됩니다.",
  },
  {
    n: "2",
    title: "픽업·안치",
    desc: "밤·새벽에도 긴급 픽업을 안내합니다. 아이와 조금 더 있고 싶으시면 그 시간에 맞춥니다.",
  },
  {
    n: "3",
    title: "배웅·화장",
    desc: "비용을 먼저 설명한 뒤, 보호자님이 아이와 인사할 시간을 드리고 화장을 진행합니다.",
  },
  {
    n: "4",
    title: "유골·추모",
    desc: "유골함 전달과 추모 안내로 마칩니다. 이후에도 궁금한 점은 다시 물어보셔도 됩니다.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">PROCESS</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            지금 아이가 떠났다면
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            막막하셔도 괜찮습니다. 지금 하실 일만 {SITE.brand}가 차근히 알려 드립니다.
          </p>
        </div>

        <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-7 hidden h-px bg-[var(--line)] lg:block" />
          {STEPS.map((s) => (
            <div key={s.n} className="relative text-center lg:pt-0">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[var(--sky-deep)] bg-[var(--sky-deep)] font-[family-name:var(--font-serif)] text-xl font-bold text-[#f8f4ec]">
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
