import type { LeadStatus } from "../types";

const colors: Record<LeadStatus, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Qualified: "bg-green-100 text-green-700",
  Lost: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
}
