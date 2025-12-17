import { prisma } from "../../db/prisma";

export class WithdrawalsAdminService {

  // 📋 ALL WITHDRAWALS (DATE DESC)
  static async all() {
    return prisma.withdrawal.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { email: true } },
        method: true
      }
    });
  }

  // 🔄 UPDATE STATUS
  static async updateStatus(
    withdrawalId: string,
    status: "APPROVED" | "COMPLETED" | "CANCELLED" | "RETURNED"
  ) {
    const withdrawal = await prisma.withdrawal.findUnique({
      where: { id: withdrawalId }
    });

    if (!withdrawal) {
      throw new Error("Withdrawal not found");
    }

    // ❌ Prevent double processing
    if (withdrawal.status === "COMPLETED") {
      throw new Error("Withdrawal already completed");
    }

    // 🔁 RETURN / CANCEL → balance back
    if (
      status === "CANCELLED" ||
      status === "RETURNED"
    ) {
      await prisma.$transaction([
        prisma.withdrawal.update({
          where: { id: withdrawalId },
          data: { status }
        }),
        prisma.user.update({
          where: { id: withdrawal.userId },
          data: {
            balance: { increment: withdrawal.amount }
          }
        })
      ]);

      return { status };
    }

    // ✅ APPROVED / COMPLETED
    await prisma.withdrawal.update({
      where: { id: withdrawalId },
      data: { status }
    });

    return { status };
  }
}
