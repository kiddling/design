import { useRoute } from "wouter";
import { useCourseDetail } from "@/utils/hooks";
import { ListSkeleton } from "@/components/Skeleton";

export default function CourseDetail() {
  const [match, params] = useRoute("/courses/:id");
  const courseId = params?.id ?? "";
  const { data } = useCourseDetail(courseId);

  if (!match) {
    return <p>Course not found</p>;
  }

  if (!data) {
    return <ListSkeleton count={3} />;
  }

  return (
    <article aria-labelledby="course-title">
      <h2 id="course-title">{data.title}</h2>
      <p>{data.description}</p>

      <section aria-label="Objectives" className="vertical-stack">
        <h3>Objectives</h3>
        <ul>
          {data.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </section>

      <section aria-label="Resources" className="vertical-stack">
        <h3>Resources</h3>
        <ul>
          {data.resources.map((resource) => (
            <li key={resource}>{resource}</li>
          ))}
        </ul>
      </section>

      <figure>
        <img src={data.image} alt={`${data.title} reference`} loading="lazy" />
        <figcaption>Course moodboard</figcaption>
      </figure>
    </article>
  );
}
