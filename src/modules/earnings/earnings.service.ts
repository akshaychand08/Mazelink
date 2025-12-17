import { prisma } from "../../db/prisma";
import { getCPM } from "../../config/cpm.config";

export class EarningsService {

  /**
   * CPM formula:
   * earning = (CPM / 1000)
   */
  static calculateEarning(country: string, device: "mobile" | "desktop") {
    const cpm = getCPM(country, device);
    return Number((cpm / 1000).toFixed(6));
  }

  static async addEarning(data: {
    userId: string;
    linkId: string;
    country: string;
    device: "mobile" | "desktop";
    browser: string;
    ip: string;
    source: string;
  }) {
    const earning = this.calculateEarning(data.country, data.device);

    // 1️⃣ Save view + earning
    await prisma.linkView.create({
      data: {
        linkId: data.linkId,
        userId: data.userId,
        ip: data.ip,
        country: data.country,
        device: data.device,
        browser: data.browser,
        source: data.source,
        earnings: earning
      }
    });

    // 2️⃣ Update user balance
    await prisma.user.update({
      where: { id: data.userId },
      data: {
        balance: { increment: earning }
      }
    });

    return earning;
  }

  static async userEarnings(userId: string, from?: Date, to?: Date) {
    return prisma.linkView.aggregate({
      where: {
        userId,
        createdAt: {
          gte: from,
          lte: to
        }
      },
      _sum: { earnings: true },
      _count: { id: true }
    });
  }
}
