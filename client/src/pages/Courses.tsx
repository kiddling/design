import { Suspense } from "react";
import { useCourseOutline, useCourseDetailPrefetch } from "@/utils/hooks";
import { CourseSectionList } from "@/components/course/CourseSectionList";
import { ListSkeleton } from "@/components/Skeleton";

function CoursesContent() {
  const { data: courses } = useCourseOutline();
  const prefetchDetail = useCourseDetailPrefetch();

  return <CourseSectionList courses={courses} onCourseFocus={prefetchDetail} />;
}

export default function Courses() {
  return (
    <article aria-labelledby="courses-heading">
      <header className="page-header">
        <h2 id="courses-heading">Curriculum overview</h2>
        <p>12 weeks of progressive learning with studio projects and critique.</p>
      </header>

      <Suspense fallback={<ListSkeleton />}>
        <CoursesContent />
      </Suspense>
    </article>
  );
}
