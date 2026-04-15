import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  title: string;
  date: string;
  priority: "high" | "medium" | "low";
  completed?: boolean;
}

const priorityConfig = {
  high: { label: "High", dotClass: "bg-priority-high", badgeBg: "bg-red-50 text-priority-high" },
  medium: { label: "Medium", dotClass: "bg-priority-medium", badgeBg: "bg-amber-50 text-priority-medium" },
  low: { label: "Low", dotClass: "bg-priority-low", badgeBg: "bg-emerald-50 text-priority-low" },
};

export function TaskCard({ title, date, priority, completed }: TaskCardProps) {
  const p = priorityConfig[priority];

  return (
    <div
      className={cn(
        "bg-card rounded-xl border p-4 shadow-sm transition-all hover:shadow-md group",
        completed && "opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox className="mt-1 rounded" checked={completed} />
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-medium text-sm leading-tight",
              completed && "line-through text-muted-foreground"
            )}
          >
            {title}
          </h3>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", p.badgeBg)}>
              {p.label}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {date}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
