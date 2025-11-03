import type { RubricCriterion } from "@shared/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

interface RubricVisualizationProps {
  rubric: RubricCriterion[];
  maxScore: number;
}

const colors = ["#60a5fa", "#34d399", "#fbbf24", "#f87171"];

export default function RubricVisualization({ rubric, maxScore }: RubricVisualizationProps) {
  const chartData = rubric.map((criterion, index) => ({
    name: criterion.name,
    weight: criterion.weight,
    description: criterion.description,
    colorIndex: index % colors.length,
  }));

  return (
    <section className="rounded-lg border border-white/10 bg-slate-900/60 p-6">
      <header className="border-b border-white/5 pb-4">
        <h2 className="text-xl font-semibold text-white">评分标准</h2>
        <p className="mt-1 text-sm text-slate-400">各项评分权重分布 (总分 {maxScore})</p>
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
              label={{ value: "权重 (%)", angle: -90, position: "insideLeft", fill: "#94a3b8" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number) => `${value}%`}
              cursor={{ fill: "#ffffff10" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: 20, color: "#94a3b8" }}
              iconType="circle"
              formatter={() => "权重"}
            />
            <Bar dataKey="weight" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.colorIndex]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-6 space-y-4 border-t border-white/5 pt-4">
        {rubric.map((criterion, index) => (
          <li key={criterion.id} className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
              <span className="font-medium text-white">{criterion.name}</span>
              <span className="ml-auto rounded bg-white/5 px-2 py-0.5 text-xs text-slate-300">{criterion.weight}%</span>
            </div>
            <p className="pl-6 text-sm text-slate-400">{criterion.description}</p>

            {criterion.levels.length > 0 && (
              <details className="pl-6">
                <summary className="cursor-pointer text-xs text-slate-500 hover:text-slate-400">查看评分等级</summary>
                <ul className="mt-2 space-y-1 rounded-lg bg-slate-950/50 p-3 text-xs">
                  {criterion.levels.map((level) => (
                    <li key={level.score} className="flex justify-between gap-2">
                      <span className="text-slate-400">{level.label}:</span>
                      <span className="text-slate-300">{level.description}</span>
                      <span className="text-blue-400">{level.score} 分</span>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-lg bg-blue-500/10 px-4 py-3 text-sm text-blue-300">
        <p className="font-medium">💡 评分标准说明</p>
        <p className="mt-1 text-blue-300/80">
          以上权重反映每项评分标准在总分中的占比。提交作业时请参考评分等级要求，确保每项达到优秀或良好水平。
        </p>
      </div>
    </section>
  );
}
