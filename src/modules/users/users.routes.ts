import { FastifyInstance } from "fastify";
import { UsersController } from "./users.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export async function usersRoutes(app: FastifyInstance) {

  app.get(
    "/users/me",
    { preHandler: authMiddleware },
    UsersController.me
  );

  app.put(
    "/users/profile",
    { preHandler: authMiddleware },
    UsersController.updateProfile
  );
}
