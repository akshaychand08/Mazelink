import { FastifyInstance } from "fastify";
import { AdminController } from "./admin.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

export async function adminRoutes(app: FastifyInstance) {

  app.get(
    "/admin/dashboard",
    { preHandler: [authMiddleware, adminMiddleware] },
    AdminController.dashboard
  );

  app.get(
    "/admin/users",
    { preHandler: [authMiddleware, adminMiddleware] },
    AdminController.users
  );

  app.patch(
    "/admin/users/:id/status",
    { preHandler: [authMiddleware, adminMiddleware] },
    AdminController.updateUserStatus
  );

  app.get(
    "/admin/links",
    { preHandler: [authMiddleware, adminMiddleware] },
    AdminController.links
  );

  app.get(
    "/admin/withdrawals",
    { preHandler: [authMiddleware, adminMiddleware] },
    AdminController.withdrawals
  );

  app.post(
    "/admin/settings",
    { preHandler: [authMiddleware, adminMiddleware] },
    AdminController.setSetting
  );

  app.get(
    "/admin/settings",
    { preHandler: [authMiddleware, adminMiddleware] },
    AdminController.settings
  );
}
