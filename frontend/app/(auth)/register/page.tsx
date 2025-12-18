"use client";

import { useState } from "react";
import { register } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await register(email, password);
      router.replace("/login");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Register failed"
      );
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center">
        Create Account
      </h1>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded-xl border px-4 py-3 bg-transparent"
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-xl border px-4 py-3 bg-transparent"
        />

        {error && (
          <p className="text-sm text-center text-red-500">
            {error}
          </p>
        )}

        <button className="w-full rounded-xl bg-primary py-3 text-white">
          Register
        </button>
      </form>
    </>
  );
}
