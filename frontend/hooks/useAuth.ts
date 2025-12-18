import { useEffect, useState } from "react";
import { fetchMe } from "@/lib/auth";
import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
