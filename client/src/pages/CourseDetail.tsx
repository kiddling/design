import { Suspense } from "react";
import { useRoute } from "wouter";
import { useCourseDetail } from "@/utils/hooks";
import { ListSkeleton } from "@/components/Skeleton";

function CourseContent({ courseId }: { courseId: string }) {
  const { data } = useCourseDetail(courseId);

  if (!data) {
    return null;
  }

  return (
    <>
      <header className="page-header">
        <h2 id="course-title">{data.title}</h2>
        <p>{data.description}</p>
      </header>

      <section aria-labelledby="objectives-heading" className="vertical-stack">
        <h3 id="objectives-heading">Objectives</h3>
        <ul>
          {data.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="resources-heading" className="vertical-stack">
        <h3 id="resources-heading">Resources</h3>
        <ul>
          {data.resources.map((resource) => (
            <li key={resource}>{resource}</li>
          ))}
        </ul>
      </section>

      <figure>
        <img
          src={data.image}
          alt={`${data.title} reference`}
          loading="lazy"
          style={{ maxWidth: "100%", height: "auto", borderRadius: "0.5rem" }}
        />
        <figcaption>Course moodboard</figcaption>
      </figure>
    </>
  );
}

export default function CourseDetail() {
  const [match, params] = useRoute("/courses/:id");
  const courseId = params?.id ?? "";

  if (!match) {
    return (
      <article>
        <p>Course not found</p>
      </article>
    );
  }

  return (
    <article aria-labelledby="course-title">
      <Suspense fallback={<ListSkeleton count={3} />}>
        <CourseContent courseId={courseId} />
      </Suspense>
    </article>
  );
}
