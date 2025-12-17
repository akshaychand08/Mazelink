import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.string().default("3000"),

  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("7d"),

  SITE_NAME: z.string().default("Mazelink"),
  BASE_DOMAIN: z.string()
});

export const env = envSchema.parse(process.env);
