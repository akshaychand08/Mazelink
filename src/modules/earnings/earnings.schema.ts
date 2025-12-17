import { z } from "zod";

export const earningsQuerySchema = z.object({
  from: z.string().optional(),
  to: z.string().optional()
});
