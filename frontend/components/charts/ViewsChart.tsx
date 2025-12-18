"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type Props = {
  data: {
    date: string;
    views: number;
  }[];
};

export default function ViewsChart({ data }: Props) {
  return (
    <div className="glass rounded-2xl p-6 h-72">
      <h3 className="mb-4 font-semibold">
        Daily Views
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="views" fill="#8B85FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
