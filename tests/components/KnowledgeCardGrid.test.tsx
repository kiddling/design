import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { KnowledgeCardGrid } from "@/components/knowledge/KnowledgeCardGrid";
import type { KnowledgeCard } from "@shared/types";

const cards: KnowledgeCard[] = [
  {
    id: "k1",
    title: "点线面",
    summary: "构成设计的基石元素",
    category: "Theory",
  },
  {
    id: "k2",
    title: "视觉层级",
    summary: "引导视线的层次策略",
    category: "Composition",
  },
];

describe("KnowledgeCardGrid", () => {
  it("renders list of knowledge cards", () => {
    render(<KnowledgeCardGrid cards={cards} />);

    expect(screen.getByText("点线面")).toBeInTheDocument();
    expect(screen.getByText("视觉层级")).toBeInTheDocument();
  });

  it("renders card categories", () => {
    render(<KnowledgeCardGrid cards={cards} />);

    expect(screen.getByText("Theory")).toBeInTheDocument();
    expect(screen.getByText("Composition")).toBeInTheDocument();
  });

  it("renders fallback message when no cards", () => {
    render(<KnowledgeCardGrid cards={[]} />);
    expect(screen.getByText(/no knowledge cards/i)).toBeInTheDocument();
  });
});
