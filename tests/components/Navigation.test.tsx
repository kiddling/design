import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navigation } from "@/components/Navigation";

describe("Navigation", () => {
  it("renders all navigation items", () => {
    render(<Navigation />);
    
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Curriculum")).toBeInTheDocument();
    expect(screen.getByText("Knowledge Cards")).toBeInTheDocument();
    expect(screen.getByText("Case Library")).toBeInTheDocument();
    expect(screen.getByText("Prompt Studio")).toBeInTheDocument();
    expect(screen.getByText("Assignments")).toBeInTheDocument();
  });

  it("has proper ARIA label", () => {
    render(<Navigation />);
    expect(screen.getByLabelText("Primary")).toBeInTheDocument();
  });

  it("renders links with correct hrefs", () => {
    render(<Navigation />);
    
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
    
    const coursesLink = screen.getByText("Curriculum").closest("a");
    expect(coursesLink).toHaveAttribute("href", "/courses");
  });
});
