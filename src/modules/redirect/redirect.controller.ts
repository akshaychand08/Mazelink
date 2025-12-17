import { FastifyReply, FastifyRequest } from "fastify";
import { RedirectService } from "./redirect.service";
import { redirectParamsSchema } from "./redirect.schema";

export class RedirectController {

  static async redirect(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const params = redirectParamsSchema.parse(request.params);

    const finalUrl = await RedirectService.resolveShortCode(
      params.code
    );

    return reply.redirect(finalUrl);
  }
}
