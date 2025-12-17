import { z } from "zod";

export const createWithdrawalSchema = z.object({
  methodId: z.string(),
  amount: z.number().positive()
});
