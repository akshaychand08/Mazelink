import { api } from "./api";

export async function fetchMe() {
  const res = await api.get("/auth/me");
  return res.data;
}

export async function login(email: string, password: string) {
  return api.post("/auth/login", { email, password });
}

export async function register(email: string, password: string) {
  return api.post("/auth/register", { email, password });
}

export async function logout() {
  return api.post("/auth/logout");
}
