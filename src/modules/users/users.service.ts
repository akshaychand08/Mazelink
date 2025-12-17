import { prisma } from "../../db/prisma";

export class UsersService {

  static async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        profile: true
      }
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  static async updateProfile(
    userId: string,
    data: any
  ) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          upsert: {
            create: data,
            update: data
          }
        }
      },
      select: {
        id: true,
        email: true,
        profile: true
      }
    });

    return user;
  }
}
