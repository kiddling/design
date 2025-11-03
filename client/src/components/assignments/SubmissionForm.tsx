import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import type { AssignmentRequirement } from "@shared/types";
import { saveSubmission } from "@/lib/api";
import { cn } from "@/lib/utils";

interface SubmissionFormProps {
  assignmentId: string;
  requirements: AssignmentRequirement[];
  hasPreviousSubmissions?: boolean;
  onSubmitSuccess: () => void;
}

type FormValues = {
  photos: FileList | null;
  diagram: FileList | null;
  problemStatement: string;
  hmwQuestion: string;
  notes: string;
};

export default function SubmissionForm({
  assignmentId,
  requirements,
  hasPreviousSubmissions = false,
  onSubmitSuccess,
}: SubmissionFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      photos: null,
      diagram: null,
      problemStatement: "",
      hmwQuestion: "",
      notes: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(values: FormValues) {
    if (hasPreviousSubmissions) {
      const confirmResubmit = window.confirm(
        "检测到你之前已经提交过此作业。再次提交将覆盖最新记录并保存历史版本，确定继续吗？"
      );
      if (!confirmResubmit) {
        return;
      }
    }

    const photos = values.photos ? Array.from(values.photos) : [];
    const diagram = values.diagram ? Array.from(values.diagram) : [];

    if (photos.length < 3) {
      setError("请至少上传 3 张观察照片");
      return;
    }

    if (diagram.length < 1) {
      setError("请上传解构分析图");
      return;
    }

    if (!values.problemStatement.trim()) {
      setError("请填写问题陈述");
      return;
    }

    if (!values.hmwQuestion.trim()) {
      setError("请填写 HMW 问题");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);
      setUploadProgress(0);

      await saveSubmission(
        assignmentId,
        {
          photos,
          diagram,
          problemStatement: values.problemStatement,
          hmwQuestion: values.hmwQuestion,
          notes: values.notes,
        },
        "default-user",
        setUploadProgress
      );

      setSuccess("提交成功！我们已收到你的作业");
      setTimeout(() => setSuccess(null), 3000);
      reset();
      setUploadProgress(0);
      onSubmitSuccess();
    } catch (err) {
      console.error("Failed to submit assignment:", err);
      setError("提交失败，请检查网络后重试");
    } finally {
      setSubmitting(false);
    }
  }

  const photoRequirement = requirements.find((req) => req.type === "photo");
  const diagramRequirement = requirements.find((req) => req.type === "diagram");

  return (
    <section className="rounded-lg border border-white/10 bg-slate-900/60 p-6">
      <header className="border-b border-white/5 pb-4">
        <h2 className="text-xl font-semibold text-white">作业提交</h2>
        <p className="mt-1 text-sm text-slate-400">
          上传观察照片与解构图，并填写问题陈述与 HMW 问题。提交后将自动保存历史记录。
        </p>
      </header>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FileUploadField
          label={photoRequirement?.title ?? "上传照片"}
          description="请选择 3 张高质量照片 (JPG/PNG, 单张不超过 25MB)"
          accept="image/*"
          multiple
          error={errors.photos?.message}
        >
          <input
            type="file"
            id="photos"
            multiple
            accept="image/*"
            className="sr-only"
            {...register("photos", {
              required: "至少上传 3 张照片",
            })}
          />
        </FileUploadField>

        <FileUploadField
          label={diagramRequirement?.title ?? "上传解构图"}
          description="请上传解构分析图 (JPG/PNG/PDF)"
          accept="image/*,.pdf"
          error={errors.diagram?.message}
        >
          <input
            type="file"
            id="diagram"
            accept="image/*,.pdf"
            className="sr-only"
            {...register("diagram", {
              required: "请上传解构图",
            })}
          />
        </FileUploadField>

        <div className="space-y-2">
          <label htmlFor="problemStatement" className="text-sm font-medium text-white">
            问题陈述 Problem Statement
          </label>
          <textarea
            id="problemStatement"
            placeholder="描述你在观察中发现的设计问题或现象..."
            className="h-28 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            {...register("problemStatement", {
              required: "请填写问题陈述",
              minLength: { value: 20, message: "请至少输入 20 个字符" },
            })}
          />
          {errors.problemStatement && (
            <p className="text-xs text-red-400">{errors.problemStatement.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="hmwQuestion" className="text-sm font-medium text-white">
            HMW 问题 (How Might We ...)
          </label>
          <textarea
            id="hmwQuestion"
            placeholder="我们如何能够...?"
            className="h-24 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            {...register("hmwQuestion", {
              required: "请填写 HMW 问题",
              minLength: { value: 10, message: "请至少输入 10 个字符" },
            })}
          />
          {errors.hmwQuestion && <p className="text-xs text-red-400">{errors.hmwQuestion.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-medium text-white">
            补充说明 (可选)
          </label>
          <textarea
            id="notes"
            placeholder="可说明拍摄背景、观察心得或解读"
            className="h-24 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            {...register("notes")}
          />
        </div>

        {error && <div className="rounded-md border border-red-500/40 bg-red-500/15 px-4 py-2 text-sm text-red-300">{error}</div>}
        {success && <div className="rounded-md border border-green-500/40 bg-green-500/15 px-4 py-2 text-sm text-green-300">{success}</div>}

        {submitting && (
          <div className="space-y-2 rounded-lg border border-blue-500/40 bg-blue-500/10 px-4 py-3">
            <div className="flex items-center justify-between text-sm text-blue-200">
              <span>正在上传...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-blue-500/20">
              <div className="h-full bg-blue-400" style={{ width: `${Math.max(uploadProgress, 10)}%` }} />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500">提交后可以再次更新，系统会保留你的历史版本。</p>
          <button
            type="submit"
            disabled={submitting}
            className={cn(
              "inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-blue-400",
              submitting && "cursor-not-allowed opacity-60"
            )}
          >
            {submitting ? "提交中..." : "提交作业"}
          </button>
        </div>
      </form>
    </section>
  );
}

interface FileUploadFieldProps {
  label: string;
  description: string;
  accept: string;
  multiple?: boolean;
  error?: string;
  children: ReactNode;
}

function FileUploadField({ label, description, accept, multiple = false, error, children }: FileUploadFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">{label}</label>
      <div className={cn("relative flex flex-col gap-3 rounded-lg border border-dashed border-white/20 bg-slate-950/40 p-4", error && "border-red-400/50 bg-red-500/5")}
      >
        <label
          htmlFor={multiple ? "photos" : "diagram"}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-white/10 bg-slate-900/40 px-4 py-6 text-center text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
        >
          <span className="text-base font-medium text-white">点击或拖拽文件到此处上传</span>
          <span className="text-xs text-slate-400">支持类型：{accept}</span>
          <span className="text-xs text-slate-500">{description}</span>
        </label>
        {children}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
