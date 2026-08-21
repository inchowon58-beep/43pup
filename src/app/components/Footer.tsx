import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[#2c4034] py-12 text-[#fbf8f2]">
      <div className="container grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Link href="/" className="inline-block">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#e4d7b5]">{SITE.brandEn}</p>
            <h2 className="mt-1 text-2xl font-bold hover:text-white">{SITE.brand}</h2>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{SITE.tagline}</p>
        </div>

        <div className="space-y-3 text-sm text-white/75">
          <a
            href={SITE.kakaoOpenChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white"
          >
            <MessageCircle size={16} className="text-[#c4a35a]" />
            {CTA_KAKAO}
          </a>
          <p className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[#c4a35a]" />
            {SITE.location} · {SITE.address}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              href="/admin"
              className="inline-flex rounded-[0.4rem] border border-white/20 px-3 py-2 text-xs font-semibold text-white/80 transition hover:border-white/45 hover:bg-white/10 hover:text-white"
            >
              관리자 로그인
            </Link>
            <Link
              href="/admin/sponsor-login"
              className="inline-flex rounded-[0.4rem] border border-white/20 px-3 py-2 text-xs font-semibold text-white/80 transition hover:border-white/45 hover:bg-white/10 hover:text-white"
            >
              스폰서 로그인
            </Link>
          </div>
          <p className="pt-2 text-xs text-white/35">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
