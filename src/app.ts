import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";

import { env } from "./config/env";
import { SECURITY_CONFIG } from "./config/security.config";

// =========================
// ROUTES IMPORT
// =========================
import { authRoutes } from "./modules/auth/auth.routes";
import { usersRoutes } from "./modules/users/users.routes";
import { linksRoutes } from "./modules/links/links.routes";
import { redirectRoutes } from "./modules/redirect/redirect.routes";
import { analyticsRoutes } from "./modules/analytics/analytics.routes";
import { earningsRoutes } from "./modules/earnings/earnings.routes";
import { withdrawalsRoutes } from "./modules/withdrawals/withdrawals.routes";
import { withdrawalsAdminRoutes } from "./modules/withdrawals-admin/withdrawals-admin.routes";
import { referralsRoutes } from "./modules/referrals/referrals.routes";
import { toolsRoutes } from "./modules/tools/tools.routes";
import { securityRoutes } from "./modules/security/security.routes";
import { supportRoutes } from "./modules/support/support.routes";
import { announcementsRoutes } from "./modules/announcements/announcements.routes";
import { adminRoutes } from "./modules/admin/admin.routes";

// =========================
// FASTIFY INSTANCE
// =========================
export function buildApp() {
  const app = Fastify({
    logger: true,
    trustProxy: true
  });

  // =========================
  // GLOBAL PLUGINS
  // =========================
  app.register(cors, { origin: true });
  app.register(helmet);

  // ⚠️ Rate limit (Vercel safe – basic)
  app.register(rateLimit, {
    max: SECURITY_CONFIG.RATE_LIMIT.MAX,
    timeWindow: SECURITY_CONFIG.RATE_LIMIT.TIME_WINDOW
  });

  // =========================
  // SYSTEM ROUTES
  // =========================
  app.get("/health", async () => ({
    status: "ok",
    app: env.SITE_NAME,
    env: env.NODE_ENV
  }));

  app.get("/", async () => ({
    message: `${env.SITE_NAME} API is running 🚀`
  }));

  // =========================
  // PUBLIC / AUTH ROUTES
  // =========================
  app.register(authRoutes);

  // =========================
  // USER ROUTES
  // =========================
  app.register(usersRoutes);
  app.register(linksRoutes);
  app.register(analyticsRoutes);
  app.register(earningsRoutes);
  app.register(withdrawalsRoutes);
  app.register(referralsRoutes);
  app.register(toolsRoutes);
  app.register(securityRoutes);
  app.register(supportRoutes);

  // =========================
  // ADMIN ROUTES
  // =========================
  app.register(adminRoutes);
  app.register(withdrawalsAdminRoutes);

  // =========================
  // ANNOUNCEMENTS (PUBLIC)
  // =========================
  app.register(announcementsRoutes);

  // =========================
  // 🚨 REDIRECT ROUTES (ALWAYS LAST)
  // =========================
  app.register(redirectRoutes);

  return app;
}

export default buildApp;
