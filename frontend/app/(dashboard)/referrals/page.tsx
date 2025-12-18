"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Referral = {
  email: string;
  amount: number;
  joinedAt: string;
};

export default function ReferralsPage() {
  const [data, setData] = useState<Referral[]>([]);

  useEffect(() => {
    api.get("/referrals").then(res => setData(res.data));
  }, []);

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="mb-4 text-xl font-semibold">Referrals</h2>

      {data.length === 0 ? (
        <p className="text-muted">No referrals yet</p>
      ) : (
        <div className="space-y-3">
          {data.map((r, i) => (
            <div key={i} className="flex justify-between border rounded-xl p-3">
              <span>{r.email}</span>
              <span className="text-muted">${r.amount}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
