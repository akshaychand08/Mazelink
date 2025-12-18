"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Session = {
  id: string;
  ip: string;
  device: string;
  createdAt: string;
};

export default function SecurityPage() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    api.get("/security/sessions")
      .then(res => setSessions(res.data));
  }, []);

  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">Security</h2>

      {sessions.length === 0 ? (
        <p className="text-muted">No active sessions</p>
      ) : (
        sessions.map(s => (
          <div key={s.id} className="border rounded-xl p-3">
            <p>{s.device}</p>
            <p className="text-muted">{s.ip}</p>
          </div>
        ))
      )}
    </div>
  );
}
