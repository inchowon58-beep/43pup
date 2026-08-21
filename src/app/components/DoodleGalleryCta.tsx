import Link from "next/link";
import { Camera } from "lucide-react";
import { CTA_GALLERY } from "@/lib/site";

export default function DoodleGalleryCta({ className = "" }: { className?: string }) {
  return (
    <div className={`my-8 rounded-[var(--radius-lg)] border border-[var(--coral)] bg-[var(--coral-soft)] p-5 text-center md:p-6 ${className}`}>
      <p className="text-sm font-semibold text-[var(--coral-deep)]">확인할 항목을 먼저</p>
      <p className="mt-1 text-lg font-extrabold text-[var(--navy)]">한 업체를 고르기 전에, 주의사항을 보세요</p>
      <Link href="/#gallery" className="btn-primary mt-4 inline-flex">
        <Camera size={18} />
        {CTA_GALLERY}
      </Link>
    </div>
  );
}
