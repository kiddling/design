import { useEffect, useState } from "react";
import { Clock, AlertCircle } from "lucide-react";
import { getTimeDiff, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface DeadlineCountdownProps {
  dueDate: string;
}

export default function DeadlineCountdown({ dueDate }: DeadlineCountdownProps) {
  const [timeDiff, setTimeDiff] = useState(() => getTimeDiff(dueDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDiff(getTimeDiff(dueDate));
    }, 60000);

    return () => clearInterval(interval);
  }, [dueDate]);

  const isUrgent = !timeDiff.isOverdue && timeDiff.days < 3;
  const isVeryUrgent = !timeDiff.isOverdue && timeDiff.days < 1;

  return (
    <div
      className={cn(
        "rounded-lg border p-6",
        timeDiff.isOverdue && "border-red-500/30 bg-red-500/10",
        isVeryUrgent && "border-orange-500/30 bg-orange-500/10",
        isUrgent && !isVeryUrgent && "border-yellow-500/30 bg-yellow-500/10",
        !isUrgent && !timeDiff.isOverdue && "border-green-500/30 bg-green-500/10"
      )}
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {timeDiff.isOverdue ? (
            <AlertCircle className="h-8 w-8 text-red-400" />
          ) : (
            <Clock className="h-8 w-8 text-blue-400" />
          )}
          <div>
            <h3 className="text-lg font-semibold text-white">
              {timeDiff.isOverdue ? "已逾期" : "截止时间倒计时"}
            </h3>
            <p className="text-sm text-slate-400">截止日期: {formatDate(dueDate)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-center">
          <div className="rounded-lg bg-white/5 px-4 py-2">
            <div className="text-3xl font-bold text-white">{timeDiff.days}</div>
            <div className="text-xs text-slate-400">天</div>
          </div>
          <div className="rounded-lg bg-white/5 px-4 py-2">
            <div className="text-3xl font-bold text-white">{timeDiff.hours}</div>
            <div className="text-xs text-slate-400">时</div>
          </div>
          <div className="rounded-lg bg-white/5 px-4 py-2">
            <div className="text-3xl font-bold text-white">{timeDiff.minutes}</div>
            <div className="text-xs text-slate-400">分</div>
          </div>
        </div>
      </div>

      {timeDiff.isOverdue && (
        <div className="mt-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-300">
          ⚠️ 此作业已逾期 {timeDiff.days} 天，请尽快提交或联系老师。
        </div>
      )}

      {isVeryUrgent && !timeDiff.isOverdue && (
        <div className="mt-4 rounded-lg bg-orange-500/20 px-4 py-2 text-sm text-orange-300">
          ⏰ 作业即将截止！请抓紧时间完成并提交。
        </div>
      )}

      {isUrgent && !isVeryUrgent && !timeDiff.isOverdue && (
        <div className="mt-4 rounded-lg bg-yellow-500/20 px-4 py-2 text-sm text-yellow-300">
          ⚠️ 作业即将截止，请合理安排时间。
        </div>
      )}
    </div>
  );
}
