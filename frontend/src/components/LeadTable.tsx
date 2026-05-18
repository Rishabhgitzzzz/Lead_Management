import StatusBadge from "../ui/StatusBadge";
import Button from "../ui/Button";
import type { Lead } from "../types";
import { useAuth } from "../context/AuthContext";
import { useLeads } from "../context/LeadsContext";

interface Props {
  onEdit: (lead: Lead) => void;
}

export default function LeadTable({ onEdit }: Props) {
  const { user } = useAuth();
  const { leads, removeLead } = useLeads();

  async function handleDelete(id: string) {
    if (!confirm("Delete this lead?")) return;
    await removeLead(id); // context handles the API call + refresh
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 dark:text-gray-500">
        <p className="text-4xl mb-2">📭</p>
        <p>No leads found. Try adjusting filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
          <tr>
            <th className="text-left px-4 py-3">Name</th>
            <th className="text-left px-4 py-3">Email</th>
            <th className="text-left px-4 py-3">Status</th>
            <th className="text-left px-4 py-3">Source</th>
            <th className="text-left px-4 py-3">Created</th>
            <th className="text-left px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="px-4 py-3 font-medium dark:text-white">
                {lead.name}
              </td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                {lead.email}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                {lead.source}
              </td>
              <td className="px-4 py-3 text-gray-400">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 flex gap-2">
                <Button variant="ghost" onClick={() => onEdit(lead)}>
                  Edit
                </Button>
                {user?.role === "admin" && (
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(lead._id)}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
