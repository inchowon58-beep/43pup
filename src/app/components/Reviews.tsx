import { SITE } from "@/lib/site";

const REVIEWS = [
  {
    quote: "메인쿤크기를 미리 안내받아, 집 공간과 맞는지부터 결정할 수 있었습니다.",
    name: "김○○ 보호자",
    course: "메인쿤크기",
  },
  {
    quote: "성격이 온순하다는 말만 듣지 않고, 지금 만날 아이 성격을 구체적으로 알려 주셨습니다.",
    name: "이○○ 보호자",
    course: "메인쿤성격",
  },
  {
    quote: "분양가가 왜 달라지는지 항목으로 설명해 주셔서, 무료분양 광고와 비교가 됐습니다.",
    name: "박○○ 보호자",
    course: "메인쿤분양가",
  },
  {
    quote: "빗질 주기와 사료량을 입양 전에 받아서, 대형묘 키우기가 덜 막막했습니다.",
    name: "최○○ 보호자",
    course: "메인쿤키우기",
  },
  {
    quote: "갤러리 사진을 보고 상담하니, 원하는 털색을 바로 맞춰 주셨습니다.",
    name: "정○○ 보호자",
    course: "분양 상담",
  },
  {
    quote: "아이와 함께 사는지부터 물어봐 주셔서, 가정에 맞는 아이를 안내받았습니다.",
    name: "한○○ 보호자",
    course: "입양 상담",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section bg-white/55">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">REVIEWS</p>
          <h2 className="mt-3 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
            분양을 다녀간 이야기
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand}에서 메인쿤분양을 상담한 분의 후기입니다.
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
