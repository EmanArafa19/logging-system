import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface PieChartProps {
  data: { name: string; value: number }[];
}

const COLORS = [
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

export default function PieChartComponent({
  data,
}: PieChartProps) {
  return (
    <div className="bg-[#11182D] border border-white/10 rounded-3xl p-4 shadow-2xl">
      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={90}
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(
                (percent || 0) * 100
              ).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={2}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#0B1023",
              border:
                "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              color: "#fff",
            }}
            itemStyle={{
              color: "#E5E7EB",
            }}
            labelStyle={{
              color: "#A78BFA",
              fontWeight: "bold",
            }}
          />

          <Legend
            wrapperStyle={{
              color: "#E5E7EB",
              paddingTop: "10px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}