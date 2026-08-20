import { SITE } from "@/lib/site";

const REVIEWS = [
  {
    quote: "사진을 보다가 바로 마음이 갔어요. 집에 온 뒤로 아이 옆을 한시도 안 떠나요.",
    name: "김○○ 보호자",
    course: "골든두들 입양",
  },
  {
    quote: "곱슬 털이 사진보다 더 포근했어요. 상담도 부담 없이 질문에 답해 주셨어요.",
    name: "이○○ 보호자",
    course: "분양 상담",
  },
  {
    quote: "아이와 잘 지낼지 걱정했는데, 버니두들이 먼저 다가오더라고요.",
    name: "박○○ 보호자",
    course: "가족 입양",
  },
  {
    quote: "갤러리에서 고른 그 아이가 왔어요. 산책할 때마다 사람들이 먼저 말을 걸어요.",
    name: "최○○ 보호자",
    course: "두들갤러리",
  },
  {
    quote: "털 빠짐이 적어 아파트에서도 부담이 덜했어요. 성격이 참 부드럽습니다.",
    name: "정○○ 보호자",
    course: "중형견 분양",
  },
  {
    quote: "오픈채팅으로 사진 몇 장 더 받아 보고 결정했어요. 서두르지 않아서 좋았습니다.",
    name: "한○○ 보호자",
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
            우리 집에 온 뒤의 이야기
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand}에서 버니두들을 만난 보호자님의 후기입니다.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <blockquote
              key={r.name + r.course}
              className="rounded-[1.3rem] border border-[var(--line)] bg-white p-6"
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
