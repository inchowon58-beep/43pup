import type { HugdaySite } from "@/lib/hugday-sites";
import { hugdayCover } from "@/lib/hugday-images";
import HugdayPhoto from "./HugdayPhoto";

export default function HugdaySiteGrid({
  sites,
  heading,
  kicker,
}: {
  sites: HugdaySite[];
  heading: string;
  kicker: string;
}) {
  return (
    <section className="hug-hub-block">
      <p className="hug-eyebrow">{kicker}</p>
      <h2>{heading}</h2>
      <div className="hug-hub-grid">
        {sites.map((s) => (
          <a key={s.slug} href={s.siteUrl} className="hug-hub-card" aria-label={s.title}>
            <HugdayPhoto src={hugdayCover(s.folder)} alt={s.title} sizes="33vw" />
            <div className="hug-hub-card-copy">
              <p className="hug-eyebrow" style={{ color: "#fff" }}>
                {s.kind === "cat" ? "CAT" : s.kind === "shelter" ? "SHELTER" : "DOG"}
              </p>
              <h3>{s.title}</h3>
              <p>{s.tag}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
