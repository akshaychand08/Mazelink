import { FastifyReply, FastifyRequest } from "fastify";
import { UsersService } from "./users.service";
import { updateProfileSchema } from "./users.schema";

export class UsersController {

  static async me(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;

    const user = await UsersService.getMe(userId);
    return reply.send(user);
  }

  static async updateProfile(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const body = updateProfileSchema.parse(request.body);

    const updated = await UsersService.updateProfile(userId, body);
    return reply.send(updated);
  }
}
