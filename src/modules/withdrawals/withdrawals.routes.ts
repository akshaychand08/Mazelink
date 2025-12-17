import { FastifyInstance } from "fastify";
import { WithdrawalsController } from "./withdrawals.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export async function withdrawalsRoutes(app: FastifyInstance) {

  app.post(
    "/withdrawals",
    { preHandler: authMiddleware },
    WithdrawalsController.create
  );

  app.get(
    "/withdrawals",
    { preHandler: authMiddleware },
    WithdrawalsController.myHistory
  );
}
