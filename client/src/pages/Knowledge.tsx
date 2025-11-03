import { Suspense } from "react";
import { useKnowledgeCards } from "@/utils/hooks";
import { KnowledgeCardGrid } from "@/components/knowledge/KnowledgeCardGrid";
import { CardSkeleton } from "@/components/Skeleton";

function KnowledgeContent() {
  const { data: cards } = useKnowledgeCards();
  return <KnowledgeCardGrid cards={cards} />;
}

export default function Knowledge() {
  return (
    <article aria-labelledby="knowledge-heading">
      <header className="page-header">
        <h2 id="knowledge-heading">Knowledge Cards</h2>
        <p>Concept flashcards and theory references for quick lookup.</p>
      </header>
      <Suspense
        fallback={
          <div className="card-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        }
      >
        <KnowledgeContent />
      </Suspense>
    </article>
  );
}
