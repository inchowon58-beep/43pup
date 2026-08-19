import { SITE } from "@/lib/site";

const REVIEWS = [
  {
    quote:
      "마지막 장을 급하게 닫지 않아도 된다고 하니, 마음이 조금 정리됐어요.",
    name: "김○○ 보호자",
    course: "엔딩 상담",
  },
  {
    quote:
      "엔딩을 한 장면씩 설명해주셔서, 마음이 조금 정리된 뒤에 결정할 수 있었어요.",
    name: "이○○ 보호자",
    course: "장례 진행",
  },
  {
    quote:
      "전국 상담이라 걱정했는데, 픽업부터 화장·유골 수습까지 일정에 맞춰 도와주셨습니다.",
    name: "박○○ 보호자",
    course: "픽업 안내",
  },
  {
    quote:
      "추모 시간을 충분히 가질 수 있게 배려해 주셨어요. 존중받는 마무리였습니다.",
    name: "최○○ 보호자",
    course: "추모 안내",
  },
  {
    quote:
      "크레딧처럼 유골함 전달까지 끝까지 안내해 주셔서 마음이 놓였습니다.",
    name: "정○○ 보호자",
    course: "화장·수습",
  },
  {
    quote:
      "오픈채팅으로도 부드럽게 안내받아 편했습니다. 슬픈 시간에 큰 도움이 됐어요.",
    name: "한○○ 보호자",
    course: "오픈채팅 상담",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section bg-white/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">REVIEWS</p>
          <h2 className="mt-3 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
            보호자님이 남겨 주신 이야기
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand}를 통해 장례·화장·추모를 경험하신 분들의 후기입니다.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <blockquote
              key={r.name + r.course}
              className="border border-[var(--line)] bg-white p-6"
            >
              <p className="text-3xl leading-none text-[var(--coral)]">“</p>
              <p className="mt-1 text-[var(--ink)] leading-relaxed">{r.quote}</p>
              <footer className="mt-4 border-t border-[var(--line)] pt-3">
                <p className="text-sm font-bold text-[var(--navy)]">{r.name}</p>
                <p className="text-xs text-[var(--sky)]">{r.course}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
