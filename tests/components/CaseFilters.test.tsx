import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CaseFilters, type CaseFilterState } from "@/components/cases/CaseFilters";

const defaultState: CaseFilterState = {
  discipline: "all",
  difficulty: "all",
  search: "",
};

describe("CaseFilters", () => {
  it("renders all filter inputs", () => {
    const onChange = vi.fn();
    render(
      <CaseFilters
        disciplines={["Branding", "Product"]}
        difficulties={["beginner", "intermediate", "advanced"]}
        value={defaultState}
        onChange={onChange}
      />
    );

    expect(screen.getByLabelText("Search cases")).toBeInTheDocument();
    expect(screen.getByLabelText("Discipline")).toBeInTheDocument();
    expect(screen.getByLabelText("Difficulty")).toBeInTheDocument();
  });

  it("displays correct disciplines", () => {
    const onChange = vi.fn();
    render(
      <CaseFilters
        disciplines={["Branding", "Product"]}
        difficulties={["beginner"]}
        value={defaultState}
        onChange={onChange}
      />
    );

    expect(screen.getByRole("option", { name: "Branding" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Product" })).toBeInTheDocument();
  });

  it("calls onChange when search input changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <CaseFilters
        disciplines={[]}
        difficulties={[]}
        value={defaultState}
        onChange={onChange}
      />
    );

    const searchInput = screen.getByLabelText("Search cases");
    await user.type(searchInput, "test");

    expect(onChange).toHaveBeenCalled();
  });

  it("calls onChange when discipline is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <CaseFilters
        disciplines={["Branding"]}
        difficulties={[]}
        value={defaultState}
        onChange={onChange}
      />
    );

    const select = screen.getByLabelText("Discipline");
    await user.selectOptions(select, "Branding");

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ discipline: "Branding" }));
  });

  it("calls onChange when difficulty is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <CaseFilters
        disciplines={[]}
        difficulties={["beginner"]}
        value={defaultState}
        onChange={onChange}
      />
    );

    const select = screen.getByLabelText("Difficulty");
    await user.selectOptions(select, "beginner");

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ difficulty: "beginner" }));
  });
});
