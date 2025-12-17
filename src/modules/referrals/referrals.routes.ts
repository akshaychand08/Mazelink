import { FastifyInstance } from "fastify";
import { ReferralsController } from "./referrals.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export async function referralsRoutes(app: FastifyInstance) {

  app.get(
    "/referrals",
    { preHandler: authMiddleware },
    ReferralsController.myReferrals
  );

  app.get(
    "/referrals/stats",
    { preHandler: authMiddleware },
    ReferralsController.stats
  );
}
