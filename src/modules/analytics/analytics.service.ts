import { prisma } from "../../db/prisma";

export class AnalyticsService {

  static async recordView(data: {
    linkId: string;
    ip: string;
    country: string;
    device: string;
    browser: string;
    source: string;
    earnings: number;
  }) {
    await prisma.linkView.create({
      data
    });
  }

  static async userStats(userId: string, from?: Date, to?: Date) {
    return prisma.linkView.aggregate({
      where: {
        link: { userId },
        createdAt: {
          gte: from,
          lte: to
        }
      },
      _count: { id: true },
      _sum: { earnings: true }
    });
  }

  static async dailyStats(userId: string) {
    return prisma.$queryRawUnsafe(`
      SELECT DATE("createdAt") as date,
             COUNT(*) as views,
             SUM(earnings) as earnings
      FROM "LinkView"
      WHERE "userId" = $1
      GROUP BY date
      ORDER BY date DESC
    `, userId);
  }
}
