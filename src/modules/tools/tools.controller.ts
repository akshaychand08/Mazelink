import { FastifyReply, FastifyRequest } from "fastify";
import { ToolsService } from "./tools.service";
import {
  createApiKeySchema,
  shortenViaApiSchema,
  massShrinkSchema
} from "./tools.schema";

export class ToolsController {

  static async createApiKey(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const body = createApiKeySchema.parse(request.body);

    const key = await ToolsService.createApiKey(
      userId,
      body.name
    );

    return reply.code(201).send(key);
  }

  static async myApiKeys(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const keys = await ToolsService.myApiKeys(userId);
    return reply.send(keys);
  }

  static async shortenApi(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const body = shortenViaApiSchema.parse(request.body);

    const link = await ToolsService.shortenViaApi(
      userId,
      body.url,
      body.customAlias
    );

    return reply.send(link);
  }

  static async massShrink(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const body = massShrinkSchema.parse(request.body);

    const result = await ToolsService.massShrink(
      userId,
      body.urls
    );

    return reply.send(result);
  }
}
