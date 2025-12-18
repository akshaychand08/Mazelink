"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type DashboardData = {
  todayViews: number;
  todayEarnings: number;
  monthEarnings: number;
  avgCPM: number;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dashboard")
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="glass rounded-2xl p-6">Loading...</div>;
  }

  if (!data) {
    return <div className="glass rounded-2xl p-6">No data</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <Stat label="Today Views" value={data.todayViews} />
      <Stat label="Today Earnings" value={`$${data.todayEarnings}`} />
      <Stat label="This Month" value={`$${data.monthEarnings}`} />
      <Stat label="Avg CPM" value={`$${data.avgCPM}`} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-sm text-muted">{label}</p>
      <h3 className="mt-2 text-2xl font-bold">{value}</h3>
    </div>
  );
}
