import { prisma } from "../../db/prisma";

export class AnnouncementsService {

  // 👑 ADMIN – CREATE
  static async create(
    title: string,
    message: string,
    active = true
  ) {
    return prisma.announcement.create({
      data: {
        title,
        message,
        active
      }
    });
  }

  // 👑 ADMIN – ALL (manage)
  static async all() {
    return prisma.announcement.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  // 👤 USER – ONLY ACTIVE
  static async active() {
    return prisma.announcement.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" }
    });
  }

  // 👑 ADMIN – TOGGLE
  static async toggle(id: string, active: boolean) {
    return prisma.announcement.update({
      where: { id },
      data: { active }
    });
  }

  // 👑 ADMIN – DELETE
  static async remove(id: string) {
    await prisma.announcement.delete({
      where: { id }
    });
  }
}
