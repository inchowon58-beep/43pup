import { SITE } from "@/lib/site";

const REVIEWS = [
  {
    quote: "헤어라인 선을 먼저 그려 보고 시술해서, 제가 원하던 밀도와 가까웠습니다.",
    name: "김○○ 고객",
    course: "두피문신 시술",
  },
  {
    quote: "교육 과정이 어떻게 돌아가는지부터 설명해 주셔서, 아카데미 상담이 수월했습니다.",
    name: "이○○ 수강생",
    course: "두피문신 교육",
  },
  {
    quote: "위생과 사후관리를 항목으로 알려 줘서, 시술 전후가 덜 막막했습니다.",
    name: "박○○ 고객",
    course: "사후관리",
  },
  {
    quote: "정수리 밀도만 보완하고 싶었는데, 범위를 먼저 정해 주셔서 과하지 않았습니다.",
    name: "최○○ 고객",
    course: "디자인 상담",
  },
  {
    quote: "본점 시술과 평택 교육 일정을 나눠 안내해 줘서 선택이 분명했습니다.",
    name: "정○○ 수강생",
    course: "아카데미 상담",
  },
  {
    quote: "오픈채팅으로 사진 자리와 상담 시간을 바로 잡아 주셔서 편했습니다.",
    name: "한○○ 고객",
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
            시술·교육을 다녀간 이야기
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand}에서 두피문신 시술과 아카데미를 상담한 분의 후기입니다.
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
