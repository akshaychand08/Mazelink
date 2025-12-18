"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Method = {
  id: string;
  name: string;
  minAmount: number;
};

export default function WithdrawPage() {
  const [balance, setBalance] = useState<number>(0);
  const [minPayout, setMinPayout] = useState<number>(0);
  const [methods, setMethods] = useState<Method[]>([]);
  const [methodId, setMethodId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Fetch balance + rules
  useEffect(() => {
    api.get("/withdrawals/summary").then(res => {
      setBalance(res.data.availableBalance);
      setMinPayout(res.data.minPayout);
    });

    api.get("/withdrawals/methods").then(res => {
      setMethods(res.data);
    });
  }, []);

  async function submitWithdraw(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const value = Number(amount);

    if (!methodId) {
      setMessage("Please select a withdrawal method");
      return;
    }

    if (value < minPayout) {
      setMessage(`Minimum withdrawal is $${minPayout}`);
      return;
    }

    if (value > balance) {
      setMessage("Insufficient balance");
      return;
    }

    try {
      setLoading(true);

      await api.post("/withdrawals", {
        methodId,
        amount: value
      });

      setMessage("Withdrawal request submitted successfully");

      // Refresh balance
      const res = await api.get("/withdrawals/summary");
      setBalance(res.data.availableBalance);
      setAmount("");
      setMethodId("");
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message ||
          "Withdrawal failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl space-y-6">
      {/* Balance Card */}
      <div className="glass rounded-2xl p-6">
        <p className="text-muted">Available Balance</p>
        <h2 className="mt-2 text-3xl font-bold">
          ${balance.toFixed(2)}
        </h2>
        <p className="mt-1 text-sm text-muted">
          Minimum payout: ${minPayout}
        </p>
      </div>

      {/* Withdraw Form */}
      <form
        onSubmit={submitWithdraw}
        className="glass rounded-2xl p-6 space-y-4"
      >
        <h3 className="text-xl font-semibold">
          Request Withdrawal
        </h3>

        {/* Method */}
        <select
          value={methodId}
          onChange={e => setMethodId(e.target.value)}
          className="w-full rounded-xl border bg-transparent px-4 py-3"
        >
          <option value="">Select payment method</option>
          {methods.map(m => (
            <option key={m.id} value={m.id}>
              {m.name} (min ${m.minAmount})
            </option>
          ))}
        </select>

        {/* Amount */}
        <input
          type="number"
          min={minPayout}
          step="0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full rounded-xl border bg-transparent px-4 py-3"
        />

        {message && (
          <p className="text-sm text-center text-primary">
            {message}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 text-white font-medium disabled:opacity-50"
        >
          {loading ? "Processing..." : "Submit Withdrawal"}
        </button>
      </form>
    </div>
  );
}
