import { Schema, model } from "mongoose";

type Role = "admin" | "sales";
interface User {
  username: string;
  email: string;
  password: string;
  role: Role;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "sales"],
      default: "sales",
    },
  },
  { timestamps: true },
);

export const UserModel = model<User>("user", userSchema);
