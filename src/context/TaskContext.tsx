import { createContext, useContext, useEffect, useReducer, ReactNode } from "react";

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
  dueDate?: string;
}

type State = { tasks: Task[] };

type Action =
  | { type: "INIT"; tasks: Task[] }
  | { type: "ADD"; task: Task }
  | { type: "UPDATE"; task: Task }
  | { type: "DELETE"; id: string }
  | { type: "TOGGLE"; id: string };

const STORAGE_KEY = "taskflow.tasks.v1";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT":
      return { tasks: action.tasks };
    case "ADD":
      return { tasks: [action.task, ...state.tasks] };
    case "UPDATE":
      return { tasks: state.tasks.map((t) => (t.id === action.task.id ? action.task : t)) };
    case "DELETE":
      return { tasks: state.tasks.filter((t) => t.id !== action.id) };
    case "TOGGLE":
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, completed: !t.completed } : t
        ),
      };
    default:
      return state;
  }
};

interface TaskContextValue {
  tasks: Task[];
  addTask: (data: Omit<Task, "id" | "createdAt" | "completed">) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextValue | null>(null);

const seed: Task[] = [
  {
    id: "seed-1",
    title: "Welcome to TaskFlow",
    description: "Click the + button to create your first task. Tasks are saved to your browser.",
    priority: "medium",
    completed: false,
    createdAt: Date.now(),
  },
];

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { tasks: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Task[];
        dispatch({ type: "INIT", tasks: parsed });
      } else {
        dispatch({ type: "INIT", tasks: seed });
      }
    } catch {
      dispatch({ type: "INIT", tasks: seed });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  }, [state.tasks]);

  const value: TaskContextValue = {
    tasks: state.tasks,
    addTask: (data) =>
      dispatch({
        type: "ADD",
        task: { ...data, id: crypto.randomUUID(), createdAt: Date.now(), completed: false },
      }),
    updateTask: (task) => dispatch({ type: "UPDATE", task }),
    deleteTask: (id) => dispatch({ type: "DELETE", id }),
    toggleTask: (id) => dispatch({ type: "TOGGLE", id }),
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
}
