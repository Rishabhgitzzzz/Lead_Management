import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Lead, LeadFilters } from "../types";
import {
  createLeadApi,
  deleteLeadApi,
  exportLeadsCSV,
  getLeadsApi,
  updateLeadApi,
} from "../api/lead.api";

// ── 1. Define what the context holds ──────────────────────
interface LeadsContextType {
  leads: Lead[];
  loading: boolean;
  error: string;
  filters: LeadFilters;
  totalPages: number;
  total: number;
  updateFilter: (key: keyof LeadFilters, value: string | number) => void;
  refetch: () => void;
  addLead: (data: Partial<Lead>) => Promise<void>;
  editLead: (id: string, data: Partial<Lead>) => Promise<void>;
  removeLead: (id: string) => Promise<void>;
  exportCSV: () => void;
}

const LeadsContext = createContext<LeadsContextType | null>(null);

export function LeadsProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState<LeadFilters>({
    page: 1,
    search: "",
    status: "",
    source: "",
    sort: "latest",
  });

  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.search), 400);
    return () => clearTimeout(timer);
  }, [filters.search]);

  useEffect(() => {
    fetchLeads();
  }, [
    filters.page,
    filters.status,
    filters.source,
    filters.sort,
    debouncedSearch,
  ]);

  async function fetchLeads() {
    setLoading(true);
    setError("");
    try {
      const res = await getLeadsApi({ ...filters, search: debouncedSearch });
      setLeads(res.data || []);
      setTotalPages(res.meta?.totalPages || 1);
      setTotal(res.meta?.total || 0);
    } catch {
      setError("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }

  function updateFilter(key: keyof LeadFilters, value: string | number) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== "page" ? 1 : (value as number),
    }));
  }

  async function addLead(data: Partial<Lead>) {
    await createLeadApi(data);
    fetchLeads();
  }

  async function editLead(id: string, data: Partial<Lead>) {
    await updateLeadApi(id, data);
    fetchLeads();
  }

  async function removeLead(id: string) {
    await deleteLeadApi(id);
    fetchLeads();
  }

  return (
    <LeadsContext.Provider
      value={{
        leads,
        loading,
        error,
        filters,
        totalPages,
        total,
        updateFilter,
        refetch: fetchLeads,
        addLead,
        editLead,
        removeLead,
        exportCSV: exportLeadsCSV,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads() {
  const ctx = useContext(LeadsContext);
  if (!ctx) throw new Error("useLeads must be used inside <LeadsProvider>");
  return ctx;
}
