import { z } from "zod";

export const updateUserStatusSchema = z.object({
  status: z.enum(["ACTIVE", "BANNED"])
});

export const updateCPMSchema = z.object({
  country: z.string(),
  device: z.enum(["mobile", "desktop"]),
  rate: z.number().positive()
});

export const updateSettingsSchema = z.object({
  key: z.string(),
  value: z.string()
});
