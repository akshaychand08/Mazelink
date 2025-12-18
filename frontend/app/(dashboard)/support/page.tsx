"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Ticket = {
  id: string;
  subject: string;
  status: string;
};

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    api.get("/support/tickets")
      .then(res => setTickets(res.data));
  }, []);

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="mb-4 text-xl font-semibold">Support Tickets</h2>

      {tickets.length === 0 ? (
        <p className="text-muted">No tickets</p>
      ) : (
        tickets.map(t => (
          <div key={t.id} className="border rounded-xl p-3 mb-2">
            <p>{t.subject}</p>
            <p className="text-muted">{t.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
