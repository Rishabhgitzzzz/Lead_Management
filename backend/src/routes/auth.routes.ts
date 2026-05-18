import { Router } from "express";
import { signinUser, signupUser } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/signup", signupUser);

authRouter.post("/signin", signinUser);
