import { FastifyReply, FastifyRequest } from "fastify";
import { ReferralsService } from "./referrals.service";

export class ReferralsController {

  static async myReferrals(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const data = await ReferralsService.myReferrals(userId);
    return reply.send(data);
  }

  static async stats(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const data = await ReferralsService.referralStats(userId);
    return reply.send(data);
  }
}
