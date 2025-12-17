import { FastifyReply, FastifyRequest } from "fastify";
import { EarningsService } from "./earnings.service";
import { earningsQuerySchema } from "./earnings.schema";

export class EarningsController {

  static async myEarnings(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const query = earningsQuerySchema.parse(request.query);

    const data = await EarningsService.userEarnings(
      userId,
      query.from ? new Date(query.from) : undefined,
      query.to ? new Date(query.to) : undefined
    );

    return reply.send({
      views: data._count.id || 0,
      earnings: data._sum.earnings || 0
    });
  }
}
