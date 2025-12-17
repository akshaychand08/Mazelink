import { FastifyReply, FastifyRequest } from "fastify";
import { SupportService } from "./support.service";
import {
  createTicketSchema,
  replyTicketSchema
} from "./support.schema";

export class SupportController {

  // 👤 USER – CREATE
  static async create(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const body = createTicketSchema.parse(request.body);

    const ticket = await SupportService.createTicket(
      userId,
      body.subject,
      body.message,
      body.email
    );

    return reply.code(201).send(ticket);
  }

  // 👤 USER – MY TICKETS
  static async myTickets(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const userId = (request as any).user.userId;
    const tickets = await SupportService.myTickets(userId);
    return reply.send(tickets);
  }

  // 👑 ADMIN – ALL TICKETS
  static async all(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const tickets = await SupportService.allTickets();
    return reply.send(tickets);
  }

  // 👑 ADMIN – REPLY
  static async reply(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const adminId = (request as any).user.userId;
    const { id } = request.params as any;
    const body = replyTicketSchema.parse(request.body);

    await SupportService.replyTicket(
      id,
      adminId,
      body.message
    );

    return reply.send({ success: true });
  }

  // 👑 ADMIN – CLOSE
  static async close(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { id } = request.params as any;
    await SupportService.closeTicket(id);
    return reply.send({ closed: true });
  }
}
