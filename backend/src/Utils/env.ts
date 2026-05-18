import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().optional(),
  MONGO_URI: z.string(),
  JWT_SECRET: z.string(),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const validationResult = envSchema.safeParse(env);

  if (!validationResult.success)
    throw new Error(validationResult.error.message);

  return validationResult.data;
}

export const ENV = createEnv(process.env);
