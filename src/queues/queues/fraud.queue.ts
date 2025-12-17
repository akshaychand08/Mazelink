import { fraudQueue } from "./index";

export async function detectFraudJob(data: {
  userId: string;
  ip: string;
  reason: string;
}) {
  await fraudQueue.add(
    "fraud-check",
    data
  );
}
