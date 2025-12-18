"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Withdrawal = {
  id: string;
  amount: number;
  status: string;
};

export default function WithdrawalsPage() {
  const [list, setList] = useState<Withdrawal[]>([]);

  useEffect(() => {
    api.get("/withdrawals")
      .then(res => setList(res.data));
  }, []);

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="mb-4 text-xl font-semibold">Withdrawals</h2>

      {list.length === 0 ? (
        <p className="text-muted">No withdrawals yet</p>
      ) : (
        <div className="space-y-3">
          {list.map(w => (
            <div
              key={w.id}
              className="flex justify-between rounded-xl border p-3"
            >
              <span>${w.amount}</span>
              <span className="text-muted">{w.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
