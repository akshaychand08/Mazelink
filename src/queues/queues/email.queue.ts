import { emailQueue } from "./index";

export async function sendEmailJob(data: {
  to: string;
  subject: string;
  html: string;
}) {
  await emailQueue.add(
    "send-email",
    data,
    {
      attempts: 3,
      backoff: { type: "exponential", delay: 5000 }
    }
  );
}
