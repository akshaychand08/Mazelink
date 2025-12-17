import { z } from "zod";

export const enable2FASchema = z.object({
  token: z.string().length(6)
});

export const verify2FASchema = z.object({
  token: z.string().length(6)
});
