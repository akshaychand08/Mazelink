"use client";

import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function Topbar() {
  const router = useRouter();
  const setUser = useAuthStore(s => s.setUser);

  async function handleLogout() {
    await logout();
    setUser(null);
    router.replace("/login");
  }

  return (
    <header className="flex justify-between px-4 py-3">
      <h2 className="font-semibold">Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
