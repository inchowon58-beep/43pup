"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { SITE, CTA_KAKAO, KAKAO_CTA_HINT, KEYWORD_INQUIRY } from "@/lib/site";

type FormState = {
  name: string;
  phone: string;
  address: string;
  product: string;
  quantity: string;
  memo: string;
};

const initial: FormState = {
  name: "",
  phone: "",
  address: "",
  product: "분양상담",
  quantity: "1",
  memo: "",
};

const TOPICS = [
  { id: "분양상담", label: "골든두들 분양 상담" },
  { id: "사진문의", label: "분양 중인 아이 사진 문의" },
  { id: "방문예약", label: "방문·예약 문의" },
  { id: "기타", label: "기타 문의" },
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          address: form.address.trim() || "미입력",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "문의 접수에 실패했습니다.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "문의 접수에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section id="contact" className="section bg-white/55">
        <div className="container">
          <div className="mx-auto max-w-lg rounded-[1.4rem] border border-[var(--line)] bg-white p-8 text-center">
            <CheckCircle2 className="mx-auto text-[var(--sky)]" size={48} />
            <h2 className="mt-4 text-2xl font-extrabold text-[var(--navy)]">문의가 접수되었습니다</h2>
            <p className="mt-3 text-[var(--muted)]">
              확인 후 빠르게 연락드리겠습니다. 급하신 경우 카카오톡 오픈채팅으로도 문의해 주세요.
            </p>
            <a
              href={SITE.kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 inline-flex"
            >
              <MessageCircle size={18} />
              {CTA_KAKAO}
            </a>
            <button
              type="button"
              className="mt-4 block w-full text-sm font-semibold text-[var(--muted)] underline"
              onClick={() => {
                setDone(false);
                setForm(initial);
              }}
            >
              다시 작성하기
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section bg-white/55">
      <div className="container grid gap-10 md:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="section-kicker">CONTACT</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            언제든 편하게 연락주세요
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {KEYWORD_INQUIRY}
          </p>
          <p className="mt-3 text-sm text-[var(--muted)]">
            {KAKAO_CTA_HINT}
          </p>
          <a
            href={SITE.kakaoOpenChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sky mt-6 inline-flex"
          >
            <MessageCircle size={18} />
            {CTA_KAKAO}
          </a>
        </div>

        <form onSubmit={onSubmit} className="rounded-[1.4rem] border border-[var(--line)] bg-white p-6 md:p-8">
          <div className="field">
            <label htmlFor="name">성함</label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="홍길동"
            />
          </div>
          <div className="field">
            <label htmlFor="phone">연락처</label>
            <input
              id="phone"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="010-0000-0000"
            />
          </div>
          <div className="field">
            <label htmlFor="address">지역 (선택)</label>
            <input
              id="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="예: 수원 / 서울 강남"
            />
          </div>
          <div className="field">
            <label htmlFor="product">문의 유형</label>
            <select
              id="product"
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
            >
              {TOPICS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="memo">상담 내용</label>
            <textarea
              id="memo"
              rows={4}
              value={form.memo}
              onChange={(e) => setForm({ ...form, memo: e.target.value })}
              placeholder="원하는 크기·성별, 방문 희망일 등을 적어주세요."
            />
          </div>
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            <Send size={18} />
            {submitting ? "접수 중…" : "상담 신청하기"}
          </button>
        </form>
      </div>
    </section>
  );
}
