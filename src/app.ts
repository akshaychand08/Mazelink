import Fastify from "fastify";
import rateLimit from "@fastify/rate-limit";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

import { env } from "./config/env";
import { SECURITY_CONFIG } from "./config/security.config";

export const app = Fastify({
  logger: true,
  trustProxy: true
});

// Plugins
app.register(cors, { origin: true });
app.register(helmet);

// ⚠️ Rate limit (Vercel safe for testing)
app.register(rateLimit, {
  max: SECURITY_CONFIG.RATE_LIMIT.MAX,
  timeWindow: SECURITY_CONFIG.RATE_LIMIT.TIME_WINDOW
});

// Health check
app.get("/health", async () => {
  return {
    status: "ok",
    app: env.SITE_NAME,
    env: env.NODE_ENV
  };
});

// Base route
app.get("/", async () => {
  return {
    message: `${env.SITE_NAME} API is running 🚀`
  };
});

export default app;
