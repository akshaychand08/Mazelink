"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Stats = {
  totalUsers: number;
  totalLinks: number;
  totalViews: number;
  totalEarnings: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get("/admin/dashboard")
      .then(res => setStats(res.data));
  }, []);

  if (!stats) {
    return <div className="glass p-6">Loading…</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Stat label="Users" value={stats.totalUsers} />
      <Stat label="Links" value={stats.totalLinks} />
      <Stat label="Views" value={stats.totalViews} />
      <Stat label="Earnings" value={`$${stats.totalEarnings}`} />
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
