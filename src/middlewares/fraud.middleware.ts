import { detectFraud } from "../modules/fraud/fraud.detector";
import { handleFraud } from "../modules/fraud/fraud.service";

export async function fraudMiddleware(
  req: any,
  reply: any
) {
  const ip = req.ip;
  const ua = req.headers["user-agent"] || "";
  const linkId = req.link.id;

  const result = await detectFraud({
    ip,
    userAgent: ua,
    linkId
  });

  if (result.isFraud) {
    await handleFraud({
      userId: req.link.userId,
      linkId,
      ip,
      result
    });

    // ❌ Do not count click
    return reply.redirect(req.link.originalUrl);
  }
}
