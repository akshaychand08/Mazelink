import { FastifyReply, FastifyRequest } from "fastify";
import { AnnouncementsService } from "./announcements.service";
import { createAnnouncementSchema } from "./announcements.schema";

export class AnnouncementsController {

  // 👤 USER
  static async active(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const data = await AnnouncementsService.active();
    return reply.send(data);
  }

  // 👑 ADMIN
  static async create(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const body = createAnnouncementSchema.parse(request.body);

    const announcement = await AnnouncementsService.create(
      body.title,
      body.message,
      body.active ?? true
    );

    return reply.code(201).send(announcement);
  }

  static async all(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const data = await AnnouncementsService.all();
    return reply.send(data);
  }

  static async toggle(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { id } = request.params as any;
    const { active } = request.body as any;

    const updated = await AnnouncementsService.toggle(id, active);
    return reply.send(updated);
  }

  static async remove(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { id } = request.params as any;
    await AnnouncementsService.remove(id);
    return reply.send({ deleted: true });
  }
}
