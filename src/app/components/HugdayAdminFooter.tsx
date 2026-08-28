import { ArrowUpRight } from "lucide-react";
import { OPERATOR, SITE } from "@/lib/site";

export default function HugdayAdminFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="hug-company-foot">
      <div className="hug-company-inner">
        <div className="hug-company-brand">
          <p className="hug-company-en">{SITE.brandEn}</p>
          <p className="hug-company-name">{SITE.brand}</p>
          <p className="hug-company-tag">견종·묘종·보호소 안내 포털</p>
        </div>
        <div className="hug-company-info">
          <p className="hug-company-kicker">OPERATOR</p>
          <p className="hug-company-corp">{OPERATOR.name}</p>
          <p>
            대표 {OPERATOR.ceo} · {OPERATOR.since}년부터
          </p>
          <p>{OPERATOR.address}</p>
          <p className="hug-company-blurb">
            {OPERATOR.line} {OPERATOR.hint}
          </p>
          <a href={OPERATOR.url} target="_blank" rel="noopener noreferrer">
            {OPERATOR.urlLabel}
            <ArrowUpRight size={14} strokeWidth={2.25} aria-hidden />
          </a>
        </div>
      </div>
      <p className="hug-company-copy">
        <a href="/admin">관리자</a>
        <span>
          © {year} {OPERATOR.name}
        </span>
      </p>
    </footer>
  );
}
