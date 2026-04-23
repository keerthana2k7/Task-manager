import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { TaskList } from "@/components/TaskList";
import { TaskModal } from "@/components/TaskModal";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { Plus, ListFilter, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTasks, type Task } from "@/context/TaskContext";
import { filterAndSortTasks, type FilterStatus, type SortBy } from "@/utils/taskFilters";
import { toast } from "sonner";

const Index = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FilterStatus>("all");
  const [sort, setSort] = useState<SortBy>("date-desc");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Task | null>(null);

  const filtered = useMemo(
    () => filterAndSortTasks(tasks, search, status, sort),
    [tasks, search, status, sort]
  );

  const stats = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      pending: tasks.filter((t) => !t.completed).length,
      urgent: tasks.filter((t) => t.priority === "high" && !t.completed).length,
    }),
    [tasks]
  );

  const counts = { all: tasks.length, completed: stats.completed, pending: stats.pending };

  const handleNew = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditing(task);
    setModalOpen(true);
  };

  const handleSave = (data: { title: string; description: string; priority: Task["priority"]; dueDate?: string }) => {
    if (editing) {
      updateTask({ ...editing, ...data });
      toast.success("Task updated");
    } else {
      addTask(data);
      toast.success("Task created");
    }
  };

  const confirmDelete = () => {
    if (pendingDelete) {
      deleteTask(pendingDelete.id);
      toast.success("Task deleted");
      setPendingDelete(null);
    }
  };

  const handleToggle = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    toggleTask(id);
    if (task && !task.completed) toast.success("Nice work — task completed");
  };

  const statCards = [
    { label: "Total", value: stats.total, icon: ListFilter, color: "text-primary" },
    { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-priority-low" },
    { label: "Pending", value: stats.pending, icon: Clock, color: "text-primary" },
    { label: "Urgent", value: stats.urgent, icon: AlertTriangle, color: "text-priority-high" },
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your tasks and stay productive
            </p>
          </div>
          <Button onClick={handleNew} className="shrink-0">
            <Plus className="h-4 w-4" />
            New task
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in" style={{ animationDelay: "100ms" }}>
          {statCards.map((s) => (
            <div
              key={s.label}
              className="bg-card rounded-xl border p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
                <s.icon className={cn("h-4 w-4", s.color)} />
              </div>
              <p className="text-2xl font-bold mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar
            status={status}
            onStatusChange={setStatus}
            sort={sort}
            onSortChange={setSort}
            counts={counts}
          />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <TaskList
            tasks={filtered}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={setPendingDelete}
            emptyTitle={tasks.length === 0 ? "No tasks yet" : "No matching tasks"}
            emptyDescription={
              tasks.length === 0
                ? "Create your first task to get started."
                : "Try adjusting your search or filters."
            }
          />
        </div>
      </div>

      <TaskModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSave}
        initial={editing}
      />

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this task?</AlertDialogTitle>
            <AlertDialogDescription>
              "{pendingDelete?.title}" will be permanently removed. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
};

export default Index;
