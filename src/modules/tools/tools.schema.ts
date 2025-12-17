import { z } from "zod";

export const createApiKeySchema = z.object({
  name: z.string().min(3)
});

export const shortenViaApiSchema = z.object({
  url: z.string().url(),
  customAlias: z.string().optional()
});

export const massShrinkSchema = z.object({
  urls: z.array(z.string().url()).min(1)
});
