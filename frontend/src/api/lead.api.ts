import type { Lead, LeadFilters } from "../types";
import api from "./axios";

interface LeadsResponse {
  success: boolean;
  data: Lead[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export async function getLeadsApi(filters: Partial<LeadFilters>) {
  const res = await api.get<LeadsResponse>("/leads", { params: filters });
  return res.data;
}

export async function createLeadApi(data: Partial<Lead>) {
  const res = await api.post<{ data: Lead }>("/leads", data);
  return res.data.data;
}

export async function updateLeadApi(id: string, data: Partial<Lead>) {
  const res = await api.put<{ data: Lead }>(`/leads/${id}`, data);
  return res.data.data;
}

export async function deleteLeadApi(id: string) {
  await api.delete(`/leads/${id}`);
}

export async function exportLeadsCSV() {
  const res = await api.get("/leads/export/csv", { responseType: "blob" });
  const url = URL.createObjectURL(res.data);
  const a = document.createElement("a");
  a.href = url;
  a.download = "leads.csv";
  a.click();
  URL.revokeObjectURL(url);
}
