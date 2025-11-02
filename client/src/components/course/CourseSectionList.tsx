import { Link } from "wouter";
import type { CourseOutlineItem } from "@shared/types";

interface CourseSectionListProps {
  courses?: CourseOutlineItem[];
  onCourseFocus?: (courseId: string) => void;
}

export function CourseSectionList({ courses = [], onCourseFocus }: CourseSectionListProps) {
  const handleFocusOrHover = (courseId: string) => {
    onCourseFocus?.(courseId);
  };

  return (
    <ul className="course-list" role="list">
      {courses.map((course) => (
        <li key={course.id}>
          <Link
            href={`/courses/${course.id}`}
            onFocus={() => handleFocusOrHover(course.id)}
            onMouseEnter={() => handleFocusOrHover(course.id)}
            className="course-card"
          >
            <span className="week-badge">Week {course.week}</span>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
