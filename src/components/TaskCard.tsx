import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  title: string;
  date: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const priorityConfig = {
  high: { label: "High", badgeBg: "bg-red-50 text-priority-high border border-red-200" },
  medium: { label: "Medium", badgeBg: "bg-amber-50 text-priority-medium border border-amber-200" },
  low: { label: "Low", badgeBg: "bg-emerald-50 text-priority-low border border-emerald-200" },
};

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  index: number;
}

export function TaskCard({ task, onToggle, onDelete, index }: TaskCardProps) {
  const p = priorityConfig[task.priority];

  return (
    <div
      className={cn(
        "bg-card rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group animate-slide-up",
        task.completed && "opacity-60 hover:opacity-80"
      )}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          className="mt-1 rounded transition-all duration-200 data-[state=checked]:bg-primary data-[state=checked]:scale-110"
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
        />
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-medium text-sm leading-tight transition-all duration-300",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </h3>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium transition-colors", p.badgeBg)}>
              {p.label}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {task.date}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
          <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-90">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-200 active:scale-90"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
