"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

import EarningsChart from "@/components/charts/EarningsChart";
import ViewsChart from "@/components/charts/ViewsChart";
import CountryChart from "@/components/charts/CountryChart";

export default function AnalyticsPage() {
  const [daily, setDaily] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/analytics/daily"),
      api.get("/analytics/countries")
    ])
      .then(([d, c]) => {
        setDaily(d.data);
        setCountries(c.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="glass p-6">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <EarningsChart data={daily} />

      <div className="grid gap-6 md:grid-cols-2">
        <ViewsChart data={daily} />
        <CountryChart data={countries} />
      </div>
    </div>
  );
}
