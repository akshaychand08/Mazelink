import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const auth = request.headers.authorization;
    if (!auth) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    const token = auth.replace("Bearer ", "");
    const decoded = jwt.verify(token, env.JWT_SECRET) as any;

    (request as any).user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      sessionId: decoded.sessionId
    };
  } catch {
    return reply.code(401).send({ message: "Invalid token" });
  }
}
