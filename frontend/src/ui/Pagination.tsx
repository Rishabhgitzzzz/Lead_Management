import Button from "./Button";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center gap-2 justify-end mt-4">
      <Button
        variant="ghost"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        ← Prev
      </Button>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="ghost"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      >
        Next →
      </Button>
    </div>
  );
}
