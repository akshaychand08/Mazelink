"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">
        Welcome Back 👋
      </h1>
      <p className="mt-2 text-center text-muted">
        Login to your Mazelink account
      </p>

      <form className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email address"
          className="w-full rounded-xl border bg-transparent px-4 py-3 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border bg-transparent px-4 py-3 outline-none"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-3 text-white font-medium"
        >
          Login
        </button>
      </form>

      <div className="mt-4 flex justify-between text-sm">
        <Link href="/forgot-password" className="text-primary">
          Forgot password?
        </Link>
        <Link href="/register" className="text-primary">
          Create account
        </Link>
      </div>
    </>
  );
}
