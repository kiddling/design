import type { RubricCriterion } from "@shared/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

interface RubricVisualizationProps {
  rubric: RubricCriterion[];
  maxScore: number;
}

const colors = ["#60a5fa", "#34d399", "#fbbf24", "#f87171"];

export default function RubricVisualization({ rubric, maxScore }: RubricVisualizationProps) {
  const rubricList = Array.isArray(rubric) ? rubric : [];
  const safeMaxScore = typeof maxScore === "number" && !Number.isNaN(maxScore) ? maxScore : 0;

  const chartData = rubricList.map((criterion, index) => {
    const item = criterion as unknown as {
      id?: string;
      name?: string;
      title?: string;
      description?: string;
      weight?: number;
      points?: number;
      levels?: Array<{ label?: string; description?: string; score?: number }>;
    };

    const name = item.name ?? item.title ?? `指标 ${index + 1}`;
    const rawWeight =
      typeof item.weight === "number"
        ? item.weight
        : typeof item.points === "number"
          ? item.points
          : 0;
    const description = item.description ?? "";
    const levels = Array.isArray(item.levels) ? item.levels : [];

    return {
      id: item.id ?? `criterion-${index}`,
      name,
      weight: rawWeight,
      description,
      levels,
      colorIndex: index % colors.length,
    };
  });

  const totalWeight = chartData.reduce((sum, item) => sum + item.weight, 0);
  const isPercentage = totalWeight > 0 && Math.abs(totalWeight - 100) <= 0.5;
  const weightUnit = isPercentage ? "%" : "分";
  const yAxisLabel = `权重 (${weightUnit})`;

  if (chartData.length === 0) {
    return (
      <section className="rounded-lg border border-white/10 bg-slate-900/60 p-6">
        <header className="border-b border-white/5 pb-4">
          <h2 className="text-xl font-semibold text-white">评分标准</h2>
          <p className="mt-1 text-sm text-slate-400">
            暂未提供评分标准信息{safeMaxScore ? `（总分 ${safeMaxScore}）` : ""}。
          </p>
        </header>
        <div className="mt-6 rounded-lg border border-dashed border-white/10 bg-slate-900/40 p-6 text-sm text-slate-400">
          当前暂无评分细则，提交时请参考作业说明。
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-white/10 bg-slate-900/60 p-6">
      <header className="border-b border-white/5 pb-4">
        <h2 className="text-xl font-semibold text-white">评分标准</h2>
        <p className="mt-1 text-sm text-slate-400">
          各项评分权重分布{safeMaxScore ? `（总分 ${safeMaxScore}）` : ""}
        </p>
      </header>

      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#94a3b8", fontSize: 13 }}
              axisLine={{ stroke: "#ffffff20" }}
              tickLine={{ stroke: "#ffffff20" }}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 13 }}
              axisLine={{ stroke: "#ffffff20" }}
              tickLine={{ stroke: "#ffffff20" }}
              label={{ value: yAxisLabel, angle: -90, position: "insideLeft", fill: "#94a3b8" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number) => `${value}${weightUnit}`}
              cursor={{ fill: "#ffffff10" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: 20, color: "#94a3b8" }}
              iconType="circle"
              formatter={() => `权重（${weightUnit}）`}
            />
            <Bar dataKey="weight" radius={[8, 8, 0, 0]}>
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.id}`} fill={colors[entry.colorIndex]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-6 space-y-4 border-t border-white/5 pt-4">
        {chartData.map((criterion) => {
          const levels = Array.isArray(criterion.levels) ? criterion.levels : [];
          return (
            <li key={criterion.id} className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[criterion.colorIndex] }} />
                <span className="font-medium text-white">{criterion.name}</span>
                <span className="ml-auto rounded bg-white/5 px-2 py-0.5 text-xs text-slate-300">
                  {criterion.weight}
                  {weightUnit}
                </span>
              </div>
              {criterion.description && (
                <p className="pl-6 text-sm text-slate-400">{criterion.description}</p>
              )}

              {levels.length > 0 && (
                <details className="pl-6">
                  <summary className="cursor-pointer text-xs text-slate-500 hover:text-slate-400">查看评分等级</summary>
                  <ul className="mt-2 space-y-1 rounded-lg bg-slate-950/50 p-3 text-xs">
                    {levels.map((level, levelIndex) => (
                      <li key={`${criterion.id}-level-${levelIndex}`} className="flex justify-between gap-2">
                        <span className="text-slate-400">{(level as any)?.label ?? `等级 ${levelIndex + 1}`}:</span>
                        <span className="text-slate-300">{(level as any)?.description ?? "暂无描述"}</span>
                        {(level as any)?.score !== undefined && (
                          <span className="text-blue-400">{(level as any)?.score} 分</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-4 rounded-lg bg-blue-500/10 px-4 py-3 text-sm text-blue-300">
        <p className="font-medium">💡 评分标准说明</p>
        <p className="mt-1 text-blue-300/80">
          以上数据展示了每项评分标准的相对权重。提交作业时可优先关注占比更高的项目，确保整体得分。
        </p>
      </div>
    </section>
  );
}
