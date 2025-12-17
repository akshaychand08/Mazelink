import { FastifyInstance } from "fastify";
import { SecurityController } from "./security.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export async function securityRoutes(app: FastifyInstance) {

  app.get(
    "/security/sessions",
    { preHandler: authMiddleware },
    SecurityController.sessions
  );

  app.post(
    "/security/sessions/revoke",
    { preHandler: authMiddleware },
    SecurityController.revokeSessions
  );

  app.get(
    "/security/2fa/setup",
    { preHandler: authMiddleware },
    SecurityController.setup2FA
  );

  app.post(
    "/security/2fa/enable",
    { preHandler: authMiddleware },
    SecurityController.enable2FA
  );

  app.post(
    "/security/2fa/disable",
    { preHandler: authMiddleware },
    SecurityController.disable2FA
  );
}
