import type { KnowledgeCard } from "@shared/types";

interface KnowledgeCardGridProps {
  cards?: KnowledgeCard[];
}

export function KnowledgeCardGrid({ cards = [] }: KnowledgeCardGridProps) {
  if (!cards.length) {
    return <p>No knowledge cards available.</p>;
  }

  return (
    <div className="card-grid" role="list">
      {cards.map((card) => (
        <article key={card.id} role="listitem" className="surface-card knowledge-card">
          <span className="badge" aria-label={`Category: ${card.category}`}>
            {card.category}
          </span>
          <h3>{card.title}</h3>
          <p>{card.summary}</p>
        </article>
      ))}
    </div>
  );
}
