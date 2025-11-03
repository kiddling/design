import { ChangeEvent } from "react";

export interface CaseFilterState {
  discipline: string;
  difficulty: string;
  search: string;
}

interface CaseFiltersProps {
  disciplines: string[];
  difficulties: string[];
  value: CaseFilterState;
  onChange: (value: CaseFilterState) => void;
}

export function CaseFilters({ disciplines, difficulties, value, onChange }: CaseFiltersProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value: nextValue } = event.target;
    onChange({ ...value, [name]: nextValue });
  };

  return (
    <form className="filter-bar" aria-label="Case filters">
      <div className="filter-group">
        <label htmlFor="search">Search cases</label>
        <input
          id="search"
          name="search"
          type="search"
          value={value.search}
          onChange={handleChange}
          placeholder="Search by title"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="discipline">Discipline</label>
        <select
          id="discipline"
          name="discipline"
          value={value.discipline}
          onChange={handleChange}
        >
          <option value="all">All disciplines</option>
          {disciplines.map((discipline) => (
            <option key={discipline} value={discipline}>
              {discipline}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          name="difficulty"
          value={value.difficulty}
          onChange={handleChange}
        >
          <option value="all">All levels</option>
          {difficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
