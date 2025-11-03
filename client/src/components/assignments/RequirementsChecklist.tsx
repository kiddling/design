import { useEffect, useState } from "react";
import type { AssignmentRequirement, UserProgress } from "@shared/types";
import { saveUserProgress } from "@/lib/api";
import { cn } from "@/lib/utils";

interface RequirementsChecklistProps {
  assignmentId: string;
  requirements: AssignmentRequirement[];
  progress: UserProgress | null;
  onProgressChange: (checklist: Record<string, boolean>) => void;
}

export default function RequirementsChecklist({ assignmentId, requirements, progress, onProgressChange }: RequirementsChecklistProps) {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const next = progress?.checklist ?? {};
    setChecklist(next);
  }, [progress]);

  async function handleToggle(requirementId: string) {
    const previousChecklist = checklist;
    const nextChecklist = {
      ...previousChecklist,
      [requirementId]: !previousChecklist[requirementId],
    };

    setChecklist(nextChecklist);
    setSaving(true);
    setError(null);

    try {
      const saved = await saveUserProgress(assignmentId, nextChecklist);
      setFeedback("已保存你的进度");
      onProgressChange(saved.checklist);
      setTimeout(() => setFeedback(null), 2400);
    } catch (err) {
      console.error("Failed to update progress:", err);
      setError("保存进度失败，请重试");
      setChecklist(previousChecklist);
    } finally {
      setSaving(false);
    }
  }

  const completedCount = requirements.filter((req) => checklist[req.id]).length;

  return (
    <section className="rounded-lg border border-white/10 bg-slate-900/60 p-6">
      <header className="flex flex-col gap-2 border-b border-white/5 pb-4" aria-live="polite">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">作业要求清单</h2>
          <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300">
            {completedCount} / {requirements.length} 已完成
          </span>
        </div>
        <p className="text-sm text-slate-400">逐项完成以下要求，确保提交内容完整</p>
      </header>

      <ul className="mt-4 space-y-4">
        {requirements.map((requirement) => {
          const isCompleted = checklist[requirement.id];
          return (
            <li
              key={requirement.id}
              className={cn(
                "rounded-lg border border-white/5 bg-slate-900/50 p-4 transition hover:border-white/15",
                isCompleted && "border-green-500/40 bg-green-500/10"
              )}
            >
              <div className="flex items-start gap-3">
                <input
                  id={`requirement-${requirement.id}`}
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => handleToggle(requirement.id)}
                  className="mt-1 h-5 w-5 cursor-pointer rounded border border-white/30 bg-slate-950 text-blue-500 focus:ring-blue-500"
                />
                <div className="space-y-1">
                  <label htmlFor={`requirement-${requirement.id}`} className="text-base font-medium leading-tight text-white">
                    {requirement.title}
                    {requirement.required && (
                      <span className="ml-2 rounded bg-red-500/20 px-2 py-0.5 text-xs text-red-300">必交</span>
                    )}
                  </label>
                  <p className="text-sm leading-relaxed text-slate-400">{requirement.description}</p>
                  <div className="text-xs uppercase tracking-wide text-slate-500">类型 · {translateRequirementType(requirement.type)}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>{saving ? "正在保存..." : feedback ?? "进度将自动保存"}</span>
        {error && <span className="text-red-400">{error}</span>}
      </div>
    </section>
  );
}

function translateRequirementType(type: AssignmentRequirement["type"]) {
  switch (type) {
    case "photo":
      return "照片";
    case "diagram":
      return "解构图";
    case "text":
      return "文本";
    case "file":
    default:
      return "文件";
  }
}
