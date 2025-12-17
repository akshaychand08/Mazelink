import { FastifyInstance } from "fastify";
import { EarningsController } from "./earnings.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export async function earningsRoutes(app: FastifyInstance) {

  app.get(
    "/earnings",
    { preHandler: authMiddleware },
    EarningsController.myEarnings
  );
}
