import { prisma } from "../../db/prisma";
import { redis } from "../../db/redis";
import { FraudResult } from "./fraud.types";

export async function handleFraud(params: {
  userId: string;
  linkId: string;
  ip: string;
  result: FraudResult;
}) {
  // Save fraud record
  await prisma.fraudLog.create({
    data: {
      userId: params.userId,
      linkId: params.linkId,
      ip: params.ip,
      reasons: params.result.reasons.join(",")
    }
  });

  // Auto block IP if serious
  if (
    params.result.reasons.includes("BOT_TRAFFIC") ||
    params.result.reasons.includes("HIGH_FREQUENCY")
  ) {
    await redis.set(`blocked:${params.ip}`, "1", "EX", 86400);
  }
}
