import { useEffect, useState } from "react";
import { Link } from "wouter";
import { FileText, Calendar, Clock, ChevronRight } from "lucide-react";
import type { Assignment } from "@shared/types";
import { getAssignments } from "@/lib/api";
import { cn, formatDate, getTimeDiff } from "@/lib/utils";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAssignments();
  }, []);

  async function loadAssignments() {
    try {
      setLoading(true);
      const data = await getAssignments();
      setAssignments(data);
    } catch (err) {
      setError("无法加载作业列表");
      console.error("Failed to load assignments:", err);
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

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-6 py-4">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">作业管理</h1>
        <p className="text-slate-400">查看和提交课程作业</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </div>
  );
}

interface AssignmentCardProps {
  assignment: Assignment;
}

function AssignmentCard({ assignment }: AssignmentCardProps) {
  const timeDiff = getTimeDiff(assignment.dueDate);

  return (
    <Link href={`/assignments/${assignment.id}`}>
      <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 transition-all hover:border-white/20 hover:shadow-lg hover:shadow-white/5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-300">
                    {assignment.code}
                  </span>
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-xs font-medium",
                      assignment.status === "published" && "bg-green-500/20 text-green-300",
                      assignment.status === "draft" && "bg-yellow-500/20 text-yellow-300",
                      assignment.status === "closed" && "bg-red-500/20 text-red-300"
                    )}
                  >
                    {assignment.status === "published" && "进行中"}
                    {assignment.status === "draft" && "草稿"}
                    {assignment.status === "closed" && "已关闭"}
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  {assignment.title}
                </h3>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-400">{assignment.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>截止日期: {formatDate(assignment.dueDate)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {timeDiff.isOverdue ? (
                  <span className="text-red-400">已逾期 {timeDiff.days} 天</span>
                ) : (
                  <span>
                    还剩 {timeDiff.days} 天 {timeDiff.hours} 小时
                  </span>
                )}
              </div>
              <div className="rounded-md bg-white/5 px-2 py-1">
                {assignment.requirements.length} 项要求
              </div>
            </div>
          </div>

          <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-white" />
        </div>
      </div>
    </Link>
  );
}
