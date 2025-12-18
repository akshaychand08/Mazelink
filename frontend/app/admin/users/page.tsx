"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type User = {
  id: string;
  email: string;
  status: string;
  balance: number;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get("/admin/users")
      .then(res => setUsers(res.data.data));
  }, []);

  async function toggleStatus(user: User) {
    const newStatus = user.status === "ACTIVE" ? "BANNED" : "ACTIVE";

    await api.patch(`/admin/users/${user.id}/status`, {
      status: newStatus
    });

    setUsers(u =>
      u.map(x =>
        x.id === user.id ? { ...x, status: newStatus } : x
      )
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="mb-4 text-xl font-semibold">Users</h2>

      {users.map(u => (
        <div
          key={u.id}
          className="flex justify-between items-center border rounded-xl p-3 mb-2"
        >
          <div>
            <p>{u.email}</p>
            <p className="text-muted text-sm">
              Balance: ${u.balance}
            </p>
          </div>

          <button
            onClick={() => toggleStatus(u)}
            className="rounded-lg border px-3 py-1"
          >
            {u.status === "ACTIVE" ? "Ban" : "Unban"}
          </button>
        </div>
      ))}
    </div>
  );
}
