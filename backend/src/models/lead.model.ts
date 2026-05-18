import { Schema, model } from "mongoose";

type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";
type LeadSource = "Website" | "Instagram" | "Referral";

export interface Lead {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt?: Date;
  updatedAt?: Date;
}

const leadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Lost"],
      default: "New",
    },
    source: {
      type: String,
      enum: ["Website", "Instagram", "Referral"],
      required: true,
    },
  },
  { timestamps: true },
);

export const LeadModel = model<Lead>("Lead", leadSchema);
