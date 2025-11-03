import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CourseSectionList } from "@/components/course/CourseSectionList";
import type { CourseOutlineItem } from "@shared/types";

const mockCourses: CourseOutlineItem[] = [
  {
    id: "1",
    title: "观·元素解构",
    description: "点线面基础理论",
    week: 1,
  },
  {
    id: "2",
    title: "触·材质发现",
    description: "材质摄影与分类",
    week: 2,
  },
];

describe("CourseSectionList", () => {
  it("renders course list", () => {
    render(<CourseSectionList courses={mockCourses} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("renders all courses", () => {
    render(<CourseSectionList courses={mockCourses} />);
    expect(screen.getByText("观·元素解构")).toBeInTheDocument();
    expect(screen.getByText("触·材质发现")).toBeInTheDocument();
  });

  it("displays week badges", () => {
    render(<CourseSectionList courses={mockCourses} />);
    expect(screen.getByText("Week 1")).toBeInTheDocument();
    expect(screen.getByText("Week 2")).toBeInTheDocument();
  });

  it("calls onCourseFocus when focusing a course", () => {
    const handleFocus = vi.fn();
    render(<CourseSectionList courses={mockCourses} onCourseFocus={handleFocus} />);
    
    const firstLink = screen.getByText("观·元素解构").closest("a");
    firstLink?.focus();
    
    expect(handleFocus).toHaveBeenCalledWith("1");
  });

  it("renders empty list when no courses provided", () => {
    const { container } = render(<CourseSectionList courses={[]} />);
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBe(0);
  });
});
