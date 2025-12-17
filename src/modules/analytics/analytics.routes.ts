import { FastifyInstance } from "fastify";
import { AnalyticsController } from "./analytics.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export async function analyticsRoutes(app: FastifyInstance) {

  app.get(
    "/analytics/stats",
    { preHandler: authMiddleware },
    AnalyticsController.myStats
  );

  app.get(
    "/analytics/daily",
    { preHandler: authMiddleware },
    AnalyticsController.daily
  );
}
