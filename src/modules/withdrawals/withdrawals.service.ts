import { prisma } from "../../db/prisma";

export class WithdrawalsService {

  static async createWithdrawal(
    userId: string,
    amount: number,
    methodId: string
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.balance < amount) {
      throw new Error("Insufficient balance");
    }

    const method = await prisma.paymentMethod.findUnique({
      where: { id: methodId }
    });

    if (!method || !method.enabled) {
      throw new Error("Payment method not available");
    }

    if (amount < method.minAmount) {
      throw new Error(
        `Minimum withdrawal is ${method.minAmount}`
      );
    }

    // 1️⃣ Create withdrawal request
    const withdrawal = await prisma.withdrawal.create({
      data: {
        userId,
        amount,
        methodId,
        status: "PENDING"
      }
    });

    // 2️⃣ Deduct balance
    await prisma.user.update({
      where: { id: userId },
      data: {
        balance: { decrement: amount }
      }
    });

    return withdrawal;
  }

  static async myWithdrawals(userId: string) {
    return prisma.withdrawal.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        method: true
      }
    });
  }
}
