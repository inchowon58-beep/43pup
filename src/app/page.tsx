import Link from "next/link";
import { HUGDAY_SITES } from "@/lib/hugday-sites";
import { hugdayCover } from "@/lib/hugday-images";
import HugdayPhoto from "./components/HugdayPhoto";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="hug-root">
      <header className="hug-nav">
        <div className="hug-nav-inner">
          <div>
            <p className="hug-wordmark">포옹데이</p>
            <p className="hug-nav-sub">43 NOTES</p>
          </div>
          <p className="hug-nav-kind">PUPPYTIMES</p>
        </div>
      </header>

      <section className="hug-hub">
        <p className="hug-eyebrow">DIRECTORY</p>
        <h1>견종·묘종·보호소마다 다른 노트</h1>
        <p className="hug-lead">
          포옹데이는 한 디자인 안에서 43개의 사이트를 엽니다. 내용은 품종마다 새로 적습니다.
        </p>
        <p className="hug-hub-count">43 NOTES · PUPPYTIMES.CO.KR</p>
        <div className="hug-hub-grid">
          {HUGDAY_SITES.map((s) => {
            const photo = hugdayCover(s.folder);
            return (
              <Link key={s.slug} href={s.siteUrl} className="hug-hub-card">
                <HugdayPhoto src={photo} alt={s.title} sizes="33vw" />
                <div className="hug-hub-card-copy">
                  <p className="hug-eyebrow" style={{ color: "#fff" }}>
                    {s.kind === "cat" ? "CAT" : s.kind === "shelter" ? "SHELTER" : "DOG"}
                  </p>
                  <h2>{s.title}</h2>
                  <p>{s.tag}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
