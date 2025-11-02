import { useParams } from "wouter";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">课程详情</h1>
      <p className="text-muted-foreground">Course ID: {courseId}</p>
    </div>
  );
}
