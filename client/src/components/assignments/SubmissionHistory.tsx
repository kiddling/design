import { useState } from "react";
import { Clock, FileText, Image, File, Download, ChevronDown, ChevronUp } from "lucide-react";
import type { Submission, SubmissionFile } from "@shared/types";
import { formatDate, formatFileSize, cn } from "@/lib/utils";
import { getFileUrl } from "@/lib/api";

interface SubmissionHistoryProps {
  submissions: Submission[];
  assignmentCode: string;
}

export default function SubmissionHistory({ submissions, assignmentCode }: SubmissionHistoryProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-slate-900/60 p-6">
      <header className="border-b border-white/5 pb-4">
        <h2 className="text-xl font-semibold text-white">提交历史</h2>
        <p className="mt-1 text-sm text-slate-400">
          你已提交 {submissions.length} 个版本，最新版本在最上方
        </p>
      </header>

      <ul className="mt-6 space-y-4">
        {submissions.map((submission, index) => (
          <SubmissionItem
            key={submission.id}
            submission={submission}
            assignmentCode={assignmentCode}
            isLatest={index === 0}
            versionNumber={submissions.length - index}
          />
        ))}
      </ul>
    </section>
  );
}

interface SubmissionItemProps {
  submission: Submission;
  assignmentCode: string;
  isLatest: boolean;
  versionNumber: number;
}

function SubmissionItem({ submission, assignmentCode, isLatest, versionNumber }: SubmissionItemProps) {
  const [expanded, setExpanded] = useState(isLatest);

  const photos = submission.files.filter((file) => file.type === "photo");
  const diagrams = submission.files.filter((file) => file.type === "diagram");
  const documents = submission.files.filter((file) => file.type === "document");

  return (
    <li className="rounded-lg border border-white/10 bg-slate-950/40 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-blue-400" />
            <div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-white">版本 #{versionNumber}</span>
                {isLatest && (
                  <span className="rounded bg-green-500/20 px-2 py-0.5 text-xs text-green-300">最新</span>
                )}
                <StatusBadge status={submission.status} />
              </div>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="h-3 w-3" />
                提交时间: {formatDate(submission.submittedAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            {photos.length > 0 && (
              <span className="flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1">
                <Image className="h-3 w-3" />
                {photos.length} 张照片
              </span>
            )}
            {diagrams.length > 0 && (
              <span className="flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1">
                <File className="h-3 w-3" />
                {diagrams.length} 个解构图
              </span>
            )}
            {documents.length > 0 && (
              <span className="flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1">
                <File className="h-3 w-3" />
                {documents.length} 个附件
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded p-1 text-slate-400 transition hover:bg-white/5 hover:text-white"
          aria-label={expanded ? "收起详情" : "展开详情"}
        >
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-white/5 pt-4">
          {submission.textFields.problemStatement && (
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-white">问题陈述</h4>
              <p className="text-sm leading-relaxed text-slate-300">{submission.textFields.problemStatement}</p>
            </div>
          )}

          {submission.textFields.hmwQuestion && (
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-white">HMW 问题</h4>
              <p className="text-sm leading-relaxed text-slate-300">{submission.textFields.hmwQuestion}</p>
            </div>
          )}

          {submission.textFields.notes && (
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-white">补充说明</h4>
              <p className="text-sm leading-relaxed text-slate-300">{submission.textFields.notes}</p>
            </div>
          )}

          {submission.files.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white">附件列表</h4>
              <ul className="space-y-2">
                {submission.files.map((file) => (
                  <FileListItem key={file.id} file={file} assignmentCode={assignmentCode} />
                ))}
              </ul>
            </div>
          )}

          {submission.score !== undefined && (
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">评分</span>
                <span className="text-lg font-bold text-green-300">{submission.score} 分</span>
              </div>
              {submission.feedback && (
                <p className="mt-2 text-sm text-slate-300">{submission.feedback}</p>
              )}
            </div>
          )}
        </div>
      )}
    </li>
  );
}

function FileListItem({ file, assignmentCode }: { file: SubmissionFile; assignmentCode: string }) {
  const fileUrl = getFileUrl(file.path);
  const isImage = file.mimeType.startsWith("image/");

  return (
    <li className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-slate-900/40 p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-white/5">
          {file.type === "photo" ? (
            <Image className="h-5 w-5 text-blue-400" />
          ) : (
            <File className="h-5 w-5 text-slate-400" />
          )}
        </div>
        <div className="overflow-hidden">
          <p className="truncate text-sm font-medium text-white">{file.originalName}</p>
          <p className="text-xs text-slate-400">
            {formatFileSize(file.size)} · {formatDate(file.uploadedAt)}
          </p>
        </div>
      </div>
      <a
        href={fileUrl}
        download={`${assignmentCode}-${file.originalName}`}
        className="flex items-center gap-1 rounded-md bg-blue-500/20 px-3 py-1.5 text-xs font-medium text-blue-300 transition hover:bg-blue-500/30"
      >
        <Download className="h-3.5 w-3.5" />
        下载
      </a>
    </li>
  );
}

function StatusBadge({ status }: { status: Submission["status"] }) {
  return (
    <span
      className={cn(
        "rounded px-2 py-0.5 text-xs font-medium",
        status === "submitted" && "bg-blue-500/20 text-blue-300",
        status === "draft" && "bg-yellow-500/20 text-yellow-300",
        status === "graded" && "bg-green-500/20 text-green-300"
      )}
    >
      {status === "submitted" && "已提交"}
      {status === "draft" && "草稿"}
      {status === "graded" && "已评分"}
    </span>
  );
}
