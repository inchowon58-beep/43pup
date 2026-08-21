import { SITE } from "@/lib/site";

const REVIEWS = [
  {
    quote: "선금부터 달라는 곳이 많아서 막막했는데, 계약서·환불 조항을 먼저 보라고 해서 한 곳을 걸렀어요.",
    name: "김○○ 예비신랑",
    course: "업체 주의사항",
  },
  {
    quote: "특정 업체 광고가 아니라 확인할 항목이 적혀 있어서, 상담할 때 질문이 생겼습니다.",
    name: "이○○ 예비신부",
    course: "정보 상담",
  },
  {
    quote: "‘오늘만 할인’이 반복되면 피하라고 한 문장이 실제로 도움이 됐습니다.",
    name: "박○○ 보호자",
    course: "사기 주의",
  },
  {
    quote: "지역만 말했는데, 그 지역에서 흔한 과장 광고 유형을 먼저 알려 주셨어요.",
    name: "최○○ 예비신랑",
    course: "지역 안내",
  },
  {
    quote: "비용이 한 줄로만 나온 견적은 쪼개서 물어보라고 해서, 숨은 항목을 찾았습니다.",
    name: "정○○ 예비신부",
    course: "비용 확인",
  },
  {
    quote: "오픈채팅으로 확인 목록을 받고, 서두르지 말라는 말이 제일 안심됐습니다.",
    name: "한○○ 예비신랑",
    course: "오픈채팅 상담",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section bg-white/55">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">REVIEWS</p>
          <h2 className="mt-3 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
            정보를 먼저 본 뒤의 이야기
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand}에서 확인 항목을 받은 예비고객의 후기입니다.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <blockquote
              key={r.name + r.course}
              className="rounded-[0.9rem] border border-[var(--line)] bg-white p-6"
            >
              <p className="text-3xl leading-none text-[var(--coral)]">“</p>
              <p className="mt-1 leading-relaxed text-[var(--ink)]">{r.quote}</p>
              <footer className="mt-4 border-t border-[var(--line)] pt-3">
                <p className="text-sm font-bold text-[var(--navy)]">{r.name}</p>
                <p className="text-xs text-[var(--coral)]">{r.course}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
