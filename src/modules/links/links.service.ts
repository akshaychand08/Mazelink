import crypto from "crypto";
import { prisma } from "../../db/prisma";

function detectPlatform(url: string): string {
  if (url.includes("t.me")) return "Telegram";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "YouTube";
  if (url.includes("facebook.com")) return "Facebook";
  if (url.includes("instagram.com")) return "Instagram";
  if (url.includes("twitter.com") || url.includes("x.com")) return "Twitter";
  return "Website";
}

function generateShortCode(): string {
  return crypto.randomBytes(4).toString("hex");
}

export class LinksService {

  static async createLink(
    userId: string,
    originalUrl: string,
    customAlias?: string,
    domain?: string
  ) {
    const shortCode = customAlias || generateShortCode();

    const exists = await prisma.link.findUnique({
      where: { shortCode }
    });

    if (exists) {
      throw new Error("Short code already exists");
    }

    const link = await prisma.link.create({
      data: {
        userId,
        originalUrl,
        shortCode,
        domain: domain || null,
        platform: detectPlatform(originalUrl),
        status: "ACTIVE"
      }
    });

    return link;
  }

  static async getMyLinks(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [links, total] = await Promise.all([
      prisma.link.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit
      }),
      prisma.link.count({ where: { userId } })
    ]);

    return {
      data: links,
      page,
      total,
      totalPages: Math.ceil(total / limit)
    };
  }

  static async hideLink(userId: string, linkId: string) {
    const link = await prisma.link.update({
      where: {
        id: linkId,
        userId
      },
      data: {
        status: "HIDDEN"
      }
    });

    return link;
  }
}
