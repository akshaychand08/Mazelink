import { fraudMiddleware } from "../../middlewares/fraud.middleware";

app.get("/:code", async (req, reply) => {
  const link = await prisma.link.findUnique({
    where: { code: req.params.code }
  });

  if (!link) return reply.notFound();

  (req as any).link = link;

  await fraudMiddleware(req, reply);

  // ✅ Legit click
  await prisma.click.create({
    data: {
      linkId: link.id,
      ip: req.ip,
      userAgent: req.headers["user-agent"]
    }
  });

  return reply.redirect(link.originalUrl);
});
