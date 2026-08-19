import { SITE } from "@/lib/site";

const STEPS = [
  {
    n: "1",
    title: "엔딩을 열다",
    desc: "아이를 수건으로 감싸 서늘한 곳에 둡니다. 지역만 알려 주셔도 상담이 시작됩니다.",
  },
  {
    n: "2",
    title: "모시고 안치",
    desc: "밤·새벽에도 픽업을 안내합니다. 조금 더 곁에 있고 싶으시면 그 시간에 맞춥니다.",
  },
  {
    n: "3",
    title: "배웅·화장",
    desc: "비용을 먼저 확인한 뒤, 인사할 시간을 드리고 화장을 진행합니다.",
  },
  {
    n: "4",
    title: "크레딧",
    desc: "유골함 전달과 추모 안내로 마침표를 찍습니다. 이후에도 다시 물어보셔도 됩니다.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">SEQUENCE</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            엔딩을 준비하는 순서
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            한 장면씩 이어 갑니다. {SITE.brand}가 호흡에 맞춰 안내합니다.
          </p>
        </div>

        <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-7 hidden h-px bg-[var(--line)] lg:block" />
          {STEPS.map((s) => (
            <div key={s.n} className="relative text-center lg:pt-0">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[0.4rem] bg-[var(--navy)] text-xl font-bold text-[#c4a35a]">
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
