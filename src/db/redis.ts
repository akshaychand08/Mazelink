import Redis from "ioredis";
import { env } from "../config/env";

/**
 * Redis connection options
 * VPS: full features
 * Vercel: basic operations (no workers)
 */
export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  }
});

/* =========================
   CONNECTION LOGS
========================= */
redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("ready", () => {
  console.log("🚀 Redis ready to use");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

redis.on("close", () => {
  console.warn("⚠️ Redis connection closed");
});

/* =========================
   HELPER FUNCTIONS
========================= */

/**
 * View de-duplication
 * Rule: 1 IP + 1 Link + 1 Day = 1 View
 */
export async function isDuplicateView(
  linkId: string,
  ip: string
): Promise<boolean> {
  const today = new Date().toISOString().slice(0, 10);
  const key = `view:${linkId}:${ip}:${today}`;

  const exists = await redis.get(key);
  if (exists) return true;

  // store for 24 hours
  await redis.set(key, "1", "EX", 86400);
  return false;
}

/**
 * Rate limit helper (per IP)
 */
export async function rateLimitCheck(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, windowSeconds);
  }

  return current > limit;
}

/**
 * Cache helper
 */
export async function setCache(
  key: string,
  value: any,
  ttlSeconds = 60
) {
  await redis.set(
    key,
    JSON.stringify(value),
    "EX",
    ttlSeconds
  );
}

export async function getCache<T>(
  key: string
): Promise<T | null> {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}
