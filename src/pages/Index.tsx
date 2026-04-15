import { AppLayout } from "@/components/AppLayout";
import { TaskForm } from "@/components/TaskForm";
import { TaskCard } from "@/components/TaskCard";

const sampleTasks = [
  { title: "Design homepage mockup", date: "Apr 16, 2026", priority: "high" as const },
  { title: "Review pull requests", date: "Apr 16, 2026", priority: "medium" as const, completed: true },
  { title: "Update documentation", date: "Apr 17, 2026", priority: "low" as const },
  { title: "Fix authentication bug", date: "Apr 15, 2026", priority: "high" as const },
  { title: "Team standup meeting", date: "Apr 15, 2026", priority: "medium" as const },
  { title: "Write unit tests", date: "Apr 18, 2026", priority: "low" as const },
];

const Index = () => {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your tasks and stay productive</p>
        </div>

        <TaskForm />

        <div>
          <h2 className="text-lg font-semibold mb-3">Your Tasks</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sampleTasks.map((task, i) => (
              <TaskCard key={i} {...task} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
