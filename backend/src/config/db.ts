import mongoose from "mongoose";
import { env } from "node:process";

const mongoUri: string = env.MONGO_URI || "";

export const db = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};
