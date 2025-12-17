import { z } from "zod";

export const createAnnouncementSchema = z.object({
  title: z.string().min(3),
  message: z.string().min(5),
  active: z.boolean().optional()
});
