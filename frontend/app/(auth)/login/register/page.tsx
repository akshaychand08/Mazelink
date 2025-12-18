"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">
        Create Account 🚀
      </h1>
      <p className="mt-2 text-center text-muted">
        Start earning with Mazelink
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

        <input
          type="password"
          placeholder="Confirm password"
          className="w-full rounded-xl border bg-transparent px-4 py-3 outline-none"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-3 text-white font-medium"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </p>
    </>
  );
}
