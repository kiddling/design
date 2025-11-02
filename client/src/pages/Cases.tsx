import { Suspense, useMemo, useState } from "react";
import { useCaseStudies } from "@/utils/hooks";
import { CaseFilters, type CaseFilterState } from "@/components/cases/CaseFilters";
import { CaseGrid } from "@/components/cases/CaseGrid";
import { CardSkeleton } from "@/components/Skeleton";

function filterCases(cases: ReturnType<typeof useCaseStudies>["data"] | undefined, filters: CaseFilterState) {
  if (!cases) return [];

  return cases.filter((caseStudy) => {
    const matchesDiscipline = filters.discipline === "all" || caseStudy.discipline === filters.discipline;
    const matchesDifficulty = filters.difficulty === "all" || caseStudy.difficulty === filters.difficulty;
    const matchesSearch =
      filters.search.trim().length === 0 ||
      caseStudy.title.toLowerCase().includes(filters.search.trim().toLowerCase());

    return matchesDiscipline && matchesDifficulty && matchesSearch;
  });
}

function CasesContent() {
  const { data: cases } = useCaseStudies();
  const [filters, setFilters] = useState<CaseFilterState>({
    discipline: "all",
    difficulty: "all",
    search: "",
  });

  const disciplines = useMemo(() => Array.from(new Set(cases?.map((caseStudy) => caseStudy.discipline) ?? [])), [cases]);
  const difficulties = useMemo(() => Array.from(new Set(cases?.map((caseStudy) => caseStudy.difficulty) ?? [])), [cases]);

  const filteredCases = useMemo(() => filterCases(cases, filters), [cases, filters]);

  return (
    <>
      <CaseFilters
        disciplines={disciplines}
        difficulties={difficulties}
        value={filters}
        onChange={setFilters}
      />
      <p role="status" aria-live="polite">
        Showing {filteredCases.length} case{filteredCases.length === 1 ? "" : "s"}
      </p>
      <CaseGrid cases={filteredCases} />
    </>
  );
}

export default function Cases() {
  return (
    <article aria-labelledby="cases-heading">
      <header className="page-header">
        <h2 id="cases-heading">Case Library</h2>
        <p>Filterable gallery of exemplars across disciplines.</p>
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
        <CasesContent />
      </Suspense>
    </article>
  );
}
