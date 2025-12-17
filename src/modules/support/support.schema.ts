import { z } from "zod";

export const createTicketSchema = z.object({
  subject: z.string().min(3),
  message: z.string().min(10),
  email: z.string().email().optional()
});

export const replyTicketSchema = z.object({
  message: z.string().min(3)
});
