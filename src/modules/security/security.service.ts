import { prisma } from "../../db/prisma";
import speakeasy from "speakeasy";

export class SecurityService {

  // 🔐 ACTIVE SESSIONS
  static async activeSessions(userId: string) {
    return prisma.userSession.findMany({
      where: {
        userId,
        revoked: false
      },
      orderBy: { createdAt: "desc" }
    });
  }

  static async revokeAllOtherSessions(
    userId: string,
    currentSessionId: string
  ) {
    await prisma.userSession.updateMany({
      where: {
        userId,
        id: { not: currentSessionId }
      },
      data: {
        revoked: true
      }
    });
  }

  // 🔐 2FA SETUP
  static async generate2FA(userId: string) {
    const secret = speakeasy.generateSecret({
      length: 20,
      name: "Mazelink"
    });

    await prisma.twoFactorAuth.upsert({
      where: { userId },
      create: {
        userId,
        secret: secret.base32,
        enabled: false
      },
      update: {
        secret: secret.base32,
        enabled: false
      }
    });

    return {
      otpauthUrl: secret.otpauth_url,
      base32: secret.base32
    };
  }

  static async enable2FA(userId: string, token: string) {
    const record = await prisma.twoFactorAuth.findUnique({
      where: { userId }
    });

    if (!record) {
      throw new Error("2FA not initialized");
    }

    const verified = speakeasy.totp.verify({
      secret: record.secret,
      encoding: "base32",
      token
    });

    if (!verified) {
      throw new Error("Invalid 2FA code");
    }

    await prisma.twoFactorAuth.update({
      where: { userId },
      data: { enabled: true }
    });

    return true;
  }

  static async disable2FA(userId: string) {
    await prisma.twoFactorAuth.update({
      where: { userId },
      data: { enabled: false }
    });
  }
}
