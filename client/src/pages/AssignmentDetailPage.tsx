import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";
import type { Assignment, Submission, UserProgress } from "@shared/types";
import { getAssignmentById, getSubmissions, getUserProgress } from "@/lib/api";
import RequirementsChecklist from "@/components/assignments/RequirementsChecklist";
import RubricVisualization from "@/components/assignments/RubricVisualization";
import SubmissionForm from "@/components/assignments/SubmissionForm";
import SubmissionHistory from "@/components/assignments/SubmissionHistory";
import DeadlineCountdown from "@/components/assignments/DeadlineCountdown";

export default function AssignmentDetailPage() {
  const [, params] = useRoute("/assignments/:assignmentId");
  const assignmentId = params?.assignmentId;

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (assignmentId) {
      loadAssignmentData();
    }
  }, [assignmentId]);

  async function loadAssignmentData() {
    if (!assignmentId) return;

    try {
      setLoading(true);
      const [assignmentData, submissionsData, progressData] = await Promise.all([
        getAssignmentById(assignmentId),
        getSubmissions(assignmentId),
        getUserProgress(assignmentId),
      ]);

      setAssignment(assignmentData ?? null);
      setSubmissions(Array.isArray(submissionsData) ? submissionsData : []);
      setProgress(progressData ?? null);
    } catch (err) {
      setError("无法加载作业详情");
      console.error("Failed to load assignment data:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          返回作业列表
        </button>
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-6 py-4">
          <p className="text-red-400">{error || "未找到作业"}</p>
        </div>
      </div>
    );
  }

  const assignmentData = assignment as unknown as {
    requirements?: unknown;
    rubric?: any;
    maxScore?: number;
  };
  const requirements = Array.isArray(assignmentData.requirements) ? (assignmentData.requirements as any[]) : [];
  const rubricSource = assignmentData.rubric;
  const rubric = Array.isArray(rubricSource)
    ? rubricSource
    : Array.isArray(rubricSource?.criteria)
      ? rubricSource.criteria
      : [];
  const derivedMaxScore = typeof assignment.maxScore === "number"
    ? assignment.maxScore
    : typeof rubricSource?.totalPoints === "number"
      ? rubricSource.totalPoints
      : assignment.maxScore;
  const submissionList = Array.isArray(submissions) ? submissions : [];

  return (
    <div className="space-y-6">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        返回作业列表
      </button>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-300">
            {assignment.code}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">{assignment.title}</h1>
        <p className="text-slate-400">{assignment.description}</p>
      </div>

      <DeadlineCountdown dueDate={assignment.dueDate} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <RequirementsChecklist
            assignmentId={assignment.id}
            requirements={requirements}
            progress={progress}
            onProgressChange={(checklist) => {
              setProgress((prev) =>
                prev
                  ? { ...prev, checklist, lastUpdated: new Date().toISOString() }
                  : {
                      userId: "default-user",
                      assignmentId: assignment.id,
                      checklist,
                      lastUpdated: new Date().toISOString(),
                    }
              );
            }}
          />

          <RubricVisualization rubric={rubric} maxScore={derivedMaxScore} />
        </div>

        <div className="space-y-6">
          <SubmissionForm
            assignmentId={assignment.id}
            requirements={requirements}
            hasPreviousSubmissions={submissionList.length > 0}
            onSubmitSuccess={() => {
              loadAssignmentData();
            }}
          />
        </div>
      </div>

      {submissionList.length > 0 && (
        <SubmissionHistory submissions={submissionList} assignmentCode={assignment.code} />
      )}
    </div>
  );
}
