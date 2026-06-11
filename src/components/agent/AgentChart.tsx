import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { AgentChart as AgentChartData } from "@/services/agent.service";

const COLORS = [
  "#6366f1",
  "#22d3ee",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#f97316",
  "#06b6d4",
];

const formatARS = (v: number) =>
  `$${v.toLocaleString("es-AR")}`;

interface Props {
  chart: AgentChartData;
}

export function AgentChart({ chart }: Props) {
  return (
    <div className="mt-3 w-full">
      {chart.title && (
        <p className="text-xs font-semibold mb-2 text-center text-foreground">
          {chart.title}
        </p>
      )}

      {chart.type === "bar" && (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chart.data}
            margin={{ top: 8, right: 12, left: 8, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={formatARS} width={70} />
            <Tooltip formatter={(v) => formatARS(Number(v))} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chart.data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {chart.type === "line" && (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={chart.data}
            margin={{ top: 8, right: 12, left: 8, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={formatARS} width={70} />
            <Tooltip formatter={(v) => formatARS(Number(v))} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {chart.type === "pie" && (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chart.data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={90}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(1)}%)`
              }
              labelLine={true}
            >
              {chart.data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => formatARS(Number(v))} />
            <Legend
              formatter={(value) => (
                <span style={{ fontSize: 11 }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
