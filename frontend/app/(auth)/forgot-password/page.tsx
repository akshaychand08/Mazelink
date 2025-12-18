"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">
        Forgot Password 🔒
      </h1>
      <p className="mt-2 text-center text-muted">
        We’ll send you a reset link
      </p>

      <form className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email address"
          className="w-full rounded-xl border bg-transparent px-4 py-3 outline-none"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-3 text-white font-medium"
        >
          Send Reset Link
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Back to{" "}
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </p>
    </>
  );
}
