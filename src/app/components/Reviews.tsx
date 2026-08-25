import { SITE } from "@/lib/site";

const REVIEWS = [
  {
    quote: "성체 무게를 먼저 들어서, 소파와 복도가 충분한지부터 가늠할 수 있었습니다.",
    name: "윤○○ 보호자",
    course: "메인쿤크기",
  },
  {
    quote: "온순하다는 한 줄이 아니라, 그 아이가 사람 곁에 어떻게 있는지를 설명해 주셨습니다.",
    name: "조○○ 보호자",
    course: "메인쿤성격",
  },
  {
    quote: "분양가가 갈리는 이유를 항목으로 들어서, 싼 곳과 무엇이 다른지 비교가 됐습니다.",
    name: "서○○ 보호자",
    course: "메인쿤분양가",
  },
  {
    quote: "빗질과 사료량을 입양 전에 받아서, 대형묘가 덜 막막했습니다.",
    name: "배○○ 보호자",
    course: "메인쿤키우기",
  },
  {
    quote: "갤러리에서 고른 털색을 바로 맞춰 주셔서, 상담이 짧았습니다.",
    name: "문○○ 보호자",
    course: "분양 상담",
  },
  {
    quote: "초등학생과 함께 사는지부터 물어봐 주셔서, 집 분위기에 맞는 아이를 안내받았습니다.",
    name: "신○○ 보호자",
    course: "입양 상담",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section bg-white/55">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">VOICES</p>
          <h2 className="mt-3 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
            집을 정한 뒤의 말
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand}에서 메인쿤분양을 상담한 분의 이야기입니다.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <blockquote
              key={r.name + r.course}
              className="rounded-[0.45rem] border border-[var(--line)] bg-white p-6"
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
