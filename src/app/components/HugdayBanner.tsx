"use client";

import { useEffect, useState } from "react";
import HugdayPhoto from "./HugdayPhoto";

type Slide = { src: string; alt: string };

export default function HugdayBanner({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (slides.length < 2) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % slides.length), 4200);
    return () => window.clearInterval(t);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section className="hug-banner" aria-label="포옹데이 소개">
      {slides.map((s, idx) => (
        <div key={s.src} className={`hug-banner-slide${idx === i ? " is-on" : ""}`}>
          <HugdayPhoto src={s.src} alt={s.alt} priority={idx === 0} sizes="100vw" />
        </div>
      ))}
      <div className="hug-banner-copy">
        <p className="hug-banner-kicker">POONG DAY</p>
        <p className="hug-banner-line">기질과 관리를 먼저 적습니다.</p>
        <h1>각각의 견종·묘종·보호소 페이지를 확인하세요</h1>
        <p className="hug-banner-sub">
          한 페이지에 모든 품종을 섞지 않습니다. 아래 사이트에서 해당 노트를 열어 보세요.
        </p>
      </div>
    </section>
  );
}
