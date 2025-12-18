"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type Props = {
  data: {
    date: string;
    earnings: number;
    views: number;
  }[];
};

export default function EarningsChart({ data }: Props) {
  return (
    <div className="glass rounded-2xl p-6 h-80">
      <h3 className="mb-4 font-semibold">
        Earnings & Views
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#6C63FF"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#22D3EE"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
