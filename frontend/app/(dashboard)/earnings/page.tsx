"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function EarningsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get("/earnings")
      .then(res => setData(res.data));
  }, []);

  if (!data) return <div className="glass p-6">Loading...</div>;

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="mb-4 text-xl font-semibold">Earnings</h2>
      <p>Total Earnings: ${data.total}</p>
      <p>Today: ${data.today}</p>
      <p>This Month: ${data.month}</p>
    </div>
  );
}
