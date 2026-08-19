"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";

const NAV = [
  { href: "/#about", label: "마루 소개" },
  { href: "/#services", label: "서비스" },
  { href: "/#process", label: "마지막 인사" },
  { href: "/#reviews", label: "후기" },
  { href: "/guide", label: "지역안내" },
  { href: "/#contact", label: "문의" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(251,248,252,0.9)] backdrop-blur-xl">
      <div className="trust-pulse flex items-center justify-center gap-2 bg-[var(--sky-deep)] px-3 py-2 text-center text-[0.78rem] font-semibold tracking-wide text-[#fceef2] md:text-sm">
        <span>마지막 포옹을 천천히 · 24시 상담 · 장례·화장·추모</span>
      </div>

      <div className="container flex h-14 items-center justify-between md:h-[4.25rem]">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sky-deep)] text-[0.68rem] font-bold text-[#fceef2] shadow-[0_6px_16px_rgba(61,74,122,0.28)]"
            aria-hidden
          >
            포옹
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[0.65rem] font-semibold tracking-[0.12em] text-[var(--coral-deep)]">
              {SITE.farm}
            </span>
            <span className="text-[1.05rem] font-extrabold tracking-tight text-[var(--navy)] md:text-lg">
              {SITE.brand}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--muted)] lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[var(--sky-deep)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.kakaoOpenChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-[#FEE500] px-3.5 py-2 text-sm font-extrabold text-[#191919] sm:inline-flex"
          >
            <MessageCircle size={16} />
            {CTA_KAKAO}
          </a>
          <Link
            href="/#contact"
            className="hidden rounded-full bg-[var(--coral)] px-3.5 py-2 text-sm font-bold text-white md:inline-flex"
          >
            문의하기
          </Link>
          <button
            type="button"
            className="inline-flex rounded-full p-2 text-[var(--navy)] lg:hidden"
            aria-label="메뉴"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-white/95 px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2.5 text-sm font-medium text-[var(--navy)] hover:bg-[var(--sky-soft)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={SITE.kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 rounded-full bg-[#FEE500] px-3 py-2.5 text-sm font-extrabold text-[#191919]"
              onClick={() => setOpen(false)}
            >
              <MessageCircle size={16} />
              {CTA_KAKAO}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
