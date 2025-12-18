"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({
  children
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.replace("/");
    }
  }, [loading, user]);

  if (loading) return <div className="p-6">Checking admin access…</div>;
  if (!user || user.role !== "ADMIN") return null;

  return <>{children}</>;
}
