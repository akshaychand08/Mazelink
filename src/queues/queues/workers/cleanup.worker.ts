import { Worker } from "bullmq";
import { connection } from "../index";
import { prisma } from "../../db/prisma";

new Worker(
  "cleanup-queue",
  async () => {
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - 60);

    await prisma.link.deleteMany({
      where: {
        lastClickAt: {
          lt: limitDate
        }
      }
    });
  },
  { connection }
);
