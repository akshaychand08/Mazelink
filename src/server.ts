import { buildApp } from "./app";
import { env } from "./config/env";

async function startServer() {
  const app = buildApp();

  try {
    await app.listen({
      port: Number(env.PORT),
      host: "0.0.0.0"
    });

    console.log(
      `🚀 Server running on http://localhost:${env.PORT}`
    );
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

startServer();
