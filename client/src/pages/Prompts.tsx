import { Suspense } from "react";
import { usePromptTemplates } from "@/utils/hooks";
import { PromptEditor } from "@/components/prompts/PromptEditor";
import { CardSkeleton } from "@/components/Skeleton";

function PromptContent() {
  const { data: templates } = usePromptTemplates();
  return <PromptEditor templates={templates} />;
}

export default function Prompts() {
  return (
    <article aria-labelledby="prompts-heading">
      <header className="page-header">
        <h2 id="prompts-heading">Prompt Studio</h2>
        <p>AI prompt editor for generating design variations.</p>
      </header>
      <Suspense fallback={<CardSkeleton />}>
        <PromptContent />
      </Suspense>
    </article>
  );
}
