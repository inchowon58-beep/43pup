import { SITE } from "@/lib/site";
import { HOME_FAQS } from "@/lib/faq-data";

export default function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">FAQ</p>
          <h2 className="mt-3 text-2xl font-bold text-[var(--navy)] md:text-4xl">
            {SITE.brand}, 자주 묻는 질문
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            24시 긴급 장례·화장·추모 전, 지금 바로 궁금하신 점을 모았습니다.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl space-y-2">
          {HOME_FAQS.map((f) => (
            <details
              key={f.q}
              className="border-l-[3px] border-[var(--sky)] bg-[#fffcf7] px-5 py-4 ring-1 ring-[var(--line)]"
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
