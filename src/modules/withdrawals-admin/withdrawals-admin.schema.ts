import { z } from "zod";

export const updateWithdrawalStatusSchema = z.object({
  status: z.enum([
    "APPROVED",
    "COMPLETED",
    "CANCELLED",
    "RETURNED"
  ])
});
