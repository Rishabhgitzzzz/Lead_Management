import type { Response } from "express";

export function exportToCSV(
  res: Response,
  data: Record<string, unknown>[],
  filename: string,
) {
  if (data.length === 0) {
    res.status(400).json({ success: false, message: "No data" });
    return;
  }
  const headers = Object.keys(data[0] ?? {});
  const rows = data.map((row) =>
    headers.map((h) => `"${row[h] ?? ""}"`).join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${filename}.csv"`,
  );
  res.send(csv);
}
