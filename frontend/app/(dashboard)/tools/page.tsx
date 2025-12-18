"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Tool = {
  id: string;
  name: string;
  enabled: boolean;
};

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    api.get("/tools").then(res => setTools(res.data));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tools.map(tool => (
        <div key={tool.id} className="glass rounded-2xl p-5">
          <h3 className="font-semibold">{tool.name}</h3>
          <p className="text-sm text-muted">
            Status: {tool.enabled ? "Enabled" : "Disabled"}
          </p>
        </div>
      ))}
    </div>
  );
}
