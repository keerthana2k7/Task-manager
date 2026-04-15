import { AppLayout } from "@/components/AppLayout";
import { Checkbox } from "@/components/ui/checkbox";

const routineTasks = [
  { id: 1, label: "Wake up at 6:00 AM", checked: true },
  { id: 2, label: "Morning exercise (30 min)", checked: true },
  { id: 3, label: "Breakfast & vitamins", checked: false },
  { id: 4, label: "Review daily goals", checked: false },
  { id: 5, label: "Deep work session (2 hrs)", checked: false },
  { id: 6, label: "Lunch break", checked: false },
  { id: 7, label: "Study / Learning (1 hr)", checked: false },
  { id: 8, label: "Respond to emails", checked: false },
  { id: 9, label: "Afternoon walk", checked: false },
  { id: 10, label: "Plan tomorrow's tasks", checked: false },
  { id: 11, label: "Read for 30 minutes", checked: false },
  { id: 12, label: "Sleep by 10:30 PM", checked: false },
];

const DailyChecklist = () => {
  const completedCount = routineTasks.filter((t) => t.checked).length;

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Daily Checklist</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {completedCount} of {routineTasks.length} completed today
          </p>
        </div>

        <div className="bg-card rounded-xl border shadow-sm divide-y">
          {routineTasks.map((task) => (
            <label
              key={task.id}
              className="flex items-center gap-3 px-5 py-3.5 hover:bg-accent/30 transition-colors cursor-pointer"
            >
              <Checkbox checked={task.checked} className="rounded" />
              <span
                className={
                  task.checked
                    ? "line-through text-muted-foreground text-sm"
                    : "text-sm font-medium"
                }
              >
                {task.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default DailyChecklist;
