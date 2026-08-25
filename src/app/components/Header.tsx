"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { useKakaoHref } from "./KakaoHrefProvider";

const NAV = [
  { href: "/#about", label: "소개" },
  { href: "/#services", label: "특징" },
  { href: "/#process", label: "과정" },
  { href: "/#director", label: "품종" },
  { href: "/#gallery", label: "갤러리" },
  { href: "/#reviews", label: "후기" },
  { href: "/guide", label: "지역안내" },
];

function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden className="shrink-0">
        <rect width="36" height="36" rx="8" fill="#1a2e24" />
        <ellipse cx="18" cy="21" rx="9" ry="7" fill="#c9a15b" />
        <ellipse cx="12" cy="12" rx="3.2" ry="5.2" fill="#e8d7a8" />
        <ellipse cx="24" cy="12" rx="3.2" ry="5.2" fill="#e8d7a8" />
        <circle cx="14.5" cy="20" r="1.3" fill="#1a2e24" />
        <circle cx="21.5" cy="20" r="1.3" fill="#1a2e24" />
        <ellipse cx="18" cy="23.4" rx="1.4" ry="1" fill="#4a7c59" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[0.62rem] font-medium tracking-[0.18em] text-[#e8d7a8]">
          {SITE.brandEn}
        </span>
        <span className="mt-1 text-[1.02rem] font-bold tracking-tight text-white md:text-[1.12rem]">
          {SITE.brand}
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const href = useKakaoHref();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1a2e24] text-white">
      <div className="h-[3px] bg-[linear-gradient(90deg,#1a2e24,#c9a15b,#4a7c59,#1a2e24)]" />

      <div className="container flex h-[3.7rem] items-center justify-between md:h-[4.5rem]">
        <BrandMark />

        <nav className="hidden items-center gap-6 text-[0.88rem] font-medium text-white/70 lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#e8d7a8]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-kakao hidden items-center gap-1.5 rounded-[0.45rem] px-3.5 py-2 text-sm font-extrabold sm:inline-flex"
            >
              <MessageCircle size={16} />
              {CTA_KAKAO}
            </a>
          ) : null}
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
        <div className="border-t border-white/10 bg-[#1a2e24] px-4 py-3 lg:hidden">
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
            {href ? (
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
            ) : null}
          </nav>
        </div>
      )}
    </header>
  );
}
