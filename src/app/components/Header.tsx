"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";

const NAV = [
  { href: "/#about", label: "소개" },
  { href: "/#services", label: "시술" },
  { href: "/#process", label: "과정" },
  { href: "/#director", label: "원장" },
  { href: "/#gallery", label: "갤러리" },
  { href: "/#reviews", label: "후기" },
  { href: "/guide", label: "지역안내" },
  { href: "/#contact", label: "문의" },
];

function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden className="shrink-0">
        <rect width="36" height="36" rx="4" fill="#2a201c" />
        <circle cx="12" cy="16" r="2" fill="#c45c4a" />
        <circle cx="18" cy="12" r="2" fill="#e8cfc4" />
        <circle cx="24" cy="16" r="2" fill="#c45c4a" />
        <circle cx="14.5" cy="22" r="1.6" fill="#8a6a58" />
        <circle cx="21.5" cy="22" r="1.6" fill="#8a6a58" />
        <circle cx="18" cy="26.5" r="1.4" fill="#d4a090" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[0.62rem] font-medium tracking-[0.18em] text-[#e8cfc4]">
          {SITE.brandEn}
        </span>
        <span className="mt-1 text-[1.02rem] font-bold tracking-tight text-white md:text-[1.12rem]">
          {SITE.brand}
        </span>
      </span>
    </Link>
  );
}

export default function Header({ kakaoHref }: { kakaoHref?: string }) {
  const [open, setOpen] = useState(false);
  const href = kakaoHref || SITE.kakaoOpenChatUrl;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#2a201c] text-white">
      <div className="h-[3px] bg-[linear-gradient(90deg,#2a201c,#c45c4a,#8a6a58,#2a201c)]" />

      <div className="container flex h-[3.7rem] items-center justify-between md:h-[4.5rem]">
        <BrandMark />

        <nav className="hidden items-center gap-6 text-[0.88rem] font-medium text-white/70 lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#e8cfc4]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-kakao hidden items-center gap-1.5 rounded-[0.45rem] px-3.5 py-2 text-sm font-extrabold sm:inline-flex"
          >
            <MessageCircle size={16} />
            {CTA_KAKAO}
          </a>
          <button
            type="button"
            className="inline-flex p-2 text-white lg:hidden"
            aria-label="메뉴"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#2a201c] px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[0.45rem] px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/8"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-kakao mt-1 inline-flex items-center gap-2 rounded-[0.45rem] px-3 py-2.5 text-sm font-extrabold"
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
