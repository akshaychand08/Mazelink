"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const COLORS = [
  "#6C63FF",
  "#22D3EE",
  "#F472D0",
  "#22C55E",
  "#FACC15"
];

type Props = {
  data: {
    country: string;
    views: number;
  }[];
};

export default function CountryChart({ data }: Props) {
  return (
    <div className="glass rounded-2xl p-6 h-72">
      <h3 className="mb-4 font-semibold">
        Traffic by Country
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="views"
            nameKey="country"
            innerRadius={50}
            outerRadius={90}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
