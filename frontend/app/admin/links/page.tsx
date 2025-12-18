"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AdminLinksPage() {
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    api.get("/admin/links")
      .then(res => setLinks(res.data));
  }, []);

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="mb-4 text-xl font-semibold">Links</h2>

      {links.map(l => (
        <div key={l.id} className="border rounded-xl p-3 mb-2">
          <p>{l.shortCode}</p>
          <p className="text-muted">{l.originalUrl}</p>
        </div>
      ))}
    </div>
  );
}
