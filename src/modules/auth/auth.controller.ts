import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.schema";

export class AuthController {
  static async register(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const body = registerSchema.parse(request.body);

    const result = await AuthService.register(
      body.email,
      body.password
    );

    return reply.code(201).send(result);
  }

  static async login(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const body = loginSchema.parse(request.body);

    const result = await AuthService.login(
      body.email,
      body.password
    );

    return reply.send(result);
  }
}
