import { FastifyInstance } from "fastify";
import { AnnouncementsController } from "./announcements.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

export async function announcementsRoutes(app: FastifyInstance) {

  // 👤 USER – VIEW
  app.get(
    "/announcements",
    AnnouncementsController.active
  );

  // 👑 ADMIN – MANAGE
  app.post(
    "/admin/announcements",
    { preHandler: [authMiddleware, adminMiddleware] },
    AnnouncementsController.create
  );

  app.get(
    "/admin/announcements",
    { preHandler: [authMiddleware, adminMiddleware] },
    AnnouncementsController.all
  );

  app.patch(
    "/admin/announcements/:id",
    { preHandler: [authMiddleware, adminMiddleware] },
    AnnouncementsController.toggle
  );

  app.delete(
    "/admin/announcements/:id",
    { preHandler: [authMiddleware, adminMiddleware] },
    AnnouncementsController.remove
  );
}
