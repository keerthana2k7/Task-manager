import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FilterStatus, SortBy } from "@/utils/taskFilters";

interface FilterBarProps {
  status: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
  sort: SortBy;
  onSortChange: (sort: SortBy) => void;
  counts: { all: number; completed: number; pending: number };
}

const statuses: { key: FilterStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
];

export function FilterBar({ status, onStatusChange, sort, onSortChange, counts }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <div className="flex items-center gap-1 bg-muted rounded-lg p-1 w-fit">
        {statuses.map((s) => (
          <button
            key={s.key}
            onClick={() => onStatusChange(s.key)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
              status === s.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {s.label} ({counts[s.key]})
          </button>
        ))}
      </div>
      <Select value={sort} onValueChange={(v) => onSortChange(v as SortBy)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date-desc">Newest first</SelectItem>
          <SelectItem value="date-asc">Oldest first</SelectItem>
          <SelectItem value="status">By status</SelectItem>
          <SelectItem value="priority">By priority</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
