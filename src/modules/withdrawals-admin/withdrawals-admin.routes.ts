import { FastifyInstance } from "fastify";
import { WithdrawalsAdminController } from "./withdrawals-admin.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

export async function withdrawalsAdminRoutes(app: FastifyInstance) {

  app.get(
    "/admin/withdrawals",
    { preHandler: [authMiddleware, adminMiddleware] },
    WithdrawalsAdminController.all
  );

  app.patch(
    "/admin/withdrawals/:id/status",
    { preHandler: [authMiddleware, adminMiddleware] },
    WithdrawalsAdminController.updateStatus
  );
}
