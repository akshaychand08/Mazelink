import { FastifyReply, FastifyRequest } from "fastify";
import { AnalyticsService } from "./analytics.service";
import { statsQuerySchema } from "./analytics.schema";

export class AnalyticsController {

  static async myStats(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const query = statsQuerySchema.parse(request.query);

    const stats = await AnalyticsService.userStats(
      userId,
      query.from ? new Date(query.from) : undefined,
      query.to ? new Date(query.to) : undefined
    );

    return reply.send(stats);
  }

  static async daily(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const data = await AnalyticsService.dailyStats(userId);
    return reply.send(data);
  }
}
