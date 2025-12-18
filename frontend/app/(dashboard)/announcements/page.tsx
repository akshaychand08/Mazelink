"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Announcement = {
  id: string;
  title: string;
  message: string;
};

export default function AnnouncementsPage() {
  const [list, setList] = useState<Announcement[]>([]);

  useEffect(() => {
    api.get("/announcements")
      .then(res => setList(res.data));
  }, []);

  return (
    <div className="space-y-4">
      {list.map(a => (
        <div key={a.id} className="glass rounded-2xl p-5">
          <h3 className="font-semibold">{a.title}</h3>
          <p className="text-muted mt-2">{a.message}</p>
        </div>
      ))}
    </div>
  );
}
