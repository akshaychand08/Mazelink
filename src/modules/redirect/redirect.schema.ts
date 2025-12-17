import { z } from "zod";

export const redirectParamsSchema = z.object({
  code: z.string().min(3)
});
