import { useState } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

import type { Lead, LeadSource, LeadStatus } from "../types";
import { useLeads } from "../context/LeadsContext";

interface Props {
  lead?: Lead;
  onClose: () => void;
}

const statusOptions = [
  { label: "New", value: "New" },
  { label: "Contacted", value: "Contacted" },
  { label: "Qualified", value: "Qualified" },
  { label: "Lost", value: "Lost" },
];

const sourceOptions = [
  { label: "Website", value: "Website" },
  { label: "Instagram", value: "Instagram" },
  { label: "Referral", value: "Referral" },
];

export default function LeadForm({ lead, onClose }: Props) {
  const { addLead, editLead } = useLeads();

  const [name, setName] = useState(lead?.name || "");
  const [email, setEmail] = useState(lead?.email || "");
  const [status, setStatus] = useState(lead?.status || "New");
  const [source, setSource] = useState(lead?.source || "Website");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    if (!name || !email) {
      setError("Name and email are required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      if (lead) {
        await editLead(lead._id, {
          name,
          email,
          status,
          source,
        } as Partial<Lead>);
      } else {
        await addLead({ name, email, status, source } as Partial<Lead>);
      }
      onClose();
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-bold mb-4 dark:text-white">
          {lead ? "Edit Lead" : "Add Lead"}
        </h2>

        <div className="flex flex-col gap-4">
          <Input
            label="Name"
            value={name}
            onChange={setName}
            placeholder="Full name"
          />
          <Input
            label="Email"
            value={email}
            onChange={setEmail}
            type="email"
            placeholder="email@example.com"
          />
          <Select
            label="Status"
            value={status}
            onChange={(val) => setStatus(val as LeadStatus)}
            options={statusOptions}
          />
          <Select
            label="Source"
            value={source}
            onChange={(val) => setSource(val as LeadSource)}
            options={sourceOptions}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3 justify-end mt-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
