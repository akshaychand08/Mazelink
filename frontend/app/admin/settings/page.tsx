"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Setting = {
  key: string;
  value: string;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);

  useEffect(() => {
    api.get("/admin/settings")
      .then(res => setSettings(res.data));
  }, []);

  async function update(key: string, value: string) {
    await api.post("/admin/settings", { key, value });
  }

  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">Settings</h2>

      {settings.map(s => (
        <div key={s.key} className="flex gap-3">
          <input
            defaultValue={s.value}
            className="flex-1 rounded-xl border px-3 py-2 bg-transparent"
            onBlur={e => update(s.key, e.target.value)}
          />
          <span className="text-muted">{s.key}</span>
        </div>
      ))}
    </div>
  );
}
