import { useState } from "react";
import { useLeads } from "../context/LeadsContext";
import Navbar from "../components/Navbar";
import Button from "../ui/Button";
import type { Lead } from "../types";
import LeadFilters from "../components/LeadFilters";
import Pagination from "../ui/Pagination";
import LeadForm from "../components/LeadForm";
import LeadTable from "../components/LeadTable";

export default function DashboardPage() {
  // all data comes from context — no props needed
  const {
    loading,
    error,
    filters,
    totalPages,
    total,
    updateFilter,
    exportCSV,
  } = useLeads();

  // local state only for the modal
  const [formLead, setFormLead] = useState<Lead | undefined | null>(null);
  // null   = modal closed
  // undefined = create mode (no lead)
  // Lead  = edit mode

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold dark:text-white">Leads</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {total} total leads
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={exportCSV}>
              ⬇ Export CSV
            </Button>
            <Button onClick={() => setFormLead(undefined)}>+ Add Lead</Button>
          </div>
        </div>

        <LeadFilters />

        {/* content */}
        {loading && (
          <div className="text-center py-16 text-gray-400">Loading...</div>
        )}
        {error && <div className="text-center py-8 text-red-500">{error}</div>}

        {!loading && !error && (
          <>
            <LeadTable onEdit={(lead) => setFormLead(lead)} />
            <Pagination
              page={filters.page}
              totalPages={totalPages}
              onChange={(p) => updateFilter("page", p)}
            />
          </>
        )}
      </div>
      {formLead !== null && (
        <LeadForm lead={formLead} onClose={() => setFormLead(null)} />
      )}
    </div>
  );
}
