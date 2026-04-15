import { useState, useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { TaskForm, type NewTask } from "@/components/TaskForm";
import { TaskCard, type Task } from "@/components/TaskCard";
import { ListFilter, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const initialTasks: Task[] = [
  { id: "1", title: "Design homepage mockup", date: "Apr 16, 2026", priority: "high", completed: false },
  { id: "2", title: "Review pull requests", date: "Apr 16, 2026", priority: "medium", completed: true },
  { id: "3", title: "Update documentation", date: "Apr 17, 2026", priority: "low", completed: false },
  { id: "4", title: "Fix authentication bug", date: "Apr 15, 2026", priority: "high", completed: false },
  { id: "5", title: "Team standup meeting", date: "Apr 15, 2026", priority: "medium", completed: false },
  { id: "6", title: "Write unit tests", date: "Apr 18, 2026", priority: "low", completed: false },
];

type Filter = "all" | "active" | "completed";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Filter>("all");

  const handleAdd = (newTask: NewTask) => {
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      date: new Date(newTask.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      priority: newTask.priority,
      completed: false,
    };
    setTasks((prev) => [task, ...prev]);
  };

  const handleToggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const filtered = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    active: tasks.filter((t) => !t.completed).length,
    highPriority: tasks.filter((t) => t.priority === "high" && !t.completed).length,
  }), [tasks]);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: `All (${stats.total})` },
    { key: "active", label: `Active (${stats.active})` },
    { key: "completed", label: `Done (${stats.completed})` },
  ];

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your tasks and stay productive</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in" style={{ animationDelay: "100ms" }}>
          {[
            { label: "Total", value: stats.total, icon: ListFilter, color: "text-primary" },
            { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-priority-low" },
            { label: "Active", value: stats.active, icon: Clock, color: "text-primary" },
            { label: "Urgent", value: stats.highPriority, icon: AlertTriangle, color: "text-priority-high" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl border p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
                <s.icon className={cn("h-4 w-4", s.color)} />
              </div>
              <p className="text-2xl font-bold mt-1 animate-count-up">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <TaskForm onAdd={handleAdd} />
        </div>

        {/* Filter & Task List */}
        <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Your Tasks</h2>
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
                    filter === f.key
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground animate-fade-in">
              <p className="text-sm">No tasks found</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((task, i) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
