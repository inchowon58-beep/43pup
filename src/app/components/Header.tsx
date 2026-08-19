"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";

const NAV = [
  { href: "/#about", label: "식장 소개" },
  { href: "/#services", label: "서비스" },
  { href: "/#process", label: "지금 할 일" },
  { href: "/#reviews", label: "후기" },
  { href: "/guide", label: "지역안내" },
  { href: "/#contact", label: "문의" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(248,244,236,0.94)] backdrop-blur-md">
      <div className="trust-pulse flex items-center justify-center gap-2 bg-[var(--sky-deep)] px-3 py-2 text-center text-[0.78rem] font-semibold tracking-wide text-[#f8f4ec] md:text-sm">
        <span>24시 긴급 픽업 · 지금 바로 상담 · 장례·화장·추모</span>
      </div>

      <div className="container flex h-14 items-center justify-between md:h-[4.25rem]">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-[0.4rem] bg-[var(--sky-deep)] text-[0.7rem] font-bold text-[#f8f4ec]"
            aria-hidden
          >
            안심
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[0.65rem] font-semibold tracking-[0.12em] text-[var(--coral)]">
              {SITE.farm}
            </span>
            <span className="font-[family-name:var(--font-serif)] text-[1.05rem] font-bold tracking-tight text-[var(--navy)] md:text-lg">
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
            className="hidden items-center gap-1.5 rounded-[0.4rem] bg-[var(--sky-deep)] px-3 py-2 text-sm font-semibold text-[#f8f4ec] sm:inline-flex"
          >
            <MessageCircle size={16} />
            {CTA_KAKAO}
          </a>
          <Link
            href="/#contact"
            className="hidden rounded-[0.4rem] bg-[var(--coral)] px-3.5 py-2 text-sm font-bold text-white md:inline-flex"
          >
            문의하기
          </Link>
          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-[var(--navy)] lg:hidden"
            aria-label="메뉴"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-[#fffcf7] px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-[var(--navy)] hover:bg-[var(--sky-soft)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={SITE.kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 rounded-[0.4rem] bg-[var(--sky-deep)] px-3 py-2.5 text-sm font-semibold text-[#f8f4ec]"
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
