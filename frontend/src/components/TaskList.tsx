import type { Task } from "@/context/TaskContext";
import { TaskCard } from "@/components/TaskCard";
import { EmptyState } from "@/components/EmptyState";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  emptyTitle: string;
  emptyDescription: string;
}

export function TaskList({ tasks, onToggle, onEdit, onDelete, emptyTitle, emptyDescription }: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task, i) => (
        <TaskCard
          key={task.id}
          task={task}
          index={i}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
