"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Withdrawal = {
  id: string;
  amount: number;
  status: string;
  user: { email: string };
};

export default function AdminWithdrawalsPage() {
  const [list, setList] = useState<Withdrawal[]>([]);

  useEffect(() => {
    api.get("/admin/withdrawals")
      .then(res => setList(res.data));
  }, []);

  async function update(id: string, status: string) {
    await api.patch(`/admin/withdrawals/${id}/status`, { status });
    setList(l =>
      l.map(w => (w.id === id ? { ...w, status } : w))
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="mb-4 text-xl font-semibold">Withdrawals</h2>

      {list.map(w => (
        <div
          key={w.id}
          className="border rounded-xl p-3 mb-2"
        >
          <p>{w.user.email}</p>
          <p>${w.amount} — {w.status}</p>

          <div className="mt-2 flex gap-2">
            <button onClick={() => update(w.id, "APPROVED")}>Approve</button>
            <button onClick={() => update(w.id, "COMPLETED")}>Complete</button>
            <button onClick={() => update(w.id, "RETURNED")}>Return</button>
          </div>
        </div>
      ))}
    </div>
  );
}
