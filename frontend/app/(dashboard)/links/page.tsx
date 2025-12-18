"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Link = {
  id: string;
  shortCode: string;
  originalUrl: string;
  clicks: number;
};

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/links")
      .then(res => setLinks(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="glass p-6">Loading...</div>;

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="mb-4 text-xl font-semibold">Your Links</h2>

      {links.length === 0 ? (
        <p className="text-muted">No links found</p>
      ) : (
        <div className="space-y-3">
          {links.map(link => (
            <div
              key={link.id}
              className="flex justify-between rounded-xl border p-3"
            >
              <span>{link.shortCode}</span>
              <span className="text-muted">{link.clicks} clicks</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
