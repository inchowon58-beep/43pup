"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Row = {
  name: string;
  slug: string;
  host: string;
  siteUrl: string;
  keyword: string;
  title: string;
  naver: string;
};

export default function CatteryMetaClient() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [items, setItems] = useState<Row[]>([]);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [q, setQ] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const me = await fetch("/api/auth/me");
      if (!me.ok) {
        setChecking(false);
        return;
      }
      const session = await me.json();
      if (session.role !== "admin") {
        setChecking(false);
        return;
      }
      setAuthed(true);
      const res = await fetch("/api/admin/cattery-meta");
      const data = await res.json();
      const rows: Row[] = data.items || [];
      setItems(rows);
      const next: Record<string, string> = {};
      for (const r of rows) next[r.slug] = r.naver;
      setDraft(next);
      setChecking(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((r) =>
      `${r.name} ${r.slug} ${r.host} ${r.keyword}`.toLowerCase().includes(s)
    );
  }, [items, q]);

  const filled = Object.values(draft).filter((v) => v.trim()).length;

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/cattery-meta", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ metas: draft }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setMessage(data.error || "저장 실패");
      return;
    }
    setMessage(`저장했습니다. 메타 ${data.saved}건.`);
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <p className="text-[var(--muted)]">확인 중…</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <Link href="/admin" className="text-[var(--navy)] underline">
          관리자 로그인이 필요합니다
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-page-root container min-h-screen py-28 pb-16">
      <p className="text-sm font-bold text-[var(--orange)]">Search Advisor</p>
      <h1 className="text-3xl font-extrabold text-[var(--navy)]">지역 사이트 네이버 메타</h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
        서브도메인은 지역명으로 이미 정해져 있습니다. 서치어드바이저에서 받은{" "}
        <code>naver-site-verification</code> 값만 붙여 넣으면 됩니다. 전체 메타 태그를 붙여도
        content 값만 저장합니다. 한 번에 저장하면 230개 사이트 헤드에 반영됩니다.
      </p>
      <p className="mt-2 text-sm">
        등록 {filled} / {items.length}
      </p>

      <form onSubmit={onSave} className="mt-6">
        <div className="mb-4 flex flex-wrap items-end gap-3">
          <label className="min-w-[16rem] flex-1">
            검색 (지역·서브도메인)
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="부천, puchoncat" />
          </label>
          <button className="btn-primary" type="submit" disabled={saving}>
            {saving ? "저장 중…" : "메타 한 번에 저장"}
          </button>
          <Link href="/admin" className="btn-secondary !text-[var(--navy)]">
            ← 관리자
          </Link>
        </div>
        {message ? <p className="mb-4 text-sm text-[var(--navy)]">{message}</p> : null}

        <div className="overflow-x-auto rounded-[var(--radius)] border border-[var(--line)] bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[var(--bg)] text-[var(--muted)]">
              <tr>
                <th className="px-3 py-2 font-semibold">지역</th>
                <th className="px-3 py-2 font-semibold">서브도메인</th>
                <th className="px-3 py-2 font-semibold">네이버 메타</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.slug} className="border-t border-[var(--line)]">
                  <td className="px-3 py-2 align-top">
                    <p className="font-bold text-[var(--navy)]">{r.name}</p>
                    <p className="text-xs text-[var(--muted)]">{r.keyword}</p>
                  </td>
                  <td className="px-3 py-2 align-top">
                    <p className="font-mono text-xs">{r.host}</p>
                    <a className="text-xs text-[var(--coral-deep)]" href={r.siteUrl} target="_blank" rel="noreferrer">
                      사이트 열기
                    </a>
                  </td>
                  <td className="px-3 py-2">
                    <input
                      className="w-full min-w-[18rem]"
                      value={draft[r.slug] || ""}
                      onChange={(e) =>
                        setDraft((prev) => ({ ...prev, [r.slug]: e.target.value }))
                      }
                      placeholder="content 값 또는 전체 meta 태그"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}
