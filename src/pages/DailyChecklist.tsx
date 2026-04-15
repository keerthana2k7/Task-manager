import { useState, useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const defaultRoutine = [
  { id: 1, label: "Wake up at 6:00 AM", emoji: "🌅" },
  { id: 2, label: "Morning exercise (30 min)", emoji: "🏋️" },
  { id: 3, label: "Breakfast & vitamins", emoji: "🥣" },
  { id: 4, label: "Review daily goals", emoji: "🎯" },
  { id: 5, label: "Deep work session (2 hrs)", emoji: "💻" },
  { id: 6, label: "Lunch break", emoji: "🍽️" },
  { id: 7, label: "Study / Learning (1 hr)", emoji: "📚" },
  { id: 8, label: "Respond to emails", emoji: "✉️" },
  { id: 9, label: "Afternoon walk", emoji: "🚶" },
  { id: 10, label: "Plan tomorrow's tasks", emoji: "📝" },
  { id: 11, label: "Read for 30 minutes", emoji: "📖" },
  { id: 12, label: "Sleep by 10:30 PM", emoji: "😴" },
];

const DailyChecklist = () => {
  const [checked, setChecked] = useState<Set<number>>(new Set([1, 2]));

  const toggle = (id: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const reset = () => setChecked(new Set());

  const completedCount = checked.size;
  const percentage = Math.round((completedCount / defaultRoutine.length) * 100);
  const allDone = completedCount === defaultRoutine.length;

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold">Daily Checklist</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {completedCount} of {defaultRoutine.length} completed today
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-card rounded-xl border p-5 shadow-sm animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Today's Progress</span>
            <span className="text-sm font-bold text-primary">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2.5 transition-all duration-500" />
          {allDone && (
            <div className="mt-3 flex items-center gap-2 text-sm text-priority-low font-medium animate-scale-in">
              <Sparkles className="h-4 w-4" />
              All tasks completed! Great job! 🎉
            </div>
          )}
        </div>

        {/* Checklist */}
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden animate-fade-in" style={{ animationDelay: "200ms" }}>
          {defaultRoutine.map((task, i) => {
            const isDone = checked.has(task.id);
            return (
              <label
                key={task.id}
                className={cn(
                  "flex items-center gap-3 px-5 py-3.5 border-b last:border-b-0 cursor-pointer transition-all duration-200",
                  isDone
                    ? "bg-accent/40 hover:bg-accent/60"
                    : "hover:bg-accent/20"
                )}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <Checkbox
                  checked={isDone}
                  onCheckedChange={() => toggle(task.id)}
                  className="rounded transition-all duration-200 data-[state=checked]:scale-110"
                />
                <span className="text-lg">{task.emoji}</span>
                <span
                  className={cn(
                    "text-sm transition-all duration-300 flex-1",
                    isDone ? "line-through text-muted-foreground" : "font-medium"
                  )}
                >
                  {task.label}
                </span>
                {isDone && (
                  <span className="text-xs text-priority-low font-medium animate-scale-in">✓</span>
                )}
              </label>
            );
          })}
        </div>

        <div className="flex justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
          <Button variant="outline" onClick={reset} className="hover-scale active:scale-95 transition-all">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Checklist
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default DailyChecklist;
