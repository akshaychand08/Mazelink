import { prisma } from "../../db/prisma";

export class SupportService {

  // 🎫 CREATE TICKET
  static async createTicket(
    userId: string,
    subject: string,
    message: string,
    email?: string
  ) {
    return prisma.supportTicket.create({
      data: {
        userId,
        subject,
        message,
        email: email || null,
        status: "OPEN"
      }
    });
  }

  // 👤 USER TICKETS
  static async myTickets(userId: string) {
    return prisma.supportTicket.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        replies: true
      }
    });
  }

  // 👑 ADMIN – ALL TICKETS
  static async allTickets() {
    return prisma.supportTicket.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { email: true }
        },
        replies: true
      }
    });
  }

  // 💬 REPLY TICKET (ADMIN)
  static async replyTicket(
    ticketId: string,
    adminId: string,
    message: string
  ) {
    await prisma.supportReply.create({
      data: {
        ticketId,
        adminId,
        message
      }
    });

    await prisma.supportTicket.update({
      where: { id: ticketId },
      data: {
        status: "REPLIED"
      }
    });
  }

  // ✅ CLOSE TICKET
  static async closeTicket(ticketId: string) {
    await prisma.supportTicket.update({
      where: { id: ticketId },
      data: {
        status: "CLOSED"
      }
    });
  }
}
