import { buildApp } from "./app";
import { env } from "./config/env";

async function startServer() {
  const app = buildApp();

  try {
    await app.listen({
      port: Number(env.PORT) || 3000,
      host: "0.0.0.0"
    });

    console.log(
      `🚀 ${env.SITE_NAME} server running on port ${env.PORT}`
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    console.log(`\n⚠️ Received ${signal}. Shutting down...`);
    try {
      await app.close();
      process.exit(0);
    } catch (err) {
      console.error("Error during shutdown:", err);
      process.exit(1);
    }
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer();
