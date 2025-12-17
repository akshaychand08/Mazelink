import { FastifyReply, FastifyRequest } from "fastify";
import { WithdrawalsService } from "./withdrawals.service";
import { createWithdrawalSchema } from "./withdrawals.schema";

export class WithdrawalsController {

  static async create(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const body = createWithdrawalSchema.parse(request.body);

    const withdrawal = await WithdrawalsService.createWithdrawal(
      userId,
      body.amount,
      body.methodId
    );

    return reply.code(201).send(withdrawal);
  }

  static async myHistory(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const data = await WithdrawalsService.myWithdrawals(userId);
    return reply.send(data);
  }
}
