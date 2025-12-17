import { FastifyReply, FastifyRequest } from "fastify";

export async function adminMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = (request as any).user;

  if (!user || user.role !== "ADMIN") {
    return reply.code(403).send({
      message: "Admin access required"
    });
  }
}
