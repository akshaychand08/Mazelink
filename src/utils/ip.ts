import { FastifyRequest } from "fastify";

export function getClientIP(
  request: FastifyRequest
): string {
  const xff = request.headers["x-forwarded-for"];

  if (typeof xff === "string") {
    return xff.split(",")[0].trim();
  }

  return request.ip;
}
