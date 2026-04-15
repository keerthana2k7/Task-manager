import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NewTask {
  title: string;
  description: string;
  date: string;
  time: string;
  priority: "high" | "medium" | "low";
}

interface TaskFormProps {
  onAdd: (task: NewTask) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [expanded, setExpanded] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low" | "">("");
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onAdd({
      title: title.trim(),
      description: description.trim(),
      date: date || new Date().toISOString().split("T")[0],
      time: time || "12:00",
      priority: (priority as "high" | "medium" | "low") || "medium",
    });
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setPriority("");
  };

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 md:px-6 py-4 text-left hover:bg-accent/30 transition-colors"
      >
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Add New Task
        </h2>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Task title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={cn(
                    "transition-all duration-200 focus:ring-2 focus:ring-primary/20",
                    shake && "animate-[shake_0.5s_ease-in-out] border-destructive"
                  )}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={(v) => setPriority(v as any)}>
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-priority-high animate-pulse" />
                        High
                      </span>
                    </SelectItem>
                    <SelectItem value="medium">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-priority-medium" />
                        Medium
                      </span>
                    </SelectItem>
                    <SelectItem value="low">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-priority-low" />
                        Low
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  placeholder="Task description..."
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Due Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Due Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="sm:col-span-2">
                <Button
                  onClick={handleSubmit}
                  className="w-full sm:w-auto hover-scale active:scale-95 transition-all duration-200"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
