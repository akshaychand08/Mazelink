import { z } from "zod";

export const statsQuerySchema = z.object({
  from: z.string().optional(),
  to: z.string().optional()
});
