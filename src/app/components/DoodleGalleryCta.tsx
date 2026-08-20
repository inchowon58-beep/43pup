import Link from "next/link";
import { Camera } from "lucide-react";
import { CTA_GALLERY } from "@/lib/site";

export default function DoodleGalleryCta({ className = "" }: { className?: string }) {
  return (
    <div className={`my-8 rounded-[var(--radius-lg)] border border-[var(--coral)] bg-[var(--coral-soft)] p-5 text-center md:p-6 ${className}`}>
      <p className="text-sm font-semibold text-[var(--coral-deep)]">지금 만날 수 있는 아이들</p>
      <p className="mt-1 text-lg font-extrabold text-[var(--navy)]">사진을 보다가 마음이 가면, 바로 보세요</p>
      <Link href="/#gallery" className="btn-primary mt-4 inline-flex">
        <Camera size={18} />
        {CTA_GALLERY}
      </Link>
    </div>
  );
}
