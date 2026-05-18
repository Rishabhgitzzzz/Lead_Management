import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { ENV } from "../Utils/env.js";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(400).json({
        msg: "U are not logged in token required ",
      });
    }

    const decodeData = jwt.verify(token as string, ENV.JWT_SECRET);
    req.userId = (decodeData as JwtPayload).id;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server error",
    });
  }
};
