import type { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendError, sendSuccess } from "../Utils/apiResponse.js";
import { UserModel } from "../models/user.model.js";
import { ENV } from "../Utils/env.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const signupUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, email, role } = req.body;

  const zodSignupSchema = z.object({
    username: z.string().min(3).max(10),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must be at most 20 characters" })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Must contain at least one uppercase letter",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Must contain at least one lowercase letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Must contain at least one number",
      })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: "Must contain at least one special character",
      }),
    email: z.string().email("Invalid email"),
    role: z.enum(["admin", "sales"]).optional(),
  });

  const isvalidation = zodSignupSchema.safeParse(req.body);

  if (!isvalidation.success) {
    sendError(res, 400, "Invalid Input");
    return;
  }

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    sendError(res, 403, "User already exists with this username");
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    username,
    password: hashPassword,
    email,
    role,
  });

  sendSuccess(res, "User Signed Up", user);
});

export const signinUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    sendError(res, 400, "No user found");
    return;
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    sendError(res, 403, "Invalid credentials");
    return;
  }

  const jwt_token = jwt.sign({ id: user._id }, ENV.JWT_SECRET);

  const data = {
    token: jwt_token,
    user: {
      id: user._id,
      name: user.username,
      email: user.email,
      role: user.role,
    },
  };
  sendSuccess(res, "User logged In", data);
});
