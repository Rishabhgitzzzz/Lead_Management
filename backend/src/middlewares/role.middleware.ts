import type { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model.js";

type Role = "admin" | "sales";

export const roleCheck = (...roles: [Role]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findById(req.userId).select("role");

      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({
          msg: "Access denied",
        });
      }
      next();
    } catch (err) {
      res.status(500).json({ msg: "Server error From RoleCheck" });
    }
  };
};
