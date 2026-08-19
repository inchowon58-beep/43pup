import { SITE } from "@/lib/site";
import { HOME_FAQS } from "@/lib/faq-data";

export default function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">FAQ</p>
          <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)] md:text-4xl">
            {SITE.brand}, 자주 묻는 질문
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            마지막 인사를 준비하시며 궁금하신 점을 모았습니다.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl space-y-3">
          {HOME_FAQS.map((f) => (
            <details
              key={f.q}
              className="rounded-[1.4rem] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(45,42,56,0.04)] ring-1 ring-[var(--line)]"
            >
              <summary className="cursor-pointer font-bold text-[var(--navy)]">{f.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
