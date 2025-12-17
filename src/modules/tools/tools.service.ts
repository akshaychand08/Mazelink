import crypto from "crypto";
import { prisma } from "../../db/prisma";
import { LinksService } from "../links/links.service";

export class ToolsService {

  // 🔑 API KEY GENERATE
  static async createApiKey(userId: string, name: string) {
    const key = crypto.randomBytes(32).toString("hex");

    return prisma.apiKey.create({
      data: {
        userId,
        name,
        key,
        enabled: true
      }
    });
  }

  static async myApiKeys(userId: string) {
    return prisma.apiKey.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }

  // 🔗 SHORTEN VIA API / TELEGRAM
  static async shortenViaApi(
    userId: string,
    originalUrl: string,
    customAlias?: string
  ) {
    return LinksService.createLink(
      userId,
      originalUrl,
      customAlias
    );
  }

  // ⚡ MASS SHRINK
  static async massShrink(
    userId: string,
    urls: string[]
  ) {
    const results = [];

    for (const url of urls) {
      const link = await LinksService.createLink(
        userId,
        url
      );
      results.push({
        original: url,
        shortCode: link.shortCode
      });
    }

    return results;
  }
}
