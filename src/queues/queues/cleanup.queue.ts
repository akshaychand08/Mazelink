import { cleanupQueue } from "./index";

export async function scheduleCleanup() {
  await cleanupQueue.add(
    "cleanup-links",
    {},
    {
      repeat: {
        pattern: "0 3 * * *" // daily at 3 AM
      }
    }
  );
}
