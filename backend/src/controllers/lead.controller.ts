import type { Request, Response } from "express";
import { z } from "zod";
import { sendError, sendSuccess } from "../Utils/apiResponse.js";
import { LeadModel } from "../models/lead.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { exportToCSV } from "../Utils/csvExport.js";

const createSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]).optional(),
  source: z.enum(["Website", "Instagram", "Referral"]),
});

const updateSchema = createSchema.partial();

export const getAllLeads = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const status = req.query.status as string | undefined;
  const source = req.query.source as string | undefined;
  const search = req.query.search as string | undefined;
  const sort = req.query.sort as string | undefined;

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (source) filter.source = source;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const sortOrder = sort === "oldest" ? 1 : -1;
  const skip = (page - 1) * limit;

  const [leads, total] = await Promise.all([
    LeadModel.find(filter)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit),
    LeadModel.countDocuments(filter as any),
  ]);

  sendSuccess(res, "Leads fetched", leads, {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
});

export const getSingleLead = asyncHandler(
  async (req: Request, res: Response) => {
    const lead = await LeadModel.findById(req.params.id);
    if (!lead) {
      sendError(res, 404, "Lead not found");
      return;
    }

    sendSuccess(res, "Lead fetched", lead);
  },
);

export const createLead = asyncHandler(async (req: Request, res: Response) => {
  const newLead = createSchema.safeParse(req.body);
  if (!newLead.success) {
    sendError(res, 400, "Invalid input");
    return;
  }

  const cleanLeadData = Object.fromEntries(
    Object.entries(newLead.data).filter(([_, value]) => value !== undefined),
  );

  const lead = await LeadModel.create(cleanLeadData);

  res.status(201).json({ success: true, message: "Lead created", data: lead });
});

export const updateLead = asyncHandler(async (req: Request, res: Response) => {
  const result = updateSchema.safeParse(req.body);
  if (!result.success) {
    sendError(res, 400, "Invalid input");
    return;
  }

  const lead = await LeadModel.findByIdAndUpdate(req.params.id, result.data, {
    new: true,
  });
  if (!lead) {
    sendError(res, 404, "Lead not found");
    return;
  }

  sendSuccess(res, "Lead updated", lead);
});

export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await LeadModel.findByIdAndDelete(req.params.id);
  if (!lead) {
    sendError(res, 404, "Lead not found");
    return;
  }
  sendSuccess(res, "Lead Deleted");
});

export const exportLeads = asyncHandler(async (req: Request, res: Response) => {
  const leads = await LeadModel.find().lean();
  const rows = leads.map((l) => ({
    name: l.name,
    email: l.email,
    status: l.status,
    source: l.source,
    createdAt: l.createdAt,
  }));
  exportToCSV(res, rows as Record<string, unknown>[], "leads");
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Page 1: skip(0).limit(10)   → leads 1–10
// Page 2: skip(10).limit(10)  → leads 11–20
// Page 3: skip(20).limit(10)  → leads 21–30

// See the pattern? skip = (page - 1) × limit
// Page 1: skip = (1-1) × 10 = 0
// Page 2: skip = (2-1) × 10 = 10
// Page 3: skip = (3-1) × 10 = 20
// Page 4: skip = (4-1) × 10 = 30
