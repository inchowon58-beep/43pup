"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";

const NAV = [
  { href: "/#about", label: "소개" },
  { href: "/#services", label: "주의사항" },
  { href: "/#process", label: "상담 과정" },
  { href: "/#gallery", label: "갤러리" },
  { href: "/#reviews", label: "후기" },
  { href: "/guide", label: "지역안내" },
  { href: "/#contact", label: "문의" },
];

function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden className="shrink-0">
        <rect width="36" height="36" rx="3" fill="#1a2744" />
        <circle cx="18" cy="18" r="9" fill="none" stroke="#c47a4a" strokeWidth="2" />
        <circle cx="18" cy="13" r="1.6" fill="#d4c4b0" />
        <rect x="16.7" y="16.4" width="2.6" height="9" rx="0.8" fill="#d4c4b0" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[0.62rem] font-medium tracking-[0.18em] text-[#d4c4b0]">
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1a2744] text-white">
      <div className="h-[3px] bg-[linear-gradient(90deg,#1a2744,#c47a4a,#3d5a8a,#1a2744)]" />

      <div className="container flex h-[3.7rem] items-center justify-between md:h-[4.5rem]">
        <BrandMark />

        <nav className="hidden items-center gap-6 text-[0.88rem] font-medium text-white/70 lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#d4c4b0]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-kakao hidden items-center gap-1.5 rounded-[0.35rem] px-3.5 py-2 text-sm font-extrabold sm:inline-flex"
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
        <div className="border-t border-white/10 bg-[#1a2744] px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[0.35rem] px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/8"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-kakao mt-1 inline-flex items-center gap-2 rounded-[0.35rem] px-3 py-2.5 text-sm font-extrabold"
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
