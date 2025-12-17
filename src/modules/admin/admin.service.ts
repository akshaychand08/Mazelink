import { prisma } from "../../db/prisma";

export class AdminService {

  // 📊 DASHBOARD STATS
  static async dashboard() {
    const [
      users,
      links,
      views,
      earnings,
      withdrawals
    ] = await Promise.all([
      prisma.user.count(),
      prisma.link.count(),
      prisma.linkView.count(),
      prisma.linkView.aggregate({ _sum: { earnings: true } }),
      prisma.withdrawal.aggregate({ _sum: { amount: true } })
    ]);

    return {
      totalUsers: users,
      totalLinks: links,
      totalViews: views,
      totalEarnings: earnings._sum.earnings || 0,
      totalWithdrawn: withdrawals._sum.amount || 0
    };
  }

  // 👤 USERS LIST
  static async users(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          role: true,
          status: true,
          balance: true,
          createdAt: true
        }
      }),
      prisma.user.count()
    ]);

    return {
      data,
      page,
      total,
      totalPages: Math.ceil(total / limit)
    };
  }

  // 🚫 BAN / UNBAN USER
  static async updateUserStatus(
    userId: string,
    status: "ACTIVE" | "BANNED"
  ) {
    return prisma.user.update({
      where: { id: userId },
      data: { status }
    });
  }

  // 🔗 ALL LINKS (REPORT / MODERATION)
  static async allLinks() {
    return prisma.link.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { email: true }
        }
      }
    });
  }

  // 💰 WITHDRAWALS (ADMIN VIEW)
  static async withdrawals() {
    return prisma.withdrawal.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { email: true } },
        method: true
      }
    });
  }

  // ⚙️ SITE SETTINGS (GENERIC)
  static async setSetting(key: string, value: string) {
    return prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });
  }

  static async getSettings() {
    return prisma.siteSetting.findMany();
  }
}
