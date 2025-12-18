"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get("/analytics/overview")
      .then(res => setData(res.data));
  }, []);

  if (!data) return <div className="glass p-6">Loading...</div>;

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="mb-4 text-xl font-semibold">Analytics</h2>

      <p>Total Views: {data.totalViews}</p>
      <p>Top Country: {data.topCountry}</p>
      <p>Top Device: {data.topDevice}</p>
    </div>
  );
}
