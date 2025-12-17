import { FastifyInstance } from "fastify";
import { LinksController } from "./links.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export async function linksRoutes(app: FastifyInstance) {

  app.post(
    "/links",
    { preHandler: authMiddleware },
    LinksController.create
  );

  app.get(
    "/links",
    { preHandler: authMiddleware },
    LinksController.myLinks
  );

  app.patch(
    "/links/:id/hide",
    { preHandler: authMiddleware },
    LinksController.hide
  );
}
