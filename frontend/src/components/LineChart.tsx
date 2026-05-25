import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { DailyLogData } from "../types";

interface LineChartProps {
  data: DailyLogData[];
}

export default function LineChartComponent({
  data,
}: LineChartProps) {
  return (
    <div className="bg-[#11182D] border border-white/10 rounded-3xl p-4 shadow-2xl">
      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <LineChart data={data}>
          
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#2A3555"
          />

          
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            tick={{ fill: "#9CA3AF" }}
          />

          
          <YAxis
            stroke="#9CA3AF"
            tick={{ fill: "#9CA3AF" }}
          />

          
          <Tooltip
            contentStyle={{
              backgroundColor: "#0B1023",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              color: "#fff",
            }}
            labelStyle={{
              color: "#A78BFA",
              fontWeight: "bold",
            }}
          />

          
          <Legend
            wrapperStyle={{
              color: "#E5E7EB",
            }}
          />

          
          <Line
            type="monotone"
            dataKey="INFO"
            stroke="#10B981"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#10B981",
            }}
            activeDot={{
              r: 7,
            }}
          />

        
          <Line
            type="monotone"
            dataKey="WARN"
            stroke="#F59E0B"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#F59E0B",
            }}
            activeDot={{
              r: 7,
            }}
          />

          
          <Line
            type="monotone"
            dataKey="ERROR"
            stroke="#EF4444"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#EF4444",
            }}
            activeDot={{
              r: 7,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}