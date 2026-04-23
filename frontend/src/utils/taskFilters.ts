import type { Task } from "@/context/TaskContext";

export type FilterStatus = "all" | "completed" | "pending";
export type SortBy = "date-desc" | "date-asc" | "status" | "priority";

export function filterAndSortTasks(
  tasks: Task[],
  search: string,
  status: FilterStatus,
  sort: SortBy
): Task[] {
  const q = search.trim().toLowerCase();
  let result = tasks.filter((t) => {
    if (status === "completed" && !t.completed) return false;
    if (status === "pending" && t.completed) return false;
    if (q && !t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q))
      return false;
    return true;
  });

  const priorityRank: Record<string, number> = { high: 0, medium: 1, low: 2 };

  result = [...result].sort((a, b) => {
    switch (sort) {
      case "date-desc":
        return b.createdAt - a.createdAt;
      case "date-asc":
        return a.createdAt - b.createdAt;
      case "status":
        return Number(a.completed) - Number(b.completed);
      case "priority":
        return priorityRank[a.priority] - priorityRank[b.priority];
    }
  });

  return result;
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
