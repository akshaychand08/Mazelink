import { prisma } from "../../db/prisma";

export class RedirectService {

  static async resolveShortCode(shortCode: string) {
    const link = await prisma.link.findUnique({
      where: { shortCode }
    });

    if (!link) {
      throw new Error("Link not found");
    }

    if (link.status !== "ACTIVE") {
      throw new Error("Link is not active");
    }

    // update last click time (real usage)
    await prisma.link.update({
      where: { id: link.id },
      data: {
        lastClickAt: new Date()
      }
    });

    return link.originalUrl;
  }
}
