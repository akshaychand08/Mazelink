import { FastifyInstance } from "fastify";
import { ToolsController } from "./tools.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export async function toolsRoutes(app: FastifyInstance) {

  app.post(
    "/tools/api-keys",
    { preHandler: authMiddleware },
    ToolsController.createApiKey
  );

  app.get(
    "/tools/api-keys",
    { preHandler: authMiddleware },
    ToolsController.myApiKeys
  );

  app.post(
    "/tools/shorten",
    { preHandler: authMiddleware },
    ToolsController.shortenApi
  );

  app.post(
    "/tools/mass-shrink",
    { preHandler: authMiddleware },
    ToolsController.massShrink
  );
}
