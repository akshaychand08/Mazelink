import { FastifyInstance } from "fastify";
import { SupportController } from "./support.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

export async function supportRoutes(app: FastifyInstance) {

  // 👤 USER
  app.post(
    "/support/tickets",
    { preHandler: authMiddleware },
    SupportController.create
  );

  app.get(
    "/support/tickets",
    { preHandler: authMiddleware },
    SupportController.myTickets
  );

  // 👑 ADMIN
  app.get(
    "/admin/support/tickets",
    { preHandler: [authMiddleware, adminMiddleware] },
    SupportController.all
  );

  app.post(
    "/admin/support/tickets/:id/reply",
    { preHandler: [authMiddleware, adminMiddleware] },
    SupportController.reply
  );

  app.post(
    "/admin/support/tickets/:id/close",
    { preHandler: [authMiddleware, adminMiddleware] },
    SupportController.close
  );
}
