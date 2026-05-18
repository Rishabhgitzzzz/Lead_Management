import { useLeads } from "../context/LeadsContext";
import Input from "../ui/Input";
import Select from "../ui/Select";

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

const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
];

export default function LeadFilters() {
  const { filters, updateFilter } = useLeads(); // ← reads from context directly

  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div className="flex-1 min-w-48">
        <Input
          placeholder="Search name or email..."
          value={filters.search}
          onChange={(val) => updateFilter("search", val)}
        />
      </div>
      <Select
        value={filters.status}
        onChange={(val) => updateFilter("status", val)}
        options={statusOptions}
        placeholder="All Status"
      />
      <Select
        value={filters.source}
        onChange={(val) => updateFilter("source", val)}
        options={sourceOptions}
        placeholder="All Sources"
      />
      <Select
        value={filters.sort}
        onChange={(val) => updateFilter("sort", val)}
        options={sortOptions}
      />
    </div>
  );
}
