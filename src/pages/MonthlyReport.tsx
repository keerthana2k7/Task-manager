import { AppLayout } from "@/components/AppLayout";
import { ClipboardList, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  { label: "Total Tasks", value: 48, icon: ClipboardList, color: "text-primary" },
  { label: "Completed", value: 32, icon: CheckCircle2, color: "text-priority-low" },
  { label: "Pending", value: 16, icon: Clock, color: "text-priority-medium" },
  { label: "Completion", value: "67%", icon: TrendingUp, color: "text-primary" },
];

const weeklyData = [
  { name: "Week 1", completed: 10, pending: 3 },
  { name: "Week 2", completed: 8, pending: 5 },
  { name: "Week 3", completed: 7, pending: 4 },
  { name: "Week 4", completed: 7, pending: 4 },
];

const pieData = [
  { name: "Completed", value: 32 },
  { name: "Pending", value: 16 },
];

const PIE_COLORS = ["hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)"];

const MonthlyReport = () => {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Monthly Report</h1>
          <p className="text-muted-foreground text-sm mt-1">April 2026 overview</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-xl border p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold mt-2">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          <div className="bg-card rounded-xl border p-5 shadow-sm lg:col-span-3">
            <h3 className="text-sm font-semibold mb-4">Weekly Breakdown</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="completed" fill="hsl(230,70%,55%)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="pending" fill="hsl(38,92%,50%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-xl border p-5 shadow-sm lg:col-span-2">
            <h3 className="text-sm font-semibold mb-4">Completion Ratio</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 text-xs mt-2">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-priority-low" />
                Completed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-priority-medium" />
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MonthlyReport;
