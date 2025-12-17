import { Worker } from "bullmq";
import { connection } from "../index";
import { prisma } from "../../db/prisma";

new Worker(
  "fraud-queue",
  async job => {
    const { userId, ip, reason } = job.data;

    await prisma.fraudLog.create({
      data: {
        userId,
        ip,
        reason
      }
    });
  },
  { connection }
);
