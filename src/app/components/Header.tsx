"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";

const NAV = [
  { href: "/#about", label: "소개" },
  { href: "/#services", label: "서비스" },
  { href: "/#process", label: "엔딩 순서" },
  { href: "/#reviews", label: "후기" },
  { href: "/guide", label: "지역안내" },
  { href: "/#contact", label: "문의" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#161412]/96 text-[#f3eee6] backdrop-blur-xl">
      <div className="trust-pulse flex items-center justify-center gap-2 border-b border-white/8 bg-black/25 px-3 py-1.5 text-center text-[0.72rem] font-medium tracking-[0.16em] text-[#c4a35a] md:text-xs">
        <span>ENDING FOR YOU · 24시 상담 · 장례·화장·추모</span>
      </div>

      <div className="container flex h-14 items-center justify-between md:h-[4.25rem]">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-[0.3rem] border border-[#c4a35a]/70 text-[0.62rem] font-bold tracking-wide text-[#c4a35a]"
            aria-hidden
          >
            END
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[0.62rem] font-semibold tracking-[0.16em] text-[#c4a35a]">
              {SITE.farm}
            </span>
            <span className="text-[1.05rem] font-bold tracking-tight text-[#f3eee6] md:text-lg">
              {SITE.brand}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[#f3eee6]/70 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[#c4a35a]"
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
            className="hidden items-center gap-1.5 rounded-[0.4rem] bg-[#FEE500] px-3.5 py-2 text-sm font-extrabold text-[#191919] sm:inline-flex"
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
            className="inline-flex rounded-[0.4rem] p-2 text-[#f3eee6] lg:hidden"
            aria-label="메뉴"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#161412] px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[0.4rem] px-3 py-2.5 text-sm font-medium text-[#f3eee6] hover:bg-white/8"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={SITE.kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 rounded-[0.4rem] bg-[#FEE500] px-3 py-2.5 text-sm font-extrabold text-[#191919]"
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
