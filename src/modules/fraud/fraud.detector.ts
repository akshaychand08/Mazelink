import { redis } from "../../db/redis";
import { FraudResult } from "./fraud.types";

const BOT_REGEX =
  /bot|crawl|spider|curl|wget|python|node/i;

export async function detectFraud(params: {
  ip: string;
  userAgent: string;
  linkId: string;
}): Promise<FraudResult> {
  const reasons: string[] = [];

  // 1️⃣ Bot User-Agent
  if (BOT_REGEX.test(params.userAgent)) {
    reasons.push("BOT_TRAFFIC");
  }

  // 2️⃣ High frequency clicks (Redis)
  const key = `click:${params.ip}`;
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, 60);
  }
  if (count > 10) {
    reasons.push("HIGH_FREQUENCY");
  }

  // 3️⃣ Self click (same IP + same link)
  const selfKey = `self:${params.ip}:${params.linkId}`;
  const exists = await redis.get(selfKey);
  if (exists) {
    reasons.push("SELF_CLICK");
  } else {
    await redis.set(selfKey, "1", "EX", 3600);
  }

  // 4️⃣ Blacklisted IP
  const blocked = await redis.get(`blocked:${params.ip}`);
  if (blocked) {
    reasons.push("BLACKLISTED_IP");
  }

  return {
    isFraud: reasons.length > 0,
    reasons: reasons as any
  };
}
