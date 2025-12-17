import { FastifyReply, FastifyRequest } from "fastify";

const store = new Map<string, { count: number; time: number }>();

export async function rateLimitMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const ip = request.ip;
  const now = Date.now();

  const record = store.get(ip);
  if (!record) {
    store.set(ip, { count: 1, time: now });
    return;
  }

  // 1 minute window
  if (now - record.time < 60_000) {
    record.count++;
    if (record.count > 100) {
      return reply
        .code(429)
        .send({ message: "Too many requests" });
    }
  } else {
    store.set(ip, { count: 1, time: now });
  }
}
