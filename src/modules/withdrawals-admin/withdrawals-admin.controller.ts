import { FastifyReply, FastifyRequest } from "fastify";
import { WithdrawalsAdminService } from "./withdrawals-admin.service";
import { updateWithdrawalStatusSchema } from "./withdrawals-admin.schema";

export class WithdrawalsAdminController {

  static async all(
    _: FastifyRequest,
    reply: FastifyReply
  ) {
    const data = await WithdrawalsAdminService.all();
    return reply.send(data);
  }

  static async updateStatus(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { id } = request.params as any;
    const body = updateWithdrawalStatusSchema.parse(request.body);

    const result =
      await WithdrawalsAdminService.updateStatus(
        id,
        body.status
      );

    return reply.send(result);
  }
}
