import { FastifyReply, FastifyRequest } from "fastify";

const blockedAgents = [
  "curl",
  "wget",
  "python",
  "bot",
  "crawler",
  "spider"
];

export async function trafficCheckMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const ua = (request.headers["user-agent"] || "").toLowerCase();

  for (const bad of blockedAgents) {
    if (ua.includes(bad)) {
      return reply
        .code(403)
        .send({ message: "Bot traffic blocked" });
    }
  }

  // Proxy headers (basic)
  if (
    request.headers["x-forwarded-for"] &&
    request.headers["via"]
  ) {
    return reply
      .code(403)
      .send({ message: "Proxy traffic blocked" });
  }
}
