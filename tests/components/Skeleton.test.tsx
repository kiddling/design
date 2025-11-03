import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton, CardSkeleton, ListSkeleton } from "@/components/Skeleton";

describe("Skeleton", () => {
  it("renders with correct role", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has loading label", () => {
    render(<Skeleton />);
    expect(screen.getByLabelText("Loading content")).toBeInTheDocument();
  });
});

describe("CardSkeleton", () => {
  it("renders multiple skeleton elements", () => {
    const { container } = render(<CardSkeleton />);
    const skeletons = container.querySelectorAll(".skeleton");
    expect(skeletons.length).toBeGreaterThan(1);
  });
});

describe("ListSkeleton", () => {
  it("renders specified number of items", () => {
    const { container } = render(<ListSkeleton count={3} />);
    const avatars = container.querySelectorAll(".skeleton");
    expect(avatars.length).toBeGreaterThanOrEqual(3);
  });
});
