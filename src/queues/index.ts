import { Queue } from "bullmq";
import { env } from "../config/env";

export const connection = {
  url: env.REDIS_URL
};

export const emailQueue = new Queue(
  "email-queue",
  { connection }
);

export const cleanupQueue = new Queue(
  "cleanup-queue",
  { connection }
);

export const fraudQueue = new Queue(
  "fraud-queue",
  { connection }
);
