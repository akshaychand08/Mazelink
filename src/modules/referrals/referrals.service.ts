import { prisma } from "../../db/prisma";

export class ReferralsService {

  /**
   * Jab new user register hota hai
   */
  static async attachReferrer(
    userId: string,
    referrerCode?: string
  ) {
    if (!referrerCode) return;

    const referrer = await prisma.user.findUnique({
      where: { referralCode: referrerCode }
    });

    if (!referrer) return;

    await prisma.user.update({
      where: { id: userId },
      data: {
        referrerId: referrer.id
      }
    });
  }

  /**
   * Referral earning add hoti hai
   * % admin se control hogi (default example: 10%)
   */
  static async addReferralEarning(
    userId: string,
    earningAmount: number,
    percentage: number
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || !user.referrerId) return;

    const referralEarning =
      (earningAmount * percentage) / 100;

    await prisma.$transaction([
      prisma.referralEarning.create({
        data: {
          referrerId: user.referrerId,
          userId,
          amount: referralEarning
        }
      }),
      prisma.user.update({
        where: { id: user.referrerId },
        data: {
          balance: { increment: referralEarning }
        }
      })
    ]);
  }

  static async myReferrals(userId: string) {
    return prisma.user.findMany({
      where: { referrerId: userId },
      select: {
        id: true,
        email: true,
        createdAt: true
      }
    });
  }

  static async referralStats(userId: string) {
    const total = await prisma.referralEarning.aggregate({
      where: { referrerId: userId },
      _sum: { amount: true }
    });

    return {
      totalEarnings: total._sum.amount || 0
    };
  }
}
