import { FastifyReply, FastifyRequest } from "fastify";
import { LinksService } from "./links.service";
import { createLinkSchema } from "./links.schema";

export class LinksController {

  static async create(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const body = createLinkSchema.parse(request.body);

    const link = await LinksService.createLink(
      userId,
      body.originalUrl,
      body.customAlias,
      body.domain
    );

    return reply.code(201).send(link);
  }

  static async myLinks(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const { page = "1", limit = "10" } = request.query as any;

    const result = await LinksService.getMyLinks(
      userId,
      Number(page),
      Number(limit)
    );

    return reply.send(result);
  }

  static async hide(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const { id } = request.params as any;

    const link = await LinksService.hideLink(userId, id);
    return reply.send(link);
  }
}
