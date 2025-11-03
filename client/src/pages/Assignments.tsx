import { useSubmitAssignment } from "@/utils/hooks";
import { AssignmentForm } from "@/components/assignments/AssignmentForm";

export default function Assignments() {
  const { mutateAsync } = useSubmitAssignment();

  return (
    <article aria-labelledby="assignments-heading">
      <header className="page-header">
        <h2 id="assignments-heading">Assignments &amp; Feedback</h2>
        <p>Submit your projects and track assessment progress.</p>
      </header>
      <AssignmentForm onSubmit={mutateAsync} />
    </article>
  );
}
