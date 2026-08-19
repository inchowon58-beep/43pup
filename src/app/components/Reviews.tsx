import { SITE } from "@/lib/site";

const REVIEWS = [
  {
    quote:
      "갑자기 떠난 아이, 밤늦게 오픈채팅으로 문의했는데도 차분히 안내해 주셔서 정말 고마웠습니다.",
    name: "김○○ 보호자",
    course: "24시 긴급 상담",
  },
  {
    quote:
      "장례 절차와 비용을 미리 설명해 주셔서 마음 편히 마무리할 수 있었어요.",
    name: "이○○ 보호자",
    course: "장례 진행",
  },
  {
    quote:
      "전국 상담이라 걱정했는데, 픽업부터 화장·유골 수습까지 일정에 맞춰 도와주셨습니다.",
    name: "박○○ 보호자",
    course: "긴급 픽업",
  },
  {
    quote:
      "추모 시간을 충분히 가질 수 있게 배려해 주셨어요. 존중받는 마무리였습니다.",
    name: "최○○ 보호자",
    course: "추모 안내",
  },
  {
    quote:
      "화장 후 유골함 전달까지 꼼꼼히 안내해 주셔서 마음이 놓였습니다.",
    name: "정○○ 보호자",
    course: "화장·수습",
  },
  {
    quote:
      "오픈채팅으로도 친절히 안내받아 편했습니다. 슬픈 시간에 큰 도움이 됐어요.",
    name: "한○○ 보호자",
    course: "오픈채팅 상담",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section bg-[rgba(255,252,247,0.65)]">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">REVIEWS</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            보호자님이 남겨 주신 이야기
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand}를 통해 장례·화장·추모를 경험하신 분들의 후기입니다.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <blockquote key={r.name + r.course} className="bg-[#fffcf7] p-6 ring-1 ring-[var(--line)]">
              <p className="font-[family-name:var(--font-serif)] text-3xl leading-none text-[var(--coral)]">
                “
              </p>
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
