import type { Response } from "express";

// Call this in every controller instead of res.json() directly
// Keeps response shape the same everywhere

export function sendSuccess(
  res: Response,
  message: string,
  data?: unknown,
  meta?: unknown,
) {
  res.status(200).json({ success: true, message, data, meta });
}

export function sendError(res: Response, status: number, message: string) {
  res.status(status).json({ success: false, message });
}
