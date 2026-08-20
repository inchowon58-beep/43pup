"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";

const NAV = [
  { href: "/#about", label: "소개" },
  { href: "/#services", label: "왜 두들" },
  { href: "/#process", label: "입양 과정" },
  { href: "/#gallery", label: "두들갤러리" },
  { href: "/#reviews", label: "후기" },
  { href: "/guide", label: "지역안내" },
  { href: "/#contact", label: "문의" },
];

function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden className="shrink-0">
        <rect width="34" height="34" rx="3" fill="#c4a574" />
        <path
          d="M17 6.5 27 14.2V26H7V14.2L17 6.5Z"
          fill="#1f1a14"
        />
        <rect x="14.2" y="18.4" width="5.6" height="7.4" fill="#c4a574" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[0.62rem] font-medium tracking-[0.22em] text-[#c4a574]">
          {SITE.brandEn}
        </span>
        <span className="mt-1 text-[1.08rem] font-bold tracking-tight text-white md:text-[1.2rem]">
          {SITE.brand}
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1f1a14] text-white">
      <div className="h-px bg-[linear-gradient(90deg,transparent,#c4a574,transparent)]" />

      <div className="container flex h-[3.7rem] items-center justify-between md:h-[4.5rem]">
        <BrandMark />

        <nav className="hidden items-center gap-6 text-[0.88rem] font-medium text-white/70 lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#c4a574]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneTel}
            className="hidden items-center gap-1.5 px-2 py-2 text-sm font-semibold text-[#c4a574] md:inline-flex"
          >
            <Phone size={15} />
            {SITE.phone}
          </a>
          <a
            href={SITE.kakaoOpenChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-[0.4rem] bg-[#FEE500] px-3.5 py-2 text-sm font-extrabold text-[#191919] sm:inline-flex"
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
        <div className="border-t border-white/10 bg-[#1f1a14] px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[0.4rem] px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/8"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={SITE.phoneTel}
              className="mt-1 inline-flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-[#c4a574]"
              onClick={() => setOpen(false)}
            >
              <Phone size={16} />
              {SITE.phone}
            </a>
            <a
              href={SITE.kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[0.4rem] bg-[#FEE500] px-3 py-2.5 text-sm font-extrabold text-[#191919]"
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
