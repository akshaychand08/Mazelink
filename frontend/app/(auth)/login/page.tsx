"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore(s => s.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await login(email, password);
      setUser(res.data.user);
      router.replace("/");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Login failed"
      );
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center">
        Login
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
          Login
        </button>
      </form>
    </>
  );
}
