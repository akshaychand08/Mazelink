import { FastifyReply, FastifyRequest } from "fastify";
import { AdminService } from "./admin.service";
import {
  updateUserStatusSchema,
  updateSettingsSchema
} from "./admin.schema";

export class AdminController {

  static async dashboard(
    _: FastifyRequest,
    reply: FastifyReply
  ) {
    const data = await AdminService.dashboard();
    return reply.send(data);
  }

  static async users(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { page = "1", limit = "20" } = request.query as any;
    const data = await AdminService.users(
      Number(page),
      Number(limit)
    );
    return reply.send(data);
  }

  static async updateUserStatus(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { id } = request.params as any;
    const body = updateUserStatusSchema.parse(request.body);

    const user = await AdminService.updateUserStatus(
      id,
      body.status
    );

    return reply.send(user);
  }

  static async links(
    _: FastifyRequest,
    reply: FastifyReply
  ) {
    const data = await AdminService.allLinks();
    return reply.send(data);
  }

  static async withdrawals(
    _: FastifyRequest,
    reply: FastifyReply
  ) {
    const data = await AdminService.withdrawals();
    return reply.send(data);
  }

  static async setSetting(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const body = updateSettingsSchema.parse(request.body);
    const data = await AdminService.setSetting(
      body.key,
      body.value
    );
    return reply.send(data);
  }

  static async settings(
    _: FastifyRequest,
    reply: FastifyReply
  ) {
    const data = await AdminService.getSettings();
    return reply.send(data);
  }
}
