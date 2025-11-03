import type { CaseStudy } from "@shared/types";

interface CaseGridProps {
  cases?: CaseStudy[];
}

export function CaseGrid({ cases = [] }: CaseGridProps) {
  if (!cases.length) {
    return <p>No cases match your filters.</p>;
  }

  return (
    <div className="card-grid" role="list">
      {cases.map((caseStudy) => (
        <article key={caseStudy.id} role="listitem" className="surface-card case-card">
          <img
            src={caseStudy.thumbnail}
            alt={caseStudy.title}
            loading="lazy"
            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "0.5rem" }}
          />
          <div className="horizontal-stack" style={{ justifyContent: "space-between" }}>
            <span className="badge">{caseStudy.discipline}</span>
            <span className="badge">{caseStudy.difficulty}</span>
          </div>
          <h3>{caseStudy.title}</h3>
        </article>
      ))}
    </div>
  );
}
