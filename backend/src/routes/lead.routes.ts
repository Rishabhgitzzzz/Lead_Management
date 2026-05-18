import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { roleCheck } from "../middlewares/role.middleware.js";
import {
  createLead,
  deleteLead,
  exportLeads,
  getAllLeads,
  getSingleLead,
  updateLead,
} from "../controllers/lead.controller.js";

const leadRouter = Router();

leadRouter.get("/export/csv", exportLeads);
leadRouter.get("/", auth, getAllLeads);
leadRouter.get("/:id", getSingleLead);
leadRouter.post("/", createLead);
leadRouter.put("/:id", updateLead);
leadRouter.delete("/:id", auth, roleCheck("admin"), deleteLead);

export default leadRouter;
