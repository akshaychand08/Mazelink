import { FastifyInstance } from "fastify";
import { RedirectController } from "./redirect.controller";

export async function redirectRoutes(app: FastifyInstance) {

  // Example: https://domain.com/abc123
  app.get(
    "/:code",
    RedirectController.redirect
  );
}
