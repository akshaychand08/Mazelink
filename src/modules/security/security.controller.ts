import { FastifyReply, FastifyRequest } from "fastify";
import { SecurityService } from "./security.service";
import { enable2FASchema } from "./security.schema";

export class SecurityController {

  static async sessions(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const sessions = await SecurityService.activeSessions(userId);
    return reply.send(sessions);
  }

  static async revokeSessions(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const currentSessionId = (request as any).user.sessionId;

    await SecurityService.revokeAllOtherSessions(
      userId,
      currentSessionId
    );

    return reply.send({ success: true });
  }

  static async setup2FA(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const data = await SecurityService.generate2FA(userId);
    return reply.send(data);
  }

  static async enable2FA(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const body = enable2FASchema.parse(request.body);

    await SecurityService.enable2FA(userId, body.token);
    return reply.send({ enabled: true });
  }

  static async disable2FA(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    await SecurityService.disable2FA(userId);
    return reply.send({ enabled: false });
  }
}
