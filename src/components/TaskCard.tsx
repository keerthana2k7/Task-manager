import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task } from "@/context/TaskContext";
import { formatDate } from "@/utils/taskFilters";

const priorityStyles: Record<Task["priority"], string> = {
  high: "bg-red-50 text-priority-high border-red-200 dark:bg-red-950/30 dark:border-red-900/50",
  medium: "bg-amber-50 text-priority-medium border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50",
  low: "bg-emerald-50 text-priority-low border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900/50",
};

interface TaskCardProps {
  task: Task;
  index: number;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskCard({ task, index, onToggle, onEdit, onDelete }: TaskCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group animate-slide-up",
        task.completed && "opacity-60 hover:opacity-90"
      )}
      style={{ animationDelay: `${Math.min(index, 10) * 60}ms`, animationFillMode: "both" }}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          className="mt-1 transition-all data-[state=checked]:scale-110"
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} as ${task.completed ? "pending" : "completed"}`}
        />
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-medium text-sm leading-snug transition-all break-words",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={cn(
                "text-xs text-muted-foreground mt-1 line-clamp-2",
                task.completed && "line-through"
              )}
            >
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span
              className={cn(
                "text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full font-semibold border",
                priorityStyles[task.priority]
              )}
            >
              {task.priority}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {task.dueDate ? formatDate(new Date(task.dueDate).getTime()) : formatDate(task.createdAt)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-all active:scale-90"
            aria-label="Edit task"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all active:scale-90"
            aria-label="Delete task"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
